from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.services.storage_service import load_result

router = APIRouter()

@router.get("/results/{scan_id}")
async def get_scan_result(scan_id: str):
    data = load_result(scan_id)
    if not data:
        return JSONResponse(status_code=404, content={"error": "Resultado não encontrado"})
    return JSONResponse(content=data)
