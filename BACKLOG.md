# 📋 Backlog — Portfolio Nabil Touri

> Audit completo del repository.
> Ultimo aggiornamento: 2026-08-05 · Commit di riferimento: `796976a`

---

## Legenda

| Priorità | Significato |
|----------|-------------|
| 🔴 **P0** | Blocca il deploy o rompe il sito in produzione. Da fare subito. |
| 🟠 **P1** | Impatto alto e visibile (contenuti falsi, sicurezza, SEO). |
| 🟡 **P2** | Miglioramento concreto, non urgente. |
| 🔵 **P3** | Nice-to-have / idee per differenziarsi. |

**Effort:** `S` = < 1h · `M` = 1–4h · `L` = > 4h

---

## Indice

1. [🔴 Blocker & rischi di deploy](#1--blocker--rischi-di-deploy)
2. [📦 Contenuti & Esternalizzazione](#2--contenuti--esternalizzazione)
3. [🔒 Sicurezza](#3--sicurezza)
4. [🧹 Qualità del codice](#4--qualità-del-codice)
5. [✨ UX & Wow Factor](#5--ux--wow-factor)
6. [🛠️ Infrastruttura & DX](#6-️-infrastruttura--dx)

---

## 1. 🔴 Blocker & rischi di deploy

### B-01 · Il build dipende da `RESEND_API_KEY` — 🟡 P2 · `S`

**Dove:** `app/api/contact/route.ts:4`

```ts
const resend = new Resend(process.env.RESEND_API_KEY); // ← eseguito a module-scope
```

Il client Resend viene istanziato al **caricamento del modulo**, non all'arrivo della
richiesta. Next.js carica la route durante la fase *"Collecting page data"* del build,
quindi in un ambiente senza la variabile il build termina con:

```
Error: Missing API key. Pass it to the constructor `new Resend("re_123")`
> Build error occurred
Error: Failed to collect page data for /api/contact
```

> ✅ **Non è un blocco per il deploy attuale.** Le variabili d'ambiente Vercel sono
> disponibili **sia a build time che a runtime**, quindi con la chiave configurata nel
> progetto il build passa regolarmente. Il fallimento sopra è stato riprodotto in un
> ambiente locale privo della chiave: dimostra la fragilità del pattern, non un
> problema del deploy in produzione.

**Cosa verificare (unico rischio concreto):** su Vercel le variabili hanno uno **scope
per environment** (Production / Preview / Development, con checkbox separate). Se
`RESEND_API_KEY` è impostata solo su *Production*:

- deploy di produzione al merge → ✅ funziona
- **Preview deploy generato da ogni PR** → ❌ build fallito, check rosso sulla PR

Controllare in *Settings → Environment Variables* che siano selezionati tutti gli
ambienti in uso.

**Fix (robustezza):** spostare l'istanziazione dentro l'handler `POST` (lazy init).
Un segreto di runtime smette così di essere una dipendenza del *build*: chi clona il
repo riesce a compilare, una CI non ha bisogno della chiave per fare `npm run build`,
e una chiave mancante degrada il solo form (503) invece di far cadere l'intera build.

```ts
export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
  }
  const resend = new Resend(apiKey);
  // ...
}
```

---

### B-02 · Sezione Progetti: contenuti diversi tra EN e IT — 🔴 P0 · `S`

**Dove:** `lib/translations.ts:83-114` (EN) vs `lib/translations.ts:221-246` (IT)

L'array `projects.cards` in **inglese è vuoto** (le 3 card sono commentate), mentre in
**italiano contiene 3 card** con link placeholder `github: '#'` e `demo: '#'`.

Conseguenza in produzione:
- Un visitatore **EN** vede *"No projects yet. Check back soon!"* — su un portfolio è pessimo.
- Un visitatore **IT** vede 3 progetti i cui link **non portano da nessuna parte** (`#`).
- Cambiando lingua il contenuto della pagina cambia sostanzialmente → confonde e sembra rotto.

**Fix:** decidere il set reale di progetti e allinearlo su entrambe le lingue, con URL veri.
Vedi anche [C-03](#c-03--esternalizzare-i-progetti--p1--m) per farlo senza toccare il codice.

---

## 2. 📦 Contenuti & Esternalizzazione

> Tema di fondo: **cosa deve stare nel codice e cosa deve poter cambiare senza un deploy.**

### C-01 · CV: decidere la strategia definitiva — 🟠 P1 · `S`

**Dove:** `components/Hero.tsx:104` · `public/files/CV_Nabil_Touri.pdf` (488 KB)

Situazione attuale: il PDF è **committato nel repo** e il link è **hardcoded**.
In precedenza (`3ee8c21`) era `process.env.NEXT_PUBLIC_CV_URL`, poi rimosso in `796976a`
perché la variabile non era mai stata impostata.

Le due opzioni, con i loro trade-off reali:

| | **PDF nel repo** (attuale) | **URL esterno via env var** |
|---|---|---|
| Aggiornare il CV | commit + push + redeploy | cambi la env var su Vercel, zero deploy |
| Peso repo | +488 KB per ogni versione, per sempre nella history | 0 |
| Funziona offline / in locale | ✅ | ❌ dipende dall'host |
| Rischio link rotto | nullo | se cambi hosting il link muore |
| Analytics sui download | no | sì, se usi un servizio che li traccia |

**Raccomandazione — approccio ibrido, il meglio dei due:**

1. Tieni il PDF nel repo come fallback affidabile.
2. Reintroduci `NEXT_PUBLIC_CV_URL` come override opzionale:

```tsx
<a href={process.env.NEXT_PUBLIC_CV_URL || '/files/CV_Nabil_Touri.pdf'} download>
```

Così di default funziona sempre, ma se un domani vuoi aggiornare il CV al volo
(o tracciarne i download) ti basta impostare la env var su Vercel.

> ⚠️ **Nota privacy:** un CV pubblico contiene dati personali (indirizzo, telefono,
> email). È indicizzabile dai motori di ricerca e scrapabile dai bot. Valuta se
> pubblicare una versione "public" senza recapiti diretti, che rimanda al form contatti.

---

### C-02 · Foto profilo mancante → immagine rotta — 🟠 P1 · `S`

**Dove:** `components/Hero.tsx:43-51`

```tsx
<img src="/images/profile.jpg" ... onError={(e) => { e.currentTarget.style.display = 'none'; }} />
```

La cartella `public/images/` **non esiste**. Ad ogni caricamento il browser fa una
richiesta che ritorna **404**, poi l'`onError` nasconde l'immagine e lascia il
placeholder SVG. Funziona "per caso", ma:

- 404 in console e nei Network log ad ogni visita
- flash visivo dell'icona di immagine rotta prima che l'handler scatti
- errore 404 registrato nelle analytics di Vercel

**Fix:** aggiungere la foto reale in `public/images/profile.jpg` **oppure** rimuovere
del tutto il tag `<img>` e tenere solo il fallback SVG finché la foto non c'è.
Una via di mezzo: rendere il path configurabile (`NEXT_PUBLIC_PROFILE_IMAGE`) e
renderizzare l'`<img>` solo se la variabile è definita.

---

### C-03 · Esternalizzare i progetti — 🟠 P1 · `M`

**Dove:** `lib/translations.ts` → `projects.cards`

Oggi per aggiungere un progetto devi: modificare il codice sorgente in **due punti**
(EN + IT), committare, pushare, aspettare il deploy. È il punto del sito che cambierà
più spesso, ed è quello che costa di più aggiornare.

**Opzioni, dalla più semplice alla più strutturata:**

| Approccio | Pro | Contro |
|---|---|---|
| **A.** File `content/projects.json` separato | zero dipendenze, sempre versionato, editabile senza toccare TSX | serve comunque un commit/deploy |
| **B.** GitHub API a build time | i progetti si auto-popolano da repo reali (stelle, lingua, descrizione) | meno controllo editoriale, rate limit |
| **C.** CMS headless (Notion / Sanity / Contentful) | aggiorni da UI, zero deploy, standard di settore | dipendenza esterna, setup iniziale |

**Raccomandazione:** parti da **A** (30 minuti, risolve subito B-02 e disaccoppia i
contenuti dal codice). Se in futuro pubblichi progetti spesso, migra a **C** — la
struttura dati resta la stessa, cambia solo la fonte.

---

### C-04 · OG image mancante → anteprime social rotte — 🟠 P1 · `S`

**Dove:** `app/layout.tsx:43-51`

`twitter.card` è impostata a `summary_large_image` ma **non esiste nessuna immagine**
(la riga `images:` è commentata in attesa di `og-image.png`).

Risultato: quando condividi il link su LinkedIn, WhatsApp, Twitter/X, Slack o Discord
appare un box **grigio e vuoto**. Su un portfolio che vuoi mandare ai recruiter, è
probabilmente il singolo dettaglio a più alto impatto/sforzo di tutta questa lista.

**Fix consigliato:** invece di un PNG statico, usa `ImageResponse` di Next.js per
generarla dinamicamente — resta sempre sincronizzata con nome e titolo:

```tsx
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() { /* ... */ }
```

---

### C-05 · Manca `metadataBase` → URL social relativi rotti — 🟠 P1 · `S`

**Dove:** `app/layout.tsx:20-56`

Senza `metadataBase`, Next.js non riesce a risolvere gli URL relativi delle immagini
OG in URL assoluti (requisito dei crawler social) ed emette un warning a build time.
Il dominio `https://nabiltouri.dev` è già hardcoded in `openGraph.url` ma non
dichiarato come base.

```ts
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nabiltouri.dev'),
  // ...
};
```

Da fare **prima** di C-04, altrimenti l'OG image non verrà comunque risolta.

---

### C-06 · Manca `.env.example` — 🟡 P2 · `S`

Il progetto usa **5 variabili d'ambiente** sparse nel codice, nessuna documentata:

| Variabile | Usata in | Obbligatoria |
|---|---|---|
| `RESEND_API_KEY` | `app/api/contact/route.ts:4` | ✅ **sì** — serve anche a build time (B-01) |
| `NEXT_PUBLIC_EMAIL` | `route.ts:5`, `Contact.tsx:172` | no (ha fallback) |
| `NEXT_PUBLIC_GITHUB` | `Contact.tsx:146` | no (ha fallback) |
| `NEXT_PUBLIC_LINKEDIN` | `Contact.tsx:159` | no (ha fallback) |
| `NEXT_PUBLIC_CV_URL` | *rimossa in `796976a`* | — |

Chiunque cloni il repo (incluso te stesso tra sei mesi) non ha modo di sapere cosa
serve. Aggiungere `.env.example` committato + una sezione nel README.

> `.gitignore` copre già `.env*`, quindi va forzato: `git add -f .env.example`,
> oppure aggiungere l'eccezione `!.env.example` al `.gitignore`.

---

### C-07 · README disallineato dalla realtà — 🟡 P2 · `S`

**Dove:** `README.md`

| Dice | In realtà |
|---|---|
| "Next.js 14+" | è **Next.js 16.2.0** |
| "Click Deploy — **no extra configuration needed**" | serve `RESEND_API_KEY` o il build fallisce (B-01) |
| struttura elenca `public/images/` | la cartella **non esiste** |
| non menziona `app/api/contact/` | esiste ed è la parte più delicata |
| non menziona il CV in `public/files/` | c'è |
| "TODO: CV download link" rimosso | ma restano TODO su progetti e OG image |

---

### C-08 · Certificazioni: una sola voce — 🔵 P3 · `S`

**Dove:** `lib/translations.ts:69-76` (EN), `207-214` (IT)

C'è solo il diploma, con un `// TODO: Add more certifications here as you earn them`.
Una sezione "Certificazioni" con dentro un solo elemento — che per giunta duplica quanto
già scritto sopra in "Formazione" — comunica poco. Valutare se popolarla
(anche con corsi online completati) o nasconderla finché non ha almeno 2–3 voci.

---

## 3. 🔒 Sicurezza

> L'endpoint `/api/contact` è la **superficie d'attacco principale** del sito: è
> l'unico punto in cui un utente anonimo può far eseguire codice e consumare risorse a pagamento.

### S-01 · Nessun rate limiting sul form contatti — 🔴 P0 · `M`

**Dove:** `app/api/contact/route.ts:7-27`

L'endpoint accetta **richieste illimitate da chiunque**. Con un banale ciclo:

```bash
while true; do curl -X POST https://nabiltouri.dev/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"x","email":"x@x.it","message":"x"}'; done
```

Un attaccante può:
- **esaurire la quota Resend** (il piano free è 100 email/giorno, 3.000/mese) → il form
  smette di funzionare per i contatti veri
- **inondare la tua casella** di migliaia di email (mail bombing)
- far **impennare i costi** se passi a un piano a pagamento
- consumare esecuzioni serverless Vercel

**Fix:** rate limiting per IP. Opzioni:
- `@upstash/ratelimit` + Upstash Redis (free tier, standard su Vercel) — 5 richieste/ora per IP
- In-memory `Map` con timestamp — gratis e a costo zero, ma **non affidabile** su
  serverless (ogni cold start azzera lo stato, istanze multiple non condividono memoria)
- Vercel Firewall / WAF rules a livello di piattaforma

---

### S-02 · Nessuna validazione dell'input — 🟠 P1 · `S`

**Dove:** `app/api/contact/route.ts:8-12`

```ts
const { name, email, message } = await request.json();
if (!name || !email || !message) { /* 400 */ }
```

È l'**unico** controllo. Problemi concreti:

1. **JSON malformato → crash.** `await request.json()` non è in un try/catch: un body
   non-JSON produce un'eccezione non gestita e un 500 con stack trace.
2. **Nessun limite di lunghezza.** `message` può essere di **megabyte**: memoria sprecata,
   payload enormi verso Resend, possibile rifiuto/ban.
3. **Nessun controllo di tipo.** `name` può essere un oggetto o un array: finisce
   in un template literal e produce `[object Object]` nel subject dell'email.
4. **Email non validata.** `replyTo: email` accetta qualsiasi stringa. Un valore non
   valido fa fallire l'invio, o peggio viene usato per abuso.

**Fix:** validazione con **Zod** (o controlli manuali):

```ts
const schema = z.object({
  name:    z.string().trim().min(1).max(100),
  email:   z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5000),
});
```

---

### S-03 · Header injection nel subject dell'email — 🟠 P1 · `S`

**Dove:** `app/api/contact/route.ts:18`

```ts
subject: `New message from ${name}`,
```

`name` è **input utente non sanificato interpolato in un header email**. Se contiene
caratteri di newline (`\r\n`), è il vettore classico di **email header injection**
(aggiunta di `Bcc:`, alterazione di `From:`).

Resend con ogni probabilità sanifica lato suo, ma **non si delega la sicurezza a
un'assunzione su una libreria di terze parti**. Rimuovere `\r` e `\n` prima
dell'interpolazione, e limitare la lunghezza (vedi S-02).

---

### S-04 · `NEXT_PUBLIC_EMAIL` espone la mail nel bundle client — 🟠 P1 · `S`

**Dove:** `app/api/contact/route.ts:5` + `components/Contact.tsx:172`

```ts
const toEmail = process.env.NEXT_PUBLIC_EMAIL || 'me@nabiltouri.dev';
```

Il prefisso `NEXT_PUBLIC_` fa sì che Next.js **inlini il valore nel JavaScript
scaricato dal browser**. Due conseguenze:

1. L'indirizzo di destinazione è in chiaro nel bundle → **raccolto dagli scraper di spam**.
   (Nota: è comunque già visibile nel link `mailto:` — vedi mitigazione sotto.)
2. **Confusione architetturale**: la stessa variabile serve sia da destinatario server-side
   che da link client-side. Se un giorno vuoi che le mail arrivino a un indirizzo
   *diverso* da quello mostrato, non puoi.

**Fix:** separare le due cose — `CONTACT_EMAIL` (server-only, destinatario reale) e
`NEXT_PUBLIC_EMAIL` (pubblico, mostrato nel link). Per il link pubblico valutare
offuscamento anti-scraping o rimuovere il `mailto:` lasciando solo il form.

---

### S-05 · 7 vulnerabilità nelle dipendenze (6 high) — 🟠 P1 · `S`

Output di `npm audit`:

| Pacchetto | Severità | Problema |
|---|---|---|
| `postcss` ≤8.5.22 | **high** | XSS via `</style>` non escapato · path traversal e lettura arbitraria di file `.map` via `sourceMappingURL` |
| `sharp` <0.35.0 | **high** | CVE libvips ereditate: CVE-2026-33327/33328/35590/35591 |
| `brace-expansion` | **high** | DoS: espansione esponenziale, memory exhaustion |
| `@babel/core` ≤7.29.0 | low | lettura arbitraria di file via commento `sourceMappingURL` |

Sono tutte **dipendenze transitive di Next.js**. Il fix è aggiornare Next da
**16.2.0 → 16.3.0** (`npm audit fix --force`, che esce dal range dichiarato — quindi
testare il build dopo).

---

### S-06 · Nessun security header — 🟡 P2 · `M`

**Dove:** `next.config.ts` (attualmente **vuoto**)

Mancano tutti gli header di sicurezza standard: `Content-Security-Policy`,
`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`,
`Strict-Transport-Security`.

Su un sito statico l'impatto è contenuto (nessuna sessione da rubare), ma:
`X-Frame-Options: DENY` previene il **clickjacking** (il tuo sito incorniciato in un
sito truffaldino), e `Referrer-Policy` evita di perdere informazioni sui referrer.
Sono ~15 righe in `next.config.ts` e alzano il punteggio su
[securityheaders.com](https://securityheaders.com) da **F** a **A**.

> ⚠️ **Attenzione con la CSP:** `app/layout.tsx:70-82` contiene uno
> `<script dangerouslySetInnerHTML>` inline (l'anti-FOUC del tema). Una CSP stretta
> lo bloccherebbe, rompendo il tema al primo caricamento. Serve un `nonce` o l'hash
> dello script. Non è un problema di sicurezza *oggi* (il contenuto è statico e
> fidato), ma è un vincolo da tenere presente.

---

### S-07 · Nessuna protezione anti-bot sul form — 🟡 P2 · `S`

Il form non ha **honeypot né captcha**. I bot che scansionano form di contatto lo
troveranno e lo useranno per spam.

**Fix a costo minimo:** campo honeypot nascosto (un `<input>` invisibile che gli umani
non compilano mai; se arriva valorizzato → scarta silenziosamente con un 200 finto).
Zero attrito per l'utente, zero dipendenze, ferma la maggior parte dei bot.
Se non basta, Cloudflare Turnstile è gratuito e meno invasivo di reCAPTCHA.

---

### S-08 · Errori interni esposti al client — 🔵 P3 · `S`

**Dove:** `app/api/contact/route.ts:23`

```ts
return NextResponse.json({ error: error.message }, { status: 500 });
```

Il messaggio d'errore grezzo di Resend viene rimandato al browser e **mostrato
all'utente** (`Contact.tsx:121`). Può rivelare dettagli di configurazione interna
(domini, stato della chiave API, quote). Meglio loggare l'errore reale server-side e
restituire un messaggio generico.

---

### S-09 · Dominio mittente sandbox di Resend — 🟠 P1 · `S`

**Dove:** `app/api/contact/route.ts:15`

```ts
from: 'Portfolio Contact <onboarding@resend.dev>',
```

`onboarding@resend.dev` è il **dominio di test condiviso** di Resend. In produzione:
- è fortemente rate-limited e **può inviare solo all'indirizzo dell'account Resend**
- le email finiscono con alta probabilità in **spam**
- il mittente non è il tuo dominio → poco professionale

**Fix:** verificare `nabiltouri.dev` su Resend (record DNS SPF/DKIM) e usare
`contact@nabiltouri.dev`. **Senza questo passaggio il form probabilmente non
consegnerà nulla in produzione**, pur rispondendo `success: true`.

---

## 4. 🧹 Qualità del codice

### Q-01 · ESLint error: `setState` dentro `useEffect` — 🟠 P1 · `S`

**Dove:** `lib/LanguageContext.tsx:27` — regola `react-hooks/set-state-in-effect`

È l'**unico errore ESLint** del progetto (oltre a 1 warning).

```ts
useEffect(() => {
  const initial = saved ?? (prefersDark ? 'dark' : 'light');
  setTheme(initial);                                        // ← errore
  document.documentElement.setAttribute('data-theme', initial);
}, []);
```

Causa render a cascata. In più è **lavoro duplicato**: lo script inline in
`app/layout.tsx:70-82` imposta già `data-theme` sull'`<html>` *prima* dell'idratazione.
Questo effect ripete lo stesso calcolo e forza un secondo render.

**Fix:** inizializzare lo stato leggendo l'attributo `data-theme` già presente nel DOM
(via `useState` con initializer lazy), invece di calcolarlo di nuovo in un effect.

---

### Q-02 · La lingua non viene persistita — 🟠 P1 · `S`

**Dove:** `lib/LanguageContext.tsx:19, 45-47`

Il **tema** viene salvato in `localStorage` (riga 52). La **lingua no**.

Conseguenza: un utente italiano passa a IT, naviga, ricarica la pagina → **torna in
inglese**. Ogni volta. È un attrito evidente e dà l'impressione che il toggle sia rotto.

**Fix:** stessa logica del tema — salvare in `localStorage`, e all'avvio considerare
anche `navigator.language` per un default sensato.

---

### Q-03 · `<html lang>` sempre `"en"` — 🟠 P1 · `S`

**Dove:** `app/layout.tsx:65`

L'attributo `lang="en"` è statico, ma il contenuto cambia lingua a runtime. Con l'IT
attivo, la pagina **dichiara di essere in inglese mentre mostra testo italiano**.

Impatto reale:
- **Screen reader**: pronunciano il testo italiano con fonetica inglese → incomprensibile
- **SEO**: i motori di ricerca classificano male la pagina
- **Traduzione automatica** del browser: si attiva a sproposito

**Fix:** aggiornare `document.documentElement.lang` nel `LanguageProvider` quando la
lingua cambia. La soluzione strutturale è il routing i18n di Next (`/it`, `/en`) — che
risolve anche Q-02 e permette di indicizzare entrambe le versioni (vedi Q-11).

---

### Q-04 · `LanguageContext` gestisce anche il tema — 🟡 P2 · `S`

**Dove:** `lib/LanguageContext.tsx`

Un context chiamato `LanguageContext` espone `theme` e `toggleTheme`. Il nome mente su
cosa fa, e ogni cambio di tema fa ri-renderizzare tutti i consumer della lingua (e viceversa).

**Fix:** separare in `ThemeContext` e `LanguageContext`. Refactor meccanico e a basso rischio.

---

### Q-05 · `<img>` invece di `next/image` — 🟡 P2 · `S`

**Dove:** `components/Hero.tsx:43` — warning ESLint `@next/next/no-img-element`

La foto profilo è **above the fold**, quindi è probabilmente l'elemento **LCP** della
pagina: quello che determina il punteggio Core Web Vitals (che stai già misurando con
`@vercel/speed-insights`). Con `<img>` niente ottimizzazione automatica, niente
`srcset` responsive, niente WebP/AVIF, niente `priority`.

Da fare insieme a [C-02](#c-02--foto-profilo-mancante--immagine-rotta--p1--s).

---

### Q-06 · Configurazioni Framer Motion duplicate ovunque — 🟡 P2 · `M`

Lo stesso identico blocco è ripetuto **oltre 10 volte** in 7 componenti:

```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-100px' }}
transition={{ duration: 0.6 }}
```

`About.tsx:6-11` lo estrae già in una costante `fadeInUp` — ma **solo localmente**,
mentre gli altri 6 componenti lo reincollano inline.

**Fix:** un `lib/animations.ts` condiviso con le varianti (`fadeInUp`, `fadeInLeft`,
`stagger`). Rende anche banale implementare `prefers-reduced-motion` (vedi Q-12): un
solo punto da modificare invece di 10.

---

### Q-07 · Icona GitHub SVG duplicata — 🟡 P2 · `S`

**Dove:** `components/Contact.tsx:153` e `components/ProjectCard.tsx:62`

Lo stesso `path` SVG da ~700 caratteri è copiato in due file. Ogni modifica va fatta
in due punti.

**Fix:** `components/icons/` con `<GitHubIcon />`, `<LinkedInIcon />`, `<MailIcon />`,
`<ExternalLinkIcon />`. Riduce anche il rumore nei componenti, che oggi sono per metà
markup SVG.

---

### Q-08 · Skills hardcoded nel JSX — 🟡 P2 · `S`

**Dove:** `components/About.tsx:62-78`

Le 4 categorie di competenze (~20 tecnologie) sono un array literal **dentro il JSX**,
non in `translations.ts` come tutto il resto del contenuto. Incoerente con
l'architettura dichiarata dal README ("tutto il testo vive in un solo file") e scomodo
da aggiornare.

---

### Q-09 · Il pulsante di invio resta disabilitato per sempre — 🟡 P2 · `S`

**Dove:** `components/Contact.tsx:127`

```tsx
disabled={status === 'loading' || status === 'success'}
```

Dopo un invio riuscito il pulsante **non si riabilita mai**. Per mandare un secondo
messaggio bisogna ricaricare la pagina. È una scelta anti-spam ragionevole, ma
implementata in modo troppo rigido e senza spiegarlo all'utente.

**Fix:** tornare a `idle` dopo qualche secondo, o sostituire il form con un messaggio
di conferma esplicito + link "invia un altro messaggio".

---

### Q-10 · Lettura dei campi form fragile — 🔵 P3 · `S`

**Dove:** `components/Contact.tsx:19-23`

```tsx
name: (form.elements.namedItem('name') as HTMLInputElement).value,
```

Tre cast `as` non verificati: se un `name` cambia, si rompe **a runtime** e TypeScript
non se ne accorge. `new FormData(form)` è più idiomatico e non richiede cast.

---

### Q-11 · Mancano `sitemap.ts`, `robots.ts`, `not-found.tsx`, `error.tsx` — 🟡 P2 · `S`

Nessuno di questi file convenzionali di Next.js esiste:

| File | Cosa manca senza |
|---|---|
| `app/sitemap.ts` | i crawler non hanno una mappa del sito |
| `app/robots.ts` | nessuna direttiva esplicita (nota: `metadata.robots` in layout copre solo la homepage) |
| `app/not-found.tsx` | la 404 è quella di default di Next, fuori dal tuo design |
| `app/error.tsx` | nessun error boundary: un crash client mostra una pagina bianca |

Sono ~10 righe l'uno e sono standard su qualsiasi sito in produzione.

---

### Q-12 · Nessun supporto a `prefers-reduced-motion` — 🟡 P2 · `M`

Il sito è **costruito interamente sulle animazioni**: fade-in su ogni sezione, orb con
blur, scroll indicator con loop infinito (`Hero.tsx:122`), `scroll-behavior: smooth`
globale (`globals.css:90`).

**Nulla di tutto questo rispetta `prefers-reduced-motion`.** Per utenti con disturbi
vestibolari o sensibilità al movimento, il sito può causare nausea o mal di testa —
e non hanno alcun modo di disattivarlo. È un requisito
[WCAG 2.1 · 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html).

**Fix:** hook `useReducedMotion()` di Framer Motion (già incluso, zero dipendenze
aggiuntive) + una media query per lo scroll smooth. Molto più semplice se prima si fa Q-06.

---

### Q-13 · Dipendenze non aggiornate — 🔵 P3 · `S`

| Pacchetto | Attuale | Ultima |
|---|---|---|
| `next` | 16.2.0 | 16.3.0 (risolve S-05) |
| `framer-motion` | 12.38.0 | 12.43.0 |
| `resend` | 6.12.3 | 6.18.1 |
| `tailwindcss` | 4.2.2 | 4.3.3 |
| `react` / `react-dom` | 19.2.4 | 19.2.8 |

Nessuna è una major: aggiornamento a basso rischio, e quello di Next chiude 6
vulnerabilità high.

---

### Q-14 · `key={index}` nelle liste — 🔵 P3 · `S`

**Dove:** `components/Education.tsx:29` e `:73`

Usare l'indice come `key` è sconsigliato quando la lista può riordinarsi. Qui le liste
sono statiche e brevi, quindi l'impatto pratico è nullo — ma `cert.name` e `item.title`
sono già identificatori univoci disponibili. Correzione da 10 secondi.

---

## 5. ✨ UX & Wow Factor

> Cosa distingue "un altro portfolio Next.js" da uno che il recruiter si ricorda.
> Tutte voci **P3**: nessuna è necessaria, tutte sono differenzianti.

### W-01 · Prova reale al posto delle descrizioni — 🔵 P3 · `M`

Il punto più debole del sito non è tecnico: **la sezione progetti non dimostra niente**.
Tre card con link `#` valgono meno di zero — segnalano attivamente che non c'è
sostanza dietro.

Il tuo profilo ha una storia forte e concreta (dalle cucine agli script Python per
anomaly detection, VPS Linux autogestiti, agenti AI). La bio la racconta bene, ma poi
**non c'è nulla che la sostanzi**.

Idee in ordine di impatto:
- **Una demo interattiva embeddata.** Un mini anomaly-detector che gira nel browser su
  dati d'esempio: l'utente muove uno slider di sensibilità e vede gli spike evidenziarsi.
  Dimostra la competenza invece di dichiararla.
- **Case study invece di card.** Una pagina per progetto: problema → approccio → risultato,
  con numeri veri ("ridotto il controllo manuale da 3h a 10min/settimana").
  Un case study fatto bene batte cinque card vuote.
- **Metriche live da GitHub** (commit, lingue, streak) via API a build time.

---

### W-02 · First-time user experience — 🔵 P3 · `M`

Oggi il sito è una **pagina unica statica**: scorri e leggi. Nessuna progressione,
nessun momento memorabile, nessun motivo per restare oltre i 20 secondi.

Idee, dalla più semplice alla più ambiziosa:

| Idea | Effort | Perché funziona |
|---|---|---|
| **Rilevamento lingua automatico** da `navigator.language` | S | Un utente italiano non dovrebbe dover cercare il toggle |
| **Effetto typing** sul titolo hero che alterna i ruoli | S | Micro-dettaglio, alto ritorno percepito |
| **Comandi da tastiera** (`⌘K` per la palette, `T` per il tema) | M | Per un profilo dev, parla direttamente al tuo pubblico |
| **Terminal mode**: un easy-egg che trasforma il sito in una CLI navigabile (`whoami`, `ls projects`, `cat cv.pdf`) | L | **Questo è il vero differenziante.** Nessuno se lo dimentica, ed è esattamente in tema col tuo profilo |
| **Barra di progresso di lettura** + nav che evidenzia la sezione attiva | S | Orientamento, senso di avanzamento |

**Raccomandazione:** il *terminal mode* è l'idea con il miglior rapporto memorabilità/rischio
del sito. Va però costruito come **strato opzionale sopra** il sito normale, mai come
esperienza obbligatoria: un recruiter non tecnico deve poter ignorare tutto e leggere il CV.

---

### W-03 · Il sito stesso come progetto — 🔵 P3 · `S`

Stai costruendo un portfolio con Next.js 16, Tailwind v4, Framer Motion, deploy su
Vercel, API route con Resend — e **non lo racconti da nessuna parte**. Il footer dice
solo "Built with Next.js & Framer Motion".

Una sezione "Come ho costruito questo sito" (scelte tecniche, trade-off, numeri di
Lighthouse) trasforma il contenitore in un contenuto. Costa poco e riempie in modo
onesto il vuoto lasciato da B-02 finché non ci sono progetti veri da mostrare.

---

### W-04 · Stato vuoto dei progetti più utile — 🔵 P3 · `S`

**Dove:** `components/Projects.tsx:26-48`

Attualmente lo stato vuoto dice *"No projects yet. Check back soon!"* — che comunica
solo assenza. Se i progetti veri non sono pronti a breve, meglio riempirlo con qualcosa
di utile: link ai repo GitHub, "in arrivo: X, Y", o una CTA verso il contatto.

Da rivedere in ogni caso quando si chiude B-02.

---

### W-05 · Feedback del form più curato — 🔵 P3 · `S`

Oggi: una riga di testo verde/rossa sopra il pulsante. Su un form che è l'**unica
azione di conversione del sito**, vale un momento più curato — una transizione,
un'icona di conferma, uno stato che comunichi davvero "è arrivato".

Legato a Q-09 (che va comunque sistemato).

---

### W-06 · Contrasto colori da verificare — 🔵 P3 · `S`

**Dove:** `app/globals.css`

Alcune combinazioni sono da verificare con un contrast checker:
- `--muted: #888899` su `--background: #07070d` (tema scuro) — usato per **tutto il
  testo dei paragrafi**
- varianti a opacità ridotta usate spesso: `text-muted/60`, `text-muted/50`, `text-accent/80`

`text-muted/50` su sfondo scuro è quasi certamente **sotto la soglia WCAG AA (4.5:1)**.
Riguarda il corpo del testo, cioè la maggior parte dei contenuti del sito.

---

### W-07 · Accessibilità del menu mobile — 🔵 P3 · `S`

**Dove:** `components/Header.tsx:76-94`

Il pulsante hamburger ha `aria-expanded` ✅ ma manca `aria-controls` che punti all'id
del menu, e non c'è **focus trap** né chiusura con `Esc`. Con il menu aperto, il focus
da tastiera continua a girare nel contenuto sottostante.

---

## 6. 🛠️ Infrastruttura & DX

### I-01 · Nessuna CI — 🟡 P2 · `S`

Non esiste `.github/workflows/`. Nessun controllo automatico su lint, typecheck o
build prima del merge.

Il problema è **concreto, non teorico**: una CI che esegue `npm run build` sulla PR
intercetterebbe regressioni prima del merge. Nota che oggi, per via di B-01, quella CI
avrebbe bisogno di `RESEND_API_KEY` fra i secret di GitHub solo per riuscire a
compilare — motivo in più per applicare il lazy init.

Un workflow minimo (`npx tsc --noEmit` + `npx eslint .` + `npm run build`) sono ~20 righe.

---

### I-02 · Nessun test — 🔵 P3 · `L`

Zero test nel progetto. Per un portfolio statico è una scelta difendibile — ma la
**route API** ha logica reale (validazione, gestione errori, e presto rate limiting)
e merita almeno una manciata di test.

Da valutare **dopo** aver chiuso i punti di sicurezza, così i test coprono il
comportamento corretto e non quello attuale.

---

### I-03 · Deploy Vercel: checklist pre-produzione — 🟠 P1 · `S`

Prima del prossimo merge su `main`, verificare su Vercel:

- [ ] `RESEND_API_KEY` selezionata anche per l'ambiente **Preview**, non solo Production → altrimenti il build della PR fallisce (B-01)
- [ ] Dominio verificato su Resend con SPF/DKIM (S-09)
- [ ] `NEXT_PUBLIC_EMAIL` / `GITHUB` / `LINKEDIN` impostate o fallback confermati corretti
- [ ] Dominio custom `nabiltouri.dev` collegato (è già hardcoded nei metadata OG)
- [ ] Test end-to-end del form su un deploy Preview **prima** del merge su `main`

> Il deploy su Vercel è automatico al merge su `main`, quindi un problema di
> configurazione va in produzione senza passaggi intermedi. **Testare sempre sul
> Preview della PR**, che usa lo stesso build ma non il dominio di produzione.

---

## 📊 Riepilogo

| Priorità | Voci | Prime cose da fare |
|---|---|---|
| 🔴 **P0** | 2 | B-02 (progetti EN/IT) · S-01 (rate limiting) |
| 🟠 **P1** | 13 | Sicurezza form, contenuti mancanti, SEO/social |
| 🟡 **P2** | 13 | Refactor, accessibilità, CI, lazy init Resend |
| 🔵 **P3** | 12 | Wow factor, rifiniture |

### Percorso consigliato

**1️⃣ Sprint "non deve rompersi"** — *~2h*
`I-03` → `S-01` → `S-02` → `S-09`
Rende il form non abusabile e verifica che le email vengano davvero consegnate.
**Prima di qualsiasi altra cosa.**

**2️⃣ Sprint "deve essere presentabile"** — *~3h*
`B-02` → `C-05` → `C-04` → `C-02` → `Q-02` → `Q-03`
Contenuti coerenti, anteprime social funzionanti, niente 404, lingua che non si resetta.

**3️⃣ Sprint "deve essere solido"** — *~4h*
`S-05` → `Q-01` → `B-01` → `Q-11` → `Q-12` → `I-01` → `C-06` → `C-07`
Vulnerabilità chiuse, lint pulito, accessibilità, CI, documentazione.

**4️⃣ Sprint "deve essere memorabile"** — *aperto*
`W-01` → `W-02` → `W-03`
Solo dopo che le fondamenta reggono.
