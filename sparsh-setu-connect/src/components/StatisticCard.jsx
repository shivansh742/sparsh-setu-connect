import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

export default function StatisticCard({ value, label, suffix = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      delay,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="card text-center py-8 px-4 hover:-translate-y-1.5 hover:shadow-soft"
    >
      <p className="text-3xl sm:text-4xl font-display font-extrabold text-brand-blue">
        {display.toLocaleString()}
        {suffix}
      </p>
      <p className="text-slate-500 text-sm mt-2 font-medium">{label}</p>
    </motion.div>
  );
}
