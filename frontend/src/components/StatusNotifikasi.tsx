interface TanggapanStatus {
  perlu_servis: boolean;
  pesan?: string;
  sisa_km?: number;
}

interface StatusNotifikasiProps {
  dataStatus: TanggapanStatus;
  onReset: () => void;
}

export default function StatusNotifikasi({ dataStatus, onReset }: StatusNotifikasiProps) {
  return (
    <div
      style={{
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid',
        backgroundColor: dataStatus.perlu_servis ? '#ffebee' : '#e8f5e9',
        borderColor: dataStatus.perlu_servis ? '#ef9a9a' : '#a5d6a7',
        color: dataStatus.perlu_servis ? '#c62828' : '#2e7d32',
      }}
    >
      <h3 style={{ marginTop: 0 }}>
        {dataStatus.perlu_servis ? '⚠️ Peringatan: Waktunya Servis Berkala!' : '✅ Kondisi Motor Aman!'}
      </h3>
      
      <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
        {dataStatus.perlu_servis
          ? dataStatus.pesan
          : `Kondisi oli dan mesin motor Anda diperkirakan masih prima. Batas anjuran servis berkala berikutnya adalah kurang lebih ${dataStatus.sisa_km?.toLocaleString('id-ID')} KM lagi.`}
      </p>

      <button
        onClick={onReset}
        style={{
          marginTop: '15px',
          padding: '8px 16px',
          backgroundColor: dataStatus.perlu_servis ? '#c62828' : '#2e7d32',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '13px',
        }}
      >
        Cek Motor Lain
      </button>
    </div>
  );
}