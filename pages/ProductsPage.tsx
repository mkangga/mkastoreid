import React from 'react';
import { ProductList } from '../components/ProductList';
import { PageTransition } from '../components/PageTransition';

export const ProductsPage: React.FC = () => {
  return (
    <PageTransition className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-2">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Semua Produk</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Pilih paket premium, top up game, pulsa, atau bayar tagihan sesuai kebutuhanmu.
        </p>
      </div>
      <ProductList showTitle={false} />
    </PageTransition>
  );
};