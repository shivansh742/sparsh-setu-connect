import React from "react";
import { motion } from "framer-motion";

export default function SectionTitle({ eyebrow, title, description, align = "center" }) {
  const alignment = align === "left" ? "text-left items-start" : "text-center items-center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col ${alignment} max-w-2xl ${align === "left" ? "" : "mx-auto"} mb-12`}
    >
      {eyebrow && <span className="badge mb-4">{eyebrow}</span>}
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
      {description && <p className="text-slate-600 text-base sm:text-lg leading-relaxed">{description}</p>}
    </motion.div>
  );
}
