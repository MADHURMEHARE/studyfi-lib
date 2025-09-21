'use client';

import { useEffect } from 'react';

interface Subscription {
  id: string;
  name: string;
  email: string;
  mobile: string;
  subscriptionEndDate: string;
  renewalReminderSent: boolean;
  expiryNotificationSent: boolean;
}

export default function NotificationSystem() {
  useEffect(() => {
    const checkAndSendNotifications = () => {
      const submissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
      const activeSubscriptions = submissions.filter((s: any) => 
        s.status === 'approved' && s.subscriptionEndDate
      );

      const now = new Date();
      
      // Check for subscriptions expiring in 7 days (renewal reminders)
      const expiringSubscriptions = activeSubscriptions.filter((sub: any) => {
        const endDate = new Date(sub.subscriptionEndDate);
        const daysUntilExpiry = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= 7 && daysUntilExpiry > 0 && !sub.renewalReminderSent;
      });

      // Check for expired subscriptions
      const expiredSubscriptions = activeSubscriptions.filter((sub: any) => {
        const endDate = new Date(sub.subscriptionEndDate);
        const daysUntilExpiry = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= 0 && !sub.expiryNotificationSent;
      });

      // Send renewal reminders
      if (expiringSubscriptions.length > 0) {
        console.log('🔔 Sending renewal reminders to:', expiringSubscriptions.length, 'users');
        expiringSubscriptions.forEach((subscription: Subscription) => {
          console.log(`📧 Renewal reminder sent to ${subscription.name} (${subscription.email})`);
          console.log(`📱 SMS sent to ${subscription.mobile}`);
          
          // Update the submission to mark reminder as sent
          const updatedSubmissions = submissions.map((s: any) => 
            s.id === subscription.id 
              ? { ...s, renewalReminderSent: true }
              : s
          );
          localStorage.setItem('pendingSubmissions', JSON.stringify(updatedSubmissions));
        });
      }

      // Send expiry notifications
      if (expiredSubscriptions.length > 0) {
        console.log('🚨 Sending expiry notifications to:', expiredSubscriptions.length, 'users');
        expiredSubscriptions.forEach((subscription: Subscription) => {
          console.log(`📧 Expiry notification sent to ${subscription.name} (${subscription.email})`);
          console.log(`📱 SMS sent to ${subscription.mobile}`);
          
          // Update the submission to mark notification as sent
          const updatedSubmissions = submissions.map((s: any) => 
            s.id === subscription.id 
              ? { ...s, expiryNotificationSent: true }
              : s
          );
          localStorage.setItem('pendingSubmissions', JSON.stringify(updatedSubmissions));
        });
      }

      // Show admin dashboard notification
      if (expiringSubscriptions.length > 0 || expiredSubscriptions.length > 0) {
        showAdminNotification(expiringSubscriptions.length, expiredSubscriptions.length);
      }
    };

    const showAdminNotification = (expiringCount: number, expiredCount: number) => {
      // Create a notification element
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-orange-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
      notification.innerHTML = `
        <div class="flex items-center space-x-2">
          <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span class="text-orange-500 text-sm">🔔</span>
          </div>
          <div>
            <p class="font-semibold">Subscription Alerts</p>
            ${expiringCount > 0 ? `<p class="text-sm">${expiringCount} subscriptions expiring soon</p>` : ''}
            ${expiredCount > 0 ? `<p class="text-sm">${expiredCount} subscriptions expired</p>` : ''}
          </div>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      // Remove notification after 5 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 5000);
    };

    // Run notification check immediately
    checkAndSendNotifications();

    // Set up interval to check every hour (in a real app, this would be on the server)
    const interval = setInterval(checkAndSendNotifications, 60 * 60 * 1000);

    // Also check when the page becomes visible (user comes back to the tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAndSendNotifications();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}

