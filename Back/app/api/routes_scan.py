from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from app.services.storage_service import save_upload_file, save_result
from app.services.scan_service import analyze_file
from app.core.config import ALLOWED_EXTENSIONS, MAX_FILE_SIZE
import os, asyncio

router = APIRouter()

@router.post("/scan")
async def scan_file(file: UploadFile = File(...)):
    ext = os.path.splitext(file.filename.lower())[1]
    if ext not in ALLOWED_EXTENSIONS:
        return JSONResponse(status_code=400, content={"error": "Tipo de arquivo não permitido"})

    file_id, file_path, filename, size = await save_upload_file(file)
    if size > MAX_FILE_SIZE:
        return JSONResponse(status_code=413, content={"error": "Arquivo muito grande"})

    result = {
        "scan_id": file_id,
        "filename": filename,
        "status": "processing",
        "infected": None,
        "risk_level": None,
        "details": []
    }
    save_result(file_id, result)

    loop = asyncio.get_event_loop()
    scan_result = await loop.run_in_executor(None, analyze_file, file_path)
    result.update(scan_result)
    result["status"] = "done"
    save_result(file_id, result)

    return JSONResponse(content=result)
