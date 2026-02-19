
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { faqs } from '../siteConfig';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-brand-primary/10 rounded-xl mb-4 text-brand-primary">
            <HelpCircle size={28} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pertanyaan Umum (FAQ)</h2>
          <p className="text-slate-400">
            Jawaban untuk pertanyaan yang paling sering ditanyakan oleh pelanggan kami.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-slate-900 border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-brand-primary/50 shadow-lg shadow-brand-primary/10' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className={`font-semibold text-lg transition-colors ${isOpen ? 'text-brand-accent' : 'text-white'}`}>
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-full transition-colors ${isOpen ? 'bg-brand-primary text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 pt-0 text-slate-400 leading-relaxed border-t border-slate-800/50 mt-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};
