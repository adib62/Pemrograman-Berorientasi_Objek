from pydantic import BaseModel

class MotorInput(BaseModel):
    tipe: str
    nomor_rangka: str
    km_awal: int

class UpdateKM(BaseModel):
    km_terbaru: int

class ServisInput(BaseModel):
    detail_perbaikan: str
    biaya: float