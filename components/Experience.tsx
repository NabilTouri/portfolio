'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function Experience() {
  const { t } = useLanguage();
  const job = t.experience.mainJob;

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            {t.experience.sectionTitle}
            <span className="text-accent">.</span>
          </h2>
          <div className="w-16 h-0.5 bg-accent mb-12" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-border to-transparent" />

          {/* Main job */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="relative pl-8 md:pl-14 mb-16"
          >
            {/* Timeline dot — glowing */}
            <div className="absolute left-0 md:left-4 top-1.5 w-2.5 h-2.5 rounded-full -translate-x-1 bg-accent shadow-[0_0_12px_rgba(0,212,170,0.5)]" />

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
              <h3 className="font-heading text-lg font-bold text-foreground">
                {job.role}
              </h3>
              <span className="text-accent text-sm font-heading">
                @ {job.company}
              </span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="text-muted text-sm font-body">{job.period}</span>
              {job.type && (
                <>
                  <span className="w-1 h-1 rounded-full bg-muted" />
                  <span className="text-muted text-sm font-body">{job.type}</span>
                </>
              )}
            </div>

            <p className="text-muted text-sm leading-relaxed mb-3">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {job.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-md bg-accent-dim text-accent/80 font-body"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Previous roles — compact one-liner */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative pl-8 md:pl-14"
          >
            <div className="absolute left-0 md:left-4 top-1.5 w-2.5 h-2.5 rounded-full -translate-x-1 bg-surface-light border border-border" />

            <h4 className="font-heading text-sm font-bold text-muted/70 uppercase tracking-wider mb-2">
              {t.experience.otherTitle}
            </h4>
            <p className="text-muted/60 text-sm leading-relaxed">
              {t.experience.otherDescription}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
