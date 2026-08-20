'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col px-6 overflow-hidden"
    >
      {/* Decorative gradient orb */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Decorative lines */}
      <div className="absolute top-32 left-12 w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent hidden lg:block" />
      <div className="absolute bottom-32 right-12 w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent hidden lg:block" />

      {/* Main Content Centered */}
      <div className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 mb-8 rounded-full overflow-hidden border-[3px] border-surface ring-2 ring-accent/40 shadow-[0_0_40px_rgba(0,212,170,0.2)] bg-surface-light flex items-center justify-center"
        >
          {/* SVG Fallback nel caso l'immagine manchi */}
          <svg
            className="absolute w-12 h-12 text-muted/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>

          {/* TODO: Inserisci la tua immagine in public/images/profile.jpg o cambia src */}
          <img
            src="/images/profile.jpg"
            alt="Nabil Touri"
            className="relative z-10 w-full h-full object-cover"
            onError={(e) => {
              // Nasconde l'img rotta e lascia visibile il fallback SVG sotto
              e.currentTarget.style.display = 'none';
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-accent font-heading text-sm md:text-base tracking-widest uppercase mb-4"
        >
          {t.hero.greeting}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          {t.hero.name}
          <span className="text-accent">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-heading text-lg md:text-xl text-accent/80 font-medium mb-6"
        >
          {t.hero.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-muted text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-accent text-background font-heading font-bold text-sm hover:bg-accent/90 transition-all duration-200 hover:shadow-[0_0_30px_rgba(0,212,170,0.3)]"
          >
            {t.hero.cta1}
          </a>
          <a
            href="/files/CV_Nabil_Touri.pdf"
            download
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border text-foreground font-heading font-bold text-sm hover:border-accent/50 hover:text-accent transition-all duration-200"
          >
            {t.hero.cta2}
          </a>
        </motion.div>
      </div>
      </div>

      {/* Scroll indicator */}
      <div className="w-full flex justify-center pb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border-[2px] border-muted/40 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-accent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
