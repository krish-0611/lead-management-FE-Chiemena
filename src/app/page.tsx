'use client';

import { useState } from 'react';
import LeadForm from '@/components/LeadForm';
import LeadList from '@/components/LeadList';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddLead = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Lead Manager
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Efficiently manage and track your business leads in one place
          </p>
        </div>
        <div className="grid gap-8 md:gap-12">
          <div className="w-full max-w-2xl mx-auto">
            <LeadForm onAddLead={handleAddLead} />
          </div>
          <LeadList key={refreshKey} />
        </div>
      </div>
    </div>
  );
}
