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
  { id: 'blog', label: 'Blog', icon: FileText },
  { id: 'contact', label: 'Contact', icon: MessageCircle }
];

export default function SidebarNavigation() {
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    console.log('Scrolling to section:', sectionId);
    
    const element = document.getElementById(sectionId);
    
    if (element) {
      console.log('Element found:', element);
      
      // Get the current scroll position and viewport height
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Calculate the exact position to center the section in viewport
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      
      // Calculate scroll position to show section at the top of viewport
      const targetScrollY = elementTop - 80; // 80px offset for header
      
      console.log('Scrolling to exact position:', targetScrollY);
      
      // Smooth scroll to exact position
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
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px', // Trigger when section is 20% visible
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

    // Fallback scroll listener for better compatibility
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      let activeId = 'hero';
      let minDistance = Infinity;

      // Find the section closest to the center of the viewport
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const elementTop = element.offsetTop;
          const elementCenter = elementTop + element.offsetHeight / 2;
          const viewportCenter = scrollPosition + windowHeight / 2;
          const distance = Math.abs(elementCenter - viewportCenter);

          if (distance < minDistance) {
            minDistance = distance;
            activeId = item.id;
          }
        }
      });

      setActiveSection(activeId);
    };

    // Throttled scroll listener
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  return (
    <>
      {/* Custom CSS for enhanced blinking animations */}
      <style jsx>{`
        @keyframes flash {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0.3; }
        }
        
        @keyframes glow {
          0% { 
            filter: brightness(1) drop-shadow(0 0 5px rgba(59, 130, 246, 0.5));
            transform: scale(1);
          }
          100% { 
            filter: brightness(1.5) drop-shadow(0 0 15px rgba(249, 115, 22, 0.8));
            transform: scale(1.1);
          }
        }
        
        @keyframes ping-enhanced {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-ping-enhanced {
          animation: ping-enhanced 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
      
      {/* Desktop Sidebar */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 p-4">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Button clicked for:', item.id);
                    scrollToSection(item.id);
                  }}
                   className={`group relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer ${
                     isActive
                       ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-lg'
                       : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                   }`}
                   style={{
                     animation: isActive ? 'pulse 1s ease-in-out infinite, flash 0.5s ease-in-out infinite' : 'none'
                   }}
                >
                   {/* Active indicator */}
                   {isActive && (
                     <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-600 to-orange-500 rounded-full animate-ping-enhanced"></div>
                   )}
                  
                   <Icon 
                     className={`w-5 h-5 transition-all duration-300 ${isActive ? 'scale-110 text-white' : 'group-hover:scale-105'}`}
                     style={{
                       animation: isActive ? 'bounce 1s ease-in-out infinite, glow 1.5s ease-in-out infinite alternate' : 'none'
                     }}
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
                    console.log('Mobile button clicked for:', item.id);
                    scrollToSection(item.id);
                  }}
                   className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                     isActive
                       ? 'bg-gradient-to-r from-blue-600 to-orange-500 text-white'
                       : 'text-gray-600 hover:bg-gray-100'
                   }`}
                   style={{
                     animation: isActive ? 'pulse 1s ease-in-out infinite, flash 0.5s ease-in-out infinite' : 'none'
                   }}
                  title={item.label}
                >
                  <div className="flex flex-col items-center">
                    <Icon 
                      className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-white' : ''}`}
                      style={{
                        animation: isActive ? 'bounce 1s ease-in-out infinite, glow 1.5s ease-in-out infinite alternate' : 'none'
                      }}
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
