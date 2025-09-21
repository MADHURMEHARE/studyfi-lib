'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, AlertTriangle, Mail, Phone, User, RefreshCw, Bell } from 'lucide-react';

interface Subscription {
  id: string;
  name: string;
  email: string;
  mobile: string;
  examType: string;
  duration: string;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  renewalReminderSent: boolean;
  expiryNotificationSent: boolean;
  status: 'active' | 'expiring' | 'expired';
}

export default function SubscriptionManager() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'expiring' | 'expired'>('all');

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = () => {
    const submissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    const approvedSubmissions = submissions.filter((s: any) => s.status === 'approved' && s.subscriptionEndDate);
    
    const processedSubscriptions = approvedSubmissions.map((submission: any) => {
      const endDate = new Date(submission.subscriptionEndDate);
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

      return {
        ...submission,
        status,
        daysUntilExpiry
      };
    });

    setSubscriptions(processedSubscriptions);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const sendRenewalReminder = (subscription: Subscription) => {
    // Simulate sending renewal reminder
    console.log(`Renewal reminder sent to: ${subscription.email}`);
    console.log(`SMS sent to: ${subscription.mobile}`);
    
    // Update subscription to mark reminder as sent
    const submissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    const updatedSubmissions = submissions.map((s: any) => 
      s.id === subscription.id 
        ? { ...s, renewalReminderSent: true }
        : s
    );
    localStorage.setItem('pendingSubmissions', JSON.stringify(updatedSubmissions));
    
    // Reload subscriptions
    loadSubscriptions();
  };

  const sendExpiryNotification = (subscription: Subscription) => {
    // Simulate sending expiry notification
    console.log(`Expiry notification sent to: ${subscription.email}`);
    console.log(`SMS sent to: ${subscription.mobile}`);
    
    // Update subscription to mark notification as sent
    const submissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    const updatedSubmissions = submissions.map((s: any) => 
      s.id === subscription.id 
        ? { ...s, expiryNotificationSent: true }
        : s
    );
    localStorage.setItem('pendingSubmissions', JSON.stringify(updatedSubmissions));
    
    // Reload subscriptions
    loadSubscriptions();
  };

  const sendAllRenewalReminders = () => {
    const expiringSubscriptions = subscriptions.filter(s => s.status === 'expiring' && !s.renewalReminderSent);
    expiringSubscriptions.forEach(subscription => {
      sendRenewalReminder(subscription);
    });
  };

  const sendAllExpiryNotifications = () => {
    const expiredSubscriptions = subscriptions.filter(s => s.status === 'expired' && !s.expiryNotificationSent);
    expiredSubscriptions.forEach(subscription => {
      sendExpiryNotification(subscription);
    });
  };

  const filteredSubscriptions = subscriptions.filter(subscription => {
    if (filter === 'all') return true;
    return subscription.status === filter;
  });

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
      case 'active': return <Calendar className="w-4 h-4" />;
      case 'expiring': return <Clock className="w-4 h-4" />;
      case 'expired': return <AlertTriangle className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Stats */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <RefreshCw className="w-6 h-6 text-orange-600 mr-2" />
            Subscription Management
          </h2>
          <button
            onClick={loadSubscriptions}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-green-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-green-600">Active</p>
                <p className="text-2xl font-bold text-green-800">
                  {subscriptions.filter(s => s.status === 'active').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-orange-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-orange-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-orange-800">
                  {subscriptions.filter(s => s.status === 'expiring').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-red-600">Expired</p>
                <p className="text-2xl font-bold text-red-800">
                  {subscriptions.filter(s => s.status === 'expired').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center">
              <Bell className="w-8 h-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-600">Total</p>
                <p className="text-2xl font-bold text-blue-800">{subscriptions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={sendAllRenewalReminders}
            disabled={subscriptions.filter(s => s.status === 'expiring' && !s.renewalReminderSent).length === 0}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Mail className="w-4 h-4" />
            <span>Send Renewal Reminders</span>
          </button>
          
          <button
            onClick={sendAllExpiryNotifications}
            disabled={subscriptions.filter(s => s.status === 'expired' && !s.expiryNotificationSent).length === 0}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Send Expiry Notifications</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-orange-200">
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'All Subscriptions' },
            { key: 'active', label: 'Active' },
            { key: 'expiring', label: 'Expiring Soon' },
            { key: 'expired', label: 'Expired' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                filter === key
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-4">
        {filteredSubscriptions.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-200 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No subscriptions found</p>
          </div>
        ) : (
          filteredSubscriptions.map((subscription) => (
            <div key={subscription.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{subscription.name}</h3>
                    <p className="text-orange-600 font-medium">ID: {subscription.id}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 ${getStatusColor(subscription.status)}`}>
                    {getStatusIcon(subscription.status)}
                    <span>{subscription.status.toUpperCase()}</span>
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{subscription.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{subscription.mobile}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">Start: {formatDate(subscription.subscriptionStartDate)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">End: {formatDate(subscription.subscriptionEndDate)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {subscription.duration} subscription • {subscription.examType}
                </div>
                
                <div className="flex space-x-2">
                  {subscription.status === 'expiring' && !subscription.renewalReminderSent && (
                    <button
                      onClick={() => sendRenewalReminder(subscription)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2 text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Reminder</span>
                    </button>
                  )}
                  
                  {subscription.status === 'expired' && !subscription.expiryNotificationSent && (
                    <button
                      onClick={() => sendExpiryNotification(subscription)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2 text-sm"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span>Send Notification</span>
                    </button>
                  )}
                  
                  {(subscription.renewalReminderSent || subscription.expiryNotificationSent) && (
                    <span className="text-green-600 text-sm font-medium flex items-center space-x-1">
                      <Bell className="w-4 h-4" />
                      <span>Notification Sent</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

