"""
Prakriti Scoring Engine — Deterministic Rules/Weighted-Scoring Engine
Evaluates Ashtavidha and Dashavidha exam inputs to compute exact Vata, Pitta, and Kapha percentages,
determines dominant Doshic Prakriti type, and auto-generates clinical summary recommendation.
"""

# Field weight mappings for Vata, Pitta, Kapha
DOSHA_WEIGHTS = {
    # Ashtavidha Pariksha
    "nadi": {
        "Vata (Sarpagati - Snake/Rapid)": {"vata": 15, "pitta": 2, "kapha": 0},
        "Pitta (Mandookagati - Frog/Jumping)": {"vata": 2, "pitta": 15, "kapha": 0},
        "Kapha (Hansasgati - Swan/Slow/Smooth)": {"vata": 0, "pitta": 2, "kapha": 15},
        "Vata-Pitta": {"vata": 9, "pitta": 9, "kapha": 0},
        "Pitta-Kapha": {"vata": 0, "pitta": 9, "kapha": 9},
        "Vata-Kapha": {"vata": 9, "pitta": 0, "kapha": 9},
        "Tridoshaja": {"vata": 6, "pitta": 6, "kapha": 6}
    },
    "jihva": {
        "Dry, cracked, rough, darkish coat": {"vata": 10, "pitta": 1, "kapha": 0},
        "Reddish, yellow coat, inflamed, burning": {"vata": 1, "pitta": 10, "kapha": 0},
        "Thick white coating, slimy, pale": {"vata": 0, "pitta": 1, "kapha": 10},
        "Coated, dry (Vata-Pitta)": {"vata": 6, "pitta": 6, "kapha": 0},
        "Coated, slimy (Kapha-Vata)": {"vata": 6, "pitta": 0, "kapha": 6}
    },
    "sparsha": {
        "Cold, dry, rough": {"vata": 10, "pitta": 0, "kapha": 0},
        "Warm, moist, oily, reddish": {"vata": 0, "pitta": 10, "kapha": 0},
        "Cool, clammy, smooth, thick": {"vata": 0, "pitta": 0, "kapha": 10}
    },
    "druk": {
        "Dry, small, dull, unblinking": {"vata": 8, "pitta": 1, "kapha": 0},
        "Sharp, sensitive to light, reddish/yellowish": {"vata": 0, "pitta": 8, "kapha": 0},
        "Large, attractive, white, thick lashes": {"vata": 0, "pitta": 0, "kapha": 8}
    },
    "shabda": {
        "Hoarse, low-volume, crackling": {"vata": 7, "pitta": 1, "kapha": 0},
        "Sharp, loud, forceful, clear": {"vata": 0, "pitta": 7, "kapha": 0},
        "Deep, resonant, heavy, pleasant": {"vata": 0, "pitta": 0, "kapha": 7}
    },
    "mutra": {
        "Astringent, clear, dark brown, scanty": {"vata": 7, "pitta": 1, "kapha": 0},
        "Yellow, reddish, pungent smell, burning": {"vata": 0, "pitta": 7, "kapha": 0},
        "Oily, whitish, cloudy, frothy": {"vata": 0, "pitta": 0, "kapha": 7}
    },
    "mala": {
        "Dry, hard, constipated, gaseous": {"vata": 8, "pitta": 1, "kapha": 0},
        "Loose, yellowish, foul odor, frequent": {"vata": 0, "pitta": 8, "kapha": 0},
        "Heavy, slimy, mucous-filled, bulky": {"vata": 0, "pitta": 0, "kapha": 8}
    },
    "akriti": {
        "Lean, tall or short, prominent joints, dry body": {"vata": 10, "pitta": 1, "kapha": 0},
        "Medium build, good muscle tone, warm": {"vata": 1, "pitta": 10, "kapha": 0},
        "Broad frame, sturdy, well-developed, soft": {"vata": 0, "pitta": 1, "kapha": 10}
    },
    # Dashavidha additions
    "anala": {
        "Vishamagni (Irregular digestive fire)": {"vata": 8, "pitta": 1, "kapha": 0},
        "Teekshnagni (Sharp/Hyperactive digestive fire)": {"vata": 0, "pitta": 8, "kapha": 0},
        "Mandagni (Slow/Dull digestive fire)": {"vata": 0, "pitta": 0, "kapha": 8},
        "Samagni (Balanced digestive fire)": {"vata": 3, "pitta": 3, "kapha": 3}
    },
    "satwa": {
        "Alpa Satwa (High anxiety, easily agitated)": {"vata": 6, "pitta": 2, "kapha": 0},
        "Madhya Satwa (Goal-driven, passionate)": {"vata": 1, "pitta": 6, "kapha": 1},
        "Pravara Satwa (Calm, stable, patient)": {"vata": 0, "pitta": 1, "kapha": 6}
    }
}

def calculate_prakriti(ashtavidha_data: dict, dashavidha_data: dict = None) -> dict:
    """
    Computes Vata, Pitta, Kapha points from exam fields and returns percentages + dominant Prakriti.
    """
    dashavidha_data = dashavidha_data or {}
    combined_inputs = {**ashtavidha_data, **dashavidha_data}

    vata_score = 0.0
    pitta_score = 0.0
    kapha_score = 0.0

    for category, val in combined_inputs.items():
        if not val or category not in DOSHA_WEIGHTS:
            continue
        mapping = DOSHA_WEIGHTS[category]
        if val in mapping:
            weights = mapping[val]
            vata_score += weights.get("vata", 0)
            pitta_score += weights.get("pitta", 0)
            kapha_score += weights.get("kapha", 0)

    # Base default fallback if no input provided
    total_score = vata_score + pitta_score + kapha_score
    if total_score == 0:
        vata_pct, pitta_pct, kapha_pct = 33.3, 33.3, 33.4
    else:
        vata_pct = round((vata_score / total_score) * 100, 1)
        pitta_pct = round((pitta_score / total_score) * 100, 1)
        kapha_pct = round((kapha_score / total_score) * 100, 1)

    # Determine dominant Prakriti pattern
    dosha_list = [("Vata", vata_pct), ("Pitta", pitta_pct), ("Kapha", kapha_pct)]
    dosha_list.sort(key=lambda x: x[1], reverse=True)

    highest_dosha, highest_val = dosha_list[0]
    second_dosha, second_val = dosha_list[1]

    if highest_val - second_val < 8:
        dominant_prakriti = f"{highest_dosha}-{second_dosha} (Dvandvaja / Dual-Dosha)"
    elif highest_val >= 60:
        dominant_prakriti = f"Ekadoshaja ({highest_dosha} Predominant)"
    else:
        dominant_prakriti = f"{highest_dosha}-{second_dosha} Dominant"

    # Auto-generate clinical guidance
    dietary_advice = []
    if "Vata" in dominant_prakriti:
        dietary_advice.append("Warm, oily, grounding foods; avoid raw & cold items.")
    if "Pitta" in dominant_prakriti:
        dietary_advice.append("Cooling, sweet, bitter, astringent foods; avoid spicy & acidic items.")
    if "Kapha" in dominant_prakriti:
        dietary_advice.append("Light, warm, pungent, astringent foods; avoid heavy & dairy items.")

    return {
        "scores": {
            "vata": vata_pct,
            "pitta": pitta_pct,
            "kapha": kapha_pct
        },
        "raw_points": {
            "vata": vata_score,
            "pitta": pitta_score,
            "kapha": kapha_score
        },
        "dominant_prakriti": dominant_prakriti,
        "recommendations": dietary_advice,
        "is_ai_assisted": True,
        "disclaimer": "Decision Support Only — Requires Vaidya Confirmation"
    }
