import React, { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import SectionTitle from "../components/SectionTitle.jsx";
import EventCard from "../components/EventCard.jsx";
import Toast from "../components/Toast.jsx";
import useToast from "../hooks/useToast.js";
import { events, eventCategories } from "../data/siteData.js";

export default function Events() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const { toast, showToast, hideToast } = useToast();

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchesCategory = category === "All" || e.category === category;
      const matchesQuery =
        e.title.toLowerCase().includes(query.toLowerCase()) || e.location.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const handleRegister = (event) => {
    showToast({
      title: "Interest registered!",
      message: `Thanks for your interest in "${event.title}". This is a demo — no data was sent anywhere.`,
      type: "success",
    });
  };

  return (
    <div className="section">
      <div className="container-app">
        <SectionTitle eyebrow="Events" title="Upcoming Events" description="Find an event near you and be part of the change." />

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events by name or location..."
              className="w-full rounded-full border border-slate-200 pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full border border-slate-200 px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue"
          >
            {eventCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event, i) => (
              <EventCard key={event.id} event={event} delay={i * 0.08} onRegister={handleRegister} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 py-16">No events match your search. Try a different keyword or category.</p>
        )}
      </div>

      <Toast toast={toast} onClose={hideToast} />
    </div>
  );
}
