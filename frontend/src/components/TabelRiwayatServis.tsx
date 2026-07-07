interface Riwayat {
  id: number;
  tanggal: string;
  tipe_motor: string;
  km_masuk: number;
  keterangan: string;
}

interface TabelRiwayatServisProps {
  daftarRiwayat: Riwayat[];
}

export default function TabelRiwayatServis({ daftarRiwayat }: TabelRiwayatServisProps) {
  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', marginTop: '20px' }}>
      <h3 style={{ marginTop: 0, color: '#333' }}>📋 Log Riwayat Masuk AHASS</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left', minWidth: '500px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '12px 10px' }}>Tanggal</th>
              <th style={{ padding: '12px 10px' }}>Unit Motor</th>
              <th style={{ padding: '12px 10px' }}>Odometer (KM)</th>
              <th style={{ padding: '12px 10px' }}>Tindakan / Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {daftarRiwayat.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px 10px', color: '#666' }}>{item.tanggal}</td>
                <td style={{ padding: '12px 10px', fontWeight: 'bold' }}>{item.tipe_motor}</td>
                <td style={{ padding: '12px 10px' }}>{item.km_masuk.toLocaleString('id-ID')} KM</td>
                <td
                  style={{
                    padding: '12px 10px',
                    color: item.keterangan.includes('⚠️') ? '#d32f2f' : '#2e7d32',
                    fontWeight: item.keterangan.includes('⚠️') ? 'bold' : 'normal',
                  }}
                >
                  {item.keterangan}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}