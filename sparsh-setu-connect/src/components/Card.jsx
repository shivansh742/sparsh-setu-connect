import React from "react";
import { motion } from "framer-motion";

export default function Card({ children, className = "", hover = true, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`card p-6 ${hover ? "hover:-translate-y-1.5 hover:shadow-soft" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
