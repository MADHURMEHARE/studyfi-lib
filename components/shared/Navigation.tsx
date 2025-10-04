'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navigation() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  // Navigation links array
  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'features', label: 'Features' },
    { id: 'membership', label: 'Pricing' },
    { id: 'blog', label: 'Blog' },
    { id: 'timing', label: 'Timing', route: '/timing' }, // New Timing page route
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavigation = (link: { id: string; route?: string }) => {
    if (link.route) {
      // Navigate to external page (Timing)
      router.push(link.route);
    } else {
      // Scroll to section
      const element = document.getElementById(link.id);
      if (element) {
        const elementTop = element.offsetTop;
        const targetScrollY = elementTop - 80;
        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth',
        });
      }
    }
    setIsMenuOpen(false);
  };

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (let link of navLinks) {
        if (link.route) continue; // Skip scroll spy for pages
        const element = document.getElementById(link.id);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollY + 100 >= top && scrollY + 100 < bottom) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initialize active section
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-200">
        <div className="flex justify-between items-center h-20 px-4 md:px-10 lg:px-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl blur-sm opacity-30"></div>
              <div className="relative bg-white/90 rounded-xl">
                <Image
                  src="/study-fi-logo.svg"
                  alt="Study-Fi Logo"
                  width={120}
                  height={48}
                  className="h-12 w-auto"
                />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigation(link)}
                className={`relative text-gray-700 font-medium transition-colors ${
                  activeSection === link.id ? 'text-orange-600 font-semibold' : 'hover:text-orange-600'
                }`}
              >
                {link.label}
                {!link.route && (
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 w-full bg-orange-600 transition-all ${
                      activeSection === link.id ? 'scale-x-100' : 'scale-x-0'
                    } origin-left`}
                  ></span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-orange-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavigation(link)}
                  className={`block w-full text-left text-gray-700 font-medium transition-colors py-2 ${
                    activeSection === link.id ? 'text-orange-600 font-semibold' : 'hover:text-orange-600'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
