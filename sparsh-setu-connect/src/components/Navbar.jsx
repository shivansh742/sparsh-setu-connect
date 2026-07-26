import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiHeart } from "react-icons/fi";
import Button from "./Button.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Events" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-semibold transition-colors ${
      isActive ? "text-brand-blue" : "text-slate-700 hover:text-brand-blue"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-card" : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <nav className="container-app flex items-center justify-between h-18 py-3">
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <span className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white">
            <FiHeart size={18} />
          </span>
          <span className="font-display font-bold text-lg text-slate-900 leading-tight">
            Sparsh Setu <span className="text-brand-blue">Connect</span>
          </span>
        </NavLink>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={navLinkClass}>
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-brand-blue rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button to="/volunteer" variant="primary">
            Become a Volunteer
          </Button>
        </div>

        <button
          className="lg:hidden text-slate-800 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden overflow-hidden bg-white border-t border-slate-100"
          >
            <div className="container-app py-4 flex flex-col gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-3 rounded-lg font-semibold text-sm ${
                      isActive ? "bg-brand-blue/10 text-brand-blue" : "text-slate-700 hover:bg-slate-50"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-2">
                <Button to="/volunteer" variant="primary" className="w-full" onClick={() => setOpen(false)}>
                  Become a Volunteer
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
