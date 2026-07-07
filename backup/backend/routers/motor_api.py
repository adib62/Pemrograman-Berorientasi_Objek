from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..schemas import MotorInput, UpdateKM, ServisInput
from ..database import get_db
from ..models import RiwayatServis
from ..controllers.motor_oop import BackendController
from datetime import datetime

router = APIRouter(prefix="/api/motor", tags=["Maintenance Tracker"])
controller = BackendController()

@router.post("/inisialisasi")
def inisialisasi(data: MotorInput):
    controller.inisialisasi_motor(data.tipe, data.nomor_rangka, data.km_awal)
    return {"message": f"Sistem pelacakan aktif untuk {data.tipe}."}

@router.post("/cek-km")
def cek_km(data: UpdateKM):
    return controller.proses_input_km(data.km_terbaru)

@router.post("/simpan-servis")
def simpan_servis(data: ServisInput, db: Session = Depends(get_db)):
    if not controller.motor_aktif:
        return {"error": "Motor belum diinisialisasi"}
    
    db_riwayat = RiwayatServis(
        tipe_motor=controller.motor_aktif.tipe_motor,
        tanggal=datetime.now().strftime("%Y-%m-%d"),
        detail=data.detail_perbaikan,
        biaya=data.biaya
    )
    db.add(db_riwayat)
    db.commit()
    
    controller.motor_aktif.reset_indikator_servis()
    return {"message": "Data servis tersimpan, indikator KM di-reset."}