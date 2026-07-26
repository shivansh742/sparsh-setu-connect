import React from "react";
import { motion } from "framer-motion";
import { FiHome } from "react-icons/fi";
import Button from "../components/Button.jsx";

export default function NotFound() {
  return (
    <div className="section min-h-[70vh] flex items-center">
      <div className="container-app text-center max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <p className="text-8xl font-display font-extrabold text-brand-blue/20 mb-4">404</p>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-3">Page Not Found</h1>
          <p className="text-slate-500 mb-8">
            The page you're looking for doesn't exist or may have moved. Let's get you back to safety.
          </p>
          <Button to="/" variant="primary">
            <FiHome /> Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
