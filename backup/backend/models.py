from sqlalchemy import Column, Integer, String, Float, Text
from .database import Base

class RiwayatServis(Base):
    __tablename__ = "riwayat_servis"
    id = Column(Integer, primary_key=True, index=True)
    tipe_motor = Column(String(50), index=True)
    tanggal = Column(String(20))
    detail = Column(Text)
    biaya = Column(Float)