"""
VaidyaSetu — FastAPI Server
Digital Case-Taking & Auto-Coding System for Ayurvedic Clinical Practice
"""

import hashlib
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, HTTPException, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from database import db_manager
from services.prakriti_engine import calculate_prakriti
from services.namaste_dataset import search_namaste_codes, get_fhir_concept_map, NAMASTE_ICD11_DATABASE
from services.safety_engine import check_herb_safety
from services.gemini_service import extract_structured_exam_from_transcript

app = FastAPI(
    title="VaidyaSetu API",
    description="Digital Case-Taking for Ayurvedic Clinical Practice with real-time NAMASTE & ICD-11 TM2 auto-coding",
    version="1.0.0"
)

# Enable CORS for React frontend & PWA
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Schemas
class AshtavidhaInput(BaseModel):
    nadi: Optional[str] = ""
    jihva: Optional[str] = ""
    sparsha: Optional[str] = ""
    druk: Optional[str] = ""
    shabda: Optional[str] = ""
    mutra: Optional[str] = ""
    mala: Optional[str] = ""
    akriti: Optional[str] = ""

class DashavidhaInput(BaseModel):
    dushya: Optional[str] = ""
    desha: Optional[str] = ""
    bala: Optional[str] = ""
    kala: Optional[str] = ""
    anala: Optional[str] = ""
    prakriti: Optional[str] = ""
    satmya: Optional[str] = ""
    satwa: Optional[str] = ""
    ahara: Optional[str] = ""
    vaya: Optional[str] = ""

class PrakritiRequest(BaseModel):
    ashtavidha: AshtavidhaInput
    dashavidha: Optional[DashavidhaInput] = None

class NidanPanchakaInput(BaseModel):
    hetu: Optional[str] = ""
    purvarupa: Optional[str] = ""
    rupa: Optional[str] = ""
    upashaya: Optional[str] = ""
    samprapti: Optional[str] = ""

class CodingConfirmation(BaseModel):
    namaste_code: str
    namaste_term: str
    icd11_tm2_code: str
    icd11_tm2_term: str
    confirmed_by_vaidya: bool = False
    confidence: float = 0.95

class CaseSheetCreate(BaseModel):
    id: Optional[str] = None
    patient_id: str
    visit_date: str
    ashtavidha: Dict[str, Any]
    dashavidha: Dict[str, Any]
    prakriti_result: Dict[str, Any]
    nidan_panchaka: Dict[str, Any]
    coding: Dict[str, Any]
    prescriptions: Optional[List[str]] = []
    role_mode: Optional[str] = "vaidya"

class PatientCreate(BaseModel):
    abha_id: Optional[str] = ""
    name: str
    age: int
    gender: str
    contact: str
    location: str
    comorbidities: Optional[List[str]] = []
    is_pregnant: Optional[bool] = False

class VoiceTranscriptInput(BaseModel):
    transcript: str

class SafetyCheckInput(BaseModel):
    formulations: List[str]
    comorbidities: List[str]
    is_pregnant: bool = False

class ABHALookupInput(BaseModel):
    abha_id: str

class DPDPConsentInput(BaseModel):
    patient_id: str
    consent_type: str = "EXPLICIT_CLINICAL_DATA_PROCESSING"
    grant_data_sharing: bool = True

@app.get("/")
def read_root():
    return {
        "status": "online",
        "app": "VaidyaSetu API",
        "tagline": "The first case-taking tool that speaks NAMASTE, not just forms",
        "standards": ["AYUSH NAMASTE", "WHO ICD-11 TM2", "FHIR R4", "DPDP Act 2023"]
    }

# 1. Prakriti Calculation Endpoint
@app.post("/api/prakriti")
def calculate_prakriti_endpoint(payload: PrakritiRequest):
    ash_dict = payload.ashtavidha.model_dump()
    dash_dict = payload.dashavidha.model_dump() if payload.dashavidha else {}
    result = calculate_prakriti(ash_dict, dash_dict)
    return result

# 2. NAMASTE & WHO ICD-11 TM2 Coding Endpoints
@app.get("/api/coding/search")
def search_coding_endpoint(
    query: str = Query("", description="Search term or code"),
    dosha: str = Query("", description="Dosha pattern filter"),
    symptoms: Optional[str] = Query("", description="Comma separated symptoms")
):
    symptom_list = [s.strip() for s in symptoms.split(",")] if symptoms else []
    matches = search_namaste_codes(query=query, dosha=dosha, symptoms=symptom_list)
    return {
        "total": len(matches),
        "results": matches,
        "human_in_loop_notice": "Decision Support Only — Requires Vaidya Confirmation"
    }

@app.get("/api/coding/fhir/conceptmap")
def get_fhir_concept_map_endpoint():
    return get_fhir_concept_map()

# 3. Patient Management & Follow-Up Trends
@app.get("/api/patients")
async def get_patients_endpoint():
    patients = await db_manager.get_patients()
    return patients

@app.post("/api/patients")
async def create_patient_endpoint(patient: PatientCreate):
    new_patient = await db_manager.add_patient(patient.model_dump())
    return new_patient

@app.get("/api/patients/{patient_id}/trends")
async def get_patient_trends_endpoint(patient_id: str):
    cases = await db_manager.get_cases(patient_id=patient_id)
    # Sort by visit date
    cases.sort(key=lambda x: x.get("visit_date", ""))
    
    trends = []
    for c in cases:
        prakriti = c.get("prakriti_result", {}).get("scores", {})
        coding = c.get("coding", {})
        trends.append({
            "visit_date": c.get("visit_date"),
            "case_id": c.get("id"),
            "vata": prakriti.get("vata", 33.3),
            "pitta": prakriti.get("pitta", 33.3),
            "kapha": prakriti.get("kapha", 33.4),
            "diagnosis": coding.get("namaste_term", "Unassigned"),
            "namaste_code": coding.get("namaste_code", "N/A"),
            "icd11_code": coding.get("icd11_tm2_code", "N/A")
        })
    return {
        "patient_id": patient_id,
        "total_visits": len(cases),
        "trend_data": trends
    }

# 4. Case Sheet CRUD & Sync
@app.get("/api/cases")
async def get_cases_endpoint(patient_id: Optional[str] = None):
    cases = await db_manager.get_cases(patient_id=patient_id)
    return cases

@app.post("/api/cases")
async def save_case_endpoint(case: CaseSheetCreate):
    saved_case = await db_manager.save_case(case.model_dump())
    return {
        "status": "success",
        "message": "Case Sheet saved successfully",
        "case": saved_case
    }

# 5. Voice Input Assistant Endpoint
@app.post("/api/voice/parse")
def parse_voice_endpoint(payload: VoiceTranscriptInput):
    parsed = extract_structured_exam_from_transcript(payload.transcript)
    return parsed

# 6. Herb Safety Checker Endpoint
@app.post("/api/safety/check")
def check_safety_endpoint(payload: SafetyCheckInput):
    alerts = check_herb_safety(
        formulations=payload.formulations,
        comorbidities=payload.comorbidities,
        is_pregnant=payload.is_pregnant
    )
    return {
        "is_safe": len(alerts) == 0,
        "alerts_count": len(alerts),
        "alerts": alerts
    }

# 7. Mock ABHA / ABDM Lookup
@app.post("/api/abha/lookup")
def abha_lookup_endpoint(payload: ABHALookupInput):
    abha_clean = payload.abha_id.strip()
    if not abha_clean:
        raise HTTPException(status_code=400, detail="ABHA ID is required")
    
    # Mock ABDM database return
    return {
        "status": "VERIFIED",
        "abha_id": abha_clean,
        "name": "Rajesh Kumar",
        "gender": "Male",
        "dob": "1984-05-12",
        "address": "House #42, Kashi Marg, Varanasi, Uttar Pradesh - 221001",
        "abdm_token": "eyJhYmhhSWQiOiI5MS04ODQyLTE5MjAtNDQ5MSIsImlzc3VlciI6IkFCRE1fSU5ESUEifQ==",
        "fhir_patient_resource": {
            "resourceType": "Patient",
            "id": abha_clean.replace("-", ""),
            "identifier": [{"system": "https://healthid.ndhm.gov.in", "value": abha_clean}],
            "name": [{"text": "Rajesh Kumar", "family": "Kumar", "given": ["Rajesh"]}],
            "gender": "male",
            "birthDate": "1984-05-12"
        }
    }

# 8. DPDP Act 2023 Consent Manager Endpoint
@app.post("/api/consent")
async def record_consent_endpoint(payload: DPDPConsentInput):
    sig_string = f"{payload.patient_id}:{payload.consent_type}:{payload.grant_data_sharing}"
    signature_hash = hashlib.sha256(sig_string.encode()).hexdigest()
    
    consent_record = {
        "patient_id": payload.patient_id,
        "dpdp_act_compliant": True,
        "consent_type": payload.consent_type,
        "grant_data_sharing": payload.grant_data_sharing,
        "status": "ACTIVE" if payload.grant_data_sharing else "REVOKED",
        "signature_hash": signature_hash,
        "audit_notice": "Stored in compliance with Digital Personal Data Protection Act, 2023"
    }
    saved = await db_manager.log_consent(consent_record)
    return saved

@app.get("/api/consent")
async def get_consent_logs_endpoint():
    logs = await db_manager.get_consent_logs()
    return logs
