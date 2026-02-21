import os
import aiofiles
import uuid
import json
from app.core.config import UPLOAD_DIR, RESULTS_DIR, CHUNK_SIZE

async def save_upload_file(upload_file):
    file_id = str(uuid.uuid4())
    safe_filename = os.path.basename(upload_file.filename)
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}_{safe_filename}")
    size = 0

    async with aiofiles.open(file_path, "wb") as out_file:
        while True:
            chunk = await upload_file.read(CHUNK_SIZE)
            if not chunk:
                break
            size += len(chunk)
            await out_file.write(chunk)

    await upload_file.close()
    return file_id, file_path, safe_filename, size

def save_result(scan_id, data):
    result_file = os.path.join(RESULTS_DIR, f"{scan_id}.json")
    with open(result_file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

def load_result(scan_id):
    result_file = os.path.join(RESULTS_DIR, f"{scan_id}.json")
    if not os.path.exists(result_file):
        return None
    with open(result_file, "r", encoding="utf-8") as f:
        return json.load(f)
