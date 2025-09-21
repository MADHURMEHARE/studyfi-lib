'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, User, Mail, Phone, Home } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import PlanSelection from '@/components/registration/PlanSelection';
import SeatRegistrationForm from '@/components/registration/SeatRegistrationForm';

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<'plan' | 'form'>('plan');
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const router = useRouter();

  const handlePlanSelect = () => {
    setCurrentStep('form');
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      // Demo functionality - in a real app, this would make an API call
      console.log('Registration data:', { ...formData, plan: selectedPlan });
      toast.success('Registration submitted successfully! We will contact you soon.');
      
      // Redirect to confirmation page
      setTimeout(() => {
        router.push('/confirmation');
      }, 2000);
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  const handleBackToPlan = () => {
    setCurrentStep('plan');
    setSelectedPlan(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-md shadow-lg border-b border-orange-200">
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

            {/* Back Button */}
            <button
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${currentStep === 'plan' ? 'text-orange-600' : 'text-green-600'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                currentStep === 'plan' ? 'bg-orange-500' : 'bg-green-500'
              }`}>
                {currentStep === 'plan' ? '1' : '✓'}
              </div>
              <span className="font-medium">Select Plan</span>
            </div>
            
            <div className={`w-16 h-1 ${currentStep === 'form' ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center space-x-2 ${currentStep === 'form' ? 'text-orange-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                currentStep === 'form' ? 'bg-orange-500' : 'bg-gray-300'
              }`}>
                2
              </div>
              <span className="font-medium">Registration</span>
            </div>
          </div>
        </div>

        {/* Content based on current step */}
        {currentStep === 'plan' ? (
          <PlanSelection onPlanSelect={handlePlanSelect} />
        ) : (
          <div className="space-y-8">
            {/* Back to Plan Button */}
            <div className="text-center">
              <button
                onClick={handleBackToPlan}
                className="flex items-center space-x-2 mx-auto px-4 py-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Change Plan</span>
              </button>
            </div>

            {/* Registration Form */}
            <SeatRegistrationForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {/* Contact Info */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-200">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
              <p className="text-gray-600">9518979133</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Email Us</h4>
              <p className="text-gray-600">studyfistudycenter@gmail.com</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Visit Us</h4>
              <p className="text-gray-600">Vaibhav Colony, Amravati</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}