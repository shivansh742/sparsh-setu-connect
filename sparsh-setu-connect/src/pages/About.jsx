import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import SectionTitle from "../components/SectionTitle.jsx";
import Card from "../components/Card.jsx";
import { missionVision, timeline, team, ngo } from "../data/siteData.js";

export default function About() {
  return (
    <div>
      <section className="section bg-gradient-to-b from-blue-50 to-white">
        <div className="container-app text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge mb-5">About Us</span>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 mb-6">Our Story</h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              {ngo.name} began as a handful of volunteers running weekend classes under a banyan tree. Eleven years on,
              we work across education, health, livelihood and environment programs — always guided by one belief:
              real change happens when communities lead it themselves.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container-app grid md:grid-cols-2 gap-8">
          <Card>
            <span className="badge mb-4">Mission</span>
            <p className="text-slate-700 leading-relaxed text-lg">{missionVision.mission}</p>
          </Card>
          <Card delay={0.1}>
            <span className="badge bg-brand-green/10 text-brand-green mb-4">Vision</span>
            <p className="text-slate-700 leading-relaxed text-lg">{missionVision.vision}</p>
          </Card>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-app">
          <SectionTitle eyebrow="Our Objectives" title="What We're Working Toward" align="left" />
          <div className="grid sm:grid-cols-2 gap-5">
            {missionVision.objectives.map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-3 card p-5"
              >
                <FiCheckCircle className="text-brand-green shrink-0 mt-0.5" size={20} />
                <p className="text-slate-700 text-sm leading-relaxed">{obj}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-app">
          <SectionTitle eyebrow="Journey" title="Our Timeline" description="Eleven years of steady, community-led growth." />
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 sm:-translate-x-1/2" />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex flex-col sm:flex-row items-start gap-4 pl-12 sm:pl-0 ${
                    i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-2.5 sm:left-1/2 top-1 w-3.5 h-3.5 rounded-full bg-brand-blue sm:-translate-x-1/2 ring-4 ring-blue-100" />
                  <div className={`card p-5 sm:w-[45%] ${i % 2 === 0 ? "sm:mr-auto sm:text-right" : "sm:ml-auto"}`}>
                    <span className="badge mb-2">{t.year}</span>
                    <h3 className="font-display font-bold text-slate-900 mb-1">{t.title}</h3>
                    <p className="text-slate-500 text-sm">{t.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-app">
          <SectionTitle eyebrow="Our People" title="Meet the Team" description="A small, committed team backed by a growing community of volunteers." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <Card key={member.id} delay={i * 0.1} className="text-center">
                <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-card" />
                <h3 className="font-display font-bold text-slate-900">{member.name}</h3>
                <p className="text-brand-blue text-sm font-semibold mb-2">{member.role}</p>
                <p className="text-slate-500 text-sm">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
