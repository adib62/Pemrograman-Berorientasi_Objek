interface Produk {
  id: number;
  nama: string;
  harga: string;
  mesin: string;
  fitur: string;
  ikon: string;
}

export default function KatalogProduk() {
  const daftarMotor: Produk[] = [
    { id: 1, nama: "Honda Vario 160", harga: "Rp 26.500.000", mesin: "156.9 cc eSP+", fitur: "Smart Key System, Full Digital Panelmeter", ikon: "🔥" },
    { id: 2, nama: "Honda Beat FI", harga: "Rp 18.000.000", mesin: "109.5 cc eSP", fitur: "Secure Key Shutter, Idling Stop System", ikon: "⚡" },
    { id: 3, nama: "Honda Scoopy", harga: "Rp 21.800.000", mesin: "109.5 cc eSP", fitur: "Functional USB Charger, Iconik LED Projector", ikon: "🛵" },
  ];

  return (
    <div>
      <h3 style={{ marginTop: 0, color: '#d32f2f', borderBottom: '2px solid #ffebee', paddingBottom: '10px' }}>
        🔥 Line-Up Produk Honda Terpopuler
      </h3>
      <p style={{ fontSize: '13px', color: '#666', marginBottom: '25px' }}>
        Daftar unit motor Honda matic andalan dengan performa mesin eSP+ terbaik untuk mobilitas harian lu.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {daftarMotor.map((motor) => (
          <div key={motor.id} style={{
            border: '1px solid #eee',
            borderRadius: '10px',
            padding: '20px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)';
          }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h4 style={{ margin: 0, fontSize: '18px', color: '#333' }}>{motor.nama}</h4>
              <span style={{ fontSize: '24px' }}>{motor.ikon}</span>
            </div>
            
            <div style={{ fontSize: '13px', color: '#666', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>Harga OTR:</strong> <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>{motor.harga}</span></div>
              <div><strong>Kapasitas Mesin:</strong> {motor.mesin}</div>
              <div><strong>Fitur Unggulan:</strong> {motor.fitur}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}