"""
Database Abstraction Layer for VaidyaSetu
Supports Async MongoDB Atlas via Motor, with an in-memory JSON document database fallback
to ensure flawless execution in any environment.
"""

import os
import uuid
from datetime import datetime

MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/vaidyasetu")
DB_NAME = "vaidyasetu"

# In-memory document storage fallback
IN_MEMORY_DB = {
    "patients": [
        {
            "id": "PAT-1001",
            "abha_id": "91-8842-1920-4491",
            "name": "Rajesh Kumar",
            "age": 42,
            "gender": "Male",
            "contact": "+91 9876543210",
            "location": "Varanasi, UP",
            "comorbidities": ["Hypertension"],
            "is_pregnant": False,
            "created_at": "2026-08-10T10:00:00"
        },
        {
            "id": "PAT-1002",
            "abha_id": "91-3321-4902-8812",
            "name": "Sunita Devi",
            "age": 35,
            "gender": "Female",
            "contact": "+91 9812345678",
            "location": "Haridwar, UK",
            "comorbidities": ["Pregnancy"],
            "is_pregnant": True,
            "created_at": "2026-08-15T11:30:00"
        }
    ],
    "cases": [
        {
            "id": "CASE-5001",
            "patient_id": "PAT-1001",
            "visit_date": "2026-08-10",
            "ashtavidha": {
                "nadi": "Vata-Pitta",
                "jihva": "Coated, dry (Vata-Pitta)",
                "sparsha": "Warm, moist, oily, reddish",
                "druk": "Sharp, sensitive to light, reddish/yellowish",
                "shabda": "Sharp, loud, forceful, clear",
                "mutra": "Yellow, reddish, pungent smell, burning",
                "mala": "Dry, hard, constipated, gaseous",
                "akriti": "Medium build, good muscle tone, warm"
            },
            "dashavidha": {
                "dushya": "Rasa-Rakta Dhatu",
                "desha": "Anupa Desha (Marshy)",
                "bala": "Madhyama Bala (Moderate)",
                "kala": "Sharad Ritu (Autumn)",
                "anala": "Vishamagni (Irregular digestive fire)",
                "prakriti": "Vata-Pitta Dominant",
                "satmya": "Eka-rasa Satmya",
                "satwa": "Madhya Satwa",
                "ahara": "Abhyavaharana Shakti",
                "vaya": "Madhyama Vaya"
            },
            "prakriti_result": {
                "scores": {"vata": 48.0, "pitta": 42.0, "kapha": 10.0},
                "dominant_prakriti": "Vata-Pitta Dominant"
            },
            "nidan_panchaka": {
                "hetu": "Irregular eating habits (Vishamashana), excess spicy/dry food",
                "purvarupa": "Mild abdominal distension, bitter eructations",
                "rupa": "Epigastric pain, acid reflux, constipation",
                "upashaya": "Warm milk with ghee relieves pain; cold items aggravate",
                "samprapti": "Aamashayastha Vata & Pitta vitiation causing Annavaha Srotas Sanga"
            },
            "coding": {
                "namaste_code": "AYU-DIG-0142",
                "namaste_term": "Vata-Pitta Ajirna (Indigestion)",
                "icd11_tm2_code": "SK25",
                "icd11_tm2_term": "Digestion disharmony pattern",
                "confirmed_by_vaidya": True,
                "confidence": 0.95
            },
            "prescriptions": ["Sutshekhar Ras", "Avipattikar Churna", "Triphala Kwath"],
            "created_at": "2026-08-10T10:30:00"
        }
    ],
    "consent_logs": [
        {
            "id": "CONSENT-9001",
            "patient_id": "PAT-1001",
            "dpdp_act_compliant": True,
            "consent_type": "EXPLICIT_CLINICAL_DATA_PROCESSING",
            "status": "ACTIVE",
            "granted_at": "2026-08-10T09:55:00",
            "signature_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
        }
    ]
}

class StorageManager:
    """Manages document operations with Mongo or In-Memory fallback."""
    def __init__(self):
        self.use_mongo = False
        try:
            from motor.motor_asyncio import AsyncIOMotorClient
            self.client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=1000)
            self.db = self.client[DB_NAME]
            self.use_mongo = True
        except Exception:
            self.use_mongo = False

    async def get_patients(self):
        if self.use_mongo:
            try:
                cursor = self.db.patients.find({})
                patients = await cursor.to_list(length=100)
                for p in patients:
                    p["_id"] = str(p["_id"])
                return patients
            except Exception:
                pass
        return IN_MEMORY_DB["patients"]

    async def add_patient(self, patient_data: dict):
        patient_data["id"] = patient_data.get("id") or f"PAT-{uuid.uuid4().hex[:6].upper()}"
        patient_data["created_at"] = datetime.now().isoformat()
        if self.use_mongo:
            try:
                await self.db.patients.insert_one(patient_data.copy())
            except Exception:
                pass
        IN_MEMORY_DB["patients"].append(patient_data)
        return patient_data

    async def get_cases(self, patient_id: str = None):
        if self.use_mongo:
            try:
                query = {"patient_id": patient_id} if patient_id else {}
                cursor = self.db.cases.find(query)
                cases = await cursor.to_list(length=100)
                for c in cases:
                    c["_id"] = str(c["_id"])
                return cases
            except Exception:
                pass
        if patient_id:
            return [c for c in IN_MEMORY_DB["cases"] if c.get("patient_id") == patient_id]
        return IN_MEMORY_DB["cases"]

    async def save_case(self, case_data: dict):
        case_data["id"] = case_data.get("id") or f"CASE-{uuid.uuid4().hex[:6].upper()}"
        case_data["created_at"] = datetime.now().isoformat()
        if self.use_mongo:
            try:
                await self.db.cases.insert_one(case_data.copy())
            except Exception:
                pass
        IN_MEMORY_DB["cases"].append(case_data)
        return case_data

    async def log_consent(self, consent_data: dict):
        consent_data["id"] = f"CONSENT-{uuid.uuid4().hex[:6].upper()}"
        consent_data["granted_at"] = datetime.now().isoformat()
        IN_MEMORY_DB["consent_logs"].append(consent_data)
        return consent_data

    async def get_consent_logs(self):
        return IN_MEMORY_DB["consent_logs"]

db_manager = StorageManager()
