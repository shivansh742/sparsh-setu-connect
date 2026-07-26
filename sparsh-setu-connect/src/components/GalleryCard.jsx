import React from "react";
import { motion } from "framer-motion";
import { FiZoomIn } from "react-icons/fi";

export default function GalleryCard({ item, onOpen, className = "" }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35 }}
      className={`group relative w-full overflow-hidden rounded-xl2 shadow-card text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue ${className}`}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <span className="badge bg-white/20 text-white w-fit mb-2 backdrop-blur-sm">{item.category}</span>
        <p className="text-white font-semibold flex items-center gap-2">
          {item.title} <FiZoomIn size={16} />
        </p>
      </div>
    </motion.button>
  );
}
