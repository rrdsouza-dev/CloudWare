from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes_scan import router as scan_router  # Importa rota de scan

app = FastAPI()  # Inicializa API

# Middleware CORS (permite comunicação com o front)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclui o roteador
app.include_router(scan_router)