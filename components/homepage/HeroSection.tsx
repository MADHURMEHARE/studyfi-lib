'use client';

import { MapPin } from 'lucide-react';
import ProtectedButton from '../shared/ProtectedButton';
// import { featuress } from './utils/data/DATA';


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
  videoUrl?: string; // Optional video background
}

export default function HeroSection({
  heading,
  subHeading,
  description,
  features,
  videoUrl,
}: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden mt-20"
      style={{
        background: !videoUrl
          ? 'linear-gradient(to bottom right, #FFEDD5, #FFFFFF, #FFEDD5)'
          : undefined,
      }}
    >
      {/* Video Background */}
      {videoUrl && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-70 z-0"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Decorative Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-500"></div>
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="text-gray-800">{heading}</span>
          <span className="block bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent animate-pulse">
            {subHeading}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
          <span className="text-orange-600 font-bold">{description}</span>
        </p>

        {/* Optional Button */}
        {/* Uncomment if you want a CTA button */}
        {/*
        <div className="flex justify-center mb-16">
          <ProtectedButton
            onClick={() => window.location.href = '/register'}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-5 rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-xl font-bold flex items-center justify-center space-x-3 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 border-2 border-orange-400"
            message="Please login to reserve a seat"
          >
            <span>Reserve Your Seat</span>
            <MapPin className="w-6 h-6" />
          </ProtectedButton>
        </div>
        */}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="text-orange-500 text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
