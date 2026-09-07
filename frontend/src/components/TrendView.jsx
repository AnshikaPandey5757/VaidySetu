import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Activity, Calendar, FileText, ChevronRight, UserCheck } from 'lucide-react';
import { fetchPatientTrendsApi } from '../services/api';

export default function TrendView({ patientData }) {
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrends();
  }, [patientData]);

  const loadTrends = async () => {
    setLoading(true);
    const patId = patientData?.id || 'PAT-1001';
    const res = await fetchPatientTrendsApi(patId);
    setTrendData(res.trend_data || []);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
              Patient Longitudinal Analytics
            </span>
            <h2 className="text-xl font-bold text-slate-800 font-serif">
              Follow-Up Dosha & Symptom Progression Chart
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tracking Vata, Pitta, and Kapha equilibrium over repeat visits for Patient: <strong className="text-slate-700">{patientData?.name || 'Rajesh Kumar'} ({patientData?.id || 'PAT-1001'})</strong>
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-600" />
          Multi-Visit Dosha Proportion Progression Timeline (%)
        </h3>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-xs text-slate-400">
            Loading patient time-series data...
          </div>
        ) : trendData.length > 0 ? (
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="visit_date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="vata" name="Vata Dosha %" stroke="#0284c7" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="pitta" name="Pitta Dosha %" stroke="#d97706" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="kapha" name="Kapha Dosha %" stroke="#15803d" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-xs text-slate-400">
            No follow-up visits recorded yet. Complete and save multiple case sheets to view trends.
          </div>
        )}
      </div>

      {/* Historical Visit Log */}
      <div>
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Historical Visit Diagnostic Records
        </h3>

        <div className="space-y-3">
          {trendData.map((visit, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 hover:border-emerald-300 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                  #{idx + 1}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Visit Date: {visit.visit_date}</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Diagnosis: <strong>{visit.diagnosis}</strong> ({visit.namaste_code})
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-1 rounded-lg">
                  V: {visit.vata}%
                </span>
                <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-lg">
                  P: {visit.pitta}%
                </span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg">
                  K: {visit.kapha}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
