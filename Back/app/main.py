from fastapi import FastAPI, UploadFile, File              #importando a fast API
from fastapi.middleware.cors import CORSMiddleware         #Permite que o front
import os, json, shutil, uuid

app = FastAPI() #Inicializar a API 

#Midlaware Porteiro, selecionando para o navegador quem pode entrar e quem não pode.
#ALTERAR DEPOIS
app.add_middleware(    
  CORSMiddleware,
  allow_origins = ["*"],
  allow_methods = ["*"],
  allow_headers = ["*"],
)

#Cria uma gaveta onde os arquivos são armazenados

UPLOAD_DIR = ("uploads")         
RESULTS_DIR = "results"

os.makedirs(UPLOAD_DIR, exist_ok =True)   #cria uma se não existir
os.makedirs(RESULTS_DIR, exist_ok=True)   #

#Fim da main.py