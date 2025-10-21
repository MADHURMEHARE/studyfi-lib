"use client"
import React, { useState, useEffect, useRef } from 'react';

/**
 * Applies a subtle 3D perspective tilt and slow movement to the children based on scroll position.
 * The primary purpose is the global 3D tilt. Local parallax effects are better handled by sections themselves.
 */
const ScrollPerspectiveWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [offsetY, setOffsetY] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setOffsetY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Global 3D/Slow Parallax Logic (From Wrapper) ---
  const maxScroll = 1000;
  const normalizedScroll = Math.min(offsetY / maxScroll, 1);
  
  const maxTiltX = 0.5;
  const tiltX = normalizedScroll * maxTiltX; 

  // Slow Parallax: This is the global translation for the entire page body
  const maxTranslateY = 50;
  const translateY = normalizedScroll * maxTranslateY; 

  // --- Hero Section Parallax Logic (Just the content lift-up for the first 400px) ---
  // The 'contentParallax' value from HeroSection (offsetY * 0.7)
  const heroContentParallax = Math.min(offsetY * 0.7, 400 * 0.7); // Capping the fast movement

  // We choose the stronger, localized parallax for the first screen, 
  // then fall back to the global parallax.
  // This approach is overly complex and fragile.

  return (
    <div 
      ref={mainRef}
      className="flex-1 perspective-[1200px] will-change-transform"
    >
      <main 
        className='w-full'
        style={{
          // Apply the subtle global 3D effect + the cumulative or preferred Y translation
          transform: `translateY(-${translateY}px) rotateX(${tiltX}deg) translateZ(-${translateY * 0.5}px)`,
          transition: 'transform 0.1s linear', 
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default ScrollPerspectiveWrapper;