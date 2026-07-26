import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle.jsx";
import GalleryCard from "../components/GalleryCard.jsx";
import Modal from "../components/Modal.jsx";
import { galleryItems, galleryCategories } from "../data/siteData.js";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(
    () => (activeCategory === "All" ? galleryItems : galleryItems.filter((g) => g.category === activeCategory)),
    [activeCategory]
  );

  return (
    <div className="section">
      <div className="container-app">
        <SectionTitle
          eyebrow="Gallery"
          title="Our Work in Pictures"
          description="Browse photos from our education, health, environment and community programs."
        />

        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeCategory === cat
                  ? "bg-brand-blue text-white border-brand-blue shadow-soft"
                  : "bg-white text-slate-600 border-slate-200 hover:border-brand-blue/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
          <AnimatePresence>
            {filtered.map((item) => (
              <GalleryCard key={item.id} item={item} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && <p className="text-center text-slate-500 mt-10">No photos in this category yet.</p>}
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} ariaLabel="Gallery image preview">
        {selected && (
          <div className="bg-white rounded-xl2 overflow-hidden">
            <img src={selected.image} alt={selected.title} className="w-full max-h-[65vh] object-contain bg-slate-900" />
            <div className="p-5">
              <span className="badge mb-2">{selected.category}</span>
              <h3 className="font-display font-bold text-lg text-slate-900">{selected.title}</h3>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
