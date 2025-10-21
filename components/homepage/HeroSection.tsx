'use client';

import { MapPin } from 'lucide-react';
import ProtectedButton from '../shared/ProtectedButton';
import { useState, useEffect } from 'react';

interface Feature {
  icon: string; // Emoji or JSX
  title: string;
  description: string;
}

interface HeroSectionProps {
  heading: string;
  subHeading: string;
  description: string;
  features: Feature[];
  videoUrl?: string;
  bgImageUrl?: string;
}

export default function HeroSection({
  heading,
  subHeading,
  description,
  features,
  videoUrl,
  bgImageUrl,
}: HeroSectionProps) {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    // Only update if client-side
    if (typeof window !== 'undefined') {
      setOffsetY(window.scrollY);
    }
  };

  useEffect(() => {
    // Attach and detach event listener only on client-side
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Calculate dynamic styles based on scrollY
  const backgroundParallax = offsetY * 0.4; // Slower background
  const contentParallax = offsetY * 0.7; // Faster content scroll-up
  const logoParallax = offsetY * 0.2; // Subtle logo movement
  const subHeadingX = offsetY * 0.8; // Subheading horizontal slide
  const featuresParallax = offsetY * 0.3; // Features grid subtle movement

  // Calculate opacity for fading out main content
  // Fades out between scroll 0px and 400px
  const opacity = 1 - Math.min(offsetY / 400, 1);
  const blurAmount = Math.min(offsetY / 100, 5); // Max 5px blur
  const scaleAmount = 1 + Math.min(offsetY / 1000, 0.1); // Max 10% zoom out


  return (
    <section className="relative w-full min-h-screen overflow-hidden text-white flex items-center justify-center">
      {/* Background Layer - Deep Parallax, Subtle Zoom, and Blur */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-75 ease-out"
        style={{
          transform: `translateY(${backgroundParallax}px) scale(${scaleAmount})`,
          filter: `blur(${blurAmount}px)`,
        }}
      >
        {bgImageUrl && (
          <>
            <img
              src={bgImageUrl}
              alt="Hero Background"
              className="w-full h-full object-cover object-center animate-scale-hero"
            />
            <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div> {/* Darker overlay */}
          </>
        )}

        {videoUrl && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Hero Content - Moves faster than background, fades out */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 sm:px-6 lg:px-8 py-20 transition-opacity duration-75 ease-out"
        style={{
          transform: `translateY(-${contentParallax}px)`,
          opacity: opacity, // Fades out content
          perspective: '1000px', // For potential 3D effects
        }}
      >
        {/* SVG Logo - Subtle Parallax */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 205 213"
          className="w-32 h-32 mb-6 fill-white drop-shadow-lg transition-transform duration-75 ease-out"
          style={{ transform: `translateY(${logoParallax}px)` }}
        >
          <path d="M201.76,17.01C174.45,6.79,145.3,1.07,115.13,0c-1.35-.04-2.66,.46-3.63,1.39-.97,.94-1.52,2.23-1.52,3.58V73.57c0,2.75,2.23,4.98,4.98,4.98h78.8c2.3,0,4.3-1.57,4.84-3.8,4.25-17.46,6.4-35.31,6.4-53.07,0-2.08-1.29-3.94-3.24-4.67Z" />
          <path d="M93.51,1.4c-.97-.94-2.29-1.44-3.63-1.39C59.7,1.07,30.55,6.79,3.24,17.01c-1.95,.73-3.24,2.59-3.24,4.67,0,17.77,2.16,35.63,6.42,53.08,.54,2.23,2.54,3.8,4.84,3.8H90.06c2.75,0,4.98-2.23,4.98-4.98V4.98c0-1.35-.55-2.65-1.52-3.58Z" />
          <path d="M90.06,93.5H17.1c-1.61,0-3.12,.78-4.05,2.09-.93,1.31-1.18,2.99-.66,4.51,11.56,33.67,30.73,64.99,56.97,93.07l17.06,18.25c.96,1.03,2.29,1.58,3.64,1.58,.61,0,1.23-.11,1.83-.35,1.9-.75,3.15-2.59,3.15-4.63V98.48c0-2.75-2.23-4.98-4.98-4.98Z" />
          <path d="M191.95,95.58c-.93-1.31-2.44-2.09-4.05-2.09H114.96c-2.75,0-4.98,2.23-4.98,4.98v109.53c0,2.05,1.25,3.88,3.15,4.63,.59,.23,1.21,.35,1.83,.35,1.35,0,2.68-.55,3.64-1.58l17.05-18.25c26.23-28.08,45.4-59.39,56.96-93.07,.52-1.52,.28-3.2-.66-4.51Z" />
        </svg>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl transition-transform duration-75 ease-out">
          {heading}{' '}
          <span
            className="block bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent transition-transform duration-75 ease-out"
            style={{
              transform: `translateX(-${subHeadingX}px)`,
              willChange: 'transform',
            }}
          >
            {subHeading}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-orange-200 font-semibold mb-12 max-w-3xl drop-shadow-xl transition-transform duration-75 ease-out">
          {description}
        </p>

        {/* Features Grid - Lifts up and moves slightly slower */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl w-full mx-auto transition-transform duration-75 ease-out"
          style={{ transform: `translateY(-${featuresParallax}px)` }}
        >
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-orange-200 text-gray-900 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4 text-orange-600">
                {feature.icon === 'MapPin' ? <MapPin size={32} /> : feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Static background animation */}
      <style jsx>{`
        @keyframes scale-hero {
          0% { transform: scale(1.25); }
          100% { transform: scale(1.1); }
        }
        .animate-scale-hero {
          animation: scale-hero 4s cubic-bezier(0, 0.71, 0.4, 0.97) forwards;
        }
      `}</style>
    </section>
  );
}