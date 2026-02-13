from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes_scan import router as scan_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# >>> ISSO AQUI É O QUE FALTA <<<
app.include_router(scan_router)
    