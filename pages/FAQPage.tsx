import React from 'react';
import { FAQ } from '../components/FAQ';
import { PageTransition } from '../components/PageTransition';

export const FAQPage: React.FC = () => {
  return (
    <PageTransition className="pt-20 min-h-screen bg-slate-950">
      {/* Menggunakan komponen FAQ yang sudah ada */}
      <FAQ />
    </PageTransition>
  );
};