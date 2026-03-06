import asyncio
import os

from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse

from app.core.config import ALLOWED_EXTENSIONS, MAX_FILE_SIZE
from app.services.scan_service import analyze_file
from app.services.storage_service import save_result, save_upload_file

router = APIRouter()


# verificação de tamanho e compatibilidade de arquivos
@router.post("/scan")
async def scan_file(file: UploadFile = File(...)):
    original_filename = file.filename or ""
    if not original_filename:
        return JSONResponse(
            status_code=400, content={"error": "Nome de arquivo invalido"}
        )

    ext = os.path.splitext(original_filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        return JSONResponse(
            status_code=400, content={"error": "Tipo de arquivo não permitido"}
        )

    file_id, file_path, filename, size = await save_upload_file(file)
    if size > MAX_FILE_SIZE:
        return JSONResponse(status_code=413, content={"error": "Arquivo muito grande"})

    # resultados do scan
    result = {
        "scan_id": file_id,
        "filename": filename,
        "status": "processing",
        "infected": None,
        "risk_level": None,
        "details": [],
    }
    save_result(file_id, result)

    loop = asyncio.get_event_loop()
    scan_result = await loop.run_in_executor(None, analyze_file, file_path)
    result.update(scan_result)
    result["status"] = "done"
    save_result(file_id, result)

    return JSONResponse(content=result)
