import React from 'react';
import { ASHTAVIDHA_FIELDS } from '../data/ayurvedicExamData';
import { Activity, Sparkles, Hand, Eye, Volume2, Droplet, Layers, User, HelpCircle } from 'lucide-react';

const ICON_MAP = {
  Activity, Sparkles, Hand, Eye, Volume2, Droplet, Layers, User
};

export default function AshtavidhaPariksha({ ashtavidhaData, setAshtavidhaData, currentRole }) {
  const handleSelect = (fieldId, optionValue) => {
    setAshtavidhaData(prev => ({
      ...prev,
      [fieldId]: prev[fieldId] === optionValue ? '' : optionValue
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-ayurveda-100 text-ayurveda-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
              Stage 1 of 5
            </span>
            <h2 className="text-xl font-bold text-slate-800 font-serif">
              Ashtavidha Pariksha (अष्टविध परीक्षा — 8-Fold Diagnostic Exam)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Structured exam fields per classical Samhitas. Select findings to compute Dosha dominance.
          </p>
        </div>

        {/* Intern Mode Guidance Hint */}
        {currentRole === 'intern' && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl p-3 max-w-sm flex gap-2">
            <HelpCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">BAMS Clinical Learning Hint:</strong>
              Ashtavidha Pariksha evaluates Rogi (patient) & Roga (disease) state. Nadi & Jihva carry highest diagnostic weight for Aama detection.
            </div>
          </div>
        )}
      </div>

      {/* Grid of 8 Structured Exam Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ASHTAVIDHA_FIELDS.map((field) => {
          const IconComp = ICON_MAP[field.icon] || Activity;
          const selectedValue = ashtavidhaData[field.id] || '';

          return (
            <div 
              key={field.id} 
              className={`rounded-xl border p-4 transition-all ${
                selectedValue 
                  ? 'border-ayurveda-400 bg-ayurveda-50/40 shadow-sm' 
                  : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-ayurveda-100 text-ayurveda-700 flex items-center justify-center font-bold">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{field.title}</h3>
                    <p className="text-[11px] text-ayurveda-700 font-hindi font-medium">{field.sanskritName}</p>
                  </div>
                </div>
                
                {selectedValue && (
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Selected
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-500 mb-3">{field.description}</p>

              {/* Option Selector Buttons */}
              <div className="space-y-2">
                {field.options.map((opt, idx) => {
                  const isSelected = selectedValue === opt.label;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(field.id, opt.label)}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs transition flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'bg-ayurveda-700 text-white border-ayurveda-800 shadow-sm font-semibold'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-ayurveda-300 hover:bg-ayurveda-50/30'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{opt.label}</div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-ayurveda-100' : 'text-slate-400'}`}>
                          {opt.desc}
                        </div>
                      </div>
                      
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
                        opt.dosha.includes('vata') ? 'bg-sky-100 text-sky-800' :
                        opt.dosha.includes('pitta') ? 'bg-amber-100 text-amber-800' :
                        'bg-emerald-100 text-emerald-800'
                      } ${isSelected ? 'ring-1 ring-white/50' : ''}`}>
                        {opt.dosha}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
