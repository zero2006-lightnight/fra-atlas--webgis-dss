'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import I18nProvider from '@/components/I18nProvider';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import DataCollectionForm from '@/components/DataCollectionForm';
import AdminPanel from '@/components/AdminPanel';
import { Toaster } from '@/components/ui/sonner';

// Dynamic imports with SSR disabled for components using browser APIs
const WebGISMap = dynamic(() => import('@/components/WebGISMap'), { ssr: false });
const SatelliteTimeline = dynamic(() => import('@/components/SatelliteTimeline'), { ssr: false });
const MLChangeDetection = dynamic(() => import('@/components/MLChangeDetection'), { ssr: false });

export default function Home() {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <I18nProvider>
      <div className="min-h-screen bg-background">
        <Navigation activeView={activeView} onViewChange={setActiveView} />
        
        <main className="container mx-auto px-4 py-8">
          {activeView === 'dashboard' && <Dashboard />}
          
          {activeView === 'map' && (
            <div className="space-y-6">
              <WebGISMap />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SatelliteTimeline />
                <MLChangeDetection />
              </div>
            </div>
          )}
          
          {activeView === 'data-collection' && <DataCollectionForm />}
          
          {activeView === 'admin' && <AdminPanel />}
        </main>
        
        <Toaster />
      </div>
    </I18nProvider>
  );
}