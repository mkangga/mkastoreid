
import { SiteConfig, Product, Feature, FAQItem } from './types';

// =====================================================================
// PANDUAN EDIT (EDIT GUIDE):
// Ubah data di bawah ini untuk menyesuaikan isi website.
// =====================================================================

export const config: SiteConfig = {
  name: "MKA Store",
  // Ganti URL di bawah ini dengan URL gambar logomu (bisa path lokal atau link online)
  logoUrl: "https://i.ibb.co.com/23LzsdJ1/logo-mkastore-no-bg.png", 
  whatsappNumber: "62895349021354", // Nomor WhatsApp admin (Gunakan kode negara 62)
  
  // --- PENGATURAN STATUS ADMIN ---
  // Ubah isOnline: true (jika mau jualan) atau false (jika mau tutup/istirahat)
  status: {
    isOnline: true, 
    onlineMessage: "Admin Online • Fast Respon ⚡",
    offlineMessage: "Admin Offline • Slow Respon 💤",
  },
  
  hero: {
    title: "MKA Store",
    subtitle: "Solusi Akun Premium Murah & Bergaransi",
    description: "Nikmati layanan streaming dan aplikasi premium favoritmu tanpa bikin kantong bolong. Aman, Cepat, dan Terpercaya.",
  },
  footer: {
    hours: "Senin - Minggu: 08.00 - 22.00 WIB",
    disclaimer: "Disclaimer: Produk yang kami jual adalah akun sharing/privat legal. Kami bukan afiliasi resmi dari brand terkait.",
  }
};

export const features: Feature[] = [
  {
    id: 1,
    title: "100% Aman & Legal",
    description: "Akun yang kami sediakan legal dan aman digunakan jangka panjang.",
    icon: 'shield'
  },
  {
    id: 2,
    title: "Proses Cepat",
    description: "Pesanan diproses segera setelah pembayaran terkonfirmasi.",
    icon: 'zap'
  },
  {
    id: 3,
    title: "Full Garansi",
    description: "Layanan purna jual terbaik dengan garansi sesuai durasi sewa.",
    icon: 'check'
  }
];

export const faqs: FAQItem[] = [
  {
    question: "Apakah akun ini legal dan aman?",
    answer: "Tentu saja. Kami hanya menjual akun legal yang dibayar resmi menggunakan kartu kredit/metode pembayaran sah. Bukan akun hasil hack atau carding, sehingga aman digunakan jangka panjang."
  },
  {
    question: "Bagaimana sistem garansinya?",
    answer: "Kami memberikan garansi full sesuai durasi sewa. Jika terjadi masalah (seperti back to free), cukup chat admin dengan menyertakan bukti pembelian, dan kami akan perbaiki atau ganti akun baru."
  },
  {
    question: "Berapa lama proses pengerjaannya?",
    answer: "Normalnya 5-10 menit setelah pembayaran terkonfirmasi jika admin sedang online. Maksimal 1x24 jam jika ada kendala sistem atau antrian padat."
  },
  {
    question: "Apakah bisa diperpanjang (Renewal)?",
    answer: "Sebagian besar produk bisa diperpanjang di akun yang sama (khusus Privat). Untuk akun Sharing, biasanya ganti akun setiap bulan. Silakan tanya admin untuk detail spesifik per produk."
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer: "Kami menerima pembayaran via QRIS (All E-Wallet & Mobile Banking), Transfer Bank (BRI dan SeaBank), dan E-Wallet (Dana, OVO, GoPay, ShopeePay dan LinkAja)."
  }
];

export const products: Product[] = [
  {
    id: 'netflix',
    name: 'Netflix Premium',
    description: 'Nonton film & series bebas iklan, kualitas 4K UHD.',
    priceStart: 'Mulai Rp 25rb/bulan',
    imageUrl: 'https://i.imgur.com/fEegJrC.png',
    whatsappMessage: 'Halo kak, mau beli akun Netflixnya, bisa minta pricelistnya?',
    badge: 'Best Seller',
    category: 'Film & Series'
  },
  {
    id: 'spotify',
    name: 'Spotify Premium',
    description: 'Dengar musik tanpa iklan, skip unlimited, offline mode.',
    priceStart: 'Mulai Rp 15rb/bulan',
    imageUrl: 'https://i.imgur.com/1b57Ych.png',
    whatsappMessage: 'Halo kak, mau beli akun Spotify Premiumnya, bisa minta pricelistnya?',
    category: 'Musik'
  },
  {
    id: 'youtube',
    name: 'YouTube Premium',
    description: 'Nonton tanpa iklan, background play, YouTube Music.',
    priceStart: 'Mulai Rp 10rb/bulan',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/YouTube_Premium_logo.svg/960px-YouTube_Premium_logo.svg.png?20180923014634',
    whatsappMessage: 'Halo kak, mau beli akun YouTube Premiumnya, bisa minta pricelistnya?',
    category: 'Film & Series'
  },
  {
    id: 'disney',
    name: 'Disney+ Hotstar',
    description: 'Film Disney, Marvel, Pixar, dan Star Wars terlengkap.',
    priceStart: 'Mulai Rp 20rb/bulan',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/1280px-Disney%2B_logo.svg.png?20250509231455',
    whatsappMessage: 'Halo kak, mau beli akun Disney+ nya, bisa minta pricelistnya?',
    category: 'Film & Series'
  },
  {
    id: 'canva',
    name: 'Canva Pro',
    description: 'Akses jutaan elemen premium, template, dan fitur ajaib.',
    priceStart: 'Mulai Rp 10rb/bulan',
    imageUrl: 'https://public.canva.site/logo/media/dfb96cc174513093cd6ed61489ccb750.svg',
    whatsappMessage: 'Halo kak, mau beli akun Canva Pro nya, bisa minta pricelistnya?',
    badge: 'Popular',
    category: 'Produktivitas'
  },
  {
    id: 'viu',
    name: 'VIU Premium',
    description: 'Nonton drakor, anime, dan variety show tanpa iklan.',
    priceStart: 'Mulai Rp 10rb/tahun',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Viu_logo.svg/960px-Viu_logo.svg.png?20260131105324',
    whatsappMessage: 'Halo kak, mau beli akun VIU Premiumnya, bisa minta pricelistnya?',
    category: 'Film & Series'
  }
];
