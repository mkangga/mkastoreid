import React from 'react';
import { ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';
import { features } from '../siteConfig';

const iconMap = {
  shield: ShieldCheck,
  zap: Zap,
  check: CheckCircle2,
};

export const Features: React.FC = () => {
  return (
    <section id="keunggulan" className="py-20 bg-slate-900/50 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Mengapa MKA Store?</h2>
          <div className="w-24 h-1 bg-brand-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={feature.id}
                className="group p-8 bg-slate-950 border border-slate-800 rounded-2xl hover:border-brand-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(37,99,235,0.3)]"
              >
                <div className="w-14 h-14 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300 text-brand-primary">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};