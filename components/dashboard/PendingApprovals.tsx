'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Mail, Phone, User, Calendar, BookOpen } from 'lucide-react';

interface PendingSubmission {
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

export default function PendingApprovals() {
  const [pendingSubmissions, setPendingSubmissions] = useState<PendingSubmission[]>([]);
  const [approvedSubmissions, setApprovedSubmissions] = useState<PendingSubmission[]>([]);

  useEffect(() => {
    // Load pending submissions from localStorage
    const submissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    const pending = submissions.filter((s: PendingSubmission) => s.status === 'pending');
    const approved = submissions.filter((s: PendingSubmission) => s.status === 'approved');
    setPendingSubmissions(pending);
    setApprovedSubmissions(approved);
  }, []);

  const calculateSubscriptionEndDate = (duration: string) => {
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

  const handleApprove = (submissionId: string) => {
    const submissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    const submissionToApprove = submissions.find((s: PendingSubmission) => s.id === submissionId);
    
    if (!submissionToApprove) return;
    
    const approvedAt = new Date().toISOString();
    const subscriptionStartDate = approvedAt;
    const subscriptionEndDate = calculateSubscriptionEndDate(submissionToApprove.duration);
    
    const updatedSubmissions = submissions.map((s: PendingSubmission) => 
      s.id === submissionId 
        ? { 
            ...s, 
            status: 'approved', 
            approvedAt,
            subscriptionStartDate,
            subscriptionEndDate: subscriptionEndDate.toISOString(),
            renewalReminderSent: false,
            expiryNotificationSent: false
          }
        : s
    );
    localStorage.setItem('pendingSubmissions', JSON.stringify(updatedSubmissions));
    
    // Update local state
    const pending = updatedSubmissions.filter((s: PendingSubmission) => s.status === 'pending');
    const approved = updatedSubmissions.filter((s: PendingSubmission) => s.status === 'approved');
    setPendingSubmissions(pending);
    setApprovedSubmissions(approved);
    
    // Simulate sending confirmation email
    console.log(`Confirmation email sent to: ${submissionToApprove.email}`);
    console.log(`Subscription Details:`, {
      startDate: subscriptionStartDate,
      endDate: subscriptionEndDate.toISOString(),
      duration: submissionToApprove.duration
    });
  };

  const handleReject = (submissionId: string) => {
    const submissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    const updatedSubmissions = submissions.map((s: PendingSubmission) => 
      s.id === submissionId 
        ? { ...s, status: 'rejected' }
        : s
    );
    localStorage.setItem('pendingSubmissions', JSON.stringify(updatedSubmissions));
    
    // Update local state
    const pending = updatedSubmissions.filter((s: PendingSubmission) => s.status === 'pending');
    setPendingSubmissions(pending);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Pending Approvals */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Clock className="w-6 h-6 text-orange-600 mr-2" />
          Pending Approvals ({pendingSubmissions.length})
        </h2>
        
        {pendingSubmissions.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-200 text-center">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No pending approvals at the moment</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {pendingSubmissions.map((submission) => (
              <div key={submission.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{submission.name}</h3>
                      <p className="text-orange-600 font-medium">ID: {submission.id}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApprove(submission.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleReject(submission.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{submission.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{submission.mobile}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{submission.examType}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{submission.duration} - {submission.timingPreference}</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  Submitted: {formatDate(submission.submittedAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recently Approved */}
      {approvedSubmissions.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            Recently Approved ({approvedSubmissions.length})
          </h2>
          
          <div className="grid gap-4">
            {approvedSubmissions.slice(0, 5).map((submission) => (
              <div key={submission.id} className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-green-800">{submission.name}</p>
                    <p className="text-green-600 text-sm">ID: {submission.id}</p>
                    {submission.subscriptionEndDate && (
                      <p className="text-green-600 text-sm">
                        Expires: {formatDate(submission.subscriptionEndDate)}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-green-600">
                    Approved: {submission.approvedAt ? formatDate(submission.approvedAt) : 'Recently'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
