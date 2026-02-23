import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Crown, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { config } from '../siteConfig';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=60&w=800', // Tech/Chip/Digital
    title: 'Solusi Digital Terlengkap',
    subtitle: 'Nikmati layanan streaming, aplikasi premium, hingga kebutuhan PPOB dengan harga termurah.',
    buttonText: 'Belanja Sekarang',
    link: '/products',
    icon: Zap,
    color: 'from-blue-600 to-cyan-500'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=60&w=800', // Streaming/Apps
    title: 'Akun Premium Murah',
    subtitle: 'Netflix, Spotify, YouTube Premium, dan lainnya. Garansi full, anti hold.',
    buttonText: 'Lihat Katalog',
    link: '/products',
    icon: Crown,
    color: 'from-purple-600 to-pink-500'
  },
  {
    id: 3,
    image: 'https://i.ibb.co.com/ZbR8ndc/33087436-be7a-4ed3-b7f4-d5d56f6eb01d-20260223-093451-0000.png', // Mobile/PPOB Custom
    title: 'Isi Pulsa & Token 24 Jam',
    subtitle: 'Transaksi otomatis detik itu juga. Pulsa, Data, Token PLN, E-Wallet lengkap.',
    buttonText: 'Isi Sekarang',
    link: '/products',
    icon: Smartphone,
    color: 'from-green-500 to-emerald-400'
  }
];

export const HeroCarousel: React.FC = () => {
  return (
    <section className="relative h-[600px] lg:h-[700px] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full bg-slate-950">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-950/70 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-md"
                >
                  <slide.icon className={`w-4 h-4 text-white`} />
                  <span className="text-white text-xs font-bold tracking-wide uppercase">
                    {config.name} Featured
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight font-heading drop-shadow-2xl"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light"
                >
                  {slide.subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex flex-col sm:flex-row justify-center gap-4"
                >
                  <Link
                    to={slide.link}
                    className={`group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-300 bg-gradient-to-r ${slide.color} rounded-full hover:shadow-lg hover:shadow-brand-primary/40 hover:-translate-y-1 active:scale-95`}
                  >
                    {slide.buttonText}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom CSS for Swiper Pagination/Navigation overrides if needed */}
      <style>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #fff;
          width: 24px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        .swiper-button-next, .swiper-button-prev {
          color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(2px);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 12px;
          font-weight: bold;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
          transform: scale(1.1);
          border-color: rgba(255, 255, 255, 0.2);
        }
        @media (max-width: 640px) {
          .swiper-button-next, .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};
