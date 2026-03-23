'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function Education() {
  const { t } = useLanguage();

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            {t.education.sectionTitle}
            <span className="text-accent">.</span>
          </h2>
          <div className="w-16 h-0.5 bg-accent mb-12" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-14">
          {t.education.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.15 * index }}
              className="relative p-6 rounded-xl border border-border bg-surface/30 hover:border-accent/30 transition-all duration-300"
            >
              {/* Status indicator */}
              <div className="flex items-center gap-2 mb-3">
                {item.type === 'ongoing' ? (
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-muted/40" />
                )}
                <span className="text-xs font-heading text-muted uppercase tracking-wider">
                  {item.period}
                </span>
              </div>

              <h3 className="font-heading text-lg font-bold text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-accent text-sm font-heading mb-3">
                {item.institution}
              </p>
              <p className="text-muted text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="font-heading text-sm font-bold text-muted/70 uppercase tracking-wider mb-4">
            {t.education.certificationsTitle}
          </h3>
          <div className="flex flex-wrap gap-3">
            {t.education.certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-border bg-surface/30"
              >
                <svg
                  className="w-4 h-4 text-accent shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
                <div>
                  <span className="text-sm font-body text-foreground">{cert.name}</span>
                  <span className="text-muted text-xs ml-2">
                    {cert.issuer} · {cert.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
