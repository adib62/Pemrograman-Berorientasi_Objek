import { useState, useRef, useEffect } from 'react';

interface Pesan {
  id: number;
  pengirim: 'user' | 'ai';
  teks: string;
}

export default function BotAI() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputTeks, setInputTeks] = useState<string>('');
  const [sedangMemuat, setSedangMemuat] = useState<boolean>(false);
  const [daftarPesan, setDaftarPesan] = useState<Pesan[]>([
    { id: 1, pengirim: 'ai', teks: 'Halo bro! Gua mekanik virtual AI-Honda. Ada keluhan atau pertanyaan soal motor Honda kamu?' }
  ]);

  const batasPesanRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (batasPesanRef.current) {
      batasPesanRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [daftarPesan, sedangMemuat]);

  const handleKirimChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputTeks.trim()) return;

    const pesanUser = inputTeks;
    setDaftarPesan((prev) => [...prev, { id: Date.now(), pengirim: 'user', teks: pesanUser }]);
    setInputTeks('');
    setSedangMemuat(true);

    setTimeout(() => {
      let jawabanAI = "Wah pertanyaan bagus, bro. Tapi otak gua masih simulasi frontend nih. Nanti kalau backend Python FastAPI temen lu udah connect, gua bakal jawab otomatis pake Lightweight LLM secara cerdas!";

      const teksNormal = pesanUser.toLowerCase();
      if (teksNormal.includes('oli')) {
        jawabanAI = "Untuk motor matic Honda harian (Vario, Beat, Scoopy), sangat direkomendasikan pake oli resmi AHM Oil MPX2 (botol putih tuas biru) kapasitas 0.65L atau 0.8L tergantung spek mesinmu, bro!";
      } else if (teksNormal.includes('getar') || teksNormal.includes('greged')) {
        jawabanAI = "Masalah greged/getar di tarikan awal matic Honda biasanya karena mangkok kopling dan kampas ganda di dalam CVT kotor kena debu. Solusinya cukup servis CVT dan dibersihkan di AHASS terdekat, bro.";
      }

      setDaftarPesan((prev) => [...prev, { id: Date.now() + 1, pengirim: 'ai', teks: jawabanAI }]);
      setSedangMemuat(false);
    }, 1200);
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999, fontFamily: 'sans-serif' }}>
      
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#d32f2f',
            color: '#fff',
            border: 'none',
            fontSize: '28px',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(211, 47, 47, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          🤖
        </button>
      )}

      {isOpen && (
        <div style={{
          width: '360px',
          height: '480px',
          backgroundColor: '#fff',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid #e0e0e0'
        }}>
          
          <div style={{ backgroundColor: '#d32f2f', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '22px' }}>🤖</span>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Mekanik AI Honda</div>
                <div style={{ fontSize: '11px', color: '#ffcdd2' }}>● Siap Bantu 24/7</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ backgroundColor: 'transparent', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
          </div>

          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', backgroundColor: '#f9f9f9', display: 'block' }}>
            {daftarPesan.map((pesan) => (
              <div key={pesan.id} style={{ textAlign: pesan.pengirim === 'user' ? 'right' : 'left', marginBottom: '12px' }}>
                <div style={{
                  display: 'inline-block',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  lineHeight: '1.4',
                  maxWidth: '80%',
                  wordBreak: 'break-word',
                  backgroundColor: pesan.pengirim === 'user' ? '#d32f2f' : '#fff',
                  color: pesan.pengirim === 'user' ? '#fff' : '#333',
                  border: pesan.pengirim === 'user' ? 'none' : '1px solid #e0e0e0',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  textAlign: 'left'
                }}>
                  {pesan.teks}
                </div>
              </div>
            ))}

            {sedangMemuat && (
              <div style={{ textAlign: 'left', marginBottom: '12px' }}>
                <div style={{ display: 'inline-block', padding: '10px 14px', borderRadius: '12px', backgroundColor: '#fff', border: '1px solid #e0e0e0', color: '#777', fontSize: '12px' }}>
                  Mekanik AI sedang menganalisis... 🛠️
                </div>
              </div>
            )}
            <div ref={batasPesanRef} />
          </div>

          <form onSubmit={handleKirimChat} style={{ display: 'flex', padding: '12px', borderTop: '1px solid #eee', backgroundColor: '#fff' }}>
            <input 
              type="text" 
              placeholder="Tanyakan masalah motormu..." 
              value={inputTeks}
              onChange={(e) => setInputTeks(e.target.value)}
              style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none', fontSize: '13px' }}
            />
            <button type="submit" style={{ marginLeft: '8px', backgroundColor: '#d32f2f', color: '#fff', border: 'none', padding: '0 15px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>Kirim</button>
          </form>

        </div>
      )}
    </div>
  );
}