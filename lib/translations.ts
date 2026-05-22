export const translations = {
  en: {
    // Header
    nav: {
      about: 'About',
      experience: 'Experience',
      education: 'Education',
      projects: 'Projects',
      contact: 'Contact',
    },

    // Hero
    hero: {
      greeting: "Hey, I'm",
      name: 'Nabil Touri',
      title: 'Data Analyst & Full-Stack Developer',
      tagline:
        'I turn messy data into clear decisions and rough ideas into working products. Based in Italy (Brescia), open to the world.',
      cta1: 'View Projects',
      cta2: 'Download CV',
    },

    // About
    about: {
      sectionTitle: 'About Me',
      bio: "I got into programming the hard way — no CS degree, no bootcamp, just curiosity and a laptop. I went from working in kitchens to writing Python scripts that catch energy anomalies for a living. Right now I split my time between a part-time gig as a Data Analyst at an energy consulting firm and my second year of Computer Engineering. When I'm not at work or in class, I'm usually building something — AI agents, trading bots, web apps — all deployed on Linux VPS that I manage end-to-end.",
      currentlyTitle: 'Currently',
      currently:
        'Deep into autonomous AI agents and ML pipelines. Looking for my next challenge in tech, preferably somewhere in Europe.',
    },

    // Experience
    experience: {
      sectionTitle: 'Experience',
      mainJob: {
        role: 'Programmer & Data Analyst',
        company: 'Risolve.Net S.R.L.',
        period: '04/2025 — Present',
        type: 'Part-time · 24h/week',
        description:
          'My role combines data science with process automation: building ML-based pipelines for anomaly detection and clustering on energy time series, auditing data quality, and developing Python scripts/bots to eliminate repetitive manual tasks. I also build advanced Streamlit interfaces to bring all these complex insights to life.',
        stack: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit', 'SQL', 'Excel'],
      },
      otherTitle: 'Before tech',
      otherDescription:
        'Promoter at Fastweb, steward at Serie A matches. Different worlds, same hustle — every role taught me how to deal with people, pressure, and chaos.',
    },

    // Education
    education: {
      sectionTitle: 'Education & Certifications',
      items: [
        {
          title: 'Computer Engineering',
          institution: 'Università degli Studi di Brescia (UniBs)',
          period: '2024 — Present',
          type: 'ongoing',
          description: "2nd year — Bachelor's degree in Computer Engineering.",
        },
        {
          title: 'IT Technical Diploma',
          institution: 'ITIS Benedetto Castelli, Brescia',
          period: '2019 — 2024',
          type: 'completed',
          description: 'Perito Informatico — 5-year technical diploma in Computer Science.',
        },
      ],
      certificationsTitle: 'Certifications',
      certifications: [
        {
          name: 'Diploma di Perito Informatico',
          issuer: 'ITIS Benedetto Castelli',
          year: '2024',
        },
        // TODO: Add more certifications here as you earn them
      ],
    },

    // Projects
    projects: {
      sectionTitle: 'Projects',
      noProjects: 'No projects yet. Check back soon!',
      cards: [
        // {
        //   title: 'Energy Anomaly Detector',
        //   description:
        //     'Spots unusual spikes and patterns in energy consumption time series. Built for real-world use at my current job.',
        //   badges: ['Python', 'ML', 'Streamlit'],
        //   github: '#', // TODO: Replace with real GitHub URL
        //   demo: '#', // TODO: Replace with real demo URL
        // },
        // {
        //   title: 'Dashboard App',
        //   description:
        //     'Full-stack web app for interactive data visualization. Clean UI, real-time updates, built to be used daily.',
        //   badges: ['React', 'Svelte', 'TypeScript'],
        //   github: '#', // TODO: Replace with real GitHub URL
        //   demo: '#', // TODO: Replace with real demo URL
        // },
        // {
        //   title: 'AI Trading Agent',
        //   description:
        //     'Autonomous trading bot that uses LLMs for market analysis. Runs 24/7 on a Linux VPS inside Docker containers.',
        //   badges: ['Python', 'LLM', 'Docker', 'Linux'],
        //   github: '#', // TODO: Replace with real GitHub URL
        //   demo: null,
        // },
      ] as Array<{
        title: string;
        description: string;
        badges: string[];
        github: string;
        demo: string | null;
      }>,
    },

    // Contact
    contact: {
      sectionTitle: "Get in Touch",
      description:
        "Got an interesting project, a job opening, or just want to talk tech? I'd love to hear from you.",
      form: {
        name: 'Your Name',
        email: 'Your Email',
        message: 'Your Message',
        send: 'Send Message',
        sending: 'Sending...',
        successMessage: "Message sent! I'll get back to you soon.",
      },
      closing: "Let's build something worth shipping.",
    },

    // Footer
    footer: {
      rights: 'All rights reserved.',
      built: 'Built with Next.js & Framer Motion',
    },
  },

  it: {
    // Header
    nav: {
      about: 'Chi Sono',
      experience: 'Esperienza',
      education: 'Formazione',
      projects: 'Progetti',
      contact: 'Contatti',
    },

    // Hero
    hero: {
      greeting: 'Ciao, sono',
      name: 'Nabil Touri',
      title: 'Data Analyst & Full-Stack Developer',
      tagline:
        'Trasformo dati confusi in decisioni chiare e idee grezze in prodotti funzionanti. Basato in Italia (Brescia), aperto al mondo.',
      cta1: 'Vedi Progetti',
      cta2: 'Scarica CV',
    },

    // About
    about: {
      sectionTitle: 'Chi Sono',
      bio: "Ho imparato a programmare nel modo più scomodo — niente laurea in informatica, niente bootcamp, solo curiosità e un portatile. Sono passato dal lavorare in cucina a scrivere script Python che individuano anomalie energetiche di mestiere. Adesso divido il tempo tra un lavoro part-time come Data Analyst in un'azienda di consulenza energetica e il secondo anno di Ingegneria Informatica. Quando non sono al lavoro o a lezione, sto costruendo qualcosa — agenti AI, trading bot e web app — il tutto deployato su VPS Linux che gestisco in autonomia.",
      currentlyTitle: 'Attualmente',
      currently:
        'Concentrato su agenti AI autonomi e pipeline ML. Cerco la prossima sfida nel tech, possibilmente in Europa.',
    },

    // Experience
    experience: {
      sectionTitle: 'Esperienza',
      mainJob: {
        role: 'Programmer & Data Analyst',
        company: 'Risolve.Net S.R.L.',
        period: '04/2025 — Presente',
        type: 'Part-time · 24h/settimana',
        description:
          "Il mio ruolo unisce data science e automazione: sviluppo pipeline di Machine Learning per anomaly detection e clustering su serie temporali energetiche, monitoro proattivamente la data quality e progetto bot/script Python per automatizzare task operativi ripetitivi. Utilizzo inoltre Streamlit a livello avanzato per dare vita a queste analisi e renderle accessibili al team.",
        stack: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit', 'SQL', 'Excel'],
      },
      otherTitle: 'Prima del tech',
      otherDescription:
        'Promoter per Fastweb, steward alle partite di Serie A. Mondi diversi, stessa grinta — ogni ruolo mi ha insegnato a gestire persone, pressione e caos.',
    },

    // Education
    education: {
      sectionTitle: 'Formazione & Certificazioni',
      items: [
        {
          title: 'Ingegneria Informatica',
          institution: 'Università degli Studi di Brescia (UniBs)',
          period: '2024 — Presente',
          type: 'ongoing',
          description: '2° anno — Laurea triennale in Ingegneria Informatica.',
        },
        {
          title: 'Diploma Tecnico Informatico',
          institution: 'ITIS Benedetto Castelli, Brescia',
          period: '2019 — 2024',
          type: 'completed',
          description: 'Perito Informatico — diploma quinquennale ad indirizzo informatico.',
        },
      ],
      certificationsTitle: 'Certificazioni',
      certifications: [
        {
          name: 'Diploma di Perito Informatico',
          issuer: 'ITIS Benedetto Castelli',
          year: '2024',
        },
        // TODO: Aggiungi altre certificazioni qui
      ],
    },

    // Projects
    projects: {
      sectionTitle: 'Progetti',
      noProjects: 'Nessun progetto ancora. Torna presto!',
      cards: [
        {
          title: 'Energy Anomaly Detector',
          description:
            'Individua picchi e pattern anomali nelle serie temporali di consumo energetico. Costruito per uso reale nel mio lavoro attuale.',
          badges: ['Python', 'ML', 'Streamlit'],
          github: '#', // TODO: Sostituisci con URL GitHub reale
          demo: '#', // TODO: Sostituisci con URL demo reale
        },
        {
          title: 'Dashboard App',
          description:
            "Web app full-stack per visualizzazione dati interattiva. UI pulita, aggiornamenti in tempo reale, fatta per essere usata ogni giorno.",
          badges: ['React', 'Svelte', 'TypeScript'],
          github: '#', // TODO: Sostituisci con URL GitHub reale
          demo: '#', // TODO: Sostituisci con URL demo reale
        },
        {
          title: 'AI Trading Agent',
          description:
            'Trading bot autonomo che usa LLM per analisi di mercato. Gira 24/7 su un VPS Linux dentro container Docker.',
          badges: ['Python', 'LLM', 'Docker', 'Linux'],
          github: '#', // TODO: Sostituisci con URL GitHub reale
          demo: null,
        },
      ],
    },

    // Contact
    contact: {
      sectionTitle: 'Contattami',
      description:
        "Hai un progetto interessante, un'offerta di lavoro, o vuoi semplicemente parlare di tech? Mi farebbe piacere sentirti.",
      form: {
        name: 'Il tuo Nome',
        email: 'La tua Email',
        message: 'Il tuo Messaggio',
        send: 'Invia Messaggio',
        sending: 'Invio in corso...',
        successMessage: 'Messaggio inviato! Ti rispondo presto.',
      },
      closing: 'Costruiamo qualcosa che valga la pena spedire.',
    },

    // Footer
    footer: {
      rights: 'Tutti i diritti riservati.',
      built: 'Costruito con Next.js & Framer Motion',
    },
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = typeof translations['en'];
