import React, { useEffect, useReducer, useRef } from 'react';
import { Send, CreditCard, Clock, User, ShoppingBag, Info, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { config, products } from '../siteConfig';

// --- Types & State Management ---

type FormState = {
  productName: string;
  name: string;
  duration: string;
  paymentMethod: string;
  formData: Record<string, string>;
  errors: Record<string, string>;
  isSubmitting: boolean;
};

type FormAction =
  | { type: 'SET_PRODUCT'; payload: string }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_DURATION'; payload: string }
  | { type: 'SET_PAYMENT_METHOD'; payload: string }
  | { type: 'UPDATE_FIELD'; field: string; value: string }
  | { type: 'SET_ERRORS'; payload: Record<string, string> }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'RESET_FORM_DATA' };

const initialState: FormState = {
  productName: '',
  name: '',
  duration: '1 Bulan',
  paymentMethod: 'QRIS',
  formData: {},
  errors: {},
  isSubmitting: false,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_PRODUCT':
      return { ...state, productName: action.payload, formData: {}, errors: {} };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_PAYMENT_METHOD':
      return { ...state, paymentMethod: action.payload };
    case 'UPDATE_FIELD':
      return { 
        ...state, 
        formData: { ...state.formData, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: '' } // Clear error on change
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.payload, isSubmitting: false };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'RESET_FORM_DATA':
      return { ...state, formData: {}, errors: {} };
    default:
      return state;
  }
};

export const OrderForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const productFromUrl = searchParams.get('product') || '';
  const [state, dispatch] = useReducer(formReducer, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize product from URL
  useEffect(() => {
    if (productFromUrl) {
      dispatch({ type: 'SET_PRODUCT', payload: productFromUrl });
    }
  }, [productFromUrl]);

  // Determine Product Category & ID
  const selectedProduct = products.find(p => p.name === state.productName);
  const category = selectedProduct?.category || '';
  const productId = selectedProduct?.id || '';
  const isPPOB = ['PPOB & Tagihan', 'Top Up & Voucher', 'E-Wallet & Keuangan'].includes(category);

  // --- Validation Logic ---
  const validateForm = () => {
    const errors: Record<string, string> = {};
    const { formData } = state;

    // Common validations
    if (!state.productName) errors.productName = 'Silakan pilih produk terlebih dahulu.';

    // Specific validations based on productId
    switch (productId) {
      case 'pulsa':
      case 'paket-data':
        if (!formData.phoneNumber) errors.phoneNumber = 'Nomor HP wajib diisi.';
        else if (!/^\d{10,14}$/.test(formData.phoneNumber)) errors.phoneNumber = 'Nomor HP tidak valid (10-14 digit).';
        if (!formData.provider) errors.provider = 'Provider wajib dipilih.';
        if (productId === 'pulsa' && !formData.nominal) errors.nominal = 'Nominal wajib dipilih.';
        if (productId === 'paket-data' && !formData.quotaDuration) errors.quotaDuration = 'Paket wajib diisi.';
        break;

      case 'pln':
        if (!formData.meterNumber) errors.meterNumber = 'Nomor Meter/ID Pelanggan wajib diisi.';
        if (!formData.nominal) errors.nominal = 'Nominal token wajib dipilih.';
        if (formData.nominal === 'Request' && !formData.customNominal) errors.customNominal = 'Nominal request wajib diisi.';
        break;

      case 'ewallet':
        if (!formData.walletType) errors.walletType = 'E-Wallet wajib dipilih.';
        if (!formData.walletNumber) errors.walletNumber = 'Nomor E-Wallet wajib diisi.';
        if (!formData.nominal) errors.nominal = 'Nominal Top Up wajib diisi.';
        break;
      
      case 'games':
        if (!formData.gameName) errors.gameName = 'Nama Game wajib diisi.';
        if (!formData.userId) errors.userId = 'User ID wajib diisi.';
        if (!formData.gameItem) errors.gameItem = 'Item/Nominal wajib diisi.';
        break;

      case 'transfer':
        if (!formData.destNumber) errors.destNumber = 'Nomor Rekening Tujuan wajib diisi.';
        if (!formData.nominal) errors.nominal = 'Nominal Transfer wajib diisi.';
        break;
        
      case 'convert':
        if (!formData.sourcePlatform) errors.sourcePlatform = 'Platform asal wajib dipilih.';
        if (!formData.sourceNumber) errors.sourceNumber = 'Nomor asal wajib diisi.';
        if (!formData.destPlatform) errors.destPlatform = 'Platform tujuan wajib dipilih.';
        if (!formData.destNumber) errors.destNumber = 'Nomor tujuan wajib diisi.';
        if (!formData.nominal) errors.nominal = 'Nominal convert wajib diisi.';
        break;

      // Add more specific validations as needed
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_SUBMITTING', payload: true });

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      // Scroll to first error
      const firstError = document.querySelector('.error-message');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Construct WhatsApp Message
    const finalName = state.name.trim() || 'Pembeli';
    const finalProduct = state.productName || 'Belum dipilih';
    
    let message = `Halo kak, saya ${finalName}.\n\nMau order *${finalProduct}*.\n\nDetail:`;

    // ... Message Construction Logic (Same as before but using state.formData) ...
    switch (productId) {
      case 'ecommerce':
        const platform = state.formData.ecommercePlatform === 'Lainnya' ? state.formData.customEcommerce : state.formData.ecommercePlatform;
        const bank = state.formData.bankVA === 'Lainnya' ? state.formData.customBank : state.formData.bankVA;
        message += `\n• E-Commerce: ${platform}\n• Bank VA: ${bank}\n• Nomor VA: ${state.formData.vaNumber}`;
        break;
      case 'pulsa':
        const prov = state.formData.provider === 'Lainnya' ? state.formData.customProvider : state.formData.provider;
        message += `\n• Provider: ${prov}\n• Nominal: ${state.formData.nominal}\n• Nomor HP: ${state.formData.phoneNumber}`;
        break;
      case 'pln':
        const plnNominal = state.formData.nominal === 'Request' ? state.formData.customNominal : state.formData.nominal;
        message += `\n• ID Pelanggan: ${state.formData.meterNumber}\n• Nominal Token: ${plnNominal}`;
        break;
      case 'transfer':
        message += `\n• Tujuan: ${state.formData.destNumber} (${state.formData.destName})\n• Nominal: ${state.formData.nominal}`;
        break;
      case 'convert':
        const srcPlat = state.formData.sourcePlatform === 'Lainnya' ? state.formData.customSourcePlatform : state.formData.sourcePlatform;
        const destPlat = state.formData.destPlatform === 'Lainnya' ? state.formData.customDestPlatform : state.formData.destPlatform;
        message += `\n• Dari: ${srcPlat} - ${state.formData.sourceNumber} (${state.formData.sourceName})\n• Ke: ${destPlat} - ${state.formData.destNumber} (${state.formData.destName})\n• Nominal Convert: ${state.formData.nominal}`;
        break;
      case 'angsuran':
        const angsuranBank = state.formData.bankVA ? (state.formData.bankVA === 'Lainnya' ? state.formData.customBank : state.formData.bankVA) : '-';
        message += `\n• Platform: ${state.formData.platformName}\n• Bank VA: ${angsuranBank}\n• No. Kontrak: ${state.formData.contractNumber}\n• Nama Pelanggan: ${state.formData.contractName}\n• Nominal: ${state.formData.nominal}`;
        break;
      case 'pendidikan':
        message += `\n• ID Siswa/Tagihan: ${state.formData.studentId}\n• Nama Siswa: ${state.formData.studentName}\n• Nominal: ${state.formData.nominal}`;
        break;
      case 'va':
        const vaBank = state.formData.bankVA === 'Lainnya' ? state.formData.customBank : state.formData.bankVA;
        message += `\n• Bank: ${vaBank}\n• Nomor VA: ${state.formData.vaNumber}\n• Nominal: ${state.formData.nominal}`;
        break;
      case 'games':
        message += `\n• Game: ${state.formData.gameName}\n• User ID: ${state.formData.userId}\n• Item/Nominal: ${state.formData.gameItem}`;
        break;
      case 'pdam':
        message += `\n• ID Pelanggan: ${state.formData.customerId}\n• Nama Pelanggan: ${state.formData.customerName}`;
        break;
      case 'paket-data':
        const dataProv = state.formData.provider === 'Lainnya' ? state.formData.customProvider : state.formData.provider;
        message += `\n• Provider: ${dataProv}\n• Nomor HP: ${state.formData.phoneNumber}\n• Paket: ${state.formData.quotaDuration}`;
        break;
      case 'bpjs':
        message += `\n• No VA BPJS: ${state.formData.vaNumber}\n• Nama Peserta: ${state.formData.participantName}\n• Nominal: ${state.formData.nominal}`;
        break;
      case 'internet-tv':
        const tvProv = state.formData.provider === 'Lainnya' ? state.formData.customProvider : state.formData.provider;
        message += `\n• Provider: ${tvProv}\n• ID Pelanggan: ${state.formData.customerId}\n• Nama Pelanggan: ${state.formData.customerName}\n• Nominal: ${state.formData.nominal}`;
        break;
      case 'ewallet':
        const wallet = state.formData.walletType === 'Lainnya' ? state.formData.customWallet : state.formData.walletType;
        message += `\n• E-Wallet: ${wallet}\n• Nomor: ${state.formData.walletNumber}\n• Nama Akun: ${state.formData.walletName}\n• Nominal: ${state.formData.nominal}`;
        break;
      default:
        if (isPPOB) {
           message += `\n• ID/Nomor: ${state.formData.genericTarget}`;
        } else {
           message += `\n• Durasi: ${state.duration}`;
        }
    }

    message += `\n\n• Pembayaran: ${state.paymentMethod}\n\nMohon dicek total harganya kak. Terima kasih!`;
    
    const waLink = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
    dispatch({ type: 'SET_SUBMITTING', payload: false });
  };

  // Helper for Input Fields
  const renderInput = (label: string, field: string, type: string = 'text', placeholder: string = '', required: boolean = false, note?: string) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-400 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={state.formData[field] || ''}
        onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field, value: e.target.value })}
        className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 transition-all ${
          state.errors[field] 
            ? 'border-red-500 focus:ring-red-500/50' 
            : 'border-slate-700 focus:ring-brand-primary'
        }`}
      />
      {state.errors[field] && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1 error-message">
          <AlertCircle size={12} /> {state.errors[field]}
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
          value={state.formData[field] || ''}
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field, value: e.target.value })}
          className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 transition-all cursor-pointer ${
            state.errors[field] 
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
      {state.errors[field] && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1 error-message">
          <AlertCircle size={12} /> {state.errors[field]}
        </p>
      )}
      {state.formData[field] === 'Lainnya' && (
        <div className="mt-2">
           <input
            type="text"
            placeholder={`Masukkan ${label} Lainnya`}
            onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: `custom${field.charAt(0).toUpperCase() + field.slice(1)}`, value: e.target.value })}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
        </div>
      )}
    </div>
  );

  // --- Render Specific Fields Logic ---
  const renderSpecificFields = () => {
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
            {state.formData.nominal === 'Request' && renderInput('Nominal Request', 'customNominal', 'number', 'Masukkan Nominal', true)}
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
            {renderInput('Nomor Tagihan / ID Siswa', 'studentId', 'number', 'ID Siswa / Mahasiswa')}
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
           return renderInput('Nomor Tujuan / ID', 'genericTarget', 'text', 'Masukkan Nomor / ID');
        } else {
           return (
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                <Clock size={16} /> Durasi Langganan
              </label>
              <div className="relative">
                <select
                  value={state.duration}
                  onChange={(e) => dispatch({ type: 'SET_DURATION', payload: e.target.value })}
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

  return (
    <section className="bg-slate-900 border-t border-slate-800 rounded-3xl mx-auto max-w-4xl overflow-hidden shadow-2xl relative">
      <div className="p-6 md:p-10 relative">
        {/* Decorative gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kolom Kiri */}
            <div className="space-y-6">
               {/* Produk (Dropdown Select) */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                  <ShoppingBag size={16} /> Pilih Layanan <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={state.productName}
                    onChange={(e) => dispatch({ type: 'SET_PRODUCT', payload: e.target.value })}
                    className={`w-full bg-slate-800/50 border rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:ring-2 transition-all cursor-pointer ${
                      state.errors.productName 
                        ? 'border-red-500 focus:ring-red-500/50' 
                        : 'border-slate-700 focus:ring-brand-primary'
                    }`}
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
                {state.errors.productName && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1 error-message">
                    <AlertCircle size={12} /> {state.errors.productName}
                  </p>
                )}
              </div>

              {/* Nama */}
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                  <User size={16} /> Nama Anda (Opsional)
                </label>
                <input
                  type="text"
                  value={state.name}
                  onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
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
                    value={state.paymentMethod}
                    onChange={(e) => dispatch({ type: 'SET_PAYMENT_METHOD', payload: e.target.value })}
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
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-slate-800">
            <button
              type="submit"
              disabled={state.isSubmitting}
              className="hidden md:flex w-full bg-brand-primary hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-brand-primary/25 transition-all transform hover:-translate-y-1 active:scale-95 items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              <Send size={20} className="group-hover:translate-x-1 transition-transform" />
              {state.isSubmitting ? 'Memproses...' : 'Beli Sekarang – Proses Instan'}
            </button>
            <p className="text-center text-slate-500 text-sm mt-4 flex items-center justify-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" />
              Transaksi Aman & Terpercaya
            </p>
          </div>
        </form>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-slate-900/95 backdrop-blur border-t border-slate-800 z-50">
        <button
          onClick={() => formRef.current?.requestSubmit()}
          disabled={state.isSubmitting}
          className="w-full bg-brand-primary hover:bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-brand-primary/25 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <Send size={18} />
          {state.isSubmitting ? 'Memproses...' : 'Beli Sekarang'}
        </button>
      </div>
    </section>
  );
};
