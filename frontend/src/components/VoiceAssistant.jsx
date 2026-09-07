import React, { useState } from 'react';
import { Mic, MicOff, Sparkles, CheckCircle2, AlertCircle, X, Volume2 } from 'lucide-react';
import { parseVoiceTranscriptApi } from '../services/api';

export default function VoiceAssistant({ isOpen, onClose, onApplyFields }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedFields, setExtractedFields] = useState(null);

  if (!isOpen) return null;

  // Toggle Web Speech API recording or simulate speech input
  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      handleProcessAudio(transcript || "Rogi has Sarpagati Nadi, dry coated tongue with Vata Pitta imbalance and indigestion.");
    } else {
      setIsRecording(true);
      setTranscript("Listening...");

      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'hi-IN'; // Hindi / Regional clinical speech
        recognition.interimResults = true;

        recognition.onresult = (event) => {
          const text = Array.from(event.results)
            .map(r => r[0].transcript)
            .join('');
          setTranscript(text);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
      } else {
        // Fallback for environments without native speech recognition
        setTimeout(() => {
          setTranscript("Rogi presents with Sarpagati Nadi, dry coated tongue, cold skin, irregular appetite (Vishamagni).");
          setIsRecording(false);
        }, 2000);
      }
    }
  };

  const handleProcessAudio = async (textToParse) => {
    setIsProcessing(true);
    const parsed = await parseVoiceTranscriptApi(textToParse);
    setExtractedFields(parsed);
    setIsProcessing(false);
  };

  const handleConfirmAndFill = () => {
    if (extractedFields && onApplyFields) {
      onApplyFields(extractedFields);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-ayurveda-950 to-ayurveda-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sandalwood-500 flex items-center justify-center text-white font-bold">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm font-serif">Voice-First Case-Taking Assistant</h3>
              <p className="text-[11px] text-ayurveda-300">Biased toward Hindi & Ayurvedic Clinical Vocabulary</p>
            </div>
          </div>

          <button onClick={onClose} className="text-ayurveda-300 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 mb-4 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Human-in-the-Loop:</strong> Voice fills structured fields as an assistant. You can always edit or override any field.
            </span>
          </div>

          {/* Record Button & Visualizer */}
          <div className="text-center my-6">
            <button
              onClick={handleToggleRecord}
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all shadow-xl ${
                isRecording
                  ? 'bg-rose-600 text-white animate-pulse ring-8 ring-rose-100'
                  : 'bg-gradient-to-tr from-ayurveda-700 to-ayurveda-500 hover:from-ayurveda-600 hover:to-ayurveda-400 text-white ring-4 ring-ayurveda-100'
              }`}
            >
              {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
            <p className="text-xs font-semibold text-slate-600 mt-3">
              {isRecording ? 'Listening to clinical voice notes...' : 'Tap Mic to speak in Hindi or English'}
            </p>
          </div>

          {/* Transcript Box */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-slate-700 mb-1">Spoken Audio Transcript:</label>
            <textarea
              rows={3}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Spoken words will appear here. Try speaking or typing: 'Rogi has Sarpagati Nadi, dry coated tongue...'"
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-ayurveda-500 resize-none"
            />
          </div>

          {/* Quick Preset Buttons for Testing */}
          <div className="mb-4">
            <span className="text-[11px] text-slate-500 block mb-1">Sample Clinical Presets:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => {
                  const sample = "Nadi is Sarpagati Vata, tongue is coated and dry, skin warm, irregular appetite.";
                  setTranscript(sample);
                  handleProcessAudio(sample);
                }}
                className="text-[10px] bg-ayurveda-50 hover:bg-ayurveda-100 text-ayurveda-800 border border-ayurveda-200 px-2 py-1 rounded-md transition"
              >
                Vata-Pitta Case
              </button>

              <button
                onClick={() => {
                  const sample = "Patient has Hansasgati pulse, thick white slimy tongue coating, heaviness in stomach, slow digestion.";
                  setTranscript(sample);
                  handleProcessAudio(sample);
                }}
                className="text-[10px] bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-1 rounded-md transition"
              >
                Kapha Mandagni Case
              </button>
            </div>
          </div>

          {/* Process Button */}
          <button
            onClick={() => handleProcessAudio(transcript)}
            disabled={!transcript || isProcessing}
            className="w-full bg-ayurveda-900 hover:bg-ayurveda-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-4 h-4 text-sandalwood-400" />
            {isProcessing ? 'Gemini Extracting Ayurvedic Fields...' : 'Extract Fields with Gemini AI'}
          </button>

          {/* Extracted Findings Preview */}
          {extractedFields && (
            <div className="bg-ayurveda-50 border border-ayurveda-200 rounded-2xl p-4 text-xs">
              <h4 className="font-bold text-ayurveda-900 mb-2 flex items-center justify-between">
                <span>Extracted Exam Findings</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono">
                  Confidence: {Math.round((extractedFields.confidence_score || 0.85) * 100)}%
                </span>
              </h4>

              <div className="space-y-1 text-slate-700 mb-4">
                {extractedFields.nadi && <div>• <strong>Nadi:</strong> {extractedFields.nadi}</div>}
                {extractedFields.jihva && <div>• <strong>Jihva:</strong> {extractedFields.jihva}</div>}
                {extractedFields.sparsha && <div>• <strong>Sparsha:</strong> {extractedFields.sparsha}</div>}
                {extractedFields.anala && <div>• <strong>Agni:</strong> {extractedFields.anala}</div>}
              </div>

              <button
                onClick={handleConfirmAndFill}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-4 rounded-xl shadow transition flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Confirm & Auto-Fill Case Sheet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
