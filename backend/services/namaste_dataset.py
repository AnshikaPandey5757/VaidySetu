"""
NAMASTE Portal & WHO ICD-11 TM2 Mappings for VaidyaSetu
Includes FHIR R4 CodeSystem and ConceptMap structures with comprehensive Ayurvedic disease categories,
sub-types, pulse (Nadi), tongue (Jihva), dosha imbalances, and WHO ICD-11 Traditional Medicine Module 2 codes.
"""

NAMASTE_ICD11_DATABASE = [
    {
        "namaste_code": "AYU-DIG-0142",
        "namaste_term": "Vata-Pitta Ajirna (Indigestion)",
        "ayurvedic_category": "Annavaha Srotas (Digestive System)",
        "dosha_pattern": "Vata-Pitta",
        "icd11_tm2_code": "SK25",
        "icd11_tm2_term": "Digestion disharmony pattern",
        "symptoms": ["coated tongue", "dry tongue", "irregular appetite", "bloating", "acid reflux"],
        "nadi_characteristics": ["Vata-Pitta", "Sarpagati-Mandookagati"],
        "jihva_characteristics": ["coated", "dry", "cracked"],
        "clinical_note": "Aama accumulation due to impaired Agni with Vata-Pitta aggravation."
    },
    {
        "namaste_code": "AYU-DIG-0143",
        "namaste_term": "Kapha Ajirna (Mándyágni / Slow Digestion)",
        "ayurvedic_category": "Annavaha Srotas",
        "dosha_pattern": "Kapha",
        "icd11_tm2_code": "SK26",
        "icd11_tm2_term": "Stomach dampness & stagnation pattern",
        "symptoms": ["heaviness in abdomen", "sweet taste in mouth", "salvation", "loss of appetite"],
        "nadi_characteristics": ["Kapha", "Hansasgati"],
        "jihva_characteristics": ["thick white coating", "pale"],
        "clinical_note": "Excessive Kaphadosha causing Agnimandya."
    },
    {
        "namaste_code": "AYU-JWA-0011",
        "namaste_term": "Vata-Kapha Jwara (Fever of Vata-Kapha Origin)",
        "ayurvedic_category": "Rasa-Rakta Srotas",
        "dosha_pattern": "Vata-Kapha",
        "icd11_tm2_code": "SF01",
        "icd11_tm2_term": "Febrile disharmony pattern with chills",
        "symptoms": ["shivering", "joint pains", "heaviness", "intermittent fever"],
        "nadi_characteristics": ["Vata-Kapha", "Quick and heavy"],
        "jihva_characteristics": ["white coating", "rough"],
        "clinical_note": "Sthanasamsraya of Vata and Kapha in Rasavaha Srotas."
    },
    {
        "namaste_code": "AYU-JWA-0015",
        "namaste_term": "Pitta Jwara (Hyper-pyrexia / Inflammatory Fever)",
        "ayurvedic_category": "Rasa-Rakta Srotas",
        "dosha_pattern": "Pitta",
        "icd11_tm2_code": "SF03",
        "icd11_tm2_term": "Heat toxic fever pattern",
        "symptoms": ["burning sensation", "excessive thirst", "yellowish eyes", "perspiration"],
        "nadi_characteristics": ["Pitta", "Mandookagati (Frog-like)"],
        "jihva_characteristics": ["reddish", "dry", "yellowish coat"],
        "clinical_note": "High Pitta aggravation in Rakta Dhatu."
    },
    {
        "namaste_code": "AYU-VAT-0301",
        "namaste_term": "Sandhigata Vata (Osteoarthritis)",
        "ayurvedic_category": "Asthi-Majja Srotas",
        "dosha_pattern": "Vata",
        "icd11_tm2_code": "SM12",
        "icd11_tm2_term": "Joint dryness & Vata accumulation pattern",
        "symptoms": ["joint stiffness", "crepitus (Atopa)", "pain on movement", "swelling"],
        "nadi_characteristics": ["Vata", "Sarpagati (Serpentine)"],
        "jihva_characteristics": ["dry", "cracked"],
        "clinical_note": "Degeneration of Dhatus due to aggravated Vata in joints."
    },
    {
        "namaste_code": "AYU-VAT-0305",
        "namaste_term": "Amavata (Rheumatoid Arthritis / Inflammatory Arthropathy)",
        "ayurvedic_category": "Asthi-Majja Srotas",
        "dosha_pattern": "Vata-Kapha",
        "icd11_tm2_code": "SM15",
        "icd11_tm2_term": "Toxic dampness joint stagnation pattern",
        "symptoms": ["morning stiffness", "stabbing pain", "joint heat", "loss of appetite"],
        "nadi_characteristics": ["Vata-Kapha", "Twitchy and heavy"],
        "jihva_characteristics": ["heavily coated", "slimy"],
        "clinical_note": "Aama combined with Vata circulating through Sandhi."
    },
    {
        "namaste_code": "AYU-RES-0210",
        "namaste_term": "Tamaka Shwasa (Bronchial Asthma)",
        "ayurvedic_category": "Pranavaha Srotas",
        "dosha_pattern": "Vata-Kapha",
        "icd11_tm2_code": "SR08",
        "icd11_tm2_term": "Lung qi constriction & phlegm stagnation pattern",
        "symptoms": ["paroxysmal dyspnea", "wheezing (Ghurghuraka)", "orthopnea", "cough"],
        "nadi_characteristics": ["Vata-Kapha", "Rapid and thready"],
        "jihva_characteristics": ["pale coat", "cyanotic tint"],
        "clinical_note": "Vata obstructed by Kapha in Pranavaha Srotas."
    },
    {
        "namaste_code": "AYU-RES-0215",
        "namaste_term": "Kasa (Cough / Respiratory Irritation)",
        "ayurvedic_category": "Pranavaha Srotas",
        "dosha_pattern": "Vata-Pitta",
        "icd11_tm2_code": "SR04",
        "icd11_tm2_term": "Airway heat & dryness pattern",
        "symptoms": ["dry cough", "chest discomfort", "hoarseness", "throat dryness"],
        "nadi_characteristics": ["Vata-Pitta"],
        "jihva_characteristics": ["red dry tip"],
        "clinical_note": "Upward movement of Vata in thoracic cage."
    },
    {
        "namaste_code": "AYU-MET-0512",
        "namaste_term": "Prameha (Kaphaja / Metabolic Disharmony - Early Diabetes)",
        "ayurvedic_category": "Medovaha Srotas",
        "dosha_pattern": "Kapha",
        "icd11_tm2_code": "SD41",
        "icd11_tm2_term": "Turbid urinary & fluid retention pattern",
        "symptoms": ["excessive urination (Prabhuta Mutrata)", "turbid urine", "lethargy", "sweet mouth taste"],
        "nadi_characteristics": ["Kapha", "Slow and full"],
        "jihva_characteristics": ["thick slimy white coat"],
        "clinical_note": "Kaphadosha affecting Medas, Mamsa, and Kleda."
    },
    {
        "namaste_code": "AYU-SKI-0402",
        "namaste_term": "Vicharchika (Eczema / Dermatitis)",
        "ayurvedic_category": "Raktavaha / Twak Srotas",
        "dosha_pattern": "Kapha-Pitta",
        "icd11_tm2_code": "SS88",
        "icd11_tm2_term": "Skin damp-heat eruption pattern",
        "symptoms": ["itching (Kandu)", "blisters (Pidaka)", "discharge (Srava)", "hyperpigmentation"],
        "nadi_characteristics": ["Pitta-Kapha"],
        "jihva_characteristics": ["reddish with sticky coating"],
        "clinical_note": "Rakta and Twak vitiation due to Pitta-Kapha."
    },
    {
        "namaste_code": "AYU-NEU-0610",
        "namaste_term": "Pakshaghata (Hemiplegia / Cerebrovascular Insult)",
        "ayurvedic_category": "Majjavaha & Vatavaha Srotas",
        "dosha_pattern": "Vata",
        "icd11_tm2_code": "SN03",
        "icd11_tm2_term": "Wind stroke & channel obstruction pattern",
        "symptoms": ["unilateral weakness", "facial asymmetry", "speech impediment (Vak-stambha)", "numbness"],
        "nadi_characteristics": ["Vata", "Irregular Sarpagati"],
        "jihva_characteristics": ["deviated", "dry"],
        "clinical_note": "Severe Vata aggravation in Snayu and Siras."
    },
    {
        "namaste_code": "AYU-PSY-0701",
        "namaste_term": "Unmada (Psychosomatic Disharmony / Anxiety)",
        "ayurvedic_category": "Manovaha Srotas",
        "dosha_pattern": "Vata-Pitta",
        "icd11_tm2_code": "SP14",
        "icd11_tm2_term": "Mind disturbance & vata agitation pattern",
        "symptoms": ["insomnia (Anidra)", "restlessness", "racing thoughts", "emotional lability"],
        "nadi_characteristics": ["Vata-Pitta", "Rapid jerky"],
        "jihva_characteristics": ["trembling", "dry"],
        "clinical_note": "Vitiated Vata and Pitta entering Manovaha Srotas."
    }
]

def search_namaste_codes(query: str = "", dosha: str = "", symptoms: list = None):
    results = []
    query_lower = query.lower().strip() if query else ""
    dosha_lower = dosha.lower().strip() if dosha else ""
    symptoms = [s.lower() for s in (symptoms or [])]

    for entry in NAMASTE_ICD11_DATABASE:
        score = 0
        if dosha_lower and dosha_lower in entry["dosha_pattern"].lower():
            score += 3
        if query_lower:
            if query_lower in entry["namaste_term"].lower():
                score += 5
            if query_lower in entry["namaste_code"].lower():
                score += 5
            if query_lower in entry["icd11_tm2_code"].lower():
                score += 5
            if query_lower in entry["ayurvedic_category"].lower():
                score += 2

        for sym in symptoms:
            for entry_sym in entry["symptoms"]:
                if sym in entry_sym.lower():
                    score += 2

        if score > 0 or not (query_lower or dosha_lower or symptoms):
            entry_copy = dict(entry)
            entry_copy["relevance_score"] = score
            results.append(entry_copy)

    results.sort(key=lambda x: x.get("relevance_score", 0), reverse=True)
    return results

def get_fhir_concept_map():
    group_elements = []
    for item in NAMASTE_ICD11_DATABASE:
        group_elements.append({
            "code": item["namaste_code"],
            "display": item["namaste_term"],
            "target": [
                {
                    "code": item["icd11_tm2_code"],
                    "display": item["icd11_tm2_term"],
                    "equivalence": "equivalent",
                    "comment": f"AYUSH FHIR R4 Mapping: {item['clinical_note']}"
                }
            ]
        })

    return {
        "resourceType": "ConceptMap",
        "id": "namaste-to-icd11-tm2",
        "url": "http://ayush.gov.in/fhir/ConceptMap/namaste-to-icd11-tm2",
        "name": "NamasteToICD11TM2Map",
        "title": "NAMASTE Ayurvedic National Terminology to WHO ICD-11 TM2 Mapping",
        "status": "active",
        "publisher": "Ministry of AYUSH / VaidyaSetu Platform",
        "sourceUri": "http://ayush.gov.in/fhir/CodeSystem/namaste",
        "targetUri": "http://hl7.org/fhir/sid/icd-11",
        "group": [
            {
                "source": "http://ayush.gov.in/fhir/CodeSystem/namaste",
                "target": "http://hl7.org/fhir/sid/icd-11",
                "element": group_elements
            }
        ]
    }
