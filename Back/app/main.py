from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes_scan import router as scan_router
import os  # biblioteca do próprio Python para lidar com arquivos e pastas

app = FastAPI()
# se não existir, ele cria automaticamente ao iniciar o servidor
os.makedirs("uploads", exist_ok=True)

# --- configuração de CORS ---
origins = ["*"]  # depois, em produção, você troca pelo domínio do seu site

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # quem pode acessar
    allow_credentials=True,       # permite cookies/token
    allow_methods=["*"],          # quais métodos HTTP (GET, POST...)
    allow_headers=["*"],          # quais headers são permitidos
)

app.include_router(scan_router)
