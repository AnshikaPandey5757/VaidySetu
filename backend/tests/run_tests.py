import sys
import unittest
import os

# Add backend directory to sys.path
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from services.prakriti_engine import calculate_prakriti
from services.safety_engine import check_herb_safety
from services.namaste_dataset import search_namaste_codes, get_fhir_concept_map
from services.gemini_service import extract_structured_exam_from_transcript

class TestVaidyaSetuBackend(unittest.TestCase):
    def test_prakriti_calculation(self):
        ashtavidha = {
            "nadi": "Vata-Pitta",
            "jihva": "Dry, cracked, rough, darkish coat",
            "sparsha": "Warm, moist, oily, reddish"
        }
        result = calculate_prakriti(ashtavidha)
        self.assertIn("scores", result)
        self.assertGreater(result["scores"]["vata"], 0)
        self.assertTrue(result["is_ai_assisted"])
        self.assertIn("Requires Vaidya Confirmation", result["disclaimer"])

    def test_namaste_coding_search(self):
        matches = search_namaste_codes(query="Vata-Pitta Ajirna")
        self.assertGreater(len(matches), 0)
        self.assertEqual(matches[0]["namaste_code"], "AYU-DIG-0142")
        self.assertEqual(matches[0]["icd11_tm2_code"], "SK25")

    def test_fhir_concept_map(self):
        cmap = get_fhir_concept_map()
        self.assertEqual(cmap["resourceType"], "ConceptMap")
        self.assertEqual(cmap["id"], "namaste-to-icd11-tm2")

    def test_herb_safety_check(self):
        alerts = check_herb_safety(
            formulations=["Guggulu (Commiphora mukul)", "Triphala"],
            comorbidities=["Hypertension"],
            is_pregnant=True
        )
        self.assertGreaterEqual(len(alerts), 1)
        self.assertTrue(any("Pregnancy" in a["condition"] for a in alerts))

    def test_gemini_voice_extraction_fallback(self):
        sample_transcript = "Patient has sarpagati nadi, dry coated tongue, cold skin and irregular appetite"
        extracted = extract_structured_exam_from_transcript(sample_transcript)
        self.assertIn("Vata", extracted["nadi"])
        self.assertTrue(extracted["is_ai_assisted"])

if __name__ == "__main__":
    unittest.main()
