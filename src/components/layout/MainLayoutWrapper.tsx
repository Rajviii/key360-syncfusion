'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { RouteGuard } from '@/components/auth/RouteGuard';
import { Header } from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

export const MainLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  const isFullBleedScreen = pathname === '/login' || pathname === '/select-site';

  return (
    <RouteGuard>
      {isFullBleedScreen ? (
        <div className="min-h-screen w-full">{children}</div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-3 sm:p-5 lg:p-8 min-w-0 w-full overflow-x-hidden">
              {children}
            </main>
          </div>
        </div>
      )}
    </RouteGuard>
  );
};
