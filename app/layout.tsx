import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'StudyFi Library - Amravati\'s Best Study Library',
    template: '%s | StudyFi Library'
  },
  description: 'Comprehensive library seat management and student tracking system with real-time availability, email reminders, and admin dashboard.',
  keywords: [
    'student management',
    'library management',
    'seat booking',
    'education technology',
    'campus management',
    'student tracking',
    'fee management',
    'library seats',
    'student database',
    'campus administration'
  ],
  authors: [{ name: 'Study-Fi' }],
  creator: 'Student Management System',
  publisher: 'Student Management System',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://study-fi-library.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://student-management.vercel.app',
    title: 'StudyFi Library - Amravati\'s Best Study Library',
    description: 'Manage library seats, track student records, and send automated reminders with our comprehensive student management system.',
    siteName: 'StudyFi Library',
    images: [
      {
        url: '/study-fi-logo.svg',
        width: 1200,
        height: 630,
        alt: 'Study-Fi Library ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudyFi Library - Amravati\'s Best Study Library',
    description: 'Manage library seats, track student records, and send automated reminders.',
    images: ['/og-image.png'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/study-fi-logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/study-fi-logo.svg" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
