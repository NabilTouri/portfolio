# Nabil Touri — Portfolio

Personal portfolio website built with **Next.js 14+**, **Tailwind CSS v4**, and **Framer Motion**.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Click **Deploy** — no extra configuration needed

## ✏️ Updating Content

All text content (both Italian and English) lives in a single file:

```
lib/translations.ts
```

Edit the strings there and the entire site updates. The structure is `translations.en` and `translations.it` with identical keys.

### Key files to customize:

| What | File |
|------|------|
| All text (ITA/ENG) | `lib/translations.ts` |
| SEO metadata | `app/layout.tsx` |
| Design colors/fonts | `app/globals.css` |
| Project cards | `lib/translations.ts` → `projects.cards` |

## 🔗 TODO: Placeholders to Replace

Search for `// TODO:` in the codebase for items that need real data:

- **CV download link** — `components/Hero.tsx`
- **Project GitHub/demo URLs** — `lib/translations.ts`
- **OG image** — place `og-image.png` (1200×630) in `public/images/` and uncomment in `app/layout.tsx`
- **Profile photo** — add to `public/images/` if desired

## 🏗️ Tech Stack

- [Next.js 14+](https://nextjs.org/) — App Router
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/)

## 📁 Project Structure

```
app/
  layout.tsx          ← SEO metadata + fonts + providers
  page.tsx            ← composes all sections
  globals.css         ← CSS variables + design system
components/
  Header.tsx          ← nav + language toggle + mobile menu
  Hero.tsx            ← hero section with CTAs
  About.tsx           ← bio + skills grid
  Experience.tsx      ← timeline with job history
  Projects.tsx        ← project cards grid
  ProjectCard.tsx     ← individual project card
  Contact.tsx         ← contact form + social links
  Footer.tsx          ← footer
lib/
  translations.ts     ← all ITA/ENG strings
  LanguageContext.tsx  ← language context + useLanguage hook
public/
  images/             ← profile photo, og:image
```
