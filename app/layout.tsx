import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import FirebaseAnalytics from "@/components/FirebaseAnalytics";

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
  metadataBase: new URL("https://anandpatel.dev"), // Replace with actual domain
  title: {
    default: "Anand Patel | Mobile & Web Developer",
    template: "%s | Anand Patel",
  },
  description:
    "Portfolio of Anand Patel, a passionate mobile and web developer specializing in React, Next.js, and Flutter. View my projects and get in touch.",
  keywords: [
    "Anand Patel",
    "Mobile Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Flutter",
    "Portfolio",
    "Frontend Engineer",
  ],
  authors: [{ name: "Anand Patel" }],
  creator: "Anand Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anandpatel.dev",
    title: "Anand Patel | Mobile & Web Developer",
    description:
      "Portfolio of Anand Patel, a passionate mobile and web developer specializing in React, Next.js, and Flutter.",
    siteName: "Anand Patel Portfolio",
    images: [
      {
        url: "/images/og-image.jpg", // Ensure this image exists
        width: 1200,
        height: 630,
        alt: "Anand Patel Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anand Patel | Mobile & Web Developer",
    description:
      "Portfolio of Anand Patel, a passionate mobile and web developer specializing in React, Next.js, and Flutter.",
    images: ["/images/og-image.jpg"],
    creator: "@anandpatel", // Replace with actual handle
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anand Patel",
  url: "https://anandpatel.dev",
  jobTitle: "Mobile & Web Developer",
  sameAs: [
    "https://github.com/anandpatel",
    "https://linkedin.com/in/anandpatel",
    "https://twitter.com/anandpatel",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
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
