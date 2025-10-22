"use client"

import React, { useState, useEffect, useRef } from 'react';

// --- 1. Type Definitions ---

/**
 * Defines the structure for a single feature or amenity of the space.
 */
interface Feature {
  id: number;
  imageSrc: string; // The URL for the icon or feature image
  title: string; // The descriptive title displayed below the card
}

// --- 2. Mock Data ---

// NOTE: The image paths are relative and assume a folder structure like /public/uploads/.
const FEATURES_DATA: Feature[] = [
  {
    id: 1,
    imageSrc: "/uploads/Ac.png",
    title: "Air Conditioning (AC)",
  },
  {
    id: 2,
    imageSrc: "/uploads/chairs.png",
    title: "Ergonomic Seating",
  },
  {
    id: 3,
    imageSrc: "/uploads/watercoller.png",
    title: "Water Cooler Access",
  },
  {
    id: 4,
    imageSrc: "/uploads/parking.png",
    title: "Dedicated Parking Space",
  },
  {
    id: 5,
    imageSrc: "/uploads/wifi.png ",
    title: "Free High-Speed Wi-Fi",
  },
  {
    id: 6,
    imageSrc: "/studyfi-lib/public/uploads/silentenv.png  ",
    title: "Silent Environment",
  },
];

// --- 3. Feature Card Component ---

/**
 * The core card display logic.
 */
const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  return (
    // Added focusable for accessibility and better keyboard navigation
    <div 
      className="flex flex-col items-center justify-start text-center group focus-within:ring-4 focus-within:ring-blue-400 focus-within:ring-offset-4 focus-within:ring-offset-red-900 rounded-xl transition duration-300"
      tabIndex={0} 
    >
      {/* Feature Image/Icon Wrapper - Refined Styling & Animation */}
      <div className="relative w-full max-w-[180px] aspect-square rounded-xl overflow-hidden shadow-2xl bg-gray-100 border-b-4 border-transparent transform transition-all duration-300 ease-in-out group-hover:scale-[1.05] group-hover:shadow-blue-500/50 group-hover:border-blue-500 group-focus-within:scale-[1.05] group-focus-within:shadow-blue-500/50 group-focus-within:border-blue-500">
        <img
          src={feature.imageSrc}
          alt={`Icon for ${feature.title}`}
          className="w-full h-full object-contain p-6 transition-transform duration-500 ease-out group-hover:rotate-1 group-focus-within:rotate-1" 
          onError={(e) => { e.currentTarget.src = "https://placehold.co/120x120/f9fafb/222222?text=Icon"; }}
          loading="lazy"
        />
      </div>

      {/* Title Label - Polished Typography */}
      <p className="mt-8 text-base font-bold text-white tracking-widest uppercase transition-colors duration-300 group-hover:text-blue-300 group-focus-within:text-blue-300">
        {feature.title}
      </p>
    </div>
  );
};

// --- 4. Animated Wrapper Component (NEW) ---

const AnimatedFeatureCard: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    const delay = 0.15 + index * 0.1; // Staggered delay for sequential reveal

    // Hook to observe visibility (using IntersectionObserver API)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Set visible only if it is intersecting
                    setIsVisible(true);
                    // Stop observing once visible to prevent re-triggering
                    observer.unobserve(entry.target); 
                }
            },
            // Options: trigger when 10% of the element is visible
            { threshold: 0.1 } 
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div 
            ref={ref}
            // Animate only when isVisible is true, and apply the staggered delay
            className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: isVisible ? `${delay}s` : '0s' }}
        >
            <FeatureCard feature={feature} />
        </div>
    );
};


// --- 5. Main Section Component ---

const AmenitiesSection: React.FC = () => {
  return (
    // Updated background color to red-900 (based on your latest input)
    <div className="bg-red-900 text-white font-sans py-20 px-4 sm:px-8 lg:px-16 flex flex-col items-center">
      
      {/* Header and Title */}
      <div 
        // Changed animation classes to be slightly simpler for the header since it's above the fold
        className="max-w-4xl text-center mb-16 transition-opacity duration-1000 ease-out opacity-100"
      >
        {/* Subtitle remains as a professional separator */}
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-blue-300 mb-4">
            Our Features & Amenities
        </h2>
        
        {/* Small, Effective Heading: Font size adjustment and punchy content */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug">
          The perfect environment to **study, grow, and achieve greatness.** <span className="text-white underline decoration-blue-400 decoration-4 block mt-2">Unlock your full potential.</span>
        </h1>
      </div>

      {/* Features Grid */}
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-6">
          {FEATURES_DATA.map((feature, index) => (
            // Use the NEW AnimatedFeatureCard wrapper for scroll-based animation
            <AnimatedFeatureCard 
              key={feature.id} 
              feature={feature} 
              index={index} 
            />
          ))}
        </div>
      </div>
      
      {/* Removed the old CSS Keyframes since we are now using transition classes */}
    </div>
  );
};

export default AmenitiesSection;