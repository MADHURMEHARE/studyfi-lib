'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, User, Mail, Phone, Calendar } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Head from 'next/head';
import Script from 'next/script';
import ProtectedButton from '@/components/shared/ProtectedButton';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    selectedPlan: '',
    selectedSeat: '',
    startDate: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const plans = [
    { id: 'monthly', name: 'Monthly Plan', price: 400, duration: '1 Month' },
    { id: 'quarterly', name: 'Quarterly Plan', price: 1000, duration: '3 Months' },
    { id: 'yearly', name: 'Yearly Plan', price: 3500, duration: '12 Months' }
  ];

  const availableSeats = Array.from({ length: 40 }, (_, i) => i + 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Registration successful! You will receive a confirmation email shortly.');
      router.push('/confirmation');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ================= SEO Meta Tags ================= */}
      <Head>
        <title>Register for StudyFi Library - Secure Your Seat</title>
        <meta
          name="description"
          content="Register for StudyFi Library in Amravati. Secure your study seat and choose the perfect plan for your exam preparation journey."
        />
        <meta name="keywords" content="StudyFi Library, Registration, Library Seat, Amravati, Study Plans" />
        <link rel="canonical" href="https://studyfi-lib.vercel.app/register" />

        {/* Open Graph */}
        <meta property="og:title" content="Register for StudyFi Library" />
        <meta property="og:description" content="Secure your study seat and track your learning with StudyFi Library." />
        <meta property="og:image" content="https://studyfi-lib.vercel.app/study-fi-logo.svg" />
        <meta property="og:url" content="https://studyfi-lib.vercel.app/register" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Register for StudyFi Library" />
        <meta name="twitter:description" content="Secure your study seat and track your learning with StudyFi Library." />
        <meta name="twitter:image" content="https://studyfi-lib.vercel.app/study-fi-logo.svg" />
      </Head>

      {/* ================= Structured Data ================= */}
      <Script type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "StudyFi Library",
          "url": "https://studyfi-lib.vercel.app/register",
          "logo": "https://studyfi-lib.vercel.app/study-fi-logo.svg",
          "description": "Register for StudyFi Library in Amravati and secure your study seat for exam preparation.",
          "sameAs": [
            "https://www.facebook.com/yourpage",
            "https://www.instagram.com/yourpage"
          ]
        })}
      </Script>

      {/* ================= Page Content ================= */}
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-12 px-4">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-3xl blur-lg opacity-30 animate-pulse"></div>
                <div className="relative bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-2xl border border-orange-200">
                  <Image 
                    src="/study-fi-logo.svg" 
                    alt="Study-Fi Logo" 
                    width={200} 
                    height={80}
                    className="h-16 w-auto"
                  />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Register for StudyFi Library</h1>
            <p className="text-xl text-gray-600">Secure your study seat today</p>
          </div>

          {/* Registration Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-orange-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="w-6 h-6 text-orange-500 mr-3" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-orange-500" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-orange-500" />
                      </div>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Start Date *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-orange-500" />
                      </div>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Plan Selection */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <MapPin className="w-6 h-6 text-orange-500 mr-3" />
                  Select Your Plan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                        formData.selectedPlan === plan.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, selectedPlan: plan.id }))}
                    >
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                      <p className="text-3xl font-bold text-orange-600 mb-2">₹{plan.price}</p>
                      <p className="text-gray-600 mb-4">{plan.duration}</p>
                      <div className={`w-6 h-6 rounded-full border-2 ${
                        formData.selectedPlan === plan.id ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Seat Selection */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Your Seat</h3>
                <div className="grid grid-cols-8 gap-3">
                  {availableSeats.map((seat) => (
                    <div
                      key={seat}
                      className={`p-3 text-center rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        formData.selectedSeat === seat.toString()
                          ? 'border-orange-500 bg-orange-500 text-white'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, selectedSeat: seat.toString() }))}
                    >
                      {seat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.selectedPlan || !formData.selectedSeat}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-lg flex items-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Complete Registration</span>
                  )}
                </button>
              </div>
            </form>

            {/* Back to Home */}
            <div className="mt-8 text-center">
              <button
                onClick={() => router.push('/')}
                className="text-orange-600 hover:text-orange-700 font-medium transition-colors flex items-center space-x-2 mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
