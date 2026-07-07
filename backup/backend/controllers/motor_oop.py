from datetime import datetime

class Motor:
    def __init__(self, tipe_motor, nomor_rangka, km_awal=0):
        self.tipe_motor = tipe_motor
        self.__nomor_rangka = nomor_rangka 
        self.__kilometer_saat_ini = km_awal 
        self.__batas_servis = km_awal + 4000 

    def get_kilometer(self): return self.__kilometer_saat_ini
    def set_kilometer(self, km_baru): self.__kilometer_saat_ini = km_baru
    def get_batas_servis(self): return self.__batas_servis
    def reset_indikator_servis(self): self.__batas_servis = self.__kilometer_saat_ini + 4000
    def cek_status_servis(self): return self.__kilometer_saat_ini >= self.__batas_servis
    def hitung_sisa_km(self): return self.__batas_servis - self.__kilometer_saat_ini
    def cek_komponen_rutin(self): return "Pengecekan standar: Rem, Ban, Kelistrikan."

class MaticHonda(Motor):
    def __init__(self, tipe_motor, nomor_rangka, km_awal=0):
        super().__init__(tipe_motor, nomor_rangka, km_awal)
    def cek_komponen_rutin(self):
        return super().cek_komponen_rutin() + " Tambahan: Pembersihan CVT, V-Belt."

class SportHonda(Motor):
    def __init__(self, tipe_motor, nomor_rangka, km_awal=0):
        super().__init__(tipe_motor, nomor_rangka, km_awal)
    def cek_komponen_rutin(self):
        return super().cek_komponen_rutin() + " Tambahan: Pelumasan Rantai, Kopling."

class BackendController:
    def __init__(self):
        self.motor_aktif = None

    def inisialisasi_motor(self, tipe, nomor_rangka, km_awal):
        tipe_lower = tipe.lower()
        if tipe_lower in ['vario', 'beat', 'scoopy', 'pcx']:
            self.motor_aktif = MaticHonda(tipe, nomor_rangka, km_awal)
        elif tipe_lower in ['cbr150r', 'cb150r', 'megapro']:
            self.motor_aktif = SportHonda(tipe, nomor_rangka, km_awal)
        else:
            self.motor_aktif = Motor(tipe, nomor_rangka, km_awal)

    def proses_input_km(self, km_terbaru):
        if not self.motor_aktif: return {"error": "Inisialisasi motor terlebih dahulu."}
        self.motor_aktif.set_kilometer(km_terbaru)
        if self.motor_aktif.cek_status_servis():
            return {
                "notifikasi": "Waktunya Servis",
                "rekomendasi_komponen": self.motor_aktif.cek_komponen_rutin(),
                "aksi_lanjutan": "input_detail_biaya"
            }
        return {
            "status": "Motor Prima",
            "estimasi_sisa_jarak": self.motor_aktif.hitung_sisa_km(),
            "aksi_lanjutan": "selesai"
        }