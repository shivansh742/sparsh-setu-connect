import React from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import Button from "./Button.jsx";

const categoryStyles = {
  Education: "bg-brand-blue/10 text-brand-blue",
  Health: "bg-brand-green/10 text-brand-green",
  Environment: "bg-brand-green/10 text-brand-green",
  Fundraiser: "bg-brand-orange/10 text-brand-orange",
  Community: "bg-brand-orange/10 text-brand-orange",
};

export default function EventCard({ event, onRegister, delay = 0 }) {
  const formattedDate = new Date(event.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      className="card overflow-hidden flex flex-col hover:-translate-y-1.5 hover:shadow-soft"
    >
      <div className="h-48 overflow-hidden">
        <img src={event.image} alt={event.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className={`badge w-fit mb-3 ${categoryStyles[event.category] || "bg-slate-100 text-slate-600"}`}>
          {event.category}
        </span>
        <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{event.title}</h3>
        <p className="text-slate-500 text-sm mb-4 flex-1">{event.description}</p>
        <div className="flex flex-col gap-1.5 text-sm text-slate-500 mb-5">
          <span className="flex items-center gap-2">
            <FiCalendar className="text-brand-blue shrink-0" /> {formattedDate}
          </span>
          <span className="flex items-center gap-2">
            <FiMapPin className="text-brand-blue shrink-0" /> {event.location}
          </span>
        </div>
        <Button variant="secondary" className="w-full" onClick={() => onRegister(event)}>
          Register Interest
        </Button>
      </div>
    </motion.div>
  );
}
