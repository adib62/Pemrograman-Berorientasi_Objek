import { useState } from 'react';
import Navbar from './components/Navbar';
import KatalogProduk from './components/KatalogProduk';
import FormInputMotor from './components/FormInputMotor';
import StatusNotifikasi from './components/StatusNotifikasi';
import TabelRiwayatServis from './components/TabelRiwayatServis';
import BotAI from './components/BotAI';
import './App.css';

interface DataInputMotor {
  tipe_motor: string;
  km_terbaru: number;
}

interface TanggapanStatus {
  perlu_servis: boolean;
  pesan?: string;
  sisa_km?: number;
}

interface Riwayat {
  id: number;
  tanggal: string;
  tipe_motor: string;
  km_masuk: number;
  keterangan: string;
}

export default function App() {
  const [halamanAktif, setHalamanAktif] = useState<string>('produk');
  const [statusMotor, setStatusMotor] = useState<TanggapanStatus | null>(null);
  
  // State untuk menyimpan daftar riwayat secara dinamis (simulasi frontend)
  const [riwayatList, setRiwayatList] = useState<Riwayat[]>([
    { id: 1, tanggal: "2026-05-10", tipe_motor: "Vario 160", km_masuk: 4050, keterangan: "Ganti Oli Mesin MPX2 & Oli Gardan" },
    { id: 2, tanggal: "2026-06-15", tipe_motor: "Beat FI", km_masuk: 8200, keterangan: "Service Ringan & Bersihin CVT" },
  ]);

  const handleCekStatus = (dataInput: DataInputMotor) => {
    const batasKM = 4000;
    const hariIni = new Date().toISOString().split('T')[0]; // Format Tanggal YYYY-MM-DD
    
    let perluServis = false;
    let pesanNotif = "";
    let sisaKm = 0;
    let tindakanLog = "Pengecekan Rutin - Kondisi Prima";

    // Logika penentuan kondisi servis berkala
    if (dataInput.km_terbaru >= batasKM) {
      perluServis = true;
      pesanNotif = `Unit ${dataInput.tipe_motor} milik Anda sudah menyentuh ${dataInput.km_terbaru} KM. Sudah melampaui batas anjuran berkala (${batasKM} KM).`;
      tindakanLog = "⚠️ Terdeteksi Over-KM! Direkomendasikan Servis Besar & Ganti Oli";
    } else {
      sisaKm = batasKM - dataInput.km_terbaru;
    }

    // Update status untuk trigger komponen Notifikasi
    setStatusMotor({
      perlu_servis: perluServis,
      pesan: pesanNotif,
      sisa_km: sisaKm
    });

    // Otomatis masukkan data input baru ke dalam Log Riwayat di bawahnya
    const dataBaru: Riwayat = {
      id: Date.now(), // ID unik menggunakan timestamp
      tanggal: hariIni,
      tipe_motor: dataInput.tipe_motor,
      km_masuk: dataInput.km_terbaru,
      keterangan: tindakanLog
    };

    setRiwayatList([dataBaru, ...riwayatList]); // Gabungkan data baru di baris paling atas
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', width: '100vw', margin: 0, padding: 0, overflowX: 'hidden' }}>
      {/* Komponen Navigasi Atas */}
      <Navbar halamanAktif={halamanAktif} setHalamanAktif={setHalamanAktif} />
      
      <div style={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}>
        {/* Halaman 1: Katalog Produk */}
        {halamanAktif === 'produk' && (
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', width: '100%', boxSizing: 'border-box' }}>
            <KatalogProduk />
          </div>
        )}

        {/* Halaman 2: Tracker Servis */}
        {halamanAktif === 'tracker' && (
          <div style={{ maxWidth: '900px', margin: '30px auto', padding: '10px' }}>
            <div style={{ marginBottom: '20px' }}>
              {/* Kondisional rendering: Form Input akan berganti jadi Notifikasi jika data sudah di-submit */}
              {!statusMotor ? (
                <FormInputMotor onSubmitting={handleCekStatus} />
              ) : (
                <StatusNotifikasi dataStatus={statusMotor} onReset={() => setStatusMotor(null)} />
              )}
            </div>
            
            {/* Komponen Tabel Log Riwayat AHASS */}
            <TabelRiwayatServis daftarRiwayat={riwayatList} />
          </div>
        )}
      </div>

      {/* Widget Bot AI Melayang di Pojok Kanan Bawah */}
      <BotAI />
    </div>
  );
}