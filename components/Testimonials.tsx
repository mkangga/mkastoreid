
import React from 'react';
import { MessageSquare, CheckCheck, Star } from 'lucide-react';

const reviews = [
  {
    name: "Dimas Anggara",
    initial: "D",
    product: "Netflix Premium",
    chat: [
      { sender: 'user', text: "Min, Netflix nya udah bisa login. Fast respon banget parah! 🔥", time: "19:42" },
      { sender: 'admin', text: "Siap kak Dimas, selamat menonton ya! Jangan lupa garansi aman kok.", time: "19:43" }
    ]
  },
  {
    name: "Siti Rahma",
    initial: "S",
    product: "Spotify Premium",
    chat: [
      { sender: 'user', text: "Kak, mau perpanjang Spotify yg bulan lalu dong. Masih harga promo kan?", time: "10:15" },
      { sender: 'admin', text: "Masih kak Siti, langsung TF aja ya, proses 5 menit beres.", time: "10:16" }
    ]
  },
  {
    name: "Budi Santoso",
    initial: "B",
    product: "Canva Pro",
    chat: [
      { sender: 'user', text: "Canva nya work min, fitur pro nya kebuka semua. Recommended seller 👍", time: "14:20" },
      { sender: 'admin', text: "Mantap kak Budi. Sukses buat desainnya ya!", time: "14:25" }
    ]
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-green-500/10 rounded-xl mb-4 text-green-500">
            <MessageSquare size={28} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Apa Kata Mereka?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Bukti nyata kepuasan pelanggan MKA Store. Transaksi aman, proses cepat, no tipu-tipu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all duration-300 group">
              {/* Header Chat */}
              <div className="bg-slate-800/50 p-4 flex items-center gap-3 border-b border-slate-800">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                  {review.initial}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{review.name}</h4>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-slate-400">{review.product}</span>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Body Chat */}
              <div className="p-4 space-y-4 min-h-[180px] bg-slate-900/50 relative">
                 {/* Chat Wallpaper Pattern Overlay (Optional) */}
                 <div className="absolute inset-0 opacity-[0.03] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat"></div>
                 
                {review.chat.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'} relative z-10`}>
                    <div 
                      className={`max-w-[85%] rounded-lg p-3 text-sm relative shadow-sm ${
                        msg.sender === 'user' 
                          ? 'bg-slate-800 text-slate-200 rounded-tl-none' 
                          : 'bg-green-900/40 text-green-100 rounded-tr-none border border-green-500/20'
                      }`}
                    >
                      <p className="mb-1 leading-relaxed">{msg.text}</p>
                      <div className="flex items-center justify-end gap-1 opacity-70">
                        <span className="text-[10px]">{msg.time}</span>
                        {msg.sender === 'admin' && <CheckCheck size={12} className="text-blue-400" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
