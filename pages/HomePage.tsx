
import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { ProductCarousel } from '../components/ProductCarousel';
import { PriceComparison } from '../components/PriceComparison';
import { Bundles } from '../components/Bundles';
import { Testimonials } from '../components/Testimonials';
import { QuickAccess } from '../components/QuickAccess';
import { ResellerPromo } from '../components/ResellerPromo';

export const HomePage: React.FC = () => {
  return (
    <div className="page-enter">
      <Hero />
      <QuickAccess />
      <ProductCarousel />
      {/* ResellerPromo ditempatkan setelah ProductCarousel agar user yang merasa harga normal masih mahal langsung melihat opsi reseller */}
      <ResellerPromo />
      <Bundles />
      <PriceComparison />
      <Testimonials />
      <Features />
    </div>
  );
};
