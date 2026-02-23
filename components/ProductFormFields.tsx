import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';

interface ProductFormFieldsProps {
  productId: string;
  category: string;
  formData: Record<string, string>;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export const ProductFormFields: React.FC<ProductFormFieldsProps> = ({ productId, category, formData, errors, onChange }) => {
  const isPPOB = ['PPOB & Tagihan', 'Top Up & Voucher', 'E-Wallet & Keuangan'].includes(category);

  const renderInput = (label: string, field: string, type: string = 'text', placeholder: string = '', required: boolean = false, note?: string) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-400 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={formData[field] || ''}
        onChange={(e) => onChange(field, e.target.value)}
        className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all ${
          errors[field] 
            ? 'border-red-500 focus:ring-red-500/50' 
            : 'border-slate-700 focus:ring-brand-primary'
        }`}
      />
      {errors[field] && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1 error-message">
          <AlertCircle size={12} /> {errors[field]}
        </p>
      )}
      {note && <p className="text-xs text-slate-500 mt-1">{note}</p>}
    </div>
  );

  const renderSelect = (label: string, field: string, options: {value: string, label: string}[], required: boolean = false) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-400 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          value={formData[field] || ''}
          onChange={(e) => onChange(field, e.target.value)}
          className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 transition-all cursor-pointer ${
            errors[field] 
              ? 'border-red-500 focus:ring-red-500/50' 
              : 'border-slate-700 focus:ring-brand-primary'
          }`}
        >
          <option value="" disabled>-- Pilih {label} --</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
          <option value="Lainnya">Lainnya (Ketik Sendiri)</option>
        </select>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
      {errors[field] && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1 error-message">
          <AlertCircle size={12} /> {errors[field]}
        </p>
      )}
      {formData[field] === 'Lainnya' && (
        <div className="mt-2">
           <input
            type="text"
            placeholder={`Masukkan ${label} Lainnya`}
            onChange={(e) => onChange(`custom${field.charAt(0).toUpperCase() + field.slice(1)}`, e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
      )}
    </div>
  );

  switch (productId) {
    case 'ecommerce':
      return (
        <>
          {renderSelect('E-Commerce', 'ecommercePlatform', [
            { value: 'Tokopedia', label: 'Tokopedia' },
            { value: 'Shopee', label: 'Shopee' },
            { value: 'Lazada', label: 'Lazada' },
            { value: 'Tiktok Shop', label: 'Tiktok Shop' },
            { value: 'Blibli', label: 'Blibli' },
          ], true)}
          {renderSelect('Bank Virtual Account', 'bankVA', [
            { value: 'BCA', label: 'BCA' },
            { value: 'BRI', label: 'BRI' },
            { value: 'Mandiri', label: 'Mandiri' },
            { value: 'BNI', label: 'BNI' },
            { value: 'Cimb Niaga', label: 'Cimb Niaga' },
            { value: 'Permata', label: 'Permata' },
          ])}
          {renderInput('Nomor Virtual Account', 'vaNumber', 'number', 'Masukkan Nomor VA', true)}
        </>
      );

    case 'pulsa':
      return (
        <>
          {renderSelect('Provider', 'provider', [
            { value: 'Telkomsel', label: 'Telkomsel' },
            { value: 'Tri', label: 'Tri' },
            { value: 'Indosat', label: 'Indosat' },
            { value: 'XL', label: 'XL' },
            { value: 'AXIS', label: 'AXIS' },
            { value: 'by.U', label: 'by.U' },
            { value: 'Smartfren', label: 'Smartfren' },
          ], true)}
          {renderSelect('Nominal Pulsa', 'nominal', [
            { value: '5000', label: '5.000 (Harga: Rp 7.000)' },
            { value: '10000', label: '10.000 (Harga: Rp 12.000)' },
            { value: '15000', label: '15.000 (Harga: Rp 17.000)' },
            { value: '20000', label: '20.000 (Harga: Rp 22.000)' },
            { value: '25000', label: '25.000 (Harga: Rp 27.000)' },
            { value: '30000', label: '30.000 (Harga: Rp 32.000)' },
            { value: '50000', label: '50.000 (Harga: Rp 52.000)' },
            { value: '100000', label: '100.000 (Harga: Rp 102.000)' },
          ], true)}
          {renderInput('Nomor HP', 'phoneNumber', 'number', '08...', true)}
        </>
      );

    case 'pln':
      return (
        <>
          {renderInput('Nomor Meter / ID Pelanggan', 'meterNumber', 'number', 'Masukkan Nomor Meter', true)}
          {renderSelect('Nominal Token', 'nominal', [
            { value: '20000', label: '20.000 (Biaya Admin: Rp 2.000)' },
            { value: '50000', label: '50.000 (Biaya Admin: Rp 2.000)' },
            { value: '100000', label: '100.000 (Biaya Admin: Rp 2.000)' },
            { value: 'Request', label: 'Nominal Lain (Request)' },
          ], true)}
          {formData.nominal === 'Request' && renderInput('Nominal Request', 'customNominal', 'number', 'Masukkan Nominal', true)}
        </>
      );

    case 'transfer':
      return (
        <>
          {renderInput('Nomor E-Wallet / Rekening Tujuan', 'destNumber', 'number', 'Masukkan Nomor Tujuan', true)}
          {renderInput('Nama Pemilik E-Wallet / Rekening Tujuan', 'destName', 'text', 'Atas Nama Siapa?')}
          {renderInput('Nominal Transfer', 'nominal', 'number', 'Contoh: 50000', true)}
        </>
      );

    case 'convert':
      return (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderSelect('Platform Asal (Sumber)', 'sourcePlatform', [
              { value: 'BCA', label: 'BCA' }, { value: 'BRI', label: 'BRI' }, { value: 'Mandiri', label: 'Mandiri' },
              { value: 'BNI', label: 'BNI' }, { value: 'Cimb Niaga', label: 'Cimb Niaga' }, { value: 'Permata', label: 'Permata' },
              { value: 'DANA', label: 'DANA' }, { value: 'GoPay', label: 'GoPay' }, { value: 'ShopeePay', label: 'ShopeePay' },
              { value: 'OVO', label: 'OVO' }, { value: 'LinkAja', label: 'LinkAja' }, { value: 'AstraPay', label: 'AstraPay' },
            ], true)}
            {renderInput('Nomor Asal', 'sourceNumber', 'number', 'Nomor Pengirim', true)}
            {renderInput('Nama Asal', 'sourceName', 'text', 'Nama Pengirim')}
          </div>
          
          <div className="border-t border-slate-800 my-4 pt-4">
            <p className="text-sm text-brand-primary font-bold mb-4">Tujuan Transfer (Penerima)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderSelect('Platform Tujuan', 'destPlatform', [
                { value: 'BCA', label: 'BCA' }, { value: 'BRI', label: 'BRI' }, { value: 'Mandiri', label: 'Mandiri' },
                { value: 'BNI', label: 'BNI' }, { value: 'Cimb Niaga', label: 'Cimb Niaga' }, { value: 'Permata', label: 'Permata' },
                { value: 'DANA', label: 'DANA' }, { value: 'GoPay', label: 'GoPay' }, { value: 'ShopeePay', label: 'ShopeePay' },
                { value: 'OVO', label: 'OVO' }, { value: 'LinkAja', label: 'LinkAja' }, { value: 'AstraPay', label: 'AstraPay' },
              ], true)}
              {renderInput('Nomor Tujuan', 'destNumber', 'number', 'Nomor Penerima', true)}
              {renderInput('Nama Tujuan', 'destName', 'text', 'Nama Penerima')}
            </div>
          </div>
          {renderInput('Nominal Convert', 'nominal', 'number', 'Contoh: 100000', true, '*Biaya Admin Flat Rp 2.000')}
        </>
      );

    case 'angsuran':
      return (
        <>
          {renderInput('Nama Platform / Leasing', 'platformName', 'text', 'Contoh: Adira, FIF')}
          {renderSelect('Bank Virtual Account (Opsional)', 'bankVA', [
            { value: 'BCA', label: 'BCA' }, { value: 'BRI', label: 'BRI' }, { value: 'Mandiri', label: 'Mandiri' },
            { value: 'BNI', label: 'BNI' }, { value: 'Cimb Niaga', label: 'Cimb Niaga' }, { value: 'Permata', label: 'Permata' },
          ])}
          {renderInput('Nomor Kontrak / Pelanggan', 'contractNumber', 'number', 'Masukkan Nomor Kontrak')}
          {renderInput('Nama Pelanggan (Sesuai Kontrak)', 'contractName', 'text', 'Nama Pelanggan')}
          {renderInput('Nominal Angsuran', 'nominal', 'number', 'Jumlah Tagihan', true, '*Biaya Admin Flat Rp 2.000')}
        </>
      );

    case 'pendidikan':
      return (
        <>
          {renderInput('Nama Institusi / Sekolah', 'institutionName', 'text', 'Contoh: Universitas Indonesia, SMA 1...', true)}
          {renderInput('Nomor Tagihan / ID Siswa', 'studentId', 'number', 'ID Siswa / Mahasiswa', true)}
          {renderInput('Nama Terdaftar', 'studentName', 'text', 'Nama Siswa / Mahasiswa')}
          {renderInput('Nominal Tagihan', 'nominal', 'number', 'Jumlah Tagihan', true, '*Biaya Admin Flat Rp 2.000')}
        </>
      );

    case 'va':
      return (
        <>
          {renderSelect('Bank Virtual Account', 'bankVA', [
            { value: 'BCA', label: 'BCA' }, { value: 'BRI', label: 'BRI' }, { value: 'Mandiri', label: 'Mandiri' },
            { value: 'BNI', label: 'BNI' }, { value: 'Cimb Niaga', label: 'Cimb Niaga' }, { value: 'Permata', label: 'Permata' },
          ])}
          {renderInput('Nomor Virtual Account', 'vaNumber', 'number', 'Nomor VA')}
          {renderInput('Nominal Pembayaran', 'nominal', 'number', 'Jumlah Bayar', true, '*Biaya Admin Flat Rp 2.000')}
        </>
      );

    case 'games':
      return (
        <>
          {renderInput('Nama Game', 'gameName', 'text', 'Contoh: Mobile Legends', true)}
          {renderInput('User ID (Server ID)', 'userId', 'text', 'Contoh: 12345678 (1234)', true)}
          {renderInput('Item / Nominal Top Up', 'gameItem', 'text', 'Contoh: 86 Diamonds', true)}
        </>
      );

    case 'pdam':
      return (
        <>
          {renderInput('ID Pelanggan PDAM', 'customerId', 'number', 'Nomor Pelanggan')}
          {renderInput('Nama Pelanggan', 'customerName', 'text', 'Nama Terdaftar')}
        </>
      );

    case 'paket-data':
      return (
        <>
          {renderSelect('Provider', 'provider', [
            { value: 'Telkomsel', label: 'Telkomsel' }, { value: 'Tri', label: 'Tri' }, { value: 'Indosat', label: 'Indosat' },
            { value: 'XL', label: 'XL' }, { value: 'AXIS', label: 'AXIS' }, { value: 'by.U', label: 'by.U' }, { value: 'Smartfren', label: 'Smartfren' },
          ], true)}
          {renderInput('Nomor HP', 'phoneNumber', 'number', '08...', true)}
          {renderInput('Jumlah Kuota & Masa Aktif', 'quotaDuration', 'text', 'Contoh: 10GB 30 Hari', true)}
        </>
      );

    case 'bpjs':
      return (
        <>
          {renderInput('Nomor VA Keluarga / Peserta', 'vaNumber', 'number', 'Nomor VA BPJS')}
          {renderInput('Nama Terdaftar', 'participantName', 'text', 'Nama Peserta')}
          {renderInput('Nominal Iuran', 'nominal', 'number', 'Jumlah Bayar', true, '*Biaya Admin Flat Rp 2.000')}
        </>
      );

    case 'internet-tv':
      return (
        <>
          {renderSelect('Provider', 'provider', [
            { value: 'Indihome', label: 'Indihome' }, { value: 'First Media', label: 'First Media' }, { value: 'Biznet', label: 'Biznet' },
            { value: 'MyRepublic', label: 'MyRepublic' }, { value: 'XL Satu', label: 'XL Satu' }, { value: 'MNC Play', label: 'MNC Play' },
          ])}
          {renderInput('ID Pelanggan', 'customerId', 'number', 'Nomor Pelanggan')}
          {renderInput('Nama Pelanggan', 'customerName', 'text', 'Nama Terdaftar')}
          {renderInput('Nominal Tagihan', 'nominal', 'number', 'Jumlah Tagihan', true, '*Biaya Admin Flat Rp 2.000')}
        </>
      );

    case 'ewallet':
      return (
        <>
          {renderSelect('Pilih E-Wallet', 'walletType', [
            { value: 'DANA', label: 'DANA' }, { value: 'GoPay', label: 'GoPay' }, { value: 'ShopeePay', label: 'ShopeePay' },
            { value: 'OVO', label: 'OVO' }, { value: 'LinkAja', label: 'LinkAja' }, { value: 'AstraPay', label: 'AstraPay' },
          ], true)}
          {renderInput('Nomor E-Wallet', 'walletNumber', 'number', '08...', true)}
          {renderInput('Nama Terdaftar', 'walletName', 'text', 'Nama Akun')}
          {renderInput('Nominal Top Up', 'nominal', 'number', 'Jumlah Top Up', true)}
        </>
      );

    default:
      if (isPPOB) {
         return renderInput('Nomor Tujuan / ID', 'genericTarget', 'text', 'Masukkan Nomor / ID', true);
      } else {
         return (
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
              <Clock size={16} /> Durasi Langganan <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.duration || ''}
                onChange={(e) => onChange('duration', e.target.value)}
                className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                  errors.duration 
                    ? 'border-red-500 focus:ring-red-500/50' 
                    : 'border-slate-700 focus:ring-brand-primary'
                }`}
              >
                <option value="" disabled>-- Pilih Durasi --</option>
                <option value="1 Bulan">1 Bulan</option>
                <option value="2 Bulan">2 Bulan</option>
                <option value="3 Bulan">3 Bulan</option>
                <option value="6 Bulan">6 Bulan</option>
                <option value="1 Tahun">1 Tahun</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            {errors.duration && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1 error-message">
                <AlertCircle size={12} /> {errors.duration}
              </p>
            )}
          </div>
         );
      }
  }
};
