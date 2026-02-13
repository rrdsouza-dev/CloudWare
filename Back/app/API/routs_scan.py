# api/routes_scan.py
from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import shutil
import uuid
import os

router = APIRouter()

@router.post("/scan")
async def scan_files(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    file_location = f"uploads/{file_id}_{file.filename}"
    
    
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
