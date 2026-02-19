
export interface Product {
  id: string;
  name: string;
  description: string;
  priceStart?: string; // Optional starting price text
  imageUrl: string;
  whatsappMessage: string;
  badge?: string; // e.g. "Best Seller"
  category: 'Film & Series' | 'Musik' | 'Produktivitas' | 'Lainnya';
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: 'shield' | 'zap' | 'check';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SiteConfig {
  name: string;
  logoUrl?: string; // Optional URL logo
  whatsappNumber: string; // Format: 628...
  status: {
    isOnline: boolean; // True = Online, False = Offline
    onlineMessage: string;
    offlineMessage: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  footer: {
    disclaimer: string;
    hours: string;
  };
}
