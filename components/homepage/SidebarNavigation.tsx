'use client';

import { useState, useEffect } from 'react';
import { Home, Info, Star, CreditCard, MessageCircle } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: any;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: Info },
  { id: 'features', label: 'Features', icon: Star },
  { id: 'membership', label: 'Membership', icon: CreditCard },
  { id: 'contact', label: 'Contact', icon: MessageCircle }
];

export default function SidebarNavigation() {
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const targetScrollY = element.getBoundingClientRect().top + window.scrollY - 80; // 80px offset for header
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  // Detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // middle of viewport
      let currentSection = activeSection;

      for (const item of navItems) {
        const element = document.getElementById(item.id);
          console.log('Checking element for:', item.id, element);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            currentSection = item.id;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`group relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {isActive && (
                  <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-600 to-orange-500 rounded-full"></div>
                )}
                <Icon
                  className={`w-5 h-5 transition-all duration-300 ${
                    isActive ? 'scale-110 text-white' : 'group-hover:scale-105'
                  }`}
                />
                <span
                  className={`text-sm font-medium transition-all duration-300 ${
                    isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 lg:hidden">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-2">
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                    isActive ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title={item.label}
                >
                  <div className="flex flex-col items-center">
                    <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-white' : ''}`} />
                    <span className={`text-xs font-medium mt-1 transition-all duration-300 ${isActive ? 'text-white' : 'text-gray-600'}`}>
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
