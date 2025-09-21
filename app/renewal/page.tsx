'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { RefreshCw, Calendar, Clock, AlertTriangle, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface Subscription {
  id: string;
  name: string;
  email: string;
  mobile: string;
  examType: string;
  duration: string;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  status: 'active' | 'expiring' | 'expired';
  daysUntilExpiry: number;
}

export default function RenewalPage() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get('id');
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [renewalDuration, setRenewalDuration] = useState('Monthly');

  useEffect(() => {
    if (submissionId) {
      loadSubscription(submissionId);
    }
    setLoading(false);
  }, [submissionId]);

  const loadSubscription = (id: string) => {
    const submissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    const found = submissions.find((s: any) => s.id === id && s.status === 'approved');
    
    if (found) {
      const endDate = new Date(found.subscriptionEndDate);
      const now = new Date();
      const daysUntilExpiry = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      
      let status: 'active' | 'expiring' | 'expired';
      if (daysUntilExpiry < 0) {
        status = 'expired';
      } else if (daysUntilExpiry <= 7) {
        status = 'expiring';
      } else {
        status = 'active';
      }

      setSubscription({
        ...found,
        status,
        daysUntilExpiry
      });
    }
  };

  const handleRenewal = () => {
    if (!subscription) return;

    // Calculate new end date based on renewal duration
    const currentEndDate = new Date(subscription.subscriptionEndDate);
    let newEndDate = new Date(currentEndDate);
    
    switch (renewalDuration) {
      case 'Monthly':
        newEndDate.setMonth(newEndDate.getMonth() + 1);
        break;
      case 'Quarterly':
        newEndDate.setMonth(newEndDate.getMonth() + 3);
        break;
      case 'Yearly':
        newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        break;
    }

    // Update the subscription
    const submissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    const updatedSubmissions = submissions.map((s: any) => 
      s.id === subscription.id 
        ? { 
            ...s, 
            subscriptionEndDate: newEndDate.toISOString(),
            duration: renewalDuration,
            renewalReminderSent: false,
            expiryNotificationSent: false
          }
        : s
    );
    localStorage.setItem('pendingSubmissions', JSON.stringify(updatedSubmissions));

    // Show success message
    alert(`Subscription renewed successfully! New end date: ${newEndDate.toLocaleDateString()}`);
    
    // Reload subscription data
    loadSubscription(subscription.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'expiring': return 'text-orange-600 bg-orange-100';
      case 'expired': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Calendar className="w-5 h-5" />;
      case 'expiring': return <Clock className="w-5 h-5" />;
      case 'expired': return <AlertTriangle className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-red-200 text-center">
            <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Subscription Not Found</h1>
            <p className="text-xl text-gray-700 mb-8">
              The subscription you're looking for doesn't exist or has been removed.
            </p>
            <Link
              href="/"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold inline-flex items-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
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
          <h1 className="text-4xl font-bold text-gray-900">Subscription Renewal</h1>
          <p className="text-xl text-gray-600 mt-2">Renew your library subscription</p>
        </div>

        {/* Current Subscription Status */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-orange-200 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Current Subscription</h2>
            <span className={`px-4 py-2 rounded-full font-semibold flex items-center space-x-2 ${getStatusColor(subscription.status)}`}>
              {getStatusIcon(subscription.status)}
              <span>{subscription.status.toUpperCase()}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-lg font-semibold text-gray-900">{subscription.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{subscription.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Exam Type</p>
                  <p className="text-lg font-semibold text-gray-900">{subscription.examType}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dates</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Start Date</p>
                  <p className="text-lg font-semibold text-gray-900">{formatDate(subscription.subscriptionStartDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">End Date</p>
                  <p className="text-lg font-semibold text-gray-900">{formatDate(subscription.subscriptionEndDate)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Days Remaining</p>
                  <p className={`text-lg font-semibold ${
                    subscription.daysUntilExpiry < 0 ? 'text-red-600' :
                    subscription.daysUntilExpiry <= 7 ? 'text-orange-600' :
                    'text-green-600'
                  }`}>
                    {subscription.daysUntilExpiry < 0 ? 'Expired' : `${subscription.daysUntilExpiry} days`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status-specific alerts */}
          {subscription.status === 'expiring' && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <p className="text-orange-800 font-semibold">
                  Your subscription expires in {subscription.daysUntilExpiry} days. Renew now to continue uninterrupted access.
                </p>
              </div>
            </div>
          )}

          {subscription.status === 'expired' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <p className="text-red-800 font-semibold">
                  Your subscription has expired. Renew now to regain access to the library.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Renewal Options */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-orange-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Renewal Options</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { duration: 'Monthly', price: '₹400', description: '1 month extension' },
              { duration: 'Quarterly', price: '₹1000', description: '3 months extension' },
              { duration: 'Yearly', price: '₹3500', description: '12 months extension' }
            ].map((option) => (
              <div
                key={option.duration}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  renewalDuration === option.duration
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                }`}
                onClick={() => setRenewalDuration(option.duration)}
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{option.duration}</h3>
                  <p className="text-3xl font-bold text-orange-600 mb-2">{option.price}</p>
                  <p className="text-gray-600">{option.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={handleRenewal}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold text-lg flex items-center space-x-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Renew Subscription</span>
            </button>
            <p className="text-gray-600 mt-4">
              Renewal will extend your current subscription end date
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

