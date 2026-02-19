from nt import error
from fastapi import APIRouter, UploadFile, File, status
from fastapi.responses import JSONResponse
import os
import uuid
import json

from pydantic import Json
from starlette.responses import Content

router = APIRouter()

# extensões permitidas
ALLOWED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg", ".txt", ".docx"}

# tamanho máximo (10MB)
MAX_FILE_SIZE = 10 * 1024 * 1024

# pastas de armazenamento
UPLOAD_DIR = "uploads"
RESULTS_DIR = "results"

# garante que as pastas existam
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULTS_DIR, exist_ok=True)


@router.post("/scan")
async def scan_file(file: UploadFile = File(...)):

    # cria um identificador único para o scan
    file_id = str(uuid.uuid4())

    # caminho onde o arquivo será salvo
    file_location = f"{UPLOAD_DIR}/{file_id}_{file.filename}"

    # lê o arquivo enviado
    contents = await file.read()

    # verifica tamanho
    if len(contents) > MAX_FILE_SIZE:
        return JSONResponse(
            status_code=413,
            content={"error": "Arquivo muito grande (máx 10MB)"}
        )

    # pega extensão do arquivo
    filename = file.filename.lower()
    ext = os.path.splitext(filename)[1]

    # valida extensão
    if ext not in ALLOWED_EXTENSIONS:
        return JSONResponse(
            status_code=400,
            content={"error": "Tipo de arquivo não permitido"}
        )

    # salva o arquivo
    with open(file_location, "wb") as buffer:
        buffer.write(contents)

    # cria registro inicial do scan (AINDA NÃO ANALISADO)
    result = {
        "scan_id": file_id,
        "filename": file.filename,
        "status": "processing",
        "infected": None,
        "risk_level": None,
        "details": []
    }

    # salva o JSON do scan
    result_file = f"{RESULTS_DIR}/{file_id}.json"
    with open(result_file, "w") as f:
        json.dump(result, f, indent=4)

    # responde ao usuário ' ""
    return JSONResponse(content=result)



@router.get("/resuts{scan_id}")
async def get_scan_result(scan_id: str):
    
 result_file = f"{RESULTS_DIR}/{scan_id}.json"
 
 if not os.path.exists:
     return JSONResponse(
         status_code=404,
         content={"error": "Arquivo não encontrado"}
     )
     
     
 with open(result_file,"r") as f:
     data = Json.load(f)
     
     
 return JSONResponse(content=data)         