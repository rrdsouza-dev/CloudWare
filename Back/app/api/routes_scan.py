from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import os
import uuid
import json

router = APIRouter()

# extensões permitidas
ALLOWED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg", ".txt", ".docx"}

# pastas de armazenamento
UPLOAD_DIR = "uploads"
RESULTS_DIR = "results"

# garante que as pastas existam
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULTS_DIR, exist_ok=True)


@router.post("/scan")
async def scan_file(file: UploadFile = File(...)):

    # gera ID único para o scan
    file_id = str(uuid.uuid4())

    # pega extensão do arquivo
    filename = file.filename.lower()
    ext = os.path.splitext(filename)[1]

    # valida extensão antes de salvar
    if ext not in ALLOWED_EXTENSIONS:
        return JSONResponse(
            status_code=400,
            content={"error": "Tipo de arquivo não permitido"}
        )

    # caminho final do arquivo
    file_location = f"{UPLOAD_DIR}/{file_id}_{file.filename}"

    # limite de 500MB e chunk de 1MB
    MAX_FILE_SIZE = 500 * 1024 * 1024
    CHUNK_SIZE = 1024 * 1024
    size = 0

    # salva o arquivo em streaming, evitando carregar tudo na memória
    try:
        with open(file_location, "wb") as buffer:
            while True:
                chunk = await file.read(CHUNK_SIZE)
                if not chunk:
                    break
                size += len(chunk)
                if size > MAX_FILE_SIZE:
                    buffer.close()
                    os.remove(file_location)
                    return JSONResponse(
                        status_code=413,
                        content={"error": "Arquivo muito grande (máx 500MB)"}
                    )
                buffer.write(chunk)
    except Exception:
        return JSONResponse(
            status_code=500,
            content={"error": "Erro ao salvar o arquivo"}
        )

    # cria registro inicial do scan (AINDA NÃO ANALISADO)
    result = {
        "scan_id": file_id,
        "filename": file.filename,
        "status": "processing",
        "infected": None,
        "risk_level": None,
        "details": []
    }

    # salva JSON inicial do scan
    result_file = f"{RESULTS_DIR}/{file_id}.json"
    with open(result_file, "w") as f:
        json.dump(result, f, indent=4)

    # retorna resultado inicial
    return JSONResponse(content=result)


@router.get("/results/{scan_id}")
async def get_scan_result(scan_id: str):

    # caminho do JSON
    result_file = f"{RESULTS_DIR}/{scan_id}.json"

    # verifica se o arquivo existe
    if not os.path.exists(result_file):
        return JSONResponse(
            status_code=404,
            content={"error": "Arquivo não encontrado"}
        )

    # lê o JSON do scan
    with open(result_file, "r") as f:
        data = json.load(f)

    return JSONResponse(content=data)