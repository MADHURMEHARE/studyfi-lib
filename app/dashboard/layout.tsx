import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Manage students, track seat availability, and send fee reminders from the admin dashboard.',
  robots: {
    index: false, // Admin dashboard should not be indexed
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

