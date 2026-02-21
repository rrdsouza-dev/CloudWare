import requests
from app.core.config import VT_API_KEY

VT_URL = "https://www.virustotal.com/api/v3/files"

def analyze_file(file_path):
    headers = {"x-apikey": VT_API_KEY}
    with open(file_path, "rb") as f:
        files = {"file": f}
        response = requests.post(VT_URL, headers=headers, files=files)
        if response.status_code == 200:
            data = response.json()
            result = {
                "infected": data.get("data", {}).get("attributes", {}).get("last_analysis_stats", {}).get("malicious", 0) > 0,
                "risk_level": "high" if data.get("data", {}).get("attributes", {}).get("last_analysis_stats", {}).get("malicious", 0) > 0 else "low",
                "details": data
            }
            return result
        else:
            return {"infected": None, "risk_level": None, "details": {"error": response.text}}
