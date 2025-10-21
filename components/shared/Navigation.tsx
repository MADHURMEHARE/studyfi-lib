'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { Searchbar } from '../search/Searchbar';

export default function SimpleNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  type NavLink = { id: string; label: string; route: string };
  
  // All links are now treated as page routes for simplicity
  const navLinks: NavLink[] = useMemo(
    () => [
      // For a simple router, assume the root page '/' is the collection of all sections
      { id: 'home', label: 'Home', route: '/' },
      { id: 'blog', label: 'Student', route: '/blog' },
      { id: 'timing', label: 'Timing', route: '/timing' },
      // { id: 'contact', label: 'Contact', route: '/contact' }, 
      // { id: 'auth', label: 'auth', route: '/auth' },
      
    ],
    []
  );

  const handleNavigation = (link: NavLink) => {
    // Simply navigate to the route
    router.push(link.route);
    setIsMenuOpen(false);
  };
  
  // Function to determine if a link is active based on the current pathname
  const isActive = (route: string) => {
      // Handles the root path
      if (route === '/') {
          return pathname === '/';
      }
      // Handles all other pages (e.g., /blog, /timing, /blog/post-1)
      return pathname.startsWith(route);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-200">
        <div className="flex justify-between items-center h-20 px-4 md:px-10 lg:px-20">
          {/* Logo - Navigates to home */}
      {/* <Searchbar/> */}

          
            <div className="relative">
              {/* <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl blur-sm opacity-30"></div> */}
              <div className="relative bg-white/90 rounded-xl">
                <Image
                  src="/study-fi-logo.svg"
                  alt="Study-Fi Logo"
                  width={120}
                  height={48}
                  className="h-12 w-auto"
                />
              </div>
      {/* <Searchbar/> */}

            </div>
        
      {/* <Searchbar/> */}

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigation(link)}
                className={`relative text-gray-700 font-medium transition-colors ${
                  isActive(link.route) ? 'text-orange-600 font-semibold' : 'hover:text-orange-600'
                }`}
              >
                {link.label}
                {/* Underline for active state */}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 w-full bg-orange-600 transition-all ${
                    isActive(link.route) ? 'scale-x-100' : 'scale-x-0'
                  } origin-left`}
                ></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-orange-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-orange-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavigation(link)}
                  className={`block w-full text-left text-gray-700 font-medium transition-colors py-2 ${
                    isActive(link.route) ? 'text-orange-600 font-semibold' : 'hover:text-orange-600'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
      {/* <Searchbar/> */}

          </div>
        )}
      </nav>
    </>
  );
}