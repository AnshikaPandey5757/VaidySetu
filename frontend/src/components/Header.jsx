import React from 'react';
import { ShieldCheck, UserCheck, Stethoscope, GraduationCap, Building2, Wifi, WifiOff, Download, Mic, FileText, Activity } from 'lucide-react';

export default function Header({ 
  currentRole, 
  setCurrentRole, 
  isOnline, 
  onOpenAbha, 
  onOpenConsent, 
  onOpenVoice,
  activeTab,
  setActiveTab 
}) {
  return (
    <header className="bg-ayurveda-950 text-white shadow-xl border-b border-ayurveda-800 sticky top-0 z-40">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ayurveda-400 to-sandalwood-500 flex items-center justify-center text-white shadow-lg font-bold text-xl">
            🌿
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white font-serif">VaidyaSetu</h1>
              <span className="bg-ayurveda-800 text-ayurveda-200 text-xs px-2 py-0.5 rounded-full border border-ayurveda-600 font-mono">
                AYUSH FHIR R4
              </span>
            </div>
            <p className="text-xs text-ayurveda-300 italic">
              "The first case-taking tool that speaks NAMASTE, not just forms."
            </p>
          </div>
        </div>

        {/* Action Controls & Role Switcher */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Online / Offline Status Badge */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
            isOnline 
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700' 
              : 'bg-amber-950/80 text-amber-300 border-amber-700'
          }`}>
            {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            {isOnline ? 'Online Sync Active' : 'Offline Mode (Local Save)'}
          </div>

          {/* Voice Input Trigger Button */}
          <button
            onClick={onOpenVoice}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-sandalwood-600 to-sandalwood-500 hover:from-sandalwood-500 hover:to-sandalwood-400 text-white shadow-sm border border-sandalwood-400 transition"
          >
            <Mic className="w-4 h-4" />
            Voice Assistant
          </button>

          {/* ABHA Mock Modal Trigger */}
          <button
            onClick={onOpenAbha}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-ayurveda-900 hover:bg-ayurveda-800 text-ayurveda-200 border border-ayurveda-700 transition"
          >
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            ABHA / ABDM
          </button>

          {/* DPDP Consent Modal Trigger */}
          <button
            onClick={onOpenConsent}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-ayurveda-900 hover:bg-ayurveda-800 text-ayurveda-200 border border-ayurveda-700 transition"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            DPDP 2023 Consent
          </button>

          {/* Role Switcher Selector */}
          <div className="flex items-center bg-ayurveda-900 rounded-lg p-1 border border-ayurveda-800">
            <button
              onClick={() => setCurrentRole('vaidya')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                currentRole === 'vaidya' 
                  ? 'bg-ayurveda-600 text-white shadow-sm' 
                  : 'text-ayurveda-300 hover:text-white'
              }`}
              title="Practicing Vaidya Mode"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              Vaidya
            </button>
            <button
              onClick={() => setCurrentRole('intern')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                currentRole === 'intern' 
                  ? 'bg-sandalwood-600 text-white shadow-sm' 
                  : 'text-ayurveda-300 hover:text-white'
              }`}
              title="BAMS Intern Training Mode"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Intern Mode
            </button>
            <button
              onClick={() => setCurrentRole('admin')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition ${
                currentRole === 'admin' 
                  ? 'bg-slate-700 text-white shadow-sm' 
                  : 'text-ayurveda-300 hover:text-white'
              }`}
              title="System Admin & Audit View"
            >
              <Building2 className="w-3.5 h-3.5" />
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-ayurveda-900 border-t border-ayurveda-800/80 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('exam')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 ${
              activeTab === 'exam'
                ? 'bg-ayurveda-950 text-white border-sandalwood-400'
                : 'text-ayurveda-300 hover:text-white border-transparent'
            }`}
          >
            <FileText className="w-4 h-4 text-sandalwood-400" />
            Continuous Clinical Exam Workflow
          </button>
          
          <button
            onClick={() => setActiveTab('trends')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 ${
              activeTab === 'trends'
                ? 'bg-ayurveda-950 text-white border-sandalwood-400'
                : 'text-ayurveda-300 hover:text-white border-transparent'
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            Follow-Up Dosha Trend Analytics
          </button>
        </div>
      </div>
    </header>
  );
}
