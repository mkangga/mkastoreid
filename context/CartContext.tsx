import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types';

interface CartItem {
  product: Product;
  quantity: number;
  formData?: Record<string, string>;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, formData?: Record<string, string>, quantity?: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, formData?: Record<string, string>, quantity: number = 1) => {
    setItems(prev => {
      // If formData is provided, we might want to treat it as a separate item if formData is different.
      // For simplicity, let's just add it as a new item if formData exists, or update quantity if it's identical.
      // But usually, users might want to add different numbers. Let's just add it as a new item if formData is present.
      // Actually, to avoid complexity, let's just add it as a new item if formData is present, or update if it matches.
      // Let's just use JSON.stringify to compare formData.
      const existing = prev.find(item => item.product.id === product.id && JSON.stringify(item.formData) === JSON.stringify(formData));
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id && JSON.stringify(item.formData) === JSON.stringify(formData)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, formData }];
    });
  };

  const removeFromCart = (indexToRemove: number) => {
    setItems(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
