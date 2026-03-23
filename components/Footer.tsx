'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-heading text-lg font-bold text-accent">NT</span>
          <span className="text-muted text-sm">
            © {new Date().getFullYear()} Nabil Touri. {t.footer.rights}
          </span>
        </div>
        <p className="text-muted/60 text-xs">{t.footer.built}</p>
      </div>
    </footer>
  );
}
