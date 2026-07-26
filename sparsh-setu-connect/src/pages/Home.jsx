import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiBookOpen, FiHeart, FiBriefcase, FiFeather } from "react-icons/fi";
import Button from "../components/Button.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import Card from "../components/Card.jsx";
import StatisticCard from "../components/StatisticCard.jsx";
import { stats, whatWeDo, missionVision, galleryItems, events, testimonials, ngo } from "../data/siteData.js";

const icons = { book: FiBookOpen, heart: FiHeart, briefcase: FiBriefcase, leaf: FiFeather };
const colorMap = {
  blue: "bg-brand-blue/10 text-brand-blue",
  green: "bg-brand-green/10 text-brand-green",
  orange: "bg-brand-orange/10 text-brand-orange",
};

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="container-app section flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            <span className="badge mb-5">{ngo.tagline}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 leading-tight mb-6">
              Building Bridges of <span className="text-brand-blue">Opportunity</span>,{" "}
              <span className="text-brand-green">Health</span> &amp; <span className="text-brand-orange">Hope</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 mb-8">{ngo.shortDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button to="/volunteer" variant="primary">
                Become a Volunteer <FiArrowRight />
              </Button>
              <Button to="/about" variant="secondary">
                Learn Our Story
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="flex-1 relative"
          >
            <div className="relative rounded-xl2 overflow-hidden shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&h=700&fit=crop"
                alt="Children at a Sparsh Setu learning centre"
                className="w-full h-[380px] sm:h-[440px] object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 card p-4 hidden sm:flex items-center gap-3 bg-white"
            >
              <span className="w-11 h-11 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center">
                <FiHeart size={20} />
              </span>
              <div>
                <p className="font-bold text-slate-900 leading-none">11 Years</p>
                <p className="text-xs text-slate-500 mt-1">of grassroots impact</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section bg-surface">
        <div className="container-app">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <StatisticCard key={s.id} value={s.value} suffix={s.suffix} label={s.label} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container-app grid md:grid-cols-2 gap-8">
          <Card delay={0}>
            <span className="badge mb-4">Our Mission</span>
            <p className="text-slate-700 leading-relaxed text-lg">{missionVision.mission}</p>
          </Card>
          <Card delay={0.1}>
            <span className="badge bg-brand-green/10 text-brand-green mb-4">Our Vision</span>
            <p className="text-slate-700 leading-relaxed text-lg">{missionVision.vision}</p>
          </Card>
        </div>
      </section>

      {/* What We Do */}
      <section className="section bg-surface">
        <div className="container-app">
          <SectionTitle eyebrow="What We Do" title="Four Pillars of Change" description="Our programs are designed to work together — education, health, livelihood and environment — building sustainable change from the ground up." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatWeDo.map((item, i) => {
              const Icon = icons[item.icon];
              return (
                <Card key={item.id} delay={i * 0.1}>
                  <span className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${colorMap[item.color]}`}>
                    <Icon size={22} />
                  </span>
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="section">
        <div className="container-app">
          <SectionTitle eyebrow="Gallery" title="Moments From the Field" description="A glimpse into the communities, camps and classrooms where our work comes alive." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryItems.slice(0, 4).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-xl2 overflow-hidden shadow-card h-48 sm:h-56"
              >
                <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button to="/gallery" variant="secondary">
              View Full Gallery <FiArrowRight />
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events preview */}
      <section className="section bg-surface">
        <div className="container-app">
          <SectionTitle eyebrow="Events" title="Upcoming Events" description="Join us at our next community events — every hand makes a difference." />
          <div className="grid md:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event, i) => (
              <Card key={event.id} delay={i * 0.1} className="overflow-hidden !p-0">
                <img src={event.image} alt={event.title} loading="lazy" className="w-full h-44 object-cover" />
                <div className="p-6">
                  <span className="badge mb-3">{event.category}</span>
                  <h3 className="font-display font-bold text-lg text-slate-900 mb-2">{event.title}</h3>
                  <p className="text-slate-500 text-sm">{event.location}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button to="/events" variant="secondary">
              See All Events <FiArrowRight />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container-app">
          <SectionTitle eyebrow="Testimonials" title="Voices From Our Community" />
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={t.id} delay={i * 0.1}>
                <p className="text-slate-600 italic leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-app">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-xl2 bg-gradient-to-r from-brand-blue to-blue-700 text-white px-8 py-14 sm:py-16 text-center shadow-soft relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/10 rounded-full" />
            <div className="absolute -bottom-16 -left-10 w-64 h-64 bg-white/10 rounded-full" />
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 relative">Ready to Make a Difference?</h2>
            <p className="text-blue-100 max-w-xl mx-auto mb-8 relative">
              Whether it's an hour a week or a lifelong commitment, your time and skills can change a life. Join the Sparsh Setu family today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
              <Button to="/volunteer" variant="accent">
                Become a Volunteer
              </Button>
              <Button to="/contact" variant="secondary" className="!bg-white/10 !text-white !border-white/30 hover:!bg-white/20">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
