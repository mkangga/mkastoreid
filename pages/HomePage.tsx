
import React from 'react';
import { HeroCarousel } from '../components/HeroCarousel';
import { Features } from '../components/Features';
import { ProductCarousel } from '../components/ProductCarousel';
import { PriceComparison } from '../components/PriceComparison';
import { Bundles } from '../components/Bundles';
import { Testimonials } from '../components/Testimonials';
import { QuickAccess } from '../components/QuickAccess';
import { ResellerPromo } from '../components/ResellerPromo';
import { PageTransition } from '../components/PageTransition';

export const HomePage: React.FC = () => {
  return (
    <PageTransition>
      <HeroCarousel />
      <QuickAccess />
      <ProductCarousel />
      {/* ResellerPromo ditempatkan setelah ProductCarousel agar user yang merasa harga normal masih mahal langsung melihat opsi reseller */}
      <ResellerPromo />
      <Bundles />
      <PriceComparison />
      <Testimonials />
      <Features />
    </PageTransition>
  );
};
