import { useState } from 'react';

interface DataInputMotor {
  tipe_motor: string;
  km_terbaru: number;
}

interface FormInputMotorProps {
  onSubmitting: (data: DataInputMotor) => void;
}

export default function FormInputMotor({ onSubmitting }: FormInputMotorProps) {
  const [tipeMotor, setTipeMotor] = useState<string>('');
  const [kmTerbaru, setKmTerbaru] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipeMotor || !kmTerbaru) {
      alert('Harap isi semua kolom ya bro!');
      return;
    }
    onSubmitting({
      tipe_motor: tipeMotor,
      km_terbaru: parseInt(kmTerbaru, 10),
    });
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h3 style={{ marginTop: 0, color: '#d32f2f' }}>🏍️ Analisis Kondisi Kendaraan</h3>
      <p style={{ fontSize: '13px', color: '#666', marginBottom: '20px' }}>
        Masukkan data kilometer odometer motor Honda lu saat ini untuk mengetahui jadwal servis berkala.
      </p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Tipe / Model Motor Honda</label>
          <input
            type="text"
            placeholder="Contoh: Vario 160, Beat FI, Scoopy"
            value={tipeMotor}
            onChange={(e) => setTipeMotor(e.target.value)}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>Kilometer Odometer Saat Ini (KM)</label>
          <input
            type="number"
            placeholder="Contoh: 4500"
            value={kmTerbaru}
            onChange={(e) => setKmTerbaru(e.target.value)}
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none' }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '12px',
            backgroundColor: '#d32f2f',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Analisis Kondisi Kendaraan
        </button>
      </form>
    </div>
  );
}