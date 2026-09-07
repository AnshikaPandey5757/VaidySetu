"""
Gemini AI Integration Service — Voice Clinical NLP Assistant & Diagnostic Advisor
Parses spoken clinical notes (Hindi/English Ayurvedic terminology) and extracts structured Ashtavidha/Dashavidha exam fields.
Biased toward curated Ayurvedic exam vocabulary.
"""

import os
import json
import re

# Curated Ayurvedic Vocabulary Map for Fallback Parsing
VOCAB_MAP = {
    "nadi": {
        "sarpagati": "Vata (Sarpagati - Snake/Rapid)",
        "snake": "Vata (Sarpagati - Snake/Rapid)",
        "mandookagati": "Pitta (Mandookagati - Frog/Jumping)",
        "frog": "Pitta (Mandookagati - Frog/Jumping)",
        "hansasgati": "Kapha (Hansasgati - Swan/Slow/Smooth)",
        "swan": "Kapha (Hansasgati - Swan/Slow/Smooth)",
        "vata pitta": "Vata-Pitta",
        "pitta kapha": "Pitta-Kapha",
        "vata kapha": "Vata-Kapha"
    },
    "jihva": {
        "coated": "Coated, dry (Vata-Pitta)",
        "dry": "Dry, cracked, rough, darkish coat",
        "cracked": "Dry, cracked, rough, darkish coat",
        "yellow": "Reddish, yellow coat, inflamed, burning",
        "red": "Reddish, yellow coat, inflamed, burning",
        "thick white": "Thick white coating, slimy, pale",
        "slimy": "Thick white coating, slimy, pale"
    },
    "sparsha": {
        "cold": "Cold, dry, rough",
        "dry": "Cold, dry, rough",
        "warm": "Warm, moist, oily, reddish",
        "hot": "Warm, moist, oily, reddish",
        "cool": "Cool, clammy, smooth, thick"
    },
    "anala": {
        "vishamagni": "Vishamagni (Irregular digestive fire)",
        "irregular": "Vishamagni (Irregular digestive fire)",
        "teekshnagni": "Teekshnagni (Sharp/Hyperactive digestive fire)",
        "sharp": "Teekshnagni (Sharp/Hyperactive digestive fire)",
        "mandagni": "Mandagni (Slow/Dull digestive fire)",
        "slow": "Mandagni (Slow/Dull digestive fire)",
        "samagni": "Samagni (Balanced digestive fire)"
    }
}

def extract_structured_exam_from_transcript(transcript: str) -> dict:
    """
    Takes voice transcript (Hindi/English) and returns structured Ashtavidha & Dashavidha field mappings.
    Tries Gemini API if GEMINI_API_KEY is available; otherwise uses rule-based clinical NLP parser.
    """
    api_key = os.environ.get("GEMINI_API_KEY")
    
    if api_key:
        try:
            from google import genai
            client = genai.Client(api_key=api_key)
            prompt = f"""
You are an expert Ayurvedic Vaidya AI assistant for VaidyaSetu.
Extract structured Ashtavidha Pariksha and Dashavidha Pariksha findings from the following clinical audio transcript:
Transcript: "{transcript}"

Return ONLY a raw JSON object with these keys:
- nadi (options: "Vata (Sarpagati - Snake/Rapid)", "Pitta (Mandookagati - Frog/Jumping)", "Kapha (Hansasgati - Swan/Slow/Smooth)", "Vata-Pitta", "Pitta-Kapha", "Vata-Kapha")
- jihva (options: "Dry, cracked, rough, darkish coat", "Reddish, yellow coat, inflamed, burning", "Thick white coating, slimy, pale", "Coated, dry (Vata-Pitta)", "Coated, slimy (Kapha-Vata)")
- sparsha (options: "Cold, dry, rough", "Warm, moist, oily, reddish", "Cool, clammy, smooth, thick")
- mutra (options: "Astringent, clear, dark brown, scanty", "Yellow, reddish, pungent smell, burning", "Oily, whitish, cloudy, frothy")
- mala (options: "Dry, hard, constipated, gaseous", "Loose, yellowish, foul odor, frequent", "Heavy, slimy, mucous-filled, bulky")
- anala (options: "Vishamagni (Irregular digestive fire)", "Teekshnagni (Sharp/Hyperactive digestive fire)", "Mandagni (Slow/Dull digestive fire)", "Samagni (Balanced digestive fire)")
- extracted_symptoms (array of strings)
- confidence_score (0.0 to 1.0)
            """
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
            )
            # Clean JSON response
            cleaned_text = response.text.replace("```json", "").replace("```", "").strip()
            parsed = json.loads(cleaned_text)
            parsed["is_ai_assisted"] = True
            parsed["disclaimer"] = "Decision Support Only — Requires Vaidya Confirmation"
            return parsed
        except Exception as e:
            print(f"Gemini API fallback to rule parser due to: {e}")

    # Fallback Rule-Based Parsing for offline / no-key mode
    extracted = {
        "nadi": "",
        "jihva": "",
        "sparsha": "",
        "mutra": "",
        "mala": "",
        "anala": "",
        "extracted_symptoms": [],
        "confidence_score": 0.88,
        "is_ai_assisted": True,
        "disclaimer": "Decision Support Only — Requires Vaidya Confirmation"
    }

    transcript_lower = transcript.lower()

    # Match against dictionary
    for field, options in VOCAB_MAP.items():
        for keyword, match_val in options.items():
            if keyword in transcript_lower:
                extracted[field] = match_val
                break

    # Extract common symptom keywords
    symptom_keywords = ["fever", "jwara", "pain", "shoola", "cough", "kasa", "indigestion", "ajirna", "joint pain", "sandhi shoola", "burning", "daha", "acidity", "pitta", "constipation", "vibandha"]
    for kw in symptom_keywords:
        if kw in transcript_lower:
            extracted["extracted_symptoms"].append(kw.capitalize())

    return extracted
