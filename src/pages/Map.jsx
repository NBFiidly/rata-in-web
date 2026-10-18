// File: src/pages/Map.jsx
import Navbar from "../components/layout/Navbar";

export default function Map() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-hidden">
      <Navbar />

      <main className="flex-1 flex flex-col md:flex-row w-full border-t border-grey-1 h-[calc(100vh-70px)]">
        {/* --- PANEL KIRI (Statistik & Daftar Lokasi) --- */}
        <aside className="w-full md:w-[380px] bg-white border-r border-grey-1 flex flex-col h-full overflow-y-auto custom-scrollbar z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div className="p-6">
            <h1 className="text-[22px] font-bold text-black mb-6">
              Statistik Kerusakan
            </h1>

            {/* --- 4 Kartu Statistik --- */}
            <div className="flex flex-col gap-4 mb-8">
              {/* Card 1: Total Laporan */}
              <div className="flex justify-between items-center p-4 rounded-2xl border border-grey-1 shadow-sm bg-white">
                <div className="flex flex-col">
                  <span className="text-xs text-grey-2 mb-1">
                    Total Laporan
                  </span>
                  <span className="text-[28px] font-bold text-black leading-none">
                    30
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
              </div>

              {/* Card 2: Kerusakan Berat */}
              <div className="flex justify-between items-center p-4 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5]/50 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-[#EF4444] mb-1">
                    Kerusakan Berat
                  </span>
                  <span className="text-[28px] font-bold text-[#EF4444] leading-none">
                    17
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#EF4444]/10 text-[#EF4444] flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
              </div>

              {/* Card 3: Sedang diperbaiki */}
              <div className="flex justify-between items-center p-4 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74]/50 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-[#F97316] mb-1">
                    Sedang diperbaiki
                  </span>
                  <span className="text-[28px] font-bold text-[#F97316] leading-none">
                    10
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#F97316]/10 text-[#F97316] flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
              </div>

              {/* Card 4: Selesai diperbaiki */}
              <div className="flex justify-between items-center p-4 rounded-2xl bg-[#F0FDF4] border border-[#86EFAC]/50 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-[#22C55E] mb-1">
                    Selesai diperbaiki
                  </span>
                  <span className="text-[28px] font-bold text-[#22C55E] leading-none">
                    20
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
              </div>
            </div>

            {/* --- Daftar Lokasi Kerusakan --- */}
            <h2 className="text-[11px] font-bold text-grey-2 uppercase tracking-wider mb-4">
              Lokasi Kerusakan
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-grey-1 hover:bg-grey-light transition-colors cursor-pointer shadow-sm">
                <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444] self-center flex-shrink-0"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-black leading-none mb-1">
                    Jl. Engku Putri
                  </span>
                  <span className="text-xs text-grey-2">Lubang Berat</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-grey-1 hover:bg-grey-light transition-colors cursor-pointer shadow-sm">
                <div className="w-3.5 h-3.5 rounded-full bg-[#F97316] self-center flex-shrink-0"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-black leading-none mb-1">
                    Jl. Ahmad Yani
                  </span>
                  <span className="text-xs text-grey-2">Retak Sedang</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-grey-1 hover:bg-grey-light transition-colors cursor-pointer shadow-sm">
                <div className="w-3.5 h-3.5 rounded-full bg-[#22C55E] self-center flex-shrink-0"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-black leading-none mb-1">
                    Jl. Raja Isa
                  </span>
                  <span className="text-xs text-grey-2">Retak Kecil</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-grey-1 hover:bg-grey-light transition-colors cursor-pointer shadow-sm">
                <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444] self-center flex-shrink-0"></div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-black leading-none mb-1">
                    Jl. Sanggam Bertuah
                  </span>
                  <span className="text-xs text-grey-2">Lubang Berat</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* --- AREA PETA (Kanan) --- */}
        <section className="flex-1 bg-[#E2E8F0] relative overflow-hidden">
          {/* Untuk saat ini, kita gunakan Google Maps Iframe statis di Batam sebagai peta *placeholder*.
              Nantinya bisa diganti dengan library interaktif seperti LeafletJS (react-leaflet) jika ingin menaruh marker kustom */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.87100418571!2d103.95759714499879!3d1.1119561081308362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d9890538a1923d%3A0xc3f345eb13ec551c!2sBatam%20City%2C%20Riau%20Islands!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
            className="w-full h-full border-0 grayscale-[30%] opacity-90 mix-blend-multiply"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Overlay gradien biru laut ringan agar peta terlihat lebih lembut seperti di Figma */}
          <div className="absolute inset-0 bg-blue-100/10 pointer-events-none"></div>

          {/* Simulasi Pin / Marker Buatan seperti di desain */}
          {/* Pin Merah Tengah */}
          <div className="absolute top-[55%] left-[45%] -translate-x-1/2 -translate-y-full pointer-events-none drop-shadow-md">
            <svg
              width="32"
              height="42"
              viewBox="0 0 32 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 0C7.163 0 0 7.163 0 16C0 27 16 42 16 42C16 42 32 27 32 16C32 7.163 24.837 0 16 0Z"
                fill="#EF4444"
              />
              <path d="M14.5 9h3v8h-3V9zm0 11h3v3h-3v-3z" fill="white" />
            </svg>
          </div>

          {/* Pin Orange Bawah */}
          <div className="absolute top-[80%] left-[50%] -translate-x-1/2 -translate-y-full pointer-events-none drop-shadow-md">
            <svg
              width="32"
              height="42"
              viewBox="0 0 32 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 0C7.163 0 0 7.163 0 16C0 27 16 42 16 42C16 42 32 27 32 16C32 7.163 24.837 0 16 0Z"
                fill="#F97316"
              />
              <path d="M14.5 9h3v8h-3V9zm0 11h3v3h-3v-3z" fill="white" />
            </svg>
          </div>

          {/* Pin Hijau Kiri */}
          <div className="absolute top-[65%] left-[25%] -translate-x-1/2 -translate-y-full pointer-events-none drop-shadow-md">
            <svg
              width="32"
              height="42"
              viewBox="0 0 32 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 0C7.163 0 0 7.163 0 16C0 27 16 42 16 42C16 42 32 27 32 16C32 7.163 24.837 0 16 0Z"
                fill="#22C55E"
              />
              <path d="M14.5 9h3v8h-3V9zm0 11h3v3h-3v-3z" fill="white" />
            </svg>
          </div>

          {/* Pin Hijau Kanan */}
          <div className="absolute top-[58%] left-[75%] -translate-x-1/2 -translate-y-full pointer-events-none drop-shadow-md">
            <svg
              width="32"
              height="42"
              viewBox="0 0 32 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 0C7.163 0 0 7.163 0 16C0 27 16 42 16 42C16 42 32 27 32 16C32 7.163 24.837 0 16 0Z"
                fill="#22C55E"
              />
              <path d="M14.5 9h3v8h-3V9zm0 11h3v3h-3v-3z" fill="white" />
            </svg>
          </div>

          {/* Pin Merah Kanan Bawah */}
          <div className="absolute top-[85%] left-[65%] -translate-x-1/2 -translate-y-full pointer-events-none drop-shadow-md">
            <svg
              width="32"
              height="42"
              viewBox="0 0 32 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 0C7.163 0 0 7.163 0 16C0 27 16 42 16 42C16 42 32 27 32 16C32 7.163 24.837 0 16 0Z"
                fill="#EF4444"
              />
              <path d="M14.5 9h3v8h-3V9zm0 11h3v3h-3v-3z" fill="white" />
            </svg>
          </div>
        </section>
      </main>
    </div>
  );
}
