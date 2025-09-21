'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Navigation() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate exact position to show section at top of viewport
      const elementTop = element.offsetTop;
      const targetScrollY = elementTop - 80; // 80px offset for header
      
      // Smooth scroll to exact position
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      });
      
      setIsMenuOpen(false); // Close mobile menu
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl blur-sm opacity-30"></div>
                <div className="relative bg-white/90 p-2 rounded-xl">
                  <Image 
                    src="/study-fi-logo.svg" 
                    alt="Study-Fi Logo" 
                    width={120} 
                    height={48}
                    className="h-12 w-auto"
                  />
                </div>
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-900">StudyFi Library</h1>
                <p className="text-sm text-orange-600 font-medium">Amravati</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('membership')}
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                Blog
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                Contact
              </button>
            </div>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Contact Info - Desktop */}
              <div className="hidden xl:flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span>9518979133</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4 text-orange-500" />
                  <span>studyfistudycenter@gmail.com</span>
                </div>
              </div>

              {/* Dashboard Button - Hidden */}
              {/* <button
                onClick={() => router.push('/dashboard')}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button> */}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-orange-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="block w-full text-left text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('membership')}
                className="block w-full text-left text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className="block w-full text-left text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
              >
                Blog
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
              >
                Contact
              </button>
              
              {/* Mobile Contact Info */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <span>7820941097</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <span>library@studyfi.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <span>Vaibhav Colony, Amravati</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className="h-20"></div>
    </>
  );
}