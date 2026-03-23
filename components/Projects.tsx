'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            {t.projects.sectionTitle}
            <span className="text-accent">.</span>
          </h2>
          <div className="w-16 h-0.5 bg-accent mb-12" />
        </motion.div>

        {t.projects.cards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center py-20 px-6 rounded-xl border border-dashed border-border"
          >
            <svg
              className="w-12 h-12 text-muted/30 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
            <p className="text-muted/50 text-sm font-body">{t.projects.noProjects}</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.projects.cards.map((card, index) => (
              <ProjectCard
                key={card.title}
                title={card.title}
                description={card.description}
                badges={card.badges}
                github={card.github}
                demo={card.demo}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
