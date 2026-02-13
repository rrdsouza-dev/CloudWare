from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import os, uuid, json, hashlib

router = APIRouter()

# Extensões permitidas
ALLOWED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg", ".txt", ".docx"}

# Tamanho máximo (10MB)
MAX_FILE_SIZE = 10 * 1024 * 1024

# Pastas obrigatórias
UPLOAD_DIR = "uploads"
RESULTS_DIR = "results"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULTS_DIR, exist_ok=True)

@router.post("/scan")
async def scan_file(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    file_location = f"{UPLOAD_DIR}/{file_id}_{file.filename}"
    
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        return JSONResponse(status_code=413, content={"error": "Arquivo muito grande (máx 10MB)"})

    ext = os.path.splitext(file.filename.lower())[1]
    if ext not in ALLOWED_EXTENSIONS:
        return JSONResponse(status_code=400, content={"error": "Tipo de arquivo não permitido"})

    # Salva o arquivo
    with open(file_location, "wb") as buffer:
        buffer.write(contents)

    result = {
        "scan_id": file_id,
        "filename": file.filename,
        "infected": False,
        "risk_level": "low"
    }

    result_file = f"{RESULTS_DIR}/{file_id}.json"
    with open(result_file, "w") as f:
        json.dump(result, f)

    return JSONResponse(content=result)
    