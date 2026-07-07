from fastapi import FastAPI
from .database import engine, Base
from .routers import motor_api

# Perintah untuk membuat file database (bengkel.db) secara otomatis
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Honda Maintenance Tracker Backend")

# Mendaftarkan router API
app.include_router(motor_api.router)