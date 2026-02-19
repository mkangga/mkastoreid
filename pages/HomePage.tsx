import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { ProductCarousel } from '../components/ProductCarousel';

export const HomePage: React.FC = () => {
  return (
    <div className="page-enter">
      <Hero />
      <ProductCarousel />
      <Features />
    </div>
  );
};