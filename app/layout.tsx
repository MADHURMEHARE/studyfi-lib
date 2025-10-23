import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/lib/auth-context";
import Navigation from "@/components/shared/Navigation";
import FooterSection from "@/components/homepage/FooterSection";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: {
    default: "StudyFi Library - Amravati's Best Study Library",
    template: "%s | StudyFi Library",
  },
  description:
    "Amravati's most trusted study library with real-time seat management, student tracking, and performance analytics. Study smart with StudyFi.",
  keywords: [
    "study library Amravati",
    "library seat booking",
    "student management system",
    "education technology",
    "StudyFi Library",
    "Amravati study center",
  ],
  authors: [{ name: "Study-Fi" }],
  creator: "Study-Fi Library Team",
  publisher: "Study-Fi",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL("https://studyfi-lib.vercel.app/"),
  alternates: { canonical: "https://studyfi-lib.vercel.app/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://studyfi-lib.vercel.app",
    title: "StudyFi Library - Amravati's Best Study Library",
    description:
      "Discover StudyFi Library — where students learn from real success stories through vlogs and blogs. Book your library seat, track your learning journey, and see how StudyFi supports every step of your exam preparation.",
    siteName: "StudyFi Library",
    images: [
      {
        url: "/study-fi-logo.svg",
        width: 1200,
        height: 630,
        alt: "StudyFi Library Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyFi Library - Amravati's Best Study Library",
    description:
      "Smart library management and student tracking platform designed for Amravati.",
    images: ["/study-fi-logo.svg"],
  },
  robots: { index: true, follow: true },
  verification: {
    google: "paste-your-google-site-verification-code-here",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/study-fi-logo.svg" />
        <meta name="theme-color" content="#ffffff" />

        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GCXJX0NMKZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GCXJX0NMKZ', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          {children}
          <FooterSection />
          {/* <Toaster position="top-right" /> */}
        </AuthProvider>
      </body>
    </html>
  );
}
