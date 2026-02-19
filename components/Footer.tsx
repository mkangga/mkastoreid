import React from 'react';
import { ShoppingBag, MessageCircle, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { config } from '../siteConfig';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center group">
              {config.logoUrl ? (
                <img 
                  src={config.logoUrl} 
                  alt={config.name} 
                  className="h-14 w-auto object-contain transition-opacity group-hover:opacity-80"
                />
              ) : (
                <>
                  <div className="bg-brand-primary p-2 rounded-lg mr-2">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">
                    {config.name}
                  </span>
                </>
              )}
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Platform layanan produk digital terpercaya dengan harga terjangkau dan pelayanan terbaik.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Hubungi Kami</h3>
            <div className="flex items-start space-x-3 text-slate-400">
              <MessageCircle className="w-5 h-5 text-brand-primary mt-0.5" />
              <a 
                href={`https://wa.me/${config.whatsappNumber}`} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-brand-accent transition-colors"
              >
                +{config.whatsappNumber} (WhatsApp)
              </a>
            </div>
            <div className="flex items-start space-x-3 text-slate-400">
              <Clock className="w-5 h-5 text-brand-primary mt-0.5" />
              <span>{config.footer.hours}</span>
            </div>
            <div className="flex items-start space-x-3 text-slate-400">
              <MapPin className="w-5 h-5 text-brand-primary mt-0.5" />
              <span>Indonesia (Online Store)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Menu Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-slate-400 hover:text-brand-accent transition-colors">
                  Produk
                </Link>
              </li>
              <li>
                <Link to="/payment" className="text-slate-400 hover:text-brand-accent transition-colors">
                  Metode Pembayaran
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-brand-accent transition-colors">
                  Hubungi Admin
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-brand-accent transition-colors">
                  Beranda
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} {config.name}. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs mt-2 md:mt-0 max-w-md text-center md:text-right">
            {config.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};