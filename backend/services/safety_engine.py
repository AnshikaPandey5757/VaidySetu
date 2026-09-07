"""
Herb-Drug & Comorbidity Safety Alert Engine for VaidyaSetu
Cross-checks prescribed Ayurvedic formulations and herbs against patient pregnancy status,
known comorbidities, and clinical contraindications.
"""

HERB_CONTRAINDICATIONS = [
    {
        "herb": "Guggulu (Commiphora mukul)",
        "contraindications": ["Pregnancy", "Bleeding Disorders", "Hyperthyroidism"],
        "severity": "HIGH",
        "reason": "Emmenagogue action & risk of stimulating uterine contractions or excessive bleeding."
    },
    {
        "herb": "Shatavari (Asparagus racemosus)",
        "contraindications": ["Estrogen-sensitive conditions", "Severe Kapha congestion"],
        "severity": "MEDIUM",
        "reason": "Phytoestrogenic activity & heavy (Guru) property."
    },
    {
        "herb": "Ashwagandha (Withania somnifera)",
        "contraindications": ["Pregnancy", "Autoimmune disorders", "Hyperthyroidism"],
        "severity": "HIGH",
        "reason": "May stimulate uterine contractions and immune activation."
    },
    {
        "herb": "Pippali (Piper longum)",
        "contraindications": ["Active Pitta Gastritis", "Peptic Ulcer", "Pregnancy (long term)"],
        "severity": "MEDIUM",
        "reason": "Sharp (Teekshna) and hot (Ushna) potency aggravate stomach mucosal lining."
    },
    {
        "herb": "Kutki (Picrorhiza kurroa)",
        "contraindications": ["Diarrhea", "Hypoglycemia (with insulin)"],
        "severity": "MEDIUM",
        "reason": "Strong purgative (Rechana) property."
    },
    {
        "herb": "Bhallataka (Semecarpus anacardium)",
        "contraindications": ["Pregnancy", "Active Pitta", "Renal Impairment", "Children"],
        "severity": "CRITICAL",
        "reason": "Highly toxic/corrosive properties requiring careful Shodhana."
    },
    {
        "herb": "Licorice / Yashtimadhu (Glycyrrhiza glabra)",
        "contraindications": ["Hypertension", "Renal Impairment", "Edema"],
        "severity": "HIGH",
        "reason": "Mineralocorticoid activity causing sodium retention and elevated blood pressure."
    }
]

def check_herb_safety(formulations: list, comorbidities: list, is_pregnant: bool = False) -> list:
    """
    Checks list of prescribed herbs/formulations against comorbidities and pregnancy status.
    Returns array of formatted alerts.
    """
    alerts = []
    normalized_comorbidities = [c.lower() for c in comorbidities]
    
    if is_pregnant:
        normalized_comorbidities.append("pregnancy")

    for herb_item in formulations:
        herb_name = herb_item if isinstance(herb_item, str) else herb_item.get("name", "")
        herb_name_lower = herb_name.lower()

        for entry in HERB_CONTRAINDICATIONS:
            entry_herb_lower = entry["herb"].lower()
            
            # Check if herb matches
            if any(part in herb_name_lower for part in entry_herb_lower.split("(")[0].strip().split()):
                for contra in entry["contraindications"]:
                    contra_lower = contra.lower()
                    if any(contra_lower in c for c in normalized_comorbidities):
                        alerts.append({
                            "herb": herb_name,
                            "matched_contraindication": entry["herb"],
                            "condition": contra,
                            "severity": entry["severity"],
                            "warning": f"Caution: {herb_name} is contraindicated in {contra}.",
                            "reason": entry["reason"],
                            "recommendation": "Consider substituting with safer Alternative or adjusting Dosage under Vaidya supervision."
                        })

    return alerts
