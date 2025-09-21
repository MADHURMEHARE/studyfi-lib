'use client';

import { useState } from 'react';
import { ArrowLeft, CheckCircle, User, Mail, Phone, BookOpen, Clock, Calendar } from 'lucide-react';

interface SeatRegistrationFormProps {
  availableSeats: number;
  onBack: () => void;
}

export default function SeatRegistrationForm({ availableSeats, onBack }: SeatRegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    examType: '',
    timingPreference: '',
    duration: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  const examTypes = [
    { value: 'MPSC', label: 'MPSC' },
    { value: 'CA', label: 'CA' },
    { value: 'NEET', label: 'NEET' },
    { value: 'JEE', label: 'JEE' },
    { value: 'GATE', label: 'GATE' },
    { value: 'UPSC', label: 'UPSC' }
  ];

  const timingOptions = [
    { value: 'Morning', label: 'Morning (6 AM - 12 PM)' },
    { value: 'Evening', label: 'Evening (2 PM - 8 PM)' },
    { value: 'Full Day', label: 'Full Day (6 AM - 8 PM)' }
  ];

  const durationOptions = [
    { value: 'Monthly', label: 'Monthly (₹400)' },
    { value: 'Quarterly', label: 'Quarterly (₹1000)' },
    { value: 'Yearly', label: 'Yearly (₹3500)' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a unique submission ID
    const submissionId = `STUDFI-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    
    // Simulate form submission
    console.log('Form submitted:', formData);
    console.log('Submission ID:', submissionId);
    
    // Calculate subscription end date based on duration
    const calculateEndDate = (duration: string) => {
      const startDate = new Date();
      switch (duration) {
        case 'Monthly':
          return new Date(startDate.setMonth(startDate.getMonth() + 1));
        case 'Quarterly':
          return new Date(startDate.setMonth(startDate.getMonth() + 3));
        case 'Yearly':
          return new Date(startDate.setFullYear(startDate.getFullYear() + 1));
        default:
          return new Date(startDate.setMonth(startDate.getMonth() + 1));
      }
    };

    // Store submission in localStorage for demo
    const submissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    const newSubmission = {
      id: submissionId,
      ...formData,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      approvedAt: null,
      subscriptionStartDate: null, // Will be set when approved
      subscriptionEndDate: null,   // Will be set when approved
      renewalReminderSent: false,
      expiryNotificationSent: false
    };
    submissions.push(newSubmission);
    localStorage.setItem('pendingSubmissions', JSON.stringify(submissions));
    
    // Show success message
    setSubmissionId(submissionId);
    setIsSubmitted(true);
    
    // In real app, this would make an API call
    // await submitRegistration(formData);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-orange-200 text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-12 h-12 text-orange-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Submitted!</h2>
          
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
            <p className="text-lg font-semibold text-orange-800 mb-2">Submission ID: {submissionId}</p>
            <p className="text-orange-700">Status: <span className="font-bold">Pending Admin Approval</span></p>
          </div>
          
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Thank you! Your seat request has been submitted successfully. Our admin team will review your application and you will receive a confirmation email/SMS within 24 hours with your seat details and payment instructions.
          </p>
          
          <div className="bg-green-50 rounded-2xl p-6 mb-8">
            <h3 className="text-lg font-bold text-green-800 mb-3">What's Next?</h3>
            <ul className="text-left text-green-700 space-y-2">
              <li>• Check your email for confirmation details</li>
              <li>• Complete the payment process</li>
              <li>• Visit the library to activate your seat</li>
              <li>• Start your successful study journey!</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = `/confirmation?id=${submissionId}`}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold"
            >
              Check Booking Status
            </button>
            <button
              onClick={onBack}
              className="bg-gray-500 text-white px-8 py-3 rounded-xl hover:bg-gray-600 transition-colors"
            >
              Back to Plans
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-white border border-orange-200 text-orange-600 px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-orange-200">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Plans</span>
          </button>
          <h2 className="text-3xl font-bold text-gray-900">Registration Form</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <User className="w-6 h-6 mr-3 text-orange-600" />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Enter your 10-digit mobile number"
                />
              </div>
            </div>
          </div>

          {/* Study Preferences */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-orange-600" />
              Study Preferences
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type *</label>
                <select
                  name="examType"
                  value={formData.examType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                >
                  <option value="">Select your exam type</option>
                  {examTypes.map((exam) => (
                    <option key={exam.value} value={exam.value}>
                      {exam.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timing Preference *</label>
                <select
                  name="timingPreference"
                  value={formData.timingPreference}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                >
                  <option value="">Select timing preference</option>
                  {timingOptions.map((timing) => (
                    <option key={timing.value} value={timing.value}>
                      {timing.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                >
                  <option value="">Select duration</option>
                  {durationOptions.map((duration) => (
                    <option key={duration.value} value={duration.value}>
                      {duration.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-12 py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Submit & Reserve Seat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
