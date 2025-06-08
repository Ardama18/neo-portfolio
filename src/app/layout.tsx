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
    default: "Alex Chen - Full-Stack Engineer & AI Enthusiast",
    template: "%s | Alex Chen - Portfolio"
  },
  description: "Passionate full-stack engineer with expertise in building cutting-edge web applications and AI-powered solutions. Explore my portfolio showcasing innovative projects in React, Next.js, Python, and machine learning.",
  keywords: [
    "Full-Stack Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "Python",
    "AI Developer",
    "Machine Learning",
    "Web Development",
    "Portfolio",
    "Software Engineer",
    "San Francisco Developer"
  ],
  authors: [{ name: "Alex Chen", url: "https://alexchen.dev" }],
  creator: "Alex Chen",
  publisher: "Alex Chen",
  metadataBase: new URL('https://alexchen.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alexchen.dev',
    siteName: 'Alex Chen Portfolio',
    title: 'Alex Chen - Full-Stack Engineer & AI Enthusiast',
    description: 'Passionate full-stack engineer specializing in innovative web applications and AI-powered solutions. View my latest projects and get in touch.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alex Chen - Full-Stack Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Chen - Full-Stack Engineer & AI Enthusiast',
    description: 'Passionate full-stack engineer specializing in innovative web applications and AI-powered solutions.',
    images: ['/og-image.jpg'],
    creator: '@alexchen_dev',
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
  verification: {
    google: 'your-google-verification-code',
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
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
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
              "name": "Alex Chen",
              "jobTitle": "Full-Stack Engineer",
              "description": "Passionate full-stack engineer with expertise in building cutting-edge web applications and AI-powered solutions.",
              "url": "https://alexchen.dev",
              "sameAs": [
                "https://github.com/alexchen",
                "https://linkedin.com/in/alexchen",
                "https://twitter.com/alexchen_dev"
              ],
              "knowsAbout": [
                "React",
                "Next.js",
                "TypeScript",
                "Python",
                "Node.js",
                "Machine Learning",
                "Artificial Intelligence",
                "Web Development"
              ],
              "alumniOf": "University of Technology",
              "workLocation": {
                "@type": "Place",
                "name": "San Francisco, CA"
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
