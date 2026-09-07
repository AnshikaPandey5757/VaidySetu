"""
Unit tests for VaidyaSetu backend services & API endpoints.
"""

from fastapi.testclient import TestClient
from main import app
from services.prakriti_engine import calculate_prakriti
from services.safety_engine import check_herb_safety
from services.namaste_dataset import search_namaste_codes

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["app"] == "VaidyaSetu API"

def test_prakriti_calculation():
    ashtavidha = {
        "nadi": "Vata-Pitta",
        "jihva": "Dry, cracked, rough, darkish coat",
        "sparsha": "Warm, moist, oily, reddish"
    }
    result = calculate_prakriti(ashtavidha)
    assert "scores" in result
    assert result["scores"]["vata"] > 0
    assert result["is_ai_assisted"] is True
    assert "Requires Vaidya Confirmation" in result["disclaimer"]

def test_namaste_coding_search():
    matches = search_namaste_codes(query="Vata-Pitta Ajirna")
    assert len(matches) > 0
    assert matches[0]["namaste_code"] == "AYU-DIG-0142"
    assert matches[0]["icd11_tm2_code"] == "SK25"

def test_herb_safety_check():
    alerts = check_herb_safety(
        formulations=["Guggulu (Commiphora mukul)", "Triphala"],
        comorbidities=["Hypertension"],
        is_pregnant=True
    )
    assert len(alerts) >= 1
    assert any("Pregnancy" in a["condition"] for a in alerts)

def test_abha_lookup_endpoint():
    response = client.post("/api/abha/lookup", json={"abha_id": "91-8842-1920-4491"})
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "VERIFIED"
    assert data["name"] == "Rajesh Kumar"

def test_consent_record_endpoint():
    response = client.post("/api/consent", json={
        "patient_id": "PAT-1001",
        "consent_type": "EXPLICIT_CLINICAL_DATA_PROCESSING",
        "grant_data_sharing": True
    })
    assert response.status_code == 200
    assert response.json()["dpdp_act_compliant"] is True
