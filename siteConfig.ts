
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
    subtitle: "Solusi Akun Premium & Produk Digital Terlengkap",
    description: "Nikmati layanan streaming, aplikasi premium, hingga kebutuhan PPOB seperti Pulsa, Token PLN, dan Top Up E-Wallet dengan harga termurah.",
  },
  footer: {
    hours: "Senin - Minggu: 08.00 - 22.00 WIB",
    disclaimer: "Disclaimer: Produk yang kami jual adalah akun sharing/privat legal dan layanan PPOB resmi. Kami bukan afiliasi resmi dari brand terkait.",
  }
};

export const features: Feature[] = [
  {
    id: 1,
    title: "100% Aman & Legal",
    description: "Akun premium legal dan transaksi PPOB terjamin aman.",
    icon: 'shield'
  },
  {
    id: 2,
    title: "Proses Otomatis",
    description: "Layanan PPOB diproses otomatis 24 jam. Akun premium diproses cepat saat jam kerja.",
    icon: 'zap'
  },
  {
    id: 3,
    title: "Full Garansi",
    description: "Garansi penuh untuk akun premium dan jaminan sukses untuk transaksi PPOB.",
    icon: 'check'
  }
];

export const faqs: FAQItem[] = [
  {
    question: "Apakah akun ini legal dan aman?",
    answer: "Tentu saja. Kami hanya menjual akun legal yang dibayar resmi. Bukan akun hasil hack atau carding. Untuk PPOB, transaksi diproses melalui server resmi."
  },
  {
    question: "Bagaimana sistem garansinya?",
    answer: "Kami memberikan garansi full sesuai durasi sewa untuk akun premium. Untuk PPOB, jika transaksi gagal, saldo akan dikembalikan atau transaksi diulang."
  },
  {
    question: "Berapa lama proses pengerjaannya?",
    answer: "Akun premium: 5-10 menit saat jam kerja. PPOB (Pulsa, Token, dll): Otomatis detik itu juga (24 Jam)."
  },
  {
    question: "Apakah bisa diperpanjang (Renewal)?",
    answer: "Sebagian besar produk premium bisa diperpanjang. Untuk PPOB, Anda bisa transaksi berulang kali kapan saja."
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer: "Kami menerima pembayaran via QRIS (All E-Wallet & Mobile Banking), Transfer Bank, dan E-Wallet."
  }
];

export const products: Product[] = [
  // --- PREMIUM APPS ---
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
    id: 'viu',
    name: 'Viu Premium',
    description: 'Nonton drama Korea, variety show, dan anime Asia terbaik tanpa iklan.',
    priceStart: 'Mulai Rp 10rb/bulan',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Viu_logo.svg',
    whatsappMessage: 'Halo kak, mau beli akun Viu Premiumnya, bisa minta pricelistnya?',
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
  
  // --- PPOB & TAGIHAN ---
  {
    id: 'pulsa',
    name: 'Pulsa All Operator',
    description: 'Telkomsel, Indosat, XL, Axis, Tri, Smartfren. Harga termurah.',
    priceStart: 'Mulai Rp 1.000',
    icon: 'Smartphone',
    whatsappMessage: 'Halo kak, mau isi Pulsa dong.',
    category: 'PPOB & Tagihan'
  },
  {
    id: 'paket-data',
    name: 'Paket Data',
    description: 'Kuota internet murah untuk semua operator. Harian, Mingguan, Bulanan.',
    priceStart: 'Mulai Rp 5.000',
    icon: 'Signal',
    whatsappMessage: 'Halo kak, mau beli Paket Data dong.',
    category: 'PPOB & Tagihan'
  },
  {
    id: 'pln',
    name: 'Token PLN & Tagihan',
    description: 'Beli token listrik atau bayar tagihan listrik pascabayar.',
    priceStart: 'Admin Rp 2.000',
    icon: 'Zap',
    whatsappMessage: 'Halo kak, mau beli Token PLN / Bayar Listrik dong.',
    category: 'PPOB & Tagihan'
  },
  {
    id: 'bpjs',
    name: 'Bayar BPJS',
    description: 'Bayar iuran BPJS Kesehatan keluarga Anda dengan mudah.',
    priceStart: 'Admin Rp 2.000',
    icon: 'HeartPulse',
    whatsappMessage: 'Halo kak, mau bayar BPJS dong.',
    category: 'PPOB & Tagihan'
  },
  {
    id: 'internet-tv',
    name: 'TV Kabel & Internet',
    description: 'Indihome, First Media, MNC Vision, Transvision, dll.',
    priceStart: 'Admin Rp 2.000',
    icon: 'Tv',
    whatsappMessage: 'Halo kak, mau bayar tagihan TV Kabel / Internet dong.',
    category: 'PPOB & Tagihan'
  },
  {
    id: 'pdam',
    name: 'Tagihan Air PDAM',
    description: 'Cek dan bayar tagihan air PDAM berbagai wilayah.',
    priceStart: 'Admin Rp 2.000',
    icon: 'Droplets',
    whatsappMessage: 'Halo kak, mau bayar PDAM dong.',
    category: 'PPOB & Tagihan'
  },

  // --- E-WALLET & KEUANGAN ---
  {
    id: 'ewallet',
    name: 'Top Up E-Wallet',
    description: 'Dana, OVO, GoPay, ShopeePay, LinkAja, iSaku, Maxim, Grab, Gojek.',
    priceStart: 'Admin Mulai Rp 0',
    icon: 'Wallet',
    whatsappMessage: 'Halo kak, mau Top Up E-Wallet dong.',
    badge: 'Laris',
    category: 'E-Wallet & Keuangan'
  },
  {
    id: 'transfer',
    name: 'Jasa Transfer Uang',
    description: 'Kirim uang ke semua bank di Indonesia. Realtime & Aman.',
    priceStart: 'Admin Rp 2.000',
    icon: 'Banknote',
    whatsappMessage: 'Halo kak, mau jasa transfer uang dong.',
    category: 'E-Wallet & Keuangan'
  },
  {
    id: 'convert',
    name: 'Convert Saldo',
    description: 'Tukar saldo e-wallet ke rekening atau sebaliknya.',
    priceStart: 'Admin Rp 2.000',
    icon: 'RefreshCw',
    whatsappMessage: 'Halo kak, mau convert saldo dong.',
    category: 'E-Wallet & Keuangan'
  },
  {
    id: 'angsuran',
    name: 'Angsuran Kredit',
    description: 'Bayar cicilan leasing (WOM, FIF, BAF, OTO, dll).',
    priceStart: 'Admin Rp 2.000',
    icon: 'CreditCard',
    whatsappMessage: 'Halo kak, mau bayar angsuran kredit dong.',
    category: 'E-Wallet & Keuangan'
  },
  {
    id: 'pendidikan',
    name: 'Biaya Pendidikan',
    description: 'Bayar SPP sekolah, kuliah, dan biaya pendidikan lainnya.',
    priceStart: 'Admin Rp 2.000',
    icon: 'GraduationCap',
    whatsappMessage: 'Halo kak, mau bayar biaya pendidikan dong.',
    category: 'E-Wallet & Keuangan'
  },
  {
    id: 'va',
    name: 'Bayar Virtual Account',
    description: 'Pembayaran VA berbagai bank untuk berbagai merchant.',
    priceStart: 'Admin Rp 2.000',
    icon: 'Hash',
    whatsappMessage: 'Halo kak, mau bayar Virtual Account dong.',
    category: 'E-Wallet & Keuangan'
  },

  // --- TOP UP & VOUCHER ---
  {
    id: 'games',
    name: 'Top Up Games',
    description: 'Mobile Legends, FF, PUBG, Genshin, Valorant, dll.',
    priceStart: 'Mulai Rp 3.000',
    icon: 'Gamepad2',
    whatsappMessage: 'Halo kak, mau Top Up Game dong.',
    badge: 'Gamers',
    category: 'Top Up & Voucher'
  },
  {
    id: 'ecommerce',
    name: 'Bayar E-Commerce',
    description: 'Bayar belanjaan Shopee, Tokopedia, Bukalapak, TikTok Shop.',
    priceStart: 'Admin Rp 2.000',
    icon: 'ShoppingBag',
    whatsappMessage: 'Halo kak, mau bayar tagihan E-Commerce dong.',
    category: 'Top Up & Voucher'
  }
];
