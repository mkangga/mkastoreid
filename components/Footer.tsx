
import React from 'react';
import { ShoppingBag, MessageCircle, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { config } from '../siteConfig';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark border-t border-white/5 pt-20 pb-10 mt-auto relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center group">
              {config.logoUrl ? (
                <img 
                  src={config.logoUrl} 
                  alt={config.name} 
                  className="h-12 w-auto object-contain transition-opacity group-hover:opacity-80"
                />
              ) : (
                <>
                  <div className="bg-brand-primary p-2.5 rounded-xl mr-3 shadow-lg shadow-brand-primary/20">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white font-heading tracking-tight">
                    {config.name}
                  </span>
                </>
              )}
            </Link>
            <p className="text-brand-muted leading-relaxed text-sm">
              Platform layanan produk digital terpercaya dengan harga terjangkau dan pelayanan terbaik. Solusi cepat untuk kebutuhan digital Anda.
            </p>
          </div>

          {/* Quick Links (Menu) */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white font-heading">Menu Utama</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-brand-muted hover:text-brand-primary transition-colors text-sm font-medium flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-brand-muted group-hover:bg-brand-primary transition-colors"></span>
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-brand-muted hover:text-brand-primary transition-colors text-sm font-medium flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-brand-muted group-hover:bg-brand-primary transition-colors"></span>
                  Produk
                </Link>
              </li>
              <li>
                <Link to="/payment" className="text-brand-muted hover:text-brand-primary transition-colors text-sm font-medium flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-brand-muted group-hover:bg-brand-primary transition-colors"></span>
                  Metode Pembayaran
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-brand-muted hover:text-brand-primary transition-colors text-sm font-medium flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-brand-muted group-hover:bg-brand-primary transition-colors"></span>
                  Hubungi Admin
                </Link>
              </li>
               <li>
                <Link to="/reseller" className="text-brand-accent font-bold hover:text-white transition-colors text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
                  Gabung Reseller 🚀
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Links (Bantuan) */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white font-heading">Bantuan</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/status" className="text-brand-muted hover:text-brand-primary transition-colors text-sm font-medium flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-brand-muted group-hover:bg-brand-primary transition-colors"></span>
                  Cek Status Pesanan
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="text-brand-muted hover:text-brand-primary transition-colors text-sm font-medium flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-brand-muted group-hover:bg-brand-primary transition-colors"></span>
                  Cara Klaim Garansi
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-brand-muted hover:text-brand-primary transition-colors text-sm font-medium flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-brand-muted group-hover:bg-brand-primary transition-colors"></span>
                  FAQ (Tanya Jawab)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white font-heading">Hubungi Kami</h3>
            <div className="space-y-4">
              <a 
                href={`https://wa.me/${config.whatsappNumber}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-start space-x-3 text-brand-muted hover:text-white group transition-colors p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10"
              >
                <div className="bg-green-500/20 p-2 rounded-lg text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-brand-muted mb-0.5">WhatsApp Support</p>
                  <p className="text-sm font-bold text-white">+{config.whatsappNumber}</p>
                </div>
              </a>
              
              <div className="flex items-center space-x-3 text-brand-muted text-sm">
                <Clock className="w-5 h-5 text-brand-primary" />
                <span>{config.footer.hours}</span>
              </div>
              <div className="flex items-center space-x-3 text-brand-muted text-sm">
                <MapPin className="w-5 h-5 text-brand-primary" />
                <span>Indonesia (Online Store)</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-muted text-sm">
            &copy; {currentYear} <span className="text-white font-semibold">{config.name}</span>. All rights reserved.
          </p>
          <p className="text-brand-muted text-xs text-center md:text-right max-w-md">
            {config.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};
