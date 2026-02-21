# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# importando routers
from app.api.routes_scan import router as scan_router
from app.api.routes_results import router as results_router

# cria a instância do FastAPI
app = FastAPI(
    title="CloudWare API",
    description="API para upload e scan de arquivos com integração VirusTotal/Hybrid Analysis",
    version="1.0.0"
)

# Configuração de CORS (se precisar acessar de frontend externo)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # em produção, especifique o domínio do front
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# registra routers
app.include_router(scan_router, prefix="/scan", tags=["Scan"])
app.include_router(results_router, prefix="/results", tags=["Results"])
