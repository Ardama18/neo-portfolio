import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WebVitals from "@/components/ui/WebVitals";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Naoki Kodama - AI推進 / Full-Stack Engineer",
    template: "%s | Naoki Kodama"
  },
  description: "Naoki Kodamaのポートフォリオ。AI駆動開発の全社展開、新規SaaS開発、決済バックエンド、組込み制御、組織マネジメントの経験を紹介します。",
  keywords: [
    "Naoki Kodama",
    "児玉直樹",
    "AI駆動開発",
    "Full-Stack Engineer",
    "Next.js",
    "TypeScript",
    "NestJS",
    "C#",
    ".NET",
    "C++",
    "Python",
    "Dify",
    "Software Engineer"
  ],
  authors: [{ name: "Naoki Kodama", url: "https://ardama18.github.io/neo-portfolio" }],
  creator: "Naoki Kodama",
  publisher: "Naoki Kodama",
  metadataBase: new URL('https://ardama18.github.io/neo-portfolio'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://ardama18.github.io/neo-portfolio',
    siteName: 'Naoki Kodama Portfolio',
    title: 'Naoki Kodama - AI推進 / Full-Stack Engineer',
    description: 'AI駆動開発、新規SaaS開発、決済バックエンド、組込み制御、組織マネジメントの経験をまとめたポートフォリオです。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Naoki Kodama Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naoki Kodama - AI推進 / Full-Stack Engineer',
    description: 'AI駆動開発、新規SaaS開発、決済バックエンド、組込み制御の経験をまとめたポートフォリオです。',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#000000' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/neo-portfolio/favicon.ico" sizes="any" />
        <link rel="manifest" href="/neo-portfolio/manifest.json" />
        
        {/* Performance and security headers */}
        <meta httpEquiv="X-DNS-Prefetch-Control" content="on" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="origin-when-cross-origin" />
        
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Naoki Kodama",
              "alternateName": "Ardama18",
              "jobTitle": "AI推進 / Full-Stack Engineer",
              "description": "AI駆動開発、新規SaaS開発、決済バックエンド、組込み制御、組織マネジメントを経験するソフトウェアエンジニア。",
              "url": "https://ardama18.github.io/neo-portfolio",
              "sameAs": [
                "https://github.com/Ardama18"
              ],
              "knowsAbout": [
                "AI駆動開発",
                "TypeScript",
                "Next.js",
                "NestJS",
                "C#",
                ".NET",
                "C++",
                "Python",
                "AWS",
                "Dify"
              ],
              "workLocation": {
                "@type": "Place",
                "name": "Japan"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <WebVitals />
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
