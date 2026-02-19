import React from 'react';
import { FAQ } from '../components/FAQ';

export const FAQPage: React.FC = () => {
  return (
    <div className="page-enter pt-20 min-h-screen bg-slate-950">
      {/* Menggunakan komponen FAQ yang sudah ada */}
      <FAQ />
    </div>
  );
};