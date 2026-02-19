import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { products } from '../siteConfig';

export const ProductCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // isDown: Mouse ditekan (untuk styling cursor)
  // isDragging: Mouse digerakkan setelah ditekan (untuk mematikan event klik pada anak elemen)
  const [isDown, setIsDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Fungsi scroll tombol manual
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Scroll sebesar lebar item + gap
      const scrollAmount = direction === 'left' ? -350 : 350;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // --- Mouse Drag Handlers ---

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setIsDragging(false); // Reset status dragging saat klik dimulai
    // Catat posisi awal mouse dan posisi scroll saat ini
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
    // Delay kecil untuk memastikan event click tidak terblokir jika hanya klik biasa,
    // tapi tetap terblokir jika sehabis dragging (karena pointer-events-none aktif saat dragging).
    setTimeout(() => setIsDragging(false), 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    
    // Hitung pergeseran
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Multiplier kecepatan scroll
    
    // Aktifkan mode dragging hanya jika pergeseran > 5px
    // Ini mencegah 'klik' dianggap sebagai 'drag'
    if (Math.abs(x - startX.current) > 5) {
      setIsDragging(true);
    }
    
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className="py-20 bg-brand-dark relative border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Produk Terlaris
            </h2>
            <p className="text-slate-400 max-w-xl">
              Pilihan favorit pelanggan kami bulan ini.
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-3 rounded-full border border-slate-700 hover:bg-slate-800 text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
              aria-label="Geser Kiri"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-brand-primary text-white hover:bg-blue-600 transition-colors shadow-lg shadow-brand-primary/25 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary focus:ring-offset-brand-dark"
              aria-label="Geser Kanan"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className={`flex gap-6 overflow-x-auto scrollbar-hide pb-12 -mx-4 px-4 sm:mx-0 sm:px-0 select-none ${
            isDown ? 'cursor-grabbing snap-none' : 'cursor-grab snap-x snap-mandatory'
          }`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              // pointer-events-none hanya aktif jika benar-benar sedang di-drag (gerak > 5px)
              // ini memungkinkan klik tombol jika user hanya melakukan klik tanpa geser
              className={`snap-center shrink-0 w-[85vw] sm:w-[350px] md:w-[380px] ${isDragging ? 'pointer-events-none' : ''}`}
            >
              <div className="h-full">
                <ProductCard product={product} />
              </div>
            </div>
          ))}
          
          {/* "See All" Card at the end */}
          <div className={`snap-center shrink-0 w-[85vw] sm:w-[350px] md:w-[380px] flex ${isDragging ? 'pointer-events-none' : ''}`}>
            <Link 
              to="/products"
              className="w-full bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-brand-accent hover:border-brand-accent hover:bg-slate-900 transition-all group"
              draggable="false"
            >
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-brand-accent/10 transition-colors">
                <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="text-lg font-bold">Lihat Semua Produk</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};