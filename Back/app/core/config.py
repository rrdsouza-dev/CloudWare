import os
from pathlib import Path
from dotenv import load_dotenv

# Carrega variáveis de ambiente (projeto raiz = pasta acima de Back/)
_env_path = Path(__file__).resolve().parent.parent.parent.parent / ".env"
load_dotenv(_env_path)

# VirusTotal API Key
VT_API_KEY = os.getenv("VT_API_KEY")

# Limites de upload
MAX_FILE_SIZE = int(os.getenv("MAX_UPLOAD_SIZE", 10 * 1024 * 1024))  # 10MB padrão
ALLOWED_EXTENSIONS = set(os.getenv("ALLOWED_EXTENSIONS", ".pdf,.png,.jpg,.jpeg,.txt,.docx,.zip").split(","))

# Diretórios
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
RESULTS_DIR = os.path.join(BASE_DIR, "results")
LOGS_DIR = os.path.join(BASE_DIR, "logs")

# Cria diretórios se não existirem
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULTS_DIR, exist_ok=True)
os.makedirs(LOGS_DIR, exist_ok=True)

# Upload chunk
CHUNK_SIZE = 1024 * 1024  # 1MB
