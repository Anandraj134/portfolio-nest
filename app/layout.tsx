import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anandpatel.dev"), 
  title: {
    default: "Anand Patel | Mobile & Full-Stack Engineer",
    template: "%s | Anand Patel",
  },
  description:
    "Architecting production-grade cross-platform apps using Flutter and React Native. Specialist in AI integration, secure cloud architectures, and 99.9% crash-free systems.",
  keywords: [
    "Anand Patel",
    "Mobile Engineer",
    "Full-Stack Developer",
    "Flutter Expert",
    "React Native",
    "Expo",
    "AI Integration",
    "Node.js",
    "System Architecture",
    "Promact Infotech",
    "B2B SaaS"
  ],
  authors: [{ name: "Anand Patel", url: "https://anandpatel.dev" }],
  creator: "Anand Patel",
  openGraph: {
    type: "profile", // "profile" is more specific for personal portfolios than "website"
    locale: "en_US",
    url: "https://anandpatel.dev",
    title: "Anand Patel | Mobile & Full-Stack Engineer",
    description:
      "Architecting production-grade cross-platform apps using Flutter and React Native. Specialist in AI integration and secure cloud architectures.",
    siteName: "Anand Patel Portfolio",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Anand Patel - Mobile & Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anand Patel | Mobile & Full-Stack Engineer",
    description:
      "Architecting production-grade cross-platform apps using Flutter and React Native. Specialist in AI integration.",
    images: ["/images/og-image.jpg"],
    creator: "@anandpatel", 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Anand Patel",
  "url": "https://anandpatel.dev",
  "jobTitle": "Mobile & Full-Stack Engineer",
  "description": "Mobile & Full-Stack Engineer architecting scalable AI-powered platforms and B2B SaaS solutions with 99.9% reliability.",
  "image": "https://anandpatel.dev/images/avatar.jpg", // Ensure you have an avatar image
  "sameAs": [
    "https://github.com/anandpatel",
    "https://linkedin.com/in/anandpatel",
    "https://twitter.com/anandpatel"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Promact Infotech Pvt. Ltd.",
    "url": "https://www.promactinfo.com"
  },
  "knowsAbout": [
    "Flutter",
    "React Native",
    "Expo",
    "Node.js",
    "Firebase",
    "System Architecture",
    "AI Integration",
    "Mobile Application Development"
  ],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Gujarat Technological University" // Inferred from typical Promact/Ahmedabad region profiles; verify if accurate
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-bg-dark text-text-light transition-colors duration-300`}
      >
        <a
          href="#main-content"
          className="fixed top-4 left-4 z-[10000] -translate-y-[200%] focus:translate-y-0 bg-secondary text-bg-dark px-4 py-2 rounded-md font-bold transition-transform duration-300"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <ClientWrapper>
            <Navbar />
            {children}
            <Footer />
            <SpeedInsights />
            <FirebaseAnalytics />
          </ClientWrapper>
        </SmoothScroll>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
