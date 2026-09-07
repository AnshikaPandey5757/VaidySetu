/**
 * Curated Ashtavidha & Dashavidha Diagnostic Exam Field Definitions
 * Standardized per classical Ayurvedic texts (Charaka Samhita & Sushruta Samhita)
 */

export const ASHTAVIDHA_FIELDS = [
  {
    id: 'nadi',
    title: '1. Nadi Pariksha (Pulse Exam)',
    sanskritName: 'नाडी परीक्षा',
    description: 'Assess pulse rate, rhythm, movement (Gati), and dosha dominance at radial artery.',
    icon: 'Activity',
    options: [
      { label: 'Vata (Sarpagati - Snake/Rapid)', dosha: 'vata', desc: 'Curving, rapid, thin pulse (60-70 bpm)' },
      { label: 'Pitta (Mandookagati - Frog/Jumping)', dosha: 'pitta', desc: 'Jumping, forceful, elevated pulse (70-80 bpm)' },
      { label: 'Kapha (Hansasgati - Swan/Slow/Smooth)', dosha: 'kapha', desc: 'Slow, steady, broad pulse (50-60 bpm)' },
      { label: 'Vata-Pitta', dosha: 'vata-pitta', desc: 'Combined rapid & forceful pulse' },
      { label: 'Pitta-Kapha', dosha: 'pitta-kapha', desc: 'Combined forceful & heavy pulse' },
      { label: 'Vata-Kapha', dosha: 'vata-kapha', desc: 'Combined irregular & slow pulse' }
    ]
  },
  {
    id: 'jihva',
    title: '2. Jihva Pariksha (Tongue Exam)',
    sanskritName: 'जिह्वा परीक्षा',
    description: 'Examine tongue coating (Saam/Niraam), color, cracks, moisture, and motility.',
    icon: 'Sparkles',
    options: [
      { label: 'Dry, cracked, rough, darkish coat', dosha: 'vata', desc: 'Vata vitiation with dryness and cracks' },
      { label: 'Reddish, yellow coat, inflamed, burning', dosha: 'pitta', desc: 'Pitta vitiation with heat and yellow coat' },
      { label: 'Thick white coating, slimy, pale', dosha: 'kapha', desc: 'Kapha vitiation with heavy Aama accumulation' },
      { label: 'Coated, dry (Vata-Pitta)', dosha: 'vata-pitta', desc: 'Combined Vata-Pitta coat pattern' },
      { label: 'Coated, slimy (Kapha-Vata)', dosha: 'kapha-vata', desc: 'Sluggish digestive fire pattern' }
    ]
  },
  {
    id: 'sparsha',
    title: '3. Sparsha Pariksha (Touch/Skin Exam)',
    sanskritName: 'स्पर्श परीक्षा',
    description: 'Palpate body surface temperature, texture, moisture, and turgor.',
    icon: 'Hand',
    options: [
      { label: 'Cold, dry, rough', dosha: 'vata', desc: 'Vata coldness and lack of unctuousness' },
      { label: 'Warm, moist, oily, reddish', dosha: 'pitta', desc: 'Pitta heat and increased metabolic activity' },
      { label: 'Cool, clammy, smooth, thick', dosha: 'kapha', desc: 'Kapha coldness and fluid accumulation' }
    ]
  },
  {
    id: 'druk',
    title: '4. Druk Pariksha (Ocular/Eye Exam)',
    sanskritName: 'दृक् परीक्षा',
    description: 'Inspect sclera, conjunctiva, vision, lustre, and eye movements.',
    icon: 'Eye',
    options: [
      { label: 'Dry, small, dull, unblinking', dosha: 'vata', desc: 'Vata dry eye & dark scleral tint' },
      { label: 'Sharp, sensitive to light, reddish/yellowish', dosha: 'pitta', desc: 'Pitta congestion & vascularity' },
      { label: 'Large, attractive, white, thick lashes', dosha: 'kapha', desc: 'Kapha clarity & abundant secretions' }
    ]
  },
  {
    id: 'shabda',
    title: '5. Shabda Pariksha (Voice & Acoustic Exam)',
    sanskritName: 'शब्द परीक्षा',
    description: 'Listen to voice resonance, pitch, speech clarity, and bowel/respiratory sounds.',
    icon: 'Volume2',
    options: [
      { label: 'Hoarse, low-volume, crackling', dosha: 'vata', desc: 'Vata voice dryness & pitch variation' },
      { label: 'Sharp, loud, forceful, clear', dosha: 'pitta', desc: 'Pitta sharpness & loud cadence' },
      { label: 'Deep, resonant, heavy, pleasant', dosha: 'kapha', desc: 'Kapha deep bass timbre' }
    ]
  },
  {
    id: 'mutra',
    title: '6. Mutra Pariksha (Urine Assessment)',
    sanskritName: 'मूत्र परीक्षा',
    description: 'Assess color, clarity, oil drop pattern (Taila Bindu), and micturition frequency.',
    icon: 'Droplet',
    options: [
      { label: 'Astringent, clear, dark brown, scanty', dosha: 'vata', desc: 'Vata clear/dark urine' },
      { label: 'Yellow, reddish, pungent smell, burning', dosha: 'pitta', desc: 'Pitta high concentration & heat' },
      { label: 'Oily, whitish, cloudy, frothy', dosha: 'kapha', desc: 'Kapha turbid/foamy urine' }
    ]
  },
  {
    id: 'mala',
    title: '7. Mala Pariksha (Stool & Bowel Exam)',
    sanskritName: 'मल परीक्षा',
    description: 'Evaluate bowel motility, consistency, color, smell, and floatation test.',
    icon: 'Layers',
    options: [
      { label: 'Dry, hard, constipated, gaseous', dosha: 'vata', desc: 'Vata dryness & irregular motility' },
      { label: 'Loose, yellowish, foul odor, frequent', dosha: 'pitta', desc: 'Pitta loose & rapid evacuation' },
      { label: 'Heavy, slimy, mucous-filled, bulky', dosha: 'kapha', desc: 'Kapha sluggish & Aama stool' }
    ]
  },
  {
    id: 'akriti',
    title: '8. Akriti Pariksha (Physical Constitution & Gait)',
    sanskritName: 'आकृति परीक्षा',
    description: 'Evaluate physical posture, structural frame, body mass, and gait.',
    icon: 'User',
    options: [
      { label: 'Lean, tall or short, prominent joints, dry body', dosha: 'vata', desc: 'Vata ectomorphic build' },
      { label: 'Medium build, good muscle tone, warm', dosha: 'pitta', desc: 'Pitta mesomorphic build' },
      { label: 'Broad frame, sturdy, well-developed, soft', dosha: 'kapha', desc: 'Kapha endomorphic build' }
    ]
  }
];

export const DASHAVIDHA_FIELDS = [
  { id: 'dushya', title: '1. Dushya (Vitiated Tissues / Dhatus)', placeholder: 'Rasa, Rakta, Mamsa, Medas...' },
  { id: 'desha', title: '2. Desha (Habitat / Geographical Region)', placeholder: 'Anupa (Marshy), Jangala (Arid), Sadharana (Normal)...' },
  { id: 'bala', title: '3. Bala (Physical & Disease Strength)', placeholder: 'Pravara (High), Madhyama (Moderate), Avara (Low)' },
  { id: 'kala', title: '4. Kala (Season / Time of Onset)', placeholder: 'Sharad Ritu (Autumn), Varsha Ritu (Monsoon)...' },
  { id: 'anala', title: '5. Anala (Digestive Fire / Agni)', placeholder: 'Vishamagni, Teekshnagni, Mandagni, Samagni' },
  { id: 'prakriti', title: '6. Prakriti (Baseline Constitution)', placeholder: 'Vata-Pitta, Kapha-Pitta...' },
  { id: 'satmya', title: '7. Satmya (Adaptability & Habituation)', placeholder: 'Sarva-rasa Satmya, Eka-rasa Satmya...' },
  { id: 'satwa', title: '8. Satwa (Mental Stamina / Mind Resilience)', placeholder: 'Pravara Satwa, Madhya Satwa, Alpa Satwa' },
  { id: 'ahara', title: '9. Ahara (Dietary Capacity & Appetite)', placeholder: 'Abhyavaharana & Jarana Shakti' },
  { id: 'vaya', title: '10. Vaya (Age / Stage of Life)', placeholder: 'Bala (Childhood), Madhyama (Adult), Vriddha (Elderly)' }
];
