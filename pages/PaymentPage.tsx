import React, { useState } from 'react';
import { Wallet, Building2, Download, Copy, Check, Info } from 'lucide-react';

const wallets = [
  { id: 'dana', name: 'DANA', number: '085155043557' },
  { id: 'ovo', name: 'OVO', number: '0895349021354' },
  { id: 'gopay', name: 'GoPay', number: '085155043557' },
  { id: 'linkaja', name: 'LinkAja', number: '0895349021354' },
  { id: 'shopeepay', name: 'ShopeePay', number: '0895349021354' },
];

const banks = [
  { id: 'bri', name: 'BRI', number: '030201012761535' },
  { id: 'seabank', name: 'SeaBank', number: '901362676930' },
];

export const PaymentPage: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'https://i.ibb.co.com/gZ1XmL38/QRIS-BRI-MKA-Store.jpg';
    link.download = 'QRIS-MKA-Store.jpg';
    link.target = '_blank'; // Fallback for cross-origin
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="page-enter pt-24 min-h-screen pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Metode Pembayaran</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Silakan lakukan pembayaran melalui QRIS atau transfer manual ke rekening di bawah ini.
          </p>
        </div>

        {/* --- QRIS SECTION --- */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mb-10 text-center shadow-2xl relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
           {/* Background glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-primary/20 rounded-full blur-[80px]"></div>
           
           <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Scan QRIS (All Payment)</h2>
           
           <div className="bg-white p-4 rounded-xl inline-block shadow-lg mb-6 relative z-10 transform group-hover:scale-105 transition-transform duration-500">
             <img 
               src="https://i.ibb.co.com/gZ1XmL38/QRIS-BRI-MKA-Store.jpg" 
               alt="QRIS MKA Store" 
               className="w-full max-w-[300px] h-auto rounded-lg"
             />
           </div>
           
           <div className="relative z-10 flex flex-col items-center gap-4">
             <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
               Support: BCA, Mandiri, BRI, BNI, DANA, OVO, GoPay, ShopeePay, dll.
             </p>
             
             <button 
               onClick={handleDownload}
               className="flex items-center gap-2 bg-brand-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium transition-all hover:shadow-lg hover:shadow-brand-primary/25 active:scale-95"
             >
               <Download size={18} />
               Simpan Gambar QRIS
             </button>
           </div>
        </div>

        {/* --- ACCOUNT INFO BANNER --- */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-l-4 border-brand-accent p-4 rounded-r-xl mb-10 flex items-start gap-3 shadow-lg">
          <Info className="w-6 h-6 text-brand-accent shrink-0 mt-0.5" />
          <div>
            <p className="text-slate-300 text-sm">Rekening & E-Wallet Atas Nama:</p>
            <p className="text-white font-bold text-lg tracking-wide">Muhammad Karim Anggara</p>
          </div>
        </div>

        {/* --- MANUAL TRANSFER GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* E-Wallet List */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-brand-primary/10 rounded-lg">
                <Wallet className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-xl font-bold text-white">E-Wallet</h3>
            </div>
            
            <div className="space-y-4">
              {wallets.map((wallet) => (
                <div key={wallet.id} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800/50 hover:border-slate-700 transition-colors">
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase">{wallet.name}</p>
                    <p className="text-white font-mono font-medium">{wallet.number}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(wallet.number, wallet.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      copiedId === wallet.id 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                    title="Salin Nomor"
                  >
                    {copiedId === wallet.id ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bank List */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-brand-primary/10 rounded-lg">
                <Building2 className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-xl font-bold text-white">Transfer Bank</h3>
            </div>
            
            <div className="space-y-4 mb-6">
              {banks.map((bank) => (
                <div key={bank.id} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800/50 hover:border-slate-700 transition-colors">
                  <div>
                    <p className="text-slate-400 text-xs font-semibold uppercase">{bank.name}</p>
                    <p className="text-white font-mono font-medium">{bank.number}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(bank.number, bank.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      copiedId === bank.id 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                    title="Salin Nomor"
                  >
                    {copiedId === bank.id ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 bg-brand-primary/5 border border-brand-primary/10 rounded-xl">
              <p className="text-slate-400 text-sm text-center">
                Untuk bank lain (BCA, Mandiri, BNI, dll), silakan gunakan fitur <span className="text-white font-semibold">Scan QRIS</span> di atas.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};