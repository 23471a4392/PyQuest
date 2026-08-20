import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  currentRoute,
  onNavigate,
  children
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-amber-400 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-row">
        <Sidebar
          currentRoute={currentRoute}
          onNavigate={onNavigate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 flex flex-col overflow-y-auto px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
