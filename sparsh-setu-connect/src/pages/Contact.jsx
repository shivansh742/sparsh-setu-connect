import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiMail, FiUser, FiMessageSquare, FiChevronDown } from "react-icons/fi";
import SectionTitle from "../components/SectionTitle.jsx";
import Toast from "../components/Toast.jsx";
import useToast from "../hooks/useToast.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { ngo, faqs } from "../data/siteData.js";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [openFaq, setOpenFaq] = useState(null);
  const [, setMessages] = useLocalStorage("sparshSetu.messages", []);
  const { toast, showToast, hideToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Please enter a valid email.";
    if (!form.subject.trim()) errs.subject = "Please add a subject.";
    if (!form.message.trim() || form.message.trim().length < 10) errs.message = "Message should be at least 10 characters.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      showToast({ title: "Please fix the highlighted fields", type: "error" });
      return;
    }
    setMessages((prev) => [...prev, { ...form, id: Date.now(), submittedAt: new Date().toISOString() }]);
    setForm(initialForm);
    showToast({ title: "Message sent!", message: "Thanks for reaching out — we'll respond within 2-3 business days.", type: "success" });
  };

  return (
    <div className="section">
      <div className="container-app">
        <SectionTitle eyebrow="Contact" title="Get in Touch" description="Have a question, partnership idea, or just want to say hello? We'd love to hear from you." />

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {[
            { Icon: FiMapPin, title: "Our Office", value: ngo.address },
            { Icon: FiPhone, title: "Call Us", value: ngo.phone },
            { Icon: FiMail, title: "Email Us", value: ngo.email },
          ].map(({ Icon, title, value }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card p-6 text-center"
            >
              <span className="w-12 h-12 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center mx-auto mb-3">
                <Icon size={20} />
              </span>
              <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
              <p className="text-slate-500 text-sm">{value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-20">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            noValidate
            className="card p-6 sm:p-8"
          >
            <h3 className="font-display font-bold text-xl text-slate-900 mb-6">Send a Message</h3>
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">Name</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your name"
                    className={`w-full rounded-xl border pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue ${errors.name ? "border-red-300" : "border-slate-200"}`} />
                </div>
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com"
                    className={`w-full rounded-xl border pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue ${errors.email ? "border-red-300" : "border-slate-200"}`} />
                </div>
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-1.5">Subject</label>
                <input id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?"
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue ${errors.subject ? "border-red-300" : "border-slate-200"}`} />
                {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">Message</label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-3.5 text-slate-400" size={16} />
                  <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} placeholder="Write your message..."
                    className={`w-full rounded-xl border pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue resize-none ${errors.message ? "border-red-300" : "border-slate-200"}`} />
                </div>
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>
              <button type="submit" className="btn-primary w-full">Send Message</button>
              <p className="text-xs text-slate-400 text-center">Demo form — messages are stored only in your browser's local storage.</p>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="rounded-xl2 overflow-hidden shadow-card h-72 lg:h-full min-h-[320px]"
          >
            <iframe
              title="Sparsh Setu Connect location map"
              src={ngo.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>

        <div>
          <SectionTitle eyebrow="FAQ" title="Frequently Asked Questions" />
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => {
              const open = openFaq === faq.id;
              return (
                <div key={faq.id} className="card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(open ? null : faq.id)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={open}
                  >
                    <span className="font-semibold text-slate-900 text-sm sm:text-base">{faq.question}</span>
                    <FiChevronDown className={`shrink-0 text-brand-blue transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Toast toast={toast} onClose={hideToast} />
    </div>
  );
}
