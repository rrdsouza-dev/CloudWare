from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import os
import uuid

router = APIRouter()

ALLOWED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg", ".txt", ".docx"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/scan")
async def scan_file(file: UploadFile = File(...)):

    # ---------- validar extensão ----------
    filename = file.filename.lower()
    ext = os.path.splitext(filename)[1]

    if ext not in ALLOWED_EXTENSIONS:
        return JSONResponse(
            status_code=400,
            content={"error": "Tipo de arquivo não permitido"}
        )

    # ---------- gerar nome seguro ----------
    safe_filename = f"{uuid.uuid4()}{ext}"
    file_path = os.path.join(UPLOAD_DIR, safe_filename)

    # ---------- salvar em streaming ----------
    current_size = 0

    try:
        with open(file_path, "wb") as buffer:

            while True:
                chunk = await file.read(1024 * 1024)  # lê 1MB por vez

                if not chunk:
                    break  # upload terminou

                current_size += len(chunk)

                if current_size > MAX_FILE_SIZE:
                    buffer.close()
                    os.remove(file_path)
                    return JSONResponse(
                        status_code=413,
                        content={"error": "Arquivo muito grande (máx 10MB)"}
                    )

                buffer.write(chunk)

    except Exception as e:
        # se qualquer erro acontecer durante upload
        if os.path.exists(file_path):
            os.remove(file_path)

        return JSONResponse(
            status_code=500,
            content={"error": "Falha ao salvar o arquivo"}
        )

    # ---------- resposta simulada ----------
    result = {
        "scan_id": str(uuid.uuid4()),
        "filename": file.filename,
        "infected": False,
        "risk_level": "low"
    }

    return JSONResponse(content=result)
