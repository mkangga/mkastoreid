
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Home, Phone, Grid, CreditCard, HelpCircle } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { config } from '../siteConfig';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Style untuk link desktop
  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `font-medium text-sm tracking-wide transition-all duration-300 hover:text-white relative group py-2 ${
      isActive ? 'text-brand-accent' : 'text-slate-300'
    }`;

  // Komponen Underline Animasi (Desktop)
  const Underline = ({ isActive }: { isActive: boolean }) => (
    <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-accent transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
  );

  // Style untuk link mobile bottom nav
  const bottomNavClass = ({ isActive }: { isActive: boolean }) => 
    `flex flex-col items-center justify-center w-full h-full transition-colors duration-200 active:scale-95 ${
      isActive ? 'text-brand-accent' : 'text-slate-400 hover:text-slate-200'
    }`;

  // Status Badge Component (Reusable)
  const StatusBadge = () => (
    <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ml-4 transition-all ${
      config.status.isOnline 
        ? 'bg-green-500/10 border-green-500/20 text-green-500' 
        : 'bg-red-500/10 border-red-500/20 text-red-500'
    }`}>
      <span className="relative flex h-2 w-2">
        {config.status.isOnline && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.status.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
      </span>
      {config.status.isOnline ? 'Online' : 'Offline'}
    </div>
  );

  return (
    <>
      {/* --- TOP HEADER (Logo & Desktop Menu) --- */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-dark/90 backdrop-blur-md border-b border-slate-800 py-3 shadow-lg'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* LOGO & STATUS */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2 group z-50">
                {config.logoUrl ? (
                  <img 
                    src={config.logoUrl} 
                    alt={config.name} 
                    className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div className="bg-brand-primary p-1.5 rounded-lg group-hover:bg-brand-accent transition-colors">
                      <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">
                      {config.name}
                    </span>
                  </>
                )}
              </Link>
              
              {/* Status Badge (Desktop & Tablet) */}
              <StatusBadge />
            </div>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden md:flex items-center gap-6">
              <NavLink to="/" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    Beranda
                    <Underline isActive={isActive} />
                  </>
                )}
              </NavLink>
              <NavLink to="/products" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    Produk
                    <Underline isActive={isActive} />
                  </>
                )}
              </NavLink>
              <NavLink to="/reseller" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    Reseller
                    <Underline isActive={isActive} />
                    {/* New Badge */}
                    <span className="absolute -top-2 -right-3 text-[9px] bg-red-500 text-white px-1 rounded animate-pulse">New</span>
                  </>
                )}
              </NavLink>
              <NavLink to="/payment" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    Bayar
                    <Underline isActive={isActive} />
                  </>
                )}
              </NavLink>
              <NavLink to="/faq" className={navLinkClass}>
                {({ isActive }) => (
                  <>
                    FAQ
                    <Underline isActive={isActive} />
                  </>
                )}
              </NavLink>
              
              {/* CTA Button */}
              <Link 
                to="/order" 
                className="ml-2 px-5 py-2 bg-slate-800 hover:bg-brand-primary text-white text-sm font-semibold rounded-full transition-all duration-300 border border-slate-700 hover:border-brand-primary hover:shadow-[0_0_15px_rgba(37,99,235,0.4)]"
              >
                Pesan
              </Link>
            </nav>

            {/* Mobile Status Dot (Visible only on mobile header) */}
            <div className="md:hidden flex items-center">
               <span className={`flex h-3 w-3 relative`}>
                {config.status.isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${config.status.isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* --- MOBILE BOTTOM NAVIGATION --- */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 z-50 h-[72px] pb-safe shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
        <div className="grid grid-cols-5 h-full">
          <NavLink to="/" className={bottomNavClass}>
            <Home size={22} strokeWidth={1.5} />
            <span className="text-[10px] font-medium mt-1">Beranda</span>
          </NavLink>
          <NavLink to="/products" className={bottomNavClass}>
            <Grid size={22} strokeWidth={1.5} />
            <span className="text-[10px] font-medium mt-1">Produk</span>
          </NavLink>
           <NavLink to="/payment" className={bottomNavClass}>
            <CreditCard size={22} strokeWidth={1.5} />
            <span className="text-[10px] font-medium mt-1">Bayar</span>
          </NavLink>
          <NavLink to="/faq" className={bottomNavClass}>
            <HelpCircle size={22} strokeWidth={1.5} />
            <span className="text-[10px] font-medium mt-1">FAQ</span>
          </NavLink>
          <NavLink to="/contact" className={bottomNavClass}>
            <Phone size={22} strokeWidth={1.5} />
            <span className="text-[10px] font-medium mt-1">Kontak</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};
