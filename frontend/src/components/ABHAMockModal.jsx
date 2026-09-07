import React, { useState } from 'react';
import { UserCheck, QrCode, Search, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { lookupAbhaApi } from '../services/api';

export default function ABHAMockModal({ isOpen, onClose, onSelectPatient }) {
  const [abhaId, setAbhaId] = useState('91-8842-1920-4491');
  const [loading, setLoading] = useState(false);
  const [patientRecord, setPatientRecord] = useState(null);

  if (!isOpen) return null;

  const handleLookup = async () => {
    setLoading(true);
    const data = await lookupAbhaApi(abhaId);
    setPatientRecord(data);
    setLoading(false);
  };

  const handleImport = () => {
    if (patientRecord && onSelectPatient) {
      onSelectPatient(patientRecord);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-ayurveda-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm font-serif">ABHA / ABDM Health ID Lookup</h3>
              <p className="text-[11px] text-emerald-300">Simulated Ayushman Bharat Digital Mission Stack</p>
            </div>
          </div>
          <button onClick={onClose} className="text-ayurveda-300 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 mb-4 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Scan ABDM Patient QR Code or enter 14-digit ABHA Number.</span>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-700 mb-1">ABHA Health ID Number:</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={abhaId}
                onChange={(e) => setAbhaId(e.target.value)}
                placeholder="91-8842-1920-4491"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <button
                onClick={handleLookup}
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 rounded-xl shadow transition"
              >
                {loading ? 'Searching...' : 'Lookup'}
              </button>
            </div>
          </div>

          {/* Verified Result Card */}
          {patientRecord && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-2 mb-4">
              <div className="flex items-center justify-between text-emerald-900 font-bold border-b border-emerald-200 pb-2">
                <span>ABDM Verification Verified ✓</span>
                <span className="font-mono text-[10px] bg-emerald-200 px-2 py-0.5 rounded">{patientRecord.abha_id}</span>
              </div>

              <div className="text-slate-800 font-bold text-sm">{patientRecord.name}</div>
              <div className="text-slate-600">Gender: {patientRecord.gender} | DOB: {patientRecord.dob}</div>
              <div className="text-slate-600">Address: {patientRecord.address}</div>

              <button
                onClick={handleImport}
                className="mt-3 w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs py-2 rounded-xl shadow transition flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Import Patient to Active Case Sheet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
