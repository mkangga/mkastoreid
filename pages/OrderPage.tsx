import React from 'react';
import { OrderForm } from '../components/OrderForm';

export const OrderPage: React.FC = () => {
  return (
    <div className="page-enter pt-24 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Selesaikan Pesanan</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Isi detail pesananmu di bawah ini untuk terhubung dengan admin kami.
        </p>
      </div>
      <OrderForm />
    </div>
  );
};