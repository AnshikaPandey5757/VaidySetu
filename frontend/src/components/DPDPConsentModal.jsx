import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, FileText, X } from 'lucide-react';
import { recordConsentApi } from '../services/api';

export default function DPDPConsentModal({ isOpen, onClose, patientData }) {
  const [grantSharing, setGrantSharing] = useState(true);
  const [recordedStatus, setRecordedStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleRecordConsent = async () => {
    setLoading(true);
    const patId = patientData?.id || 'PAT-1001';
    const res = await recordConsentApi(patId, grantSharing);
    setRecordedStatus(res);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-ayurveda-950 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm font-serif">DPDP Act 2023 Consent Manager</h3>
              <p className="text-[11px] text-amber-300">Explicit Patient Data Privacy & Encryption</p>
            </div>
          </div>
          <button onClick={onClose} className="text-ayurveda-300 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-xs text-slate-600 mb-4">
            Under India's Digital Personal Data Protection (DPDP) Act 2023, patient data processing requires explicit, timestamped, and revocable consent.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-3 mb-4">
            <div className="font-bold text-slate-800 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600" />
              Consent Scope & Rights
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={grantSharing}
                onChange={(e) => setGrantSharing(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-ayurveda-600 focus:ring-ayurveda-500"
              />
              <span className="text-slate-700">
                Patient grants explicit permission to process Ashtavidha/Dashavidha clinical records & share FHIR R4 encrypted summaries with ABDM.
              </span>
            </label>
          </div>

          <button
            onClick={handleRecordConsent}
            disabled={loading}
            className="w-full bg-ayurveda-900 hover:bg-ayurveda-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow transition mb-4"
          >
            {loading ? 'Generating Cryptographic Signature...' : 'Record & Timestamp Digital Consent'}
          </button>

          {recordedStatus && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                DPDP Consent Active & Cryptographically Signed
              </div>
              <div className="font-mono text-[10px] text-emerald-700 truncate">
                Signature Hash: {recordedStatus.signature_hash}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
