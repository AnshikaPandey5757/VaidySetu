import React from 'react';
import { Calculator, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PrakritiCalculator({ prakritiResult, onAutoFillCaseSheet }) {
  if (!prakritiResult) return null;

  const { scores = { vata: 33.3, pitta: 33.3, kapha: 33.4 }, dominant_prakriti = 'Tridoshaja', recommendations = [], is_ai_assisted, disclaimer } = prakritiResult;

  return (
    <div className="bg-gradient-to-br from-ayurveda-950 via-ayurveda-900 to-slate-900 text-white rounded-2xl shadow-xl p-6 mb-6 border border-ayurveda-800 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sandalwood-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-ayurveda-800 pb-4 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-sandalwood-500 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
              Stage 3 of 5
            </span>
            <h2 className="text-xl font-bold text-white font-serif flex items-center gap-2">
              <Calculator className="w-5 h-5 text-sandalwood-400" />
              Prakriti Calculation Engine (प्रकृति संगणना)
            </h2>
          </div>
          <p className="text-xs text-ayurveda-300 mt-1">
            Deterministic weighted scoring over Ashtavidha & Dashavidha structured findings.
          </p>
        </div>

        {/* Human-in-the-loop AI Badge */}
        <div className="flex items-center gap-2 bg-amber-950/80 border border-amber-600/50 px-3 py-1.5 rounded-xl text-amber-300 text-xs font-medium">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{disclaimer || "Decision Support Only — Requires Vaidya Confirmation"}</span>
        </div>
      </div>

      {/* Grid: Dominant Prakriti & Visual Breakdown Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Dominant Result Card */}
        <div className="bg-ayurveda-900/90 border border-ayurveda-700/60 rounded-xl p-5 text-center">
          <span className="text-[11px] text-ayurveda-300 uppercase tracking-widest font-mono block mb-1">
            Calculated Doshic Prakriti
          </span>
          <div className="text-2xl font-black text-sandalwood-300 font-serif mb-2">
            {dominant_prakriti}
          </div>
          <p className="text-xs text-ayurveda-200">
            Auto-derived from radial pulse, tongue coat, skin turgor, & digestive fire inputs.
          </p>

          <button
            onClick={onAutoFillCaseSheet}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sandalwood-600 to-sandalwood-500 hover:from-sandalwood-500 hover:to-sandalwood-400 text-white font-bold text-xs py-2 px-4 rounded-lg shadow-md transition"
          >
            <CheckCircle2 className="w-4 h-4" />
            Auto-Fill Case Sheet with Result
          </button>
        </div>

        {/* Visual Percentage Bars */}
        <div className="md:col-span-2 space-y-4 bg-ayurveda-900/50 p-5 rounded-xl border border-ayurveda-800">
          <h3 className="text-xs font-bold text-ayurveda-200 uppercase tracking-wider">
            Dosha Proportion Breakdown
          </h3>

          {/* Vata Bar */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-sky-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" />
                Vata (वातातन्) — Movement & Nervous Impulse
              </span>
              <span className="text-sky-300">{scores.vata}%</span>
            </div>
            <div className="w-full h-3 bg-ayurveda-950 rounded-full overflow-hidden p-0.5 border border-sky-950">
              <div 
                className="h-full bg-gradient-to-r from-sky-500 to-sky-400 rounded-full transition-all duration-500" 
                style={{ width: `${scores.vata}%` }} 
              />
            </div>
          </div>

          {/* Pitta Bar */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-amber-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                Pitta (पित्तम्) — Metabolic & Thermal Fire
              </span>
              <span className="text-amber-300">{scores.pitta}%</span>
            </div>
            <div className="w-full h-3 bg-ayurveda-950 rounded-full overflow-hidden p-0.5 border border-amber-950">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500" 
                style={{ width: `${scores.pitta}%` }} 
              />
            </div>
          </div>

          {/* Kapha Bar */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-emerald-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                Kapha (कफम्) — Structure & Fluid Binding
              </span>
              <span className="text-emerald-300">{scores.kapha}%</span>
            </div>
            <div className="w-full h-3 bg-ayurveda-950 rounded-full overflow-hidden p-0.5 border border-emerald-950">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500" 
                style={{ width: `${scores.kapha}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Guidance Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-4 pt-4 border-t border-ayurveda-800 text-xs text-ayurveda-200">
          <strong className="text-sandalwood-300 font-semibold">Recommended Lifestyle/Pathya Protocol: </strong>
          {recommendations.join(' ')}
        </div>
      )}
    </div>
  );
}
