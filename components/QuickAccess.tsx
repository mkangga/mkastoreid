
import React from 'react';
import { Search, ShieldCheck, HelpCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const quickLinks = [
  {
    icon: Search,
    title: "Cek Pesanan",
    desc: "Lacak status transaksi anda",
    link: "/status",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "group-hover:border-blue-500/50"
  },
  {
    icon: ShieldCheck,
    title: "Klaim Garansi",
    desc: "Layanan purna jual & komplain",
    link: "/warranty",
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "group-hover:border-green-500/50"
  },
  {
    icon: HelpCircle,
    title: "Bantuan / FAQ",
    desc: "Jawaban pertanyaan umum",
    link: "/faq",
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "group-hover:border-purple-500/50"
  }
];

export const QuickAccess: React.FC = () => {
  return (
    <section className="relative z-20 -mt-10 mb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickLinks.map((item, idx) => (
            <Link 
              key={idx} 
              to={item.link}
              className={`group bg-slate-900/80 backdrop-blur-md border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-xl transition-all duration-300 hover:-translate-y-1 ${item.border}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-slate-700 group-hover:text-white transition-colors">
                <ChevronRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
