import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiX } from "react-icons/fi";

export default function Toast({ toast, onClose }) {
  if (!toast) return null;
  const isError = toast.type === "error";

  return (
    <div className="fixed bottom-5 right-5 z-[100] w-[calc(100%-2.5rem)] sm:w-auto max-w-sm">
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`flex items-start gap-3 rounded-xl2 shadow-soft px-4 py-3.5 border ${
              isError ? "bg-red-50 border-red-200 text-red-700" : "bg-green-50 border-green-200 text-green-700"
            }`}
            role="status"
          >
            {isError ? <FiAlertCircle size={22} className="mt-0.5 shrink-0" /> : <FiCheckCircle size={22} className="mt-0.5 shrink-0" />}
            <div className="flex-1">
              <p className="font-semibold text-sm">{toast.title}</p>
              {toast.message && <p className="text-sm opacity-90 mt-0.5">{toast.message}</p>}
            </div>
            <button onClick={onClose} className="opacity-60 hover:opacity-100" aria-label="Dismiss">
              <FiX size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
