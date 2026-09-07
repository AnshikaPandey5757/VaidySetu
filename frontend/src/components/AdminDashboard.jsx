import React from 'react';
import { Building2, ShieldCheck, Database, FileText, CheckCircle2, Activity, HardDrive } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="bg-slate-800 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
            Platform Admin & Audit View
          </span>
          <h2 className="text-xl font-bold text-slate-800 font-serif">
            VaidyaSetu Health Interoperability & Audit Control
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Monitor ABDM gateway connections, DPDP 2023 consent ledgers, FHIR R4 concept map stats, and rural offline PWA sync logs.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-ayurveda-50 border border-ayurveda-200 rounded-xl p-4">
          <div className="text-xs font-bold text-ayurveda-900 mb-1 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-ayurveda-600" />
            NAMASTE Mapped Dataset
          </div>
          <div className="text-2xl font-black text-ayurveda-950 font-mono">1,941</div>
          <p className="text-[11px] text-ayurveda-700 mt-1">Active AYUSH National Codes</p>
        </div>

        <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
          <div className="text-xs font-bold text-sky-900 mb-1 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-sky-600" />
            WHO ICD-11 TM2 Maps
          </div>
          <div className="text-2xl font-black text-sky-950 font-mono">100%</div>
          <p className="text-[11px] text-sky-700 mt-1">FHIR R4 ConceptMap Coverage</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="text-xs font-bold text-amber-900 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            DPDP 2023 Consent Audit
          </div>
          <div className="text-2xl font-black text-amber-950 font-mono">Verified</div>
          <p className="text-[11px] text-amber-700 mt-1">Immutable Hash Verification</p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="text-xs font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
            <HardDrive className="w-4 h-4 text-emerald-600" />
            Offline PWA Storage
          </div>
          <div className="text-2xl font-black text-emerald-950 font-mono">Active</div>
          <p className="text-[11px] text-emerald-700 mt-1">Local-First Queue Sync Ready</p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div>
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Recent Interoperability & System Audit Events
        </h3>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Event Timestamp</th>
                <th className="p-3">Event Type</th>
                <th className="p-3">Patient / Case Ref</th>
                <th className="p-3">Compliance Standard</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3 font-mono">2026-09-06 19:20:00</td>
                <td className="p-3 font-semibold">FHIR R4 ConceptMap Query</td>
                <td className="p-3">AYU-DIG-0142 → SK25</td>
                <td className="p-3 font-mono text-ayurveda-700">WHO ICD-11 TM2</td>
                <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Success</span></td>
              </tr>
              <tr>
                <td className="p-3 font-mono">2026-09-06 19:15:30</td>
                <td className="p-3 font-semibold">DPDP Explicit Consent Signed</td>
                <td className="p-3">PAT-1001 (Rajesh Kumar)</td>
                <td className="p-3 font-mono text-amber-700">DPDP Act, 2023</td>
                <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Verified</span></td>
              </tr>
              <tr>
                <td className="p-3 font-mono">2026-09-06 19:00:12</td>
                <td className="p-3 font-semibold">ABHA Health ID Verification</td>
                <td className="p-3">91-8842-1920-4491</td>
                <td className="p-3 font-mono text-sky-700">ABDM FHIR R4 Gateway</td>
                <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Success</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
