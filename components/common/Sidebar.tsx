'use client';

import { Users, Home, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Sidebar({ onLogout }: { onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
        <h2 className="font-bold text-orange-600">STUDYFI</h2>
        <button onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* Overlay (Mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-screen w-64 bg-white border-r border-orange-200
        transform ${open ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition-transform duration-300`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold text-orange-600">
              StudyFi Admin
            </h1>
            <button className="md:hidden" onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 space-y-2">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 text-gray-700"
            >
              <Users /> Dashboard
            </button>

            <button
              onClick={() => router.push('/')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 text-gray-700"
            >
              <Home /> Home
            </button>
          </nav>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
          >
            <LogOut /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
