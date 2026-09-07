import React, { useState, useEffect } from 'react';
import { FileCheck, Search, ShieldCheck, CheckCircle2, Edit3, AlertTriangle, Sparkles, RefreshCw, Save, ChevronRight } from 'lucide-react';
import { searchCodingApi, saveCaseSheetApi, checkHerbSafetyApi } from '../services/api';

export default function CodedCaseSheet({ 
  ashtavidhaData, 
  dashavidhaData, 
  prakritiResult, 
  nidanData, 
  patientData,
  currentRole,
  onSaveSuccess 
}) {
  const [codingQuery, setCodingQuery] = useState('');
  const [suggestedCodes, setSuggestedCodes] = useState([]);
  const [selectedCoding, setSelectedCoding] = useState({
    namaste_code: 'AYU-DIG-0142',
    namaste_term: 'Vata-Pitta Ajirna (Indigestion)',
    icd11_tm2_code: 'SK25',
    icd11_tm2_term: 'Digestion disharmony pattern',
    confirmed_by_vaidya: false
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [prescriptions, setPrescriptions] = useState('Sutshekhar Ras, Avipattikar Churna, Triphala Kwath');
  const [safetyAlerts, setSafetyAlerts] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveNotification, setSaveNotification] = useState(null);

  // Trigger search when findings change or user types
  useEffect(() => {
    fetchCodingSuggestions();
  }, [ashtavidhaData, prakritiResult, codingQuery]);

  // Run Herb-Drug Safety check when prescriptions change
  useEffect(() => {
    runSafetyCheck();
  }, [prescriptions, patientData]);

  const fetchCodingSuggestions = async () => {
    const doshaPattern = prakritiResult?.dominant_prakriti || '';
    const symptoms = nidanData?.rupa || ashtavidhaData?.jihva || '';
    const data = await searchCodingApi(codingQuery, doshaPattern, symptoms);
    setSuggestedCodes(data.results || []);

    if (data.results && data.results.length > 0 && !selectedCoding.confirmed_by_vaidya) {
      const topMatch = data.results[0];
      setSelectedCoding(prev => ({
        ...prev,
        namaste_code: topMatch.namaste_code,
        namaste_term: topMatch.namaste_term,
        icd11_tm2_code: topMatch.icd11_tm2_code,
        icd11_tm2_term: topMatch.icd11_tm2_term
      }));
    }
  };

  const runSafetyCheck = async () => {
    const herbList = prescriptions.split(',').map(s => s.trim()).filter(Boolean);
    const comorbidities = patientData?.comorbidities || [];
    const isPregnant = patientData?.is_pregnant || false;
    const res = await checkHerbSafetyApi(herbList, comorbidities, isPregnant);
    setSafetyAlerts(res.alerts || []);
  };

  const handleSelectCode = (item) => {
    setSelectedCoding({
      namaste_code: item.namaste_code,
      namaste_term: item.namaste_term,
      icd11_tm2_code: item.icd11_tm2_code,
      icd11_tm2_term: item.icd11_tm2_term,
      confirmed_by_vaidya: false
    });
    setIsEditing(false);
  };

  const handleConfirmCoding = () => {
    setSelectedCoding(prev => ({ ...prev, confirmed_by_vaidya: true }));
  };

  const handleSaveCaseSheet = async () => {
    if (!selectedCoding.confirmed_by_vaidya) {
      alert("Compliance Notice: Practitioner confirmation is required before saving AI auto-coded diagnoses.");
      return;
    }

    setIsSaving(true);
    const fullCase = {
      patient_id: patientData?.id || 'PAT-1001',
      visit_date: new Date().toISOString().split('T')[0],
      ashtavidha: ashtavidhaData,
      dashavidha: dashavidhaData,
      prakriti_result: prakritiResult,
      nidan_panchaka: nidanData,
      coding: selectedCoding,
      prescriptions: prescriptions.split(',').map(s => s.trim()).filter(Boolean),
      role_mode: currentRole
    };

    const result = await saveCaseSheetApi(fullCase);
    setIsSaving(false);
    setSaveNotification("Case Sheet saved & auto-coded into FHIR R4 NAMASTE & ICD-11 TM2!");
    if (onSaveSuccess) onSaveSuccess(result);

    setTimeout(() => setSaveNotification(null), 4000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
      {/* Stage Banner */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-ayurveda-700 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
              Stage 5 of 5 — Final Coded Record
            </span>
            <h2 className="text-xl font-bold text-slate-800 font-serif">
              Real-Time NAMASTE & WHO ICD-11 TM2 Auto-Coding
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Integrated live against 1,941 FHIR R4 NAMASTE national codes and WHO ICD-11 Traditional Medicine Module 2.
          </p>
        </div>

        {/* Save Notification */}
        {saveNotification && (
          <div className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs px-3 py-2 rounded-xl flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {saveNotification}
          </div>
        )}
      </div>

      {/* Main Dual-Coding Interactive Card */}
      <div className="bg-gradient-to-r from-ayurveda-950 to-slate-900 rounded-2xl p-6 text-white mb-6 border border-ayurveda-800 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ayurveda-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sandalwood-400" />
            <span className="text-sm font-bold text-sandalwood-300 font-mono">
              AI Decision-Support Real-Time Code Mapper
            </span>
          </div>

          <span className="bg-amber-950/90 text-amber-300 border border-amber-600/60 text-xs px-3 py-1 rounded-full font-medium">
            ⚠️ Requires Vaidya Sign-Off Before Save
          </span>
        </div>

        {/* Two Columns: NAMASTE Code & ICD-11 TM2 Code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* NAMASTE Code Box */}
          <div className="bg-ayurveda-900/90 border border-ayurveda-700/80 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-ayurveda-300 font-mono mb-2">
              <span>AYUSH NAMASTE CODE</span>
              <span className="bg-ayurveda-800 text-ayurveda-200 px-2 py-0.5 rounded font-bold">
                {selectedCoding.namaste_code}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1 font-serif">
              {selectedCoding.namaste_term}
            </h3>
            <p className="text-xs text-ayurveda-300">
              National Ayurvedic CodeSystem mapped to Annavaha / Srotas pathology.
            </p>
          </div>

          {/* WHO ICD-11 TM2 Code Box */}
          <div className="bg-ayurveda-900/90 border border-ayurveda-700/80 rounded-xl p-4">
            <div className="flex items-center justify-between text-xs text-sky-300 font-mono mb-2">
              <span>WHO ICD-11 TM2 CODE</span>
              <span className="bg-sky-950 text-sky-300 border border-sky-800 px-2 py-0.5 rounded font-bold">
                {selectedCoding.icd11_tm2_code}
              </span>
            </div>
            <h3 className="text-lg font-bold text-sky-100 mb-1 font-serif">
              {selectedCoding.icd11_tm2_term}
            </h3>
            <p className="text-xs text-sky-300">
              WHO Traditional Medicine Module 2 International Standard classification.
            </p>
          </div>
        </div>

        {/* Confirmation Toggle & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-ayurveda-800">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 text-xs text-sandalwood-300 hover:text-white transition"
          >
            <Edit3 className="w-3.5 h-3.5" />
            {isEditing ? 'Hide Code Suggestions' : 'Change / Search Mapped Codes (1,941 Dataset)'}
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleConfirmCoding}
              className={`flex items-center gap-2 text-xs font-bold py-2.5 px-5 rounded-xl border transition ${
                selectedCoding.confirmed_by_vaidya
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-sandalwood-600 hover:bg-sandalwood-500 text-white border-sandalwood-400'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {selectedCoding.confirmed_by_vaidya
                ? 'Diagnosis Confirmed by Vaidya ✓'
                : 'Confirm & Sign Off Diagnosis'}
            </button>

            <button
              onClick={handleSaveCaseSheet}
              disabled={isSaving}
              className="flex items-center gap-2 bg-gradient-to-r from-ayurveda-500 to-ayurveda-600 hover:from-ayurveda-400 hover:to-ayurveda-500 text-white font-bold text-xs py-2.5 px-6 rounded-xl shadow-lg transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving Case Sheet...' : 'Save Complete Case Sheet'}
            </button>
          </div>
        </div>

        {/* Search & Alternative Code Suggestion Drawer */}
        {isEditing && (
          <div className="mt-6 pt-4 border-t border-ayurveda-800">
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-ayurveda-400 absolute left-3 top-3" />
              <input
                type="text"
                value={codingQuery}
                onChange={(e) => setCodingQuery(e.target.value)}
                placeholder="Search NAMASTE codes by disease, dosha, or ICD-11 (e.g., Jwara, Sandhigata Vata, SK25)..."
                className="w-full text-xs pl-9 pr-4 py-2.5 bg-ayurveda-900 border border-ayurveda-700 rounded-xl text-white placeholder-ayurveda-400 focus:outline-none focus:ring-2 focus:ring-sandalwood-500"
              />
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar">
              {suggestedCodes.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectCode(item)}
                  className="bg-ayurveda-900/60 hover:bg-ayurveda-800 border border-ayurveda-800 hover:border-sandalwood-400 rounded-xl p-3 cursor-pointer transition flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      <span className="text-sandalwood-300 font-mono">{item.namaste_code}</span>
                      <span>— {item.namaste_term}</span>
                    </div>
                    <div className="text-[11px] text-ayurveda-300 mt-0.5">
                      Mapped to WHO ICD-11: <span className="text-sky-300 font-mono">{item.icd11_tm2_code}</span> ({item.icd11_tm2_term})
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-ayurveda-400" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Herb-Drug Safety Check Section */}
      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-ayurveda-700" />
          Herb-Drug & Comorbidity Safety Alert Cross-Checker
        </h3>

        <div className="mb-3">
          <label className="block text-xs text-slate-600 mb-1">
            Prescribed Ayurvedic Formulations (comma separated):
          </label>
          <input
            type="text"
            value={prescriptions}
            onChange={(e) => setPrescriptions(e.target.value)}
            placeholder="E.g., Sutshekhar Ras, Guggulu, Ashwagandha..."
            className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-ayurveda-500"
          />
        </div>

        {/* Safety Alerts Display */}
        {safetyAlerts.length > 0 ? (
          <div className="space-y-2">
            {safetyAlerts.map((alert, idx) => (
              <div key={idx} className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">{alert.warning}</strong>
                  <p className="text-[11px] text-amber-800 mt-0.5">{alert.reason}</p>
                  <p className="text-[11px] text-amber-900 font-semibold mt-1">💡 {alert.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            No contraindications detected for patient profile & prescribed formulations.
          </div>
        )}
      </div>
    </div>
  );
}
