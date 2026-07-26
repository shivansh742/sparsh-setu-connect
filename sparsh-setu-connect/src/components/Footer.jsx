import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiYoutube, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { ngo } from "../data/siteData.js";

const quickLinks = [
  { to: "/about", label: "About Us" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Events" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-app py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <span className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white">
              <FiHeart size={18} />
            </span>
            <span className="font-display font-bold text-lg text-white">Sparsh Setu Connect</span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400">{ngo.tagline} — building bridges of opportunity across education, health and livelihood.</p>
          <div className="flex gap-3 mt-5">
            {[
              { Icon: FiFacebook, href: ngo.social.facebook, label: "Facebook" },
              { Icon: FiInstagram, href: ngo.social.instagram, label: "Instagram" },
              { Icon: FiTwitter, href: ngo.social.twitter, label: "Twitter" },
              { Icon: FiLinkedin, href: ngo.social.linkedin, label: "LinkedIn" },
              { Icon: FiYoutube, href: ngo.social.youtube, label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-blue transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-brand-orange transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <FiMapPin className="mt-0.5 shrink-0 text-brand-orange" /> {ngo.address}
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="shrink-0 text-brand-orange" /> {ngo.phone}
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="shrink-0 text-brand-orange" /> {ngo.email}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
          <p className="text-sm text-slate-400 mb-3">Subscribe for program updates and event announcements (demo only).</p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="min-w-0 flex-1 rounded-full bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
            <button
              type="submit"
              className="rounded-full bg-brand-orange text-white text-sm font-semibold px-4 hover:bg-amber-600 transition-colors shrink-0"
            >
              Join
            </button>
          </form>
          {subscribed && <p className="text-brand-green text-xs mt-2">Thanks for subscribing! (demo only)</p>}
        </div>
      </div>

      <div className="border-t border-slate-800 py-5">
        <div className="container-app flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Sparsh Setu Connect. All rights reserved.</p>
          <p>Made with care for communities across Maharashtra.</p>
        </div>
      </div>
    </footer>
  );
}
