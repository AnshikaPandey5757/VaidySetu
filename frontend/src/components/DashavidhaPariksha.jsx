import React from 'react';
import { DASHAVIDHA_FIELDS } from '../data/ayurvedicExamData';
import { ClipboardList, Sparkles, HelpCircle } from 'lucide-react';

export default function DashavidhaPariksha({ dashavidhaData, setDashavidhaData, currentRole }) {
  const handleChange = (fieldId, value) => {
    setDashavidhaData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-sandalwood-100 text-sandalwood-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
              Stage 2 of 5
            </span>
            <h2 className="text-xl font-bold text-slate-800 font-serif">
              Dashavidha Pariksha (दशविध परीक्षा — 10-Fold Treatment Planning)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Examine Dushya, Desha, Bala, Kala, Anala, Satwa, Satmya, Ahara, Vaya to customize Chikitsa.
          </p>
        </div>

        {currentRole === 'intern' && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl p-3 max-w-sm flex gap-2">
            <HelpCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
            <div>
              <strong className="font-semibold block mb-0.5">BAMS Clinical Hint:</strong>
              Dashavidha Pariksha assesses patient strength vs disease strength to determine Samprapti Vighatana.
            </div>
          </div>
        )}
      </div>

      {/* Grid of 10 Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DASHAVIDHA_FIELDS.map((field) => (
          <div key={field.id} className="bg-slate-50 border border-slate-200 rounded-xl p-3 hover:border-sandalwood-300 transition">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <ClipboardList className="w-3.5 h-3.5 text-sandalwood-600" />
              {field.title}
            </label>
            <input
              type="text"
              value={dashavidhaData[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className="w-full text-xs px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sandalwood-500/20 focus:border-sandalwood-500 text-slate-800 placeholder-slate-400"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
