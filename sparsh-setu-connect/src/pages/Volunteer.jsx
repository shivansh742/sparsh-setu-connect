import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiCalendar, FiBriefcase, FiMapPin, FiFlag, FiMessageSquare } from "react-icons/fi";
import SectionTitle from "../components/SectionTitle.jsx";
import Toast from "../components/Toast.jsx";
import useToast from "../hooks/useToast.js";
import useLocalStorage from "../hooks/useLocalStorage.js";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  age: "",
  occupation: "",
  skills: "",
  city: "",
  state: "",
  reason: "",
};

function validate(form) {
  const errors = {};
  if (!form.name.trim() || form.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Please enter a valid email address.";
  if (!/^[0-9]{10}$/.test(form.phone.replace(/\D/g, ""))) errors.phone = "Please enter a valid 10-digit phone number.";
  const ageNum = Number(form.age);
  if (!form.age || Number.isNaN(ageNum) || ageNum < 16 || ageNum > 100) errors.age = "Age must be between 16 and 100.";
  if (!form.occupation.trim()) errors.occupation = "Please tell us your occupation.";
  if (!form.skills.trim()) errors.skills = "Please list at least one skill.";
  if (!form.city.trim()) errors.city = "City is required.";
  if (!form.state.trim()) errors.state = "State is required.";
  if (!form.reason.trim() || form.reason.trim().length < 20) errors.reason = "Please share a bit more (min. 20 characters).";
  return errors;
}

const fieldMeta = [
  { name: "name", label: "Full Name", icon: FiUser, type: "text", placeholder: "e.g. Priya Sharma", span: "sm:col-span-1" },
  { name: "email", label: "Email Address", icon: FiMail, type: "email", placeholder: "e.g. priya@email.com", span: "sm:col-span-1" },
  { name: "phone", label: "Phone Number", icon: FiPhone, type: "tel", placeholder: "e.g. 9876543210", span: "sm:col-span-1" },
  { name: "age", label: "Age", icon: FiCalendar, type: "number", placeholder: "e.g. 24", span: "sm:col-span-1" },
  { name: "occupation", label: "Occupation", icon: FiBriefcase, type: "text", placeholder: "e.g. Student, Teacher", span: "sm:col-span-1" },
  { name: "skills", label: "Skills", icon: FiFlag, type: "text", placeholder: "e.g. Teaching, First Aid, Design", span: "sm:col-span-1" },
  { name: "city", label: "City", icon: FiMapPin, type: "text", placeholder: "e.g. Pune", span: "sm:col-span-1" },
  { name: "state", label: "State", icon: FiMapPin, type: "text", placeholder: "e.g. Maharashtra", span: "sm:col-span-1" },
];

export default function Volunteer() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [, setVolunteers] = useLocalStorage("sparshSetu.volunteers", []);
  const { toast, showToast, hideToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      showToast({ title: "Please fix the highlighted fields", type: "error" });
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setVolunteers((prev) => [...prev, { ...form, id: Date.now(), submittedAt: new Date().toISOString() }]);
      setSubmitting(false);
      setForm(initialForm);
      showToast({
        title: "Registration successful!",
        message: "Thank you for volunteering with Sparsh Setu Connect. Our team will reach out soon.",
        type: "success",
      });
    }, 700);
  };

  return (
    <div className="section">
      <div className="container-app grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <SectionTitle
            eyebrow="Volunteer"
            title="Join Our Volunteer Family"
            description="Fill out this form to register your interest. This is a demo form — your details are saved only in your browser's local storage."
            align="left"
          />
          <div className="hidden lg:block rounded-xl2 overflow-hidden shadow-card">
            <img
              src="https://images.unsplash.com/photo-1593113630400-ea4288922497?w=700&h=800&fit=crop"
              alt="Volunteers working together"
              className="w-full h-[420px] object-cover"
            />
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          noValidate
          className="lg:col-span-3 card p-6 sm:p-8"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            {fieldMeta.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.name} className={field.span}>
                  <label htmlFor={field.name} className="block text-sm font-semibold text-slate-700 mb-1.5">
                    {field.label}
                  </label>
                  <div className="relative">
                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className={`w-full rounded-xl border pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue ${
                        errors[field.name] ? "border-red-300" : "border-slate-200"
                      }`}
                    />
                  </div>
                  {errors[field.name] && <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>}
                </div>
              );
            })}

            <div className="sm:col-span-2">
              <label htmlFor="reason" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Why do you want to volunteer with us?
              </label>
              <div className="relative">
                <FiMessageSquare className="absolute left-4 top-3.5 text-slate-400" size={16} />
                <textarea
                  id="reason"
                  name="reason"
                  rows={4}
                  value={form.reason}
                  onChange={handleChange}
                  placeholder="Tell us a little about your motivation..."
                  className={`w-full rounded-xl border pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none ${
                    errors.reason ? "border-red-300" : "border-slate-200"
                  }`}
                />
              </div>
              {errors.reason && <p className="text-xs text-red-500 mt-1">{errors.reason}</p>}
            </div>
          </div>

          <button type="submit" disabled={submitting} className="btn-primary w-full mt-8 disabled:opacity-60">
            {submitting ? "Submitting..." : "Submit Registration"}
          </button>
          <p className="text-xs text-slate-400 text-center mt-3">
            This is a demo form. No data is sent to a server — it is stored only in your browser.
          </p>
        </motion.form>
      </div>

      <Toast toast={toast} onClose={hideToast} />
    </div>
  );
}
