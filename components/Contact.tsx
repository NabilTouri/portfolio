'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-2 text-center">
            {t.contact.sectionTitle}
            <span className="text-accent">.</span>
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-6" />
          <p className="text-muted text-center text-base md:text-lg mb-12 max-w-xl mx-auto">
            {t.contact.description}
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          action="mailto:me@nabiltouri.dev"
          method="POST"
          encType="text/plain"
          className="space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="sr-only">
                {t.contact.form.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={t.contact.form.name}
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted/60 focus:border-accent/50 focus:outline-none transition-colors duration-200 font-body text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                {t.contact.form.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t.contact.form.email}
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted/60 focus:border-accent/50 focus:outline-none transition-colors duration-200 font-body text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="sr-only">
              {t.contact.form.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder={t.contact.form.message}
              className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted/60 focus:border-accent/50 focus:outline-none transition-colors duration-200 font-body text-sm resize-none"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-accent text-background font-heading font-bold text-sm hover:bg-accent/90 transition-all duration-200 hover:shadow-[0_0_30px_rgba(0,212,170,0.3)]"
            >
              {t.contact.form.send}
            </button>
          </div>
        </motion.form>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-6">
            {/* GitHub */}
            <a
              href="https://github.com/NabilTouri"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors duration-200"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/nabil-touri-b461742b7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:me@nabiltouri.dev"
              className="text-muted hover:text-accent transition-colors duration-200"
              aria-label="Email"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </a>
          </div>

          <p className="text-muted text-sm italic">{t.contact.closing}</p>
        </motion.div>
      </div>
    </section>
  );
}
