"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Globe, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// --- CTALink Placeholder ---
const CTALink: React.FC<{ href: string; text: string; theme: "dark" | "light" }> = ({
  href,
  text,
  theme,
}) => {
  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-teal-600 hover:bg-blue-700 text-white" : "text-blue-700";
  const borderColor = isDark ? "border-transparent" : "border-blue-700";

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center px-6 py-3 border ${borderColor} text-base font-medium rounded-lg transition duration-300 ${bgColor}`}
    >
      {text}
      <ArrowRight className={`ml-3 h-5 w-5 ${isDark ? "text-white" : "text-blue-700"}`} />
    </a>
  );
};

// --- SectionHeader Placeholder ---
interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  theme: "dark" | "light";
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  description,
  theme,
}) => {
  const isDark = theme === "dark";
  const titleColor = isDark ? "text-white" : "text-gray-900";
  const subtitleColor = isDark ? "text-gray-300" : "text-gray-700";
  const descriptionColor = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <header className="space-y-4" data-aos="fade-up" data-aos-duration="1000">
      <div className="flex items-center space-x-2 text-sm font-semibold text-orange-400">
        <Globe className="w-5 h-5 text-orange-500" />
        <span className="uppercase tracking-widest">{badge}</span>
      </div>
      <h2 className={`text-4xl sm:text-5xl font-extrabold leading-tight ${titleColor}`}>
        {title}
      </h2>
      <h3 className={`text-xl sm:text-2xl font-medium ${subtitleColor}`}>{subtitle}</h3>
      <p className={`text-lg pt-2 ${descriptionColor}`}>{description}</p>
    </header>
  );
};

// --- Main AboutSection ---
interface AboutSectionProps {
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
  layout?: "text-left" | "text-right";
  theme?: "dark" | "light";
  autoCycleInterval?: number;
}

export default function AboutSection({
  className = "",
  id = "about",
  title = "AMRAVATI'S BEST STUDY SPACE 🥇",
  subtitle = "The Perfect Environment for Focused Learning and Growth.",
  description = "Welcome to STUDFI LIBRARY, Amravati's most student-friendly study space...",
  badge = "ABOUT US",
  showCTA = false,
  ctaLink = "#",
  images = ["/uploads/image2.png", "/uploads/image3.png", "/uploads/image4.png"],
  overlayOpacity = 30,
  layout = "text-left",
  theme = "light",
  autoCycleInterval = 5000,
}: AboutSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isDark = theme === "dark";
  const sectionBg = isDark ? "bg-gray-900" : "bg-gray-50";

  const textOrder = layout === "text-left" ? "order-2 lg:order-1" : "order-2 lg:order-2";
  const imageOrder = layout === "text-left" ? "order-1 lg:order-2" : "order-1 lg:order-1";

  const gradientStyle = {
    background: `linear-gradient(to bottom right, rgba(0,0,0,${overlayOpacity / 100}), rgba(0,0,0,0.1))`,
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (images.length > 1 && autoCycleInterval > 0) {
      const intervalId = setInterval(goToNextImage, autoCycleInterval);
      return () => clearInterval(intervalId);
    }
  }, [images.length, autoCycleInterval]);

  return (
    <section id={id} className={`${className} relative w-full py-20 lg:py-32 ${sectionBg} overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center w-full gap-12 lg:gap-16">

          {/* Text Column */}
          <div className={`w-full lg:w-1/2 flex flex-col items-start space-y-10 ${textOrder}`}>
            <SectionHeader
              badge={badge}
              title={title}
              subtitle={subtitle}
              description={description}
              theme={theme}
            />
            {showCTA && (
              <div className="mt-4" data-aos="fade-up" data-aos-delay="400">
                <CTALink href={ctaLink} text={title} theme={theme} />
              </div>
            )}
          </div>

          {/* Image Column */}
          <div
            className={`relative w-full lg:w-1/2 group ${imageOrder} transition-transform duration-500 ease-in-out hover:shadow-2xl hover:shadow-orange-500/50 hover:-translate-y-2 hover:rotate-1`}
          >
            <Image
              src={images[currentImageIndex]}
              alt={`Study space image ${currentImageIndex + 1}`}
              width={1200}
              height={600}
              className="w-full h-[300px] lg:h-[500px] object-cover rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]"
            />

            <div
              className="absolute inset-0 rounded-2xl transition-opacity duration-500 hover:opacity-100"
              style={gradientStyle}
            />

            {/* Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPreviousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full shadow-lg hover:bg-opacity-75 transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full shadow-lg hover:bg-opacity-75 transition-all duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Indicator Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex ? "bg-white scale-125" : "bg-gray-400 bg-opacity-70"
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
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
