'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Clock, XCircle, Mail, Phone, User, Calendar, BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Submission {
  id: string;
  name: string;
  email: string;
  mobile: string;
  examType: string;
  timingPreference: string;
  duration: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  approvedAt?: string;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  renewalReminderSent?: boolean;
  expiryNotificationSent?: boolean;
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get('id');
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (submissionId) {
      // Load submission from localStorage
      const submissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
      const found = submissions.find((s: Submission) => s.id === submissionId);
      setSubmission(found || null);
    }
    setLoading(false);
  }, [submissionId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-red-200 text-center">
            <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Submission Not Found</h1>
            <p className="text-xl text-gray-700 mb-8">
              The submission ID you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/register"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold inline-flex items-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Registration</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Booking Status</h1>
          <p className="text-xl text-gray-600 mt-2">Check your seat registration status</p>
        </div>

        {/* Status Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-orange-200">
          {/* Status Header */}
          <div className="text-center mb-8">
            {submission.status === 'approved' && (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            )}
            {submission.status === 'pending' && (
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-12 h-12 text-orange-600" />
              </div>
            )}
            {submission.status === 'rejected' && (
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
            )}

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {submission.status === 'approved' && 'Booking Approved!'}
              {submission.status === 'pending' && 'Booking Under Review'}
              {submission.status === 'rejected' && 'Booking Rejected'}
            </h2>
            
            <div className={`inline-block px-6 py-2 rounded-full font-semibold ${
              submission.status === 'approved' ? 'bg-green-100 text-green-800' :
              submission.status === 'pending' ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'
            }`}>
              {submission.status.toUpperCase()}
            </div>
          </div>

          {/* Submission Details */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Application Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Submission ID</p>
                <p className="text-lg font-semibold text-gray-900">{submission.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-lg font-semibold text-gray-900">{submission.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-900">{submission.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Mobile</p>
                <p className="text-lg font-semibold text-gray-900">{submission.mobile}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Exam Type</p>
                <p className="text-lg font-semibold text-gray-900">{submission.examType}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Duration</p>
                <p className="text-lg font-semibold text-gray-900">{submission.duration}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Timing Preference</p>
                <p className="text-lg font-semibold text-gray-900">{submission.timingPreference}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Submitted</p>
                <p className="text-lg font-semibold text-gray-900">{formatDate(submission.submittedAt)}</p>
              </div>
              {submission.subscriptionStartDate && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Subscription Start</p>
                  <p className="text-lg font-semibold text-gray-900">{formatDate(submission.subscriptionStartDate)}</p>
                </div>
              )}
              {submission.subscriptionEndDate && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Subscription End</p>
                  <p className="text-lg font-semibold text-gray-900">{formatDate(submission.subscriptionEndDate)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Status-specific messages */}
          {submission.status === 'approved' && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-green-800 mb-3">🎉 Congratulations!</h3>
              <p className="text-green-700 mb-4">
                Your seat booking has been approved! You will receive detailed instructions via email and SMS within the next few hours.
              </p>
              <div className="space-y-2 text-green-700">
                <p>• Seat assignment details will be sent to your email</p>
                <p>• Payment instructions will be provided</p>
                <p>• Library access card will be issued on your first visit</p>
              </div>
              
              {submission.subscriptionEndDate && (
                <div className="mt-4 p-4 bg-white rounded-xl border border-green-300">
                  <h4 className="font-bold text-green-800 mb-2">📅 Subscription Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700">
                    <div>
                      <p className="font-medium">Start Date:</p>
                      <p>{formatDate(submission.subscriptionStartDate!)}</p>
                    </div>
                    <div>
                      <p className="font-medium">End Date:</p>
                      <p>{formatDate(submission.subscriptionEndDate)}</p>
                    </div>
                    <div>
                      <p className="font-medium">Duration:</p>
                      <p>{submission.duration}</p>
                    </div>
                    <div>
                      <p className="font-medium">Status:</p>
                      <p className="font-bold text-green-600">Active</p>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-orange-800 font-medium">
                      ⚠️ Renewal Reminder: You'll receive email and SMS notifications 7 days before your subscription expires.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {submission.status === 'pending' && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-orange-800 mb-3">⏳ Under Review</h3>
              <p className="text-orange-700">
                Your application is currently being reviewed by our admin team. You will receive an update within 24 hours.
              </p>
            </div>
          )}

          {submission.status === 'rejected' && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-bold text-red-800 mb-3">❌ Application Rejected</h3>
              <p className="text-red-700">
                Unfortunately, your application could not be approved at this time. Please contact our support team for more information.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {submission.status === 'approved' && submission.subscriptionEndDate && (
              <Link
                href={`/renewal?id=${submission.id}`}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold text-center"
              >
                Renew Subscription
              </Link>
            )}
            <Link
              href="/register"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold text-center"
            >
              New Registration
            </Link>
            <Link
              href="/"
              className="bg-white border border-orange-200 text-orange-600 px-8 py-3 rounded-xl hover:bg-orange-50 transition-all duration-200 font-semibold text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
