from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import os, shutil, uuid, json

router = APIRouter()

# Pastas obrigatórias
UPLOAD_DIR = "uploads"
RESULTS_DIR = "results"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULTS_DIR, exist_ok=True)

# Rota POST para upload e scan
@router.post("/scan")
async def scan_file(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    file_location = f"{UPLOAD_DIR}/{file_id}_{file.filename}"

    # Salva o arquivo enviado
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Resultado #IMPLEMENTAR A IA
    result = {
        "scan_id": file_id,
        "filename": file.filename,
        "infected": False,
        "risk_level": "low"
    }

    # Salva relatório JSON
    result_file = f"{RESULTS_DIR}/{file_id}.json"
    with open(result_file, "w") as f:
        json.dump(result, f)

    # Retorna resposta
    return JSONResponse(content=result)
