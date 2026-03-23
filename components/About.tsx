'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6 },
};

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeInUp}>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2">
            {t.about.sectionTitle}
            <span className="text-accent">.</span>
          </h2>
          <div className="w-16 h-0.5 bg-accent mb-10" />
        </motion.div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-12">
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted leading-relaxed text-base md:text-lg">
              {t.about.bio}
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="p-6 rounded-xl border border-border bg-surface/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <h3 className="font-heading text-sm font-bold text-accent uppercase tracking-wider">
                  {t.about.currentlyTitle}
                </h3>
              </div>
              <p className="text-muted text-sm leading-relaxed">
                {t.about.currently}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Skills grid */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              title: 'Data & ML',
              items: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Streamlit', 'SQL'],
            },
            {
              title: 'Web Dev',
              items: ['React', 'Svelte', 'Next.js', 'HTML/CSS/JS', 'TypeScript'],
            },
            {
              title: 'AI & Automation',
              items: ['AI Agents', 'LLM Bots', 'Trading Bots'],
            },
            {
              title: 'Tools & DevOps',
              items: ['Git', 'GitHub', 'Docker', 'Linux', 'Self-hosting'],
            },
          ].map((category, i) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="p-5 rounded-xl border border-border bg-surface/30 hover:border-accent/30 transition-all duration-300"
            >
              <h4 className="font-heading text-sm font-bold text-accent mb-3 tracking-wide">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-md bg-accent-dim text-accent/80 font-body"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
