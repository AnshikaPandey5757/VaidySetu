import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AshtavidhaPariksha from './components/AshtavidhaPariksha';
import DashavidhaPariksha from './components/DashavidhaPariksha';
import PrakritiCalculator from './components/PrakritiCalculator';
import NidanPanchaka from './components/NidanPanchaka';
import CodedCaseSheet from './components/CodedCaseSheet';
import VoiceAssistant from './components/VoiceAssistant';
import TrendView from './components/TrendView';
import ABHAMockModal from './components/ABHAMockModal';
import DPDPConsentModal from './components/DPDPConsentModal';
import AdminDashboard from './components/AdminDashboard';

import { calculatePrakritiApi } from './services/api';
import { User, Calendar, MapPin, HeartPulse, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState('vaidya'); // 'vaidya' | 'intern' | 'admin'
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [activeTab, setActiveTab] = useState('exam'); // 'exam' | 'trends'

  // Modals state
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isAbhaOpen, setIsAbhaOpen] = useState(false);
  const [isConsentOpen, setIsConsentOpen] = useState(false);

  // Active Patient Record State
  const [patientData, setPatientData] = useState({
    id: 'PAT-1001',
    abha_id: '91-8842-1920-4491',
    name: 'Rajesh Kumar',
    age: 42,
    gender: 'Male',
    contact: '+91 9876543210',
    location: 'Varanasi, UP',
    comorbidities: ['Hypertension'],
    is_pregnant: false
  });

  // Continuous Clinical Workflow States
  const [ashtavidhaData, setAshtavidhaData] = useState({
    nadi: 'Vata-Pitta',
    jihva: 'Coated, dry (Vata-Pitta)',
    sparsha: 'Warm, moist, oily, reddish',
    druk: 'Sharp, sensitive to light, reddish/yellowish',
    shabda: 'Sharp, loud, forceful, clear',
    mutra: 'Yellow, reddish, pungent smell, burning',
    mala: 'Dry, hard, constipated, gaseous',
    akriti: 'Medium build, good muscle tone, warm'
  });

  const [dashavidhaData, setDashavidhaData] = useState({
    dushya: 'Rasa-Rakta Dhatu',
    desha: 'Anupa Desha (Marshy)',
    bala: 'Madhyama Bala',
    kala: 'Sharad Ritu',
    anala: 'Vishamagni (Irregular digestive fire)',
    prakriti: 'Vata-Pitta Dominant',
    satmya: 'Eka-rasa Satmya',
    satwa: 'Madhya Satwa',
    ahara: 'Abhyavaharana Shakti',
    vaya: 'Madhyama Vaya'
  });

  const [prakritiResult, setPrakritiResult] = useState(null);

  const [nidanData, setNidanData] = useState({
    hetu: 'Irregular eating habits (Vishamashana), excess spicy/dry food',
    purvarupa: 'Mild abdominal distension, bitter eructations',
    rupa: 'Epigastric pain, acid reflux, coated tongue, constipation',
    upashaya: 'Warm milk with ghee relieves pain; cold items aggravate',
    samprapti: 'Aamashayastha Vata & Pitta vitiation causing Annavaha Srotas Sanga'
  });

  // Track online/offline network status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Recalculate Prakriti in real time whenever Ashtavidha or Dashavidha fields change
  useEffect(() => {
    async function updatePrakriti() {
      const res = await calculatePrakritiApi(ashtavidhaData, dashavidhaData);
      setPrakritiResult(res);
    }
    updatePrakriti();
  }, [ashtavidhaData, dashavidhaData]);

  // Handle Voice Assistant Extracted Data Auto-Fill
  const handleApplyVoiceFields = (extracted) => {
    setAshtavidhaData(prev => ({
      ...prev,
      nadi: extracted.nadi || prev.nadi,
      jihva: extracted.jihva || prev.jihva,
      sparsha: extracted.sparsha || prev.sparsha,
      mutra: extracted.mutra || prev.mutra,
      mala: extracted.mala || prev.mala,
      akriti: extracted.akriti || prev.akriti
    }));
    if (extracted.anala) {
      setDashavidhaData(prev => ({ ...prev, anala: extracted.anala }));
    }
    if (extracted.extracted_symptoms && extracted.extracted_symptoms.length > 0) {
      setNidanData(prev => ({
        ...prev,
        rupa: extracted.extracted_symptoms.join(', ')
      }));
    }
  };

  // Auto fill Case Sheet from Prakriti Result
  const handleAutoFillCaseSheet = () => {
    if (prakritiResult) {
      setDashavidhaData(prev => ({
        ...prev,
        prakriti: prakritiResult.dominant_prakriti
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f4] text-slate-800 flex flex-col font-sans">
      {/* App Header */}
      <Header
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        isOnline={isOnline}
        onOpenAbha={() => setIsAbhaOpen(true)}
        onOpenConsent={() => setIsConsentOpen(true)}
        onOpenVoice={() => setIsVoiceOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {/* Active Patient Card Banner */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-ayurveda-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">{patientData.name}</h2>
                <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded font-mono font-bold">
                  {patientData.id}
                </span>
                {patientData.is_pregnant && (
                  <span className="bg-rose-100 text-rose-800 text-[10px] px-2 py-0.5 rounded font-bold">
                    Pregnancy Active
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-0.5">
                <span>{patientData.age} yrs | {patientData.gender}</span>
                <span>• ABHA: <strong className="font-mono text-slate-700">{patientData.abha_id}</strong></span>
                <span>• Location: {patientData.location}</span>
                <span>• Comorbidities: <strong className="text-slate-700">{patientData.comorbidities.join(', ') || 'None'}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAbhaOpen(true)}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg border border-slate-300 transition"
            >
              Switch Patient
            </button>
          </div>
        </div>

        {/* View Mode Switching */}
        {currentRole === 'admin' ? (
          <AdminDashboard />
        ) : activeTab === 'trends' ? (
          <TrendView patientData={patientData} />
        ) : (
          /* Continuous 5-Stage Clinical Exam Workflow */
          <div className="space-y-6">
            {/* Stage 1: Ashtavidha Pariksha */}
            <AshtavidhaPariksha
              ashtavidhaData={ashtavidhaData}
              setAshtavidhaData={setAshtavidhaData}
              currentRole={currentRole}
            />

            {/* Stage 2: Dashavidha Pariksha */}
            <DashavidhaPariksha
              dashavidhaData={dashavidhaData}
              setDashavidhaData={setDashavidhaData}
              currentRole={currentRole}
            />

            {/* Stage 3: Prakriti Calculator Engine */}
            <PrakritiCalculator
              prakritiResult={prakritiResult}
              onAutoFillCaseSheet={handleAutoFillCaseSheet}
            />

            {/* Stage 4: Nidan Panchaka Diagnostic Reasoning */}
            <NidanPanchaka
              nidanData={nidanData}
              setNidanData={setNidanData}
              currentRole={currentRole}
            />

            {/* Stage 5: Final Coded Case Sheet (NAMASTE + ICD-11 TM2) */}
            <CodedCaseSheet
              ashtavidhaData={ashtavidhaData}
              dashavidhaData={dashavidhaData}
              prakritiResult={prakritiResult}
              nidanData={nidanData}
              patientData={patientData}
              currentRole={currentRole}
              onSaveSuccess={() => setActiveTab('trends')}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-ayurveda-950 text-ayurveda-300 text-xs py-4 px-4 border-t border-ayurveda-800 text-center">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>VaidyaSetu — Digital Case-Taking for Ayurvedic Clinical Practice</span>
          <span className="font-mono text-sandalwood-300">AYUSH FHIR R4 | NAMASTE Codes | WHO ICD-11 TM2</span>
          <span>DPDP Act 2023 Compliant</span>
        </div>
      </footer>

      {/* Modals */}
      <VoiceAssistant
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onApplyFields={handleApplyVoiceFields}
      />

      <ABHAMockModal
        isOpen={isAbhaOpen}
        onClose={() => setIsAbhaOpen(false)}
        onSelectPatient={(pRecord) => {
          setPatientData(prev => ({
            ...prev,
            name: pRecord.name,
            abha_id: pRecord.abha_id,
            location: pRecord.address
          }));
        }}
      />

      <DPDPConsentModal
        isOpen={isConsentOpen}
        onClose={() => setIsConsentOpen(false)}
        patientData={patientData}
      />
    </div>
  );
}
