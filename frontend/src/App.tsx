import { useEffect, useState } from 'react';

// Struktur data yang dikirim oleh backend
interface Barang {
  id: number;
  nama: string;
  harga: number;
}

function App() {
  const [produk, setProduk] = useState<Barang[]>([]);

  useEffect(() => {
    // Mengambil data dari Backend
    fetch('http://localhost:3000/api/barang')
      .then((res) => res.json())
      .then((data) => setProduk(data))
      .catch((err) => console.error("Gagal mengambil data:", err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Data dari Backend (OOP) 🚀</h1>
      <ul>
        {produk.map((item) => (
          <li key={item.id}>
            {item.nama} - Rp {item.harga.toLocaleString('id-ID')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;