'use client';

import React, { useState, useEffect } from 'react'; // Import useEffect
import { Globe, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'; // Import Chevron icons

// --- Placeholder Components (CTALink and SectionHeader remain the same) ---

// 1. Placeholder for CTALink
const CTALink: React.FC<{ href: string; text: string; theme: 'dark' | 'light' }> = ({ href, text, theme }) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-teal-600 hover:bg-blue-700 text-white' : ' text-blue-700';
  const borderColor = isDark ? 'border-transparent' : 'border-blue-700';

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center px-6 py-3 border ${borderColor} text-base font-medium rounded-lg transition duration-300 ${bgColor}`}
    >
      {text}
      <ArrowRight className={`ml-3 h-5 w-5 ${isDark ? 'text-white' : 'text-blue-700'}`} />
    </a>
  );
};

// 2. Placeholder for SectionHeader
interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  theme: 'dark' | 'light';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ badge, title, subtitle, description, theme }) => {
  const isDark = theme === 'dark';
  const titleColor = isDark ? 'text-white' : 'text-gray-900';
  const subtitleColor = isDark ? 'text-gray-300' : 'text-gray-700';
  const descriptionColor = isDark ? 'text-gray-400' : 'text-gray-600';

  return (
    <header className={`space-y-4`} data-aos="fade-up" data-aos-duration="1000">
      <div className="flex items-center space-x-2 text-sm font-semibold text-orange-400" data-aos-delay="0">
        <Globe className="w-5 h-5 text-orange-500" />
        <span className="uppercase tracking-widest">{badge}</span>
      </div>
      <h2 className={`text-4xl sm:text-5xl font-extrabold leading-tight ${titleColor}`} data-aos-delay="100">{title}</h2>
      <h3 className={`text-xl sm:text-2xl font-medium ${subtitleColor}`} data-aos-delay="200">{subtitle}</h3>
      <p className={`text-lg pt-2 ${descriptionColor}`} data-aos-delay="300">{description}</p>
    </header>
  );
};

// --- Main Component (with Image Carousel, Smooth AOS Transition, Hover Transform, and AUTO-CYCLE) ---

interface DigitalSovereigntySectionProps {
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaLink?: string;
  images?: string[]; 
  overlayOpacity?: number;
  /** Controls column order: 'text-left' (default) puts text first, 'text-right' puts image first. */
  layout?: 'text-left' | 'text-right';
  /** Controls background and text colors. */
  theme?: 'dark' | 'light';
  /** Interval in milliseconds for automatic image cycling (0 to disable). */
  autoCycleInterval?: number; // NEW PROP for auto-cycle
}

export default function AboutSection({
  className = '',
  id = 'value',
  title = 'AMRAVATI S BEST STUDY SPACE 🥇',
  subtitle = 'The Perfect Environment for Focused Learning and Growth.',
  description = 'Welcome to STUDFI LIBRARY, Amravati most student-friendly study space. We create the ideal environment with comfortable seating, air-conditioning, clean drinking water, and secure parking, giving students the peace of mind they need. Whether you re preparing for MPSC, GATE, UPSC, CA, NEET, JEE, or any other competitive exams, our library provides the best atmosphere to stay productive, disciplined, and motivated.',
  badge = 'ABOUT US',
  showCTA = true,
  // ctaText = 'Learn about our Digital Sovereignty framework',
  ctaLink = '#',
  images = ['/uploads/image2.png', '/uploads/image3.png', '/uploads/image4.png'],
  overlayOpacity = 30,
  layout = 'text-left',
  theme = 'light',
  autoCycleInterval = 5000, // DEFAULT: Cycle every 5 seconds (5000ms)
}: DigitalSovereigntySectionProps) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0); 
  const isDark = theme === 'dark';
  const sectionBg = isDark ? 'bg-gray-900' : 'bg-gray-50';

  const textOrder = layout === 'text-left' ? 'order-2 lg:order-1' : 'order-2 lg:order-2';
  const imageOrder = layout === 'text-left' ? 'order-1 lg:order-2' : 'order-1 lg:order-1';

  const gradientStyle = {
    background: `linear-gradient(to bottom right, rgba(0,0,0,${overlayOpacity / 100}), rgba(0,0,0,0.1))`,
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // NEW: useEffect hook for auto-cycling
  useEffect(() => {
    // Only set up the interval if there's more than one image and the interval is greater than 0
    if (images.length > 1 && autoCycleInterval > 0) {
      const intervalId = setInterval(() => {
        goToNextImage();
      }, autoCycleInterval);

      // Cleanup function: clear the interval when the component unmounts or dependencies change
      return () => clearInterval(intervalId);
    }
  }, [images.length, autoCycleInterval]); // Re-run effect if image count or interval changes


  return (
    <section
      id={id}
      data-aos="fade-up"
      data-aos-duration="1000"
      className={`${className} relative w-full py-20 lg:py-32 ${sectionBg} overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-16">
          
          {/* Left Column: Header + CTA (Text Container) */}
          <div 
            className={`w-full lg:w-1/2 flex flex-col items-start space-y-10 ${textOrder}`}
          >
            <SectionHeader
              badge={badge}
              title={title}
              subtitle={subtitle}
              description={description}
              theme={theme}
            />

            {showCTA && (
              <div className='mt-4' data-aos="fade-up" data-aos-delay="400">
                {/* <CTALink href={ctaLink} text={ctaText} theme={theme} /> */}
              </div>
            )}
          </div>

          {/* Right Column: Image Container with Navigation */}
          <div 
            className={`
              relative w-full lg:w-1/2 group ${imageOrder}
              transition-transform duration-500 ease-in-out 
              hover:shadow-2xl hover:shadow-orange-500/50 
              hover:-translate-y-2 hover:rotate-1  
            `}
            data-aos-delay="200"
          >
            {/* Image */}
            <img
              src={images[currentImageIndex]}
              // alt="Illustration of digital sovereignty and data control"
              className="w-full h-[300px] lg:h-[500px] object-cover rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]"
            />
            
            {/* Image Overlay */}
            <div
              className="absolute inset-0 rounded-2xl transition-opacity duration-500 hover:opacity-100"
              style={gradientStyle}
            />

            {/* Navigation Arrows */}
            {images.length > 1 && ( 
              <>
                {/* Left Arrow */}
                <button
                  onClick={goToPreviousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full shadow-lg hover:bg-opacity-75 transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                {/* Right Arrow */}
                <button
                  onClick={goToNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full shadow-lg hover:bg-opacity-75 transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Image Indicator Dots (Optional, but good for UX) */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-2 rounded-full transition-all duration-300
                      ${index === currentImageIndex ? 'bg-white scale-125' : 'bg-gray-400 bg-opacity-70'}
                    `}
                    aria-label={`Go to image ${index + 1}`}
                  ></button>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}