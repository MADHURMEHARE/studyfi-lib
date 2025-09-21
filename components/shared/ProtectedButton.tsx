'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import toast from 'react-hot-toast';

interface ProtectedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  redirectTo?: string;
  message?: string;
}

export default function ProtectedButton({ 
  children, 
  onClick, 
  className = '', 
  redirectTo = '/login',
  message = 'Please login to access this feature'
}: ProtectedButtonProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (isAuthenticated) {
      if (onClick) {
        onClick();
      }
    } else {
      toast.error(message);
      router.push(redirectTo);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}
