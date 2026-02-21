
import React, { useState, useEffect } from 'react';
import { Send, CreditCard, Clock, User, ShoppingBag, Info } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { config, products } from '../siteConfig';

export const OrderForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const productFromUrl = searchParams.get('product') || '';

  const [name, setName] = useState('');
  const [productName, setProductName] = useState(productFromUrl);
  const [duration, setDuration] = useState('1 Bulan');
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  
  // Generic Form Data State
  const [formData, setFormData] = useState<Record<string, string>>({});

  // Helper to update form data
  const updateField = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  // Update product state if URL changes
  useEffect(() => {
    if (productFromUrl) {
      setProductName(productFromUrl);
    }
  }, [productFromUrl]);

  // Reset form data when product changes
  useEffect(() => {
    setFormData({});
  }, [productName]);

  // Determine Product Category & ID
  const selectedProduct = products.find(p => p.name === productName);
  const category = selectedProduct?.category || '';
  const productId = selectedProduct?.id || '';

  const isPPOB = ['PPOB & Tagihan', 'Top Up & Voucher', 'E-Wallet & Keuangan'].includes(category);

  // --- RENDER SPECIFIC FIELDS ---
  const renderSpecificFields = () => {
    switch (productId) {
      case 'ecommerce': // Bayar E-Commerce
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Pilih E-Commerce</label>
              <select 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                value={formData.ecommercePlatform || ''}
                onChange={(e) => updateField('ecommercePlatform', e.target.value)}
              >
                <option value="" disabled>-- Pilih E-Commerce --</option>
                <option value="Tokopedia">Tokopedia</option>
                <option value="Shopee">Shopee</option>
                <option value="Lazada">Lazada</option>
                <option value="Tiktok Shop">Tiktok Shop</option>
                <option value="Blibli">Blibli</option>
                <option value="Lainnya">Lainnya (Ketik Sendiri)</option>
              </select>
              {formData.ecommercePlatform === 'Lainnya' && (
                <input 
                  type="text" 
                  placeholder="Nama E-Commerce" 
                  className="mt-2 w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  onChange={(e) => updateField('customEcommerce', e.target.value)}
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Bank Virtual Account</label>
              <select 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                value={formData.bankVA || ''}
                onChange={(e) => updateField('bankVA', e.target.value)}
              >
                <option value="" disabled>-- Pilih Bank --</option>
                <option value="BCA">BCA</option>
                <option value="BRI">BRI</option>
                <option value="Mandiri">Mandiri</option>
                <option value="BNI">BNI</option>
                <option value="Cimb Niaga">Cimb Niaga</option>
                <option value="Permata">Permata</option>
                <option value="Lainnya">Lainnya (Ketik Sendiri)</option>
              </select>
              {formData.bankVA === 'Lainnya' && (
                <input 
                  type="text" 
                  placeholder="Nama Bank" 
                  className="mt-2 w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  onChange={(e) => updateField('customBank', e.target.value)}
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nomor Virtual Account</label>
              <input 
                type="number" 
                placeholder="Masukkan Nomor VA" 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                onChange={(e) => updateField('vaNumber', e.target.value)}
              />
            </div>
          </>
        );

      case 'pulsa': // Pulsa All Operator
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Provider</label>
              <select 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                value={formData.provider || ''}
                onChange={(e) => updateField('provider', e.target.value)}
              >
                <option value="" disabled>-- Pilih Provider --</option>
                <option value="Telkomsel">Telkomsel</option>
                <option value="Tri">Tri</option>
                <option value="Indosat">Indosat</option>
                <option value="XL">XL</option>
                <option value="AXIS">AXIS</option>
                <option value="by.U">by.U</option>
                <option value="Smartfren">Smartfren</option>
                <option value="Lainnya">Lainnya (Ketik Sendiri)</option>
              </select>
              {formData.provider === 'Lainnya' && (
                <input 
                  type="text" 
                  placeholder="Nama Provider" 
                  className="mt-2 w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  onChange={(e) => updateField('customProvider', e.target.value)}
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nominal Pulsa</label>
              <select 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                value={formData.nominal || ''}
                onChange={(e) => updateField('nominal', e.target.value)}
              >
                <option value="" disabled>-- Pilih Nominal --</option>
                <option value="5000">5.000 (Harga: Rp 7.000)</option>
                <option value="10000">10.000 (Harga: Rp 12.000)</option>
                <option value="15000">15.000 (Harga: Rp 17.000)</option>
                <option value="20000">20.000 (Harga: Rp 22.000)</option>
                <option value="25000">25.000 (Harga: Rp 27.000)</option>
                <option value="30000">30.000 (Harga: Rp 32.000)</option>
                <option value="50000">50.000 (Harga: Rp 52.000)</option>
                <option value="100000">100.000 (Harga: Rp 102.000)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nomor HP</label>
              <input 
                type="number" 
                placeholder="08..." 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                onChange={(e) => updateField('phoneNumber', e.target.value)}
              />
            </div>
          </>
        );

      case 'pln': // Token PLN
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nomor Meter / ID Pelanggan</label>
              <input 
                type="number" 
                placeholder="Masukkan Nomor Meter" 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                onChange={(e) => updateField('meterNumber', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nominal Token</label>
              <select 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                value={formData.nominal || ''}
                onChange={(e) => updateField('nominal', e.target.value)}
              >
                <option value="" disabled>-- Pilih Nominal --</option>
                <option value="20000">20.000 (Biaya Admin: Rp 2.000)</option>
                <option value="50000">50.000 (Biaya Admin: Rp 2.000)</option>
                <option value="100000">100.000 (Biaya Admin: Rp 2.000)</option>
                <option value="Request">Nominal Lain (Request)</option>
              </select>
              {formData.nominal === 'Request' && (
                <input 
                  type="number" 
                  placeholder="Masukkan Nominal (Angka)" 
                  className="mt-2 w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  onChange={(e) => updateField('customNominal', e.target.value)}
                />
              )}
            </div>
          </>
        );

      case 'transfer': // Jasa Transfer Uang
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nomor E-Wallet / Rekening Tujuan</label>
              <input 
                type="number" 
                placeholder="Masukkan Nomor Tujuan" 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                onChange={(e) => updateField('destNumber', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nama Pemilik E-Wallet / Rekening Tujuan</label>
              <input 
                type="text" 
                placeholder="Atas Nama Siapa?" 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                onChange={(e) => updateField('destName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nominal Transfer</label>
              <input 
                type="number" 
                placeholder="Contoh: 50000" 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                onChange={(e) => updateField('nominal', e.target.value)}
              />
            </div>
          </>
        );

      case 'convert': // Convert Saldo
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Nomor Asal (Sumber)</label>
                <input type="number" placeholder="Nomor Pengirim" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('sourceNumber', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Nama Asal</label>
                <input type="text" placeholder="Nama Pengirim" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('sourceName', e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Nomor Tujuan (Penerima)</label>
                <input type="number" placeholder="Nomor Penerima" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('destNumber', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Nama Tujuan</label>
                <input type="text" placeholder="Nama Penerima" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('destName', e.target.value)} />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-400 mb-2">Nominal Convert</label>
              <input type="number" placeholder="Contoh: 100000" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('nominal', e.target.value)} />
              <p className="text-xs text-slate-500 mt-1">*Biaya Admin Flat Rp 2.000</p>
            </div>
          </>
        );

      case 'angsuran': // Angsuran Kredit
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nama Platform / Leasing</label>
              <input type="text" placeholder="Contoh: Adira, FIF, Shopee Paylater" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('platformName', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nomor Kontrak / Pelanggan</label>
              <input type="number" placeholder="Masukkan Nomor Kontrak" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('contractNumber', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nama Pelanggan (Sesuai Kontrak)</label>
              <input type="text" placeholder="Nama Pelanggan" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('contractName', e.target.value)} />
            </div>
          </>
        );

      case 'pendidikan': // Biaya Pendidikan
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nomor Tagihan / ID Siswa</label>
              <input type="number" placeholder="ID Siswa / Mahasiswa" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('studentId', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nama Terdaftar</label>
              <input type="text" placeholder="Nama Siswa / Mahasiswa" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('studentName', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nominal Tagihan</label>
              <input type="number" placeholder="Jumlah Tagihan" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('nominal', e.target.value)} />
              <p className="text-xs text-slate-500 mt-1">*Biaya Admin Flat Rp 2.000</p>
            </div>
          </>
        );

      case 'va': // Bayar Virtual Account
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Bank Virtual Account</label>
              <select 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                value={formData.bankVA || ''}
                onChange={(e) => updateField('bankVA', e.target.value)}
              >
                <option value="" disabled>-- Pilih Bank --</option>
                <option value="BCA">BCA</option>
                <option value="BRI">BRI</option>
                <option value="Mandiri">Mandiri</option>
                <option value="BNI">BNI</option>
                <option value="Cimb Niaga">Cimb Niaga</option>
                <option value="Permata">Permata</option>
                <option value="Lainnya">Lainnya (Ketik Sendiri)</option>
              </select>
              {formData.bankVA === 'Lainnya' && (
                <input type="text" placeholder="Nama Bank" className="mt-2 w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('customBank', e.target.value)} />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nomor Virtual Account</label>
              <input type="number" placeholder="Nomor VA" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('vaNumber', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nominal Pembayaran</label>
              <input type="number" placeholder="Jumlah Bayar" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('nominal', e.target.value)} />
              <p className="text-xs text-slate-500 mt-1">*Biaya Admin Flat Rp 2.000</p>
            </div>
          </>
        );

      case 'games': // Top Up Games
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nama Game</label>
              <input type="text" placeholder="Contoh: Mobile Legends, Genshin Impact" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('gameName', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">User ID (Server ID)</label>
              <input type="text" placeholder="Contoh: 12345678 (1234)" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('userId', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Item / Nominal Top Up</label>
              <input type="text" placeholder="Contoh: 86 Diamonds, Weekly Pass" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('gameItem', e.target.value)} />
            </div>
          </>
        );

      case 'pdam': // PDAM
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">ID Pelanggan PDAM</label>
              <input type="number" placeholder="Nomor Pelanggan" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('customerId', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nama Pelanggan</label>
              <input type="text" placeholder="Nama Terdaftar" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('customerName', e.target.value)} />
            </div>
          </>
        );

      case 'paket-data': // Paket Data
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Provider</label>
              <select 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                value={formData.provider || ''}
                onChange={(e) => updateField('provider', e.target.value)}
              >
                <option value="" disabled>-- Pilih Provider --</option>
                <option value="Telkomsel">Telkomsel</option>
                <option value="Tri">Tri</option>
                <option value="Indosat">Indosat</option>
                <option value="XL">XL</option>
                <option value="AXIS">AXIS</option>
                <option value="by.U">by.U</option>
                <option value="Smartfren">Smartfren</option>
                <option value="Lainnya">Lainnya (Ketik Sendiri)</option>
              </select>
              {formData.provider === 'Lainnya' && (
                <input type="text" placeholder="Nama Provider" className="mt-2 w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('customProvider', e.target.value)} />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nomor HP</label>
              <input type="number" placeholder="08..." className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('phoneNumber', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Jumlah Kuota & Masa Aktif</label>
              <input type="text" placeholder="Contoh: 10GB 30 Hari" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('quotaDuration', e.target.value)} />
            </div>
          </>
        );

      case 'bpjs': // BPJS
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nomor VA Keluarga / Peserta</label>
              <input type="number" placeholder="Nomor VA BPJS" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('vaNumber', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nama Terdaftar</label>
              <input type="text" placeholder="Nama Peserta" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('participantName', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nominal Iuran</label>
              <input type="number" placeholder="Jumlah Bayar" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('nominal', e.target.value)} />
              <p className="text-xs text-slate-500 mt-1">*Biaya Admin Flat Rp 2.000</p>
            </div>
          </>
        );

      case 'internet-tv': // TV Kabel & Internet
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Provider</label>
              <select 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                value={formData.provider || ''}
                onChange={(e) => updateField('provider', e.target.value)}
              >
                <option value="" disabled>-- Pilih Provider --</option>
                <option value="Indihome">Indihome</option>
                <option value="First Media">First Media</option>
                <option value="Biznet">Biznet</option>
                <option value="MyRepublic">MyRepublic</option>
                <option value="XL Satu">XL Satu</option>
                <option value="MNC Play">MNC Play</option>
                <option value="Lainnya">Lainnya (Ketik Sendiri)</option>
              </select>
              {formData.provider === 'Lainnya' && (
                <input type="text" placeholder="Nama Provider" className="mt-2 w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('customProvider', e.target.value)} />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">ID Pelanggan</label>
              <input type="number" placeholder="Nomor Pelanggan" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('customerId', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nama Pelanggan</label>
              <input type="text" placeholder="Nama Terdaftar" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('customerName', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nominal Tagihan</label>
              <input type="number" placeholder="Jumlah Tagihan" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('nominal', e.target.value)} />
              <p className="text-xs text-slate-500 mt-1">*Biaya Admin Flat Rp 2.000</p>
            </div>
          </>
        );

      case 'ewallet': // Top Up E-Wallet
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Pilih E-Wallet</label>
              <select 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                value={formData.walletType || ''}
                onChange={(e) => updateField('walletType', e.target.value)}
              >
                <option value="" disabled>-- Pilih E-Wallet --</option>
                <option value="DANA">DANA</option>
                <option value="GoPay">GoPay</option>
                <option value="ShopeePay">ShopeePay</option>
                <option value="OVO">OVO</option>
                <option value="LinkAja">LinkAja</option>
                <option value="AstraPay">AstraPay</option>
                <option value="Lainnya">Lainnya (Ketik Sendiri)</option>
              </select>
              {formData.walletType === 'Lainnya' && (
                <input type="text" placeholder="Nama E-Wallet" className="mt-2 w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('customWallet', e.target.value)} />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nomor E-Wallet</label>
              <input type="number" placeholder="08..." className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('walletNumber', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nama Terdaftar</label>
              <input type="text" placeholder="Nama Akun" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('walletName', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Nominal Top Up</label>
              <input type="number" placeholder="Jumlah Top Up" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary" onChange={(e) => updateField('nominal', e.target.value)} />
            </div>
          </>
        );

      default:
        // Default View (e.g. for Premium Accounts or generic PPOB fallback)
        if (isPPOB) {
           return (
             <div>
               <label className="block text-sm font-medium text-slate-400 mb-2">Nomor Tujuan / ID</label>
               <input 
                 type="text" 
                 placeholder="Masukkan Nomor / ID" 
                 className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                 onChange={(e) => updateField('genericTarget', e.target.value)}
               />
             </div>
           );
        } else {
           // Premium Accounts
           return (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                <Clock size={16} /> Durasi Langganan
              </label>
              <div className="relative">
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all cursor-pointer"
                >
                  <option value="1 Bulan">1 Bulan</option>
                  <option value="2 Bulan">2 Bulan</option>
                  <option value="3 Bulan">3 Bulan</option>
                  <option value="6 Bulan">6 Bulan</option>
                  <option value="1 Tahun">1 Tahun</option>
                  <option value="Selamanya (Lifetime)">Selamanya (Lifetime)</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
           );
        }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalName = name.trim() || 'Pembeli';
    const finalProduct = productName || 'Belum dipilih';
    
    let message = `Halo kak, saya ${finalName}.\n\nMau order *${finalProduct}*.\n\nDetail:`;

    // Construct Message based on Product ID
    switch (productId) {
      case 'ecommerce':
        const platform = formData.ecommercePlatform === 'Lainnya' ? formData.customEcommerce : formData.ecommercePlatform;
        const bank = formData.bankVA === 'Lainnya' ? formData.customBank : formData.bankVA;
        message += `\n• E-Commerce: ${platform}\n• Bank VA: ${bank}\n• Nomor VA: ${formData.vaNumber}`;
        break;
      case 'pulsa':
        const prov = formData.provider === 'Lainnya' ? formData.customProvider : formData.provider;
        message += `\n• Provider: ${prov}\n• Nominal: ${formData.nominal}\n• Nomor HP: ${formData.phoneNumber}`;
        break;
      case 'pln':
        const plnNominal = formData.nominal === 'Request' ? formData.customNominal : formData.nominal;
        message += `\n• ID Pelanggan: ${formData.meterNumber}\n• Nominal Token: ${plnNominal}`;
        break;
      case 'transfer':
        message += `\n• Tujuan: ${formData.destNumber} (${formData.destName})\n• Nominal: ${formData.nominal}`;
        break;
      case 'convert':
        message += `\n• Dari: ${formData.sourceNumber} (${formData.sourceName})\n• Ke: ${formData.destNumber} (${formData.destName})\n• Nominal Convert: ${formData.nominal}`;
        break;
      case 'angsuran':
        message += `\n• Platform: ${formData.platformName}\n• No. Kontrak: ${formData.contractNumber}\n• Nama Pelanggan: ${formData.contractName}`;
        break;
      case 'pendidikan':
        message += `\n• ID Siswa/Tagihan: ${formData.studentId}\n• Nama Siswa: ${formData.studentName}\n• Nominal: ${formData.nominal}`;
        break;
      case 'va':
        const vaBank = formData.bankVA === 'Lainnya' ? formData.customBank : formData.bankVA;
        message += `\n• Bank: ${vaBank}\n• Nomor VA: ${formData.vaNumber}\n• Nominal: ${formData.nominal}`;
        break;
      case 'games':
        message += `\n• Game: ${formData.gameName}\n• User ID: ${formData.userId}\n• Item/Nominal: ${formData.gameItem}`;
        break;
      case 'pdam':
        message += `\n• ID Pelanggan: ${formData.customerId}\n• Nama Pelanggan: ${formData.customerName}`;
        break;
      case 'paket-data':
        const dataProv = formData.provider === 'Lainnya' ? formData.customProvider : formData.provider;
        message += `\n• Provider: ${dataProv}\n• Nomor HP: ${formData.phoneNumber}\n• Paket: ${formData.quotaDuration}`;
        break;
      case 'bpjs':
        message += `\n• No VA BPJS: ${formData.vaNumber}\n• Nama Peserta: ${formData.participantName}\n• Nominal: ${formData.nominal}`;
        break;
      case 'internet-tv':
        const tvProv = formData.provider === 'Lainnya' ? formData.customProvider : formData.provider;
        message += `\n• Provider: ${tvProv}\n• ID Pelanggan: ${formData.customerId}\n• Nama Pelanggan: ${formData.customerName}\n• Nominal: ${formData.nominal}`;
        break;
      case 'ewallet':
        const wallet = formData.walletType === 'Lainnya' ? formData.customWallet : formData.walletType;
        message += `\n• E-Wallet: ${wallet}\n• Nomor: ${formData.walletNumber}\n• Nama Akun: ${formData.walletName}\n• Nominal: ${formData.nominal}`;
        break;
      default:
        if (isPPOB) {
           message += `\n• ID/Nomor: ${formData.genericTarget}`;
        } else {
           message += `\n• Durasi: ${duration}`;
        }
    }

    message += `\n\n• Pembayaran: ${paymentMethod}\n\nMohon dicek total harganya kak. Terima kasih!`;
    
    const waLink = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
  };

  return (
    <section className="bg-slate-900 border-t border-slate-800 rounded-3xl mx-auto max-w-4xl overflow-hidden shadow-2xl">
      <div className="p-6 md:p-10 relative">
        {/* Decorative gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kolom Kiri */}
            <div className="space-y-6">
               {/* Produk (Dropdown Select) */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                  <ShoppingBag size={16} /> Pilih Layanan
                </label>
                <div className="relative">
                  <select
                    value={productName}
                    onChange={(e) => {
                      setProductName(e.target.value);
                    }}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all cursor-pointer"
                  >
                    <option value="" disabled>-- Pilih Produk --</option>
                    <optgroup label="Akun Premium">
                      {products.filter(p => !['PPOB & Tagihan', 'Top Up & Voucher', 'E-Wallet & Keuangan'].includes(p.category)).map((item) => (
                        <option key={item.id} value={item.name}>{item.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="PPOB & Digital">
                      {products.filter(p => ['PPOB & Tagihan', 'Top Up & Voucher', 'E-Wallet & Keuangan'].includes(p.category)).map((item) => (
                        <option key={item.id} value={item.name}>{item.name}</option>
                      ))}
                    </optgroup>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              {/* Nama */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                  <User size={16} /> Nama Anda (Opsional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Budi"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-6">
              
              {/* DYNAMIC FIELDS */}
              {renderSpecificFields()}

              {/* Metode Pembayaran (Always Visible) */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                  <CreditCard size={16} /> Metode Pembayaran
                </label>
                <div className="relative">
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all cursor-pointer"
                  >
                    <option value="QRIS">QRIS (Semua E-Wallet/Bank)</option>
                    <option value="DANA">DANA</option>
                    <option value="OVO">OVO</option>
                    <option value="GoPay">GoPay</option>
                    <option value="ShopeePay">ShopeePay</option>
                    <option value="LinkAja">LinkAja</option>
                    <option value="Transfer Bank">Transfer Bank (BRI dan SeaBank)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3 flex items-start gap-2 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                  <Info size={16} className="shrink-0 text-brand-accent mt-0.5" />
                  <span>
                    Nomor rekening dan Scan QRIS tersedia di menu{' '}
                    <Link to="/payment" className="text-brand-accent hover:text-brand-primary font-medium hover:underline">
                      Bayar
                    </Link>
                    . Anda bisa cek dulu sebelum atau sesudah chat admin.
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
             {/* Tombol Submit */}
            <button
              type="submit"
              disabled={!productName}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                productName
                  ? 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/20' 
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Lanjut ke WhatsApp</span>
              <Send size={20} />
            </button>
            <p className="text-center text-xs text-slate-500 mt-4">
              Anda akan diarahkan ke WhatsApp admin untuk konfirmasi harga total dan pembayaran.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

