interface NavbarProps {
  halamanAktif: string;
  setHalamanAktif: (halaman: string) => void;
}

export default function Navbar({ halamanAktif, setHalamanAktif }: NavbarProps) {
  return (
    <nav style={{
      backgroundColor: '#d32f2f',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '24px' }}>🏍️</span>
        <h2 style={{ margin: 0, fontSize: '20px', letterSpacing: '0.5px' }}>AHASS Service Tracker</h2>
      </div>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <button
          onClick={() => setHalamanAktif('produk')}
          style={{
            backgroundColor: halamanAktif === 'produk' ? 'rgba(255,255,255,0.2)' : 'transparent',
            border: 'none',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            transition: 'background 0.2s'
          }}
        >
          🛍️ Katalog Motor
        </button>
        <button
          onClick={() => setHalamanAktif('tracker')}
          style={{
            backgroundColor: halamanAktif === 'tracker' ? 'rgba(255,255,255,0.2)' : 'transparent',
            border: 'none',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            transition: 'background 0.2s'
          }}
        >
          🔧 Tracker Servis
        </button>
      </div>
    </nav>
  );
}