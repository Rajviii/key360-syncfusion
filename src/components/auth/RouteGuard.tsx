'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface RouteGuardProps {
  children: React.ReactNode;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const { isAuthenticated, selectedSite, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const isPublicPath = pathname === '/login';
    const isSelectSitePath = pathname === '/select-site';

    if (!isAuthenticated) {
      if (!isPublicPath) {
        router.replace('/login');
      }
    } else {
      // User is authenticated
      if (!selectedSite) {
        if (!isSelectSitePath) {
          router.replace('/select-site');
        }
      } else {
        // User is authenticated and site is selected
        if (isPublicPath) {
          router.replace('/dashboard');
        }
      }
    }
  }, [isAuthenticated, selectedSite, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-xs text-zinc-500 font-medium">Initializing KEY360 Portal...</p>
        </div>
      </div>
    );
  }

  // Prevent flash of unauthenticated / unselected site content
  const isPublicPath = pathname === '/login';
  const isSelectSitePath = pathname === '/select-site';

  if (!isAuthenticated && !isPublicPath) {
    return null;
  }

  if (isAuthenticated && !selectedSite && !isSelectSitePath && !isPublicPath) {
    return null;
  }

  return <>{children}</>;
};
