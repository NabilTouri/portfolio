import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { LanguageProvider } from "@/lib/LanguageContext";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nabil Touri — Data Analyst & Full-Stack Developer",
  description:
    "Portfolio of Nabil Touri — Data Analyst and Full-Stack Developer based in Brescia, Italy. Specializing in anomaly detection, ML pipelines, and modern web apps.",
  keywords: [
    "Nabil Touri",
    "Data Analyst",
    "Full-Stack Developer",
    "Python",
    "Machine Learning",
    "Brescia",
    "Portfolio",
  ],
  authors: [{ name: "Nabil Touri" }],
  creator: "Nabil Touri",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nabiltouri.dev",
    title: "Nabil Touri — Data Analyst & Full-Stack Developer",
    description:
      "Portfolio of Nabil Touri — Data Analyst and Full-Stack Developer based in Brescia, Italy.",
    siteName: "Nabil Touri",
    // TODO: Uncomment after adding og-image.png (1200x630) to /public/images/
    // images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nabil Touri — Data Analyst & Full-Stack Developer",
    description:
      "Portfolio of Nabil Touri — Data Analyst and Full-Stack Developer based in Brescia, Italy.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem('theme');
                if (!theme) {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
