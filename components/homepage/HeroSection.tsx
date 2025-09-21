'use client';

import { ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          {/* Logo with enhanced styling */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
              <div className="relative bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border border-orange-200">
                <Image 
                  src="/study-fi-logo.svg" 
                  alt="Study-Fi Logo" 
                  width={400} 
                  height={160}
                  className="h-32 md:h-40 w-auto"
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-gray-800">Welcome to</span>
            <span className="block bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent animate-pulse">
              StudyFi Library
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
        <span className="text-orange-600 font-bold"> Study in comfort, Achieve with Confidence. Specially Designed fOR ALL COMPETIVE STUDENT</span> 
          </p>
          
          {/* Reserve Button - Hidden */}
          {/* <div className="flex justify-center mb-16">
            <button 
              onClick={() => window.location.href = '/register'}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-5 rounded-2xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-xl font-bold flex items-center justify-center space-x-3 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 border-2 border-orange-400"
            >
              <span>Reserve Your Seat</span>
              <MapPin className="w-6 h-6" />
            </button>
          </div> */}

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-orange-500 text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">80 Study Seats</h3>
              <p className="text-gray-600">Professional study environment with comfortable seating</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-orange-500 text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Instant Booking</h3>
              <p className="text-gray-600">Reserve your seat in seconds with real-time availability</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="text-orange-500 text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Exam Focused</h3>
              <p className="text-gray-600">Specialized for MPSC, CA, NEET, JEE & All competative exams</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}