'use client';

import { useState, useEffect } from 'react';
import { Home, Info, Star, CreditCard, FileText, MessageCircle } from 'lucide-react';

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
  // { id: 'blog', label: 'Blog', icon: FileText },
  { id: 'contact', label: 'Contact', icon: MessageCircle }
];

export default function SidebarNavigation() {
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Calculate scroll position to show section at the top of viewport with a fixed offset (e.g., 80px)
      const targetScrollY = element.offsetTop - 80;
      
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      });
    } else {
      console.error('Element not found for section:', sectionId);
    }
  };

  // Handle scroll to detect active section using Intersection Observer
  useEffect(() => {
    // Use -30% margins for a more stable active state detection
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px', 
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Removed the complex and often redundant fallback scroll listener.
    // Intersection Observer is the standard and most performant approach.

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Desktop Sidebar - Floating navigation */}
      {/* Retaining the original fixed positioning for a floating dot-nav style */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-2">
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
                       // ✅ FIX: Use Tailwind's animate-pulse instead of custom 'pulse'
                       ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg animate-pulse' 
                       : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                   }`}
                    // ✅ FIX: Removed inline style for undefined animations
                >
                   {/* Active indicator */}
                   {isActive && (
                     // ✅ FIX: Removed custom 'animate-ping-enhanced' class
                     <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-600 to-orange-500 rounded-full"></div>
                   )}
                  
                   <Icon 
                     className={`w-5 h-5 transition-all duration-300 ${isActive ? 'scale-110 text-white' : 'group-hover:scale-105'}`}
                    // ✅ FIX: Removed inline style for undefined animations
                   />
                   
                   {/* Section Name */}
                   <span className={`text-sm font-medium transition-all duration-300 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-900'}`}>
                     {item.label}
                   </span>
                   
                   {/* Tooltip for additional info */}
                   <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                     Go to {item.label}
                     <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                   </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Horizontal */}
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
                     isActive
                       ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white'
                       : 'text-gray-600 hover:bg-gray-100'
                   }`}
                    // ✅ FIX: Removed inline style for undefined animations
                  title={item.label}
                >
                  <div className="flex flex-col items-center">
                    <Icon 
                      className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-white' : ''}`}
                    // ✅ FIX: Removed inline style for undefined animations
                    />
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