import React from 'react';
import { GitCommit, Sparkles, HelpCircle } from 'lucide-react';

export default function NidanPanchaka({ nidanData, setNidanData, currentRole }) {
  const handleChange = (field, value) => {
    setNidanData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const steps = [
    { key: 'hetu', label: '1. Hetu (निदान / Etiological Factors)', placeholder: 'E.g., Irregular eating (Vishamashana), excess spicy/dry food, night waking', desc: 'Primary causative diet, lifestyle, or environmental triggers.' },
    { key: 'purvarupa', label: '2. Purvarupa (पूर्वरूप / Prodromal Symptoms)', placeholder: 'E.g., Mild bloating, taste alteration, heaviness after meals', desc: 'Pre-manifestation warnings prior to full disease onset.' },
    { key: 'rupa', label: '3. Rupa (रूप / Manifested Signs & Symptoms)', placeholder: 'E.g., Epigastric pain, acid reflux, coated tongue, constipation', desc: 'Fully developed clinical signs and subjective complaints.' },
    { key: 'upashaya', label: '4. Upashaya (उपशय / Therapeutic Response)', placeholder: 'E.g., Warm milk with ghee relieves pain; cold items aggravate', desc: 'Factors providing diagnostic relief (Upashaya) or worsening (Anupashaya).' },
    { key: 'samprapti', label: '5. Samprapti (सम्प्राप्ति / Disease Pathogenesis)', placeholder: 'E.g., Aamashayastha Vata & Pitta vitiation causing Annavaha Srotas Sanga', desc: 'Complete Doshic chain reaction from Agnimandya to Sthanasamsraya.' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
              Stage 4 of 5
            </span>
            <h2 className="text-xl font-bold text-slate-800 font-serif">
              Nidan Panchaka (निदान पञ्चक — 5-Fold Diagnostic Reasoning)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Formulate clinical pathogenesis from Hetu to Samprapti prior to final auto-coding.
          </p>
        </div>

        {currentRole === 'intern' && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl p-3 max-w-sm flex gap-2">
            <HelpCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">BAMS Clinical Hint:</strong>
              Samprapti maps the movement of vitiated Doshas through Srotas channels. Use this to select Shodhana vs Shamana treatment.
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.key} className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-emerald-300 transition">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-emerald-600" />
                {step.label}
              </label>
              <span className="text-[11px] text-slate-400 font-normal">{step.desc}</span>
            </div>
            <textarea
              rows={2}
              value={nidanData[step.key] || ''}
              onChange={(e) => handleChange(step.key, e.target.value)}
              placeholder={step.placeholder}
              className="w-full text-xs p-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-800 placeholder-slate-400 resize-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
