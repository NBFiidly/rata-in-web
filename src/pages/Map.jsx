// File: src/pages/Map.jsx
import Navbar from "../components/layout/Navbar";

export default function Map() {
  return (
    // Struktur luar dikunci sebesar layar (h-screen) dan sisa konten disembunyikan (overflow-hidden)
    <div className="h-screen w-full bg-[#F8FAFC] flex flex-col font-sans overflow-hidden">
      <Navbar />

      {/* Main container diberikan overflow-hidden agar sidebar di dalamnya yang melakukan scroll */}
      <main className="flex-1 w-full pt-[72px] flex flex-col md:flex-row overflow-hidden">
        {/* --- PANEL KIRI (Statistik & Daftar Lokasi) --- */}
        <aside className="w-full md:w-80 lg:w-[400px] h-full bg-[#F8FAFC] border-r border-[#E2E8F0] overflow-y-auto flex-shrink-0 custom-scrollbar z-10">
          <div className="p-6 flex flex-col gap-6">
            <h1 className="text-[22px] font-bold text-[#1E293B]">
              Statistik Kerusakan
            </h1>

            {/* --- 4 Kartu Statistik --- */}
            <div className="flex flex-col gap-3">
              {/* Card 1: Total Laporan */}
              <div className="flex justify-between items-center p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-[#64748B] mb-1 font-medium">
                    Total Laporan
                  </span>
                  <span className="text-[28px] font-bold text-[#1E293B] leading-none">
                    30
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#3B82F6] flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                </div>
              </div>

              {/* Card 2: Kerusakan Berat */}
              <div className="flex justify-between items-center p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-[#EF4444] mb-1 font-medium">
                    Kerusakan Berat
                  </span>
                  <span className="text-[28px] font-bold text-[#EF4444] leading-none">
                    17
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
              </div>

              {/* Card 3: Sedang diperbaiki */}
              <div className="flex justify-between items-center p-4 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-[#F97316] mb-1 font-medium">
                    Sedang diperbaiki
                  </span>
                  <span className="text-[28px] font-bold text-[#F97316] leading-none">
                    10
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#FFEDD5] text-[#F97316] flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
              </div>

              {/* Card 4: Selesai diperbaiki */}
              <div className="flex justify-between items-center p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-[#22C55E] mb-1 font-medium">
                    Selesai diperbaiki
                  </span>
                  <span className="text-[28px] font-bold text-[#22C55E] leading-none">
                    20
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#22C55E] flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            {/* --- Daftar Lokasi Kerusakan --- */}
            <div>
              <h2 className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider mb-4">
                LOKASI KERUSAKAN
              </h2>
              <div className="flex flex-col gap-3 pb-8">
                {/* Item 1: Engku Putri */}
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-sm hover:border-[#CBD5E1] transition-colors cursor-pointer">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444] shrink-0"></div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#1E293B] leading-tight mb-0.5">
                      Jl. Engku Putri
                    </span>
                    <span className="text-[13px] text-[#64748B]">
                      Lubang Berat
                    </span>
                  </div>
                </div>

                {/* Item 2: Ahmad Yani */}
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-sm hover:border-[#CBD5E1] transition-colors cursor-pointer">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#F97316] shrink-0"></div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#1E293B] leading-tight mb-0.5">
                      Jl. Ahmad Yani
                    </span>
                    <span className="text-[13px] text-[#64748B]">
                      Retak Sedang
                    </span>
                  </div>
                </div>

                {/* Item 3: Raja Isa */}
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-sm hover:border-[#CBD5E1] transition-colors cursor-pointer">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#22C55E] shrink-0"></div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#1E293B] leading-tight mb-0.5">
                      Jl. Raja Isa
                    </span>
                    <span className="text-[13px] text-[#64748B]">
                      Retak Kecil
                    </span>
                  </div>
                </div>

                {/* Item 4: Sanggam Bertuah */}
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-sm hover:border-[#CBD5E1] transition-colors cursor-pointer">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444] shrink-0"></div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#1E293B] leading-tight mb-0.5">
                      Jl. Sanggam Bertuah
                    </span>
                    <span className="text-[13px] text-[#64748B]">
                      Lubang Berat
                    </span>
                  </div>
                </div>

                {/* Item 5: Gajah Mada */}
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-sm hover:border-[#CBD5E1] transition-colors cursor-pointer">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#F97316] shrink-0"></div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#1E293B] leading-tight mb-0.5">
                      Jl. Gajah Mada
                    </span>
                    <span className="text-[13px] text-[#64748B]">
                      Aspal Terkelupas
                    </span>
                  </div>
                </div>

                {/* Item 6: Yos Sudarso */}
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-sm hover:border-[#CBD5E1] transition-colors cursor-pointer">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#22C55E] shrink-0"></div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#1E293B] leading-tight mb-0.5">
                      Jl. Yos Sudarso
                    </span>
                    <span className="text-[13px] text-[#64748B]">
                      Retak Kecil
                    </span>
                  </div>
                </div>

                {/* Item 7: Trans Barelang */}
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-sm hover:border-[#CBD5E1] transition-colors cursor-pointer">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444] shrink-0"></div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#1E293B] leading-tight mb-0.5">
                      Jl. Trans Barelang
                    </span>
                    <span className="text-[13px] text-[#64748B]">
                      Lubang Berat
                    </span>
                  </div>
                </div>

                {/* Item Tambahan Ekstra agar Sidebar Mantap di Scroll */}
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-sm hover:border-[#CBD5E1] transition-colors cursor-pointer">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#F97316] shrink-0"></div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#1E293B] leading-tight mb-0.5">
                      Jl. Sudirman
                    </span>
                    <span className="text-[13px] text-[#64748B]">
                      Retak Sedang
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl border border-[#E2E8F0] bg-white shadow-sm hover:border-[#CBD5E1] transition-colors cursor-pointer">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#22C55E] shrink-0"></div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#1E293B] leading-tight mb-0.5">
                      Jl. Laksamana Bintan
                    </span>
                    <span className="text-[13px] text-[#64748B]">
                      Retak Kecil
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* --- AREA PETA (Kanan) --- */}
        <section className="flex-1 h-full bg-[#E2E8F0] relative overflow-hidden">
          {/* Peta Google Maps difokuskan di koordinat Batam Center agar jalan-jalan sesuai muncul */}
          <iframe
            src="https://maps.google.com/maps?q=1.1275,104.0565&z=14&output=embed"
            className="w-full h-full border-0 grayscale-[10%] opacity-90"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Overlay gradien tipis */}
          <div className="absolute inset-0 bg-[#E8F5E9]/10 pointer-events-none mix-blend-multiply"></div>

          {/* SIMULASI PIN / MARKER KERUSAKAN DI BERBAGAI AREA BATAM */}

          {/* Pin 1 (Merah): Kiri Tengah (Dekat Jl. Engku Putri) */}
          <div className="absolute top-[48%] left-[53%] -translate-x-1/2 -translate-y-full pointer-events-none drop-shadow-md hover:scale-110 transition-transform cursor-pointer">
            <svg width="40" height="52" viewBox="0 0 32 42" fill="none">
              <path
                d="M16 0C7.163 0 0 7.163 0 16C0 27 16 42 16 42C16 42 32 27 32 16C32 7.163 24.837 0 16 0Z"
                fill="#EF4444"
              />
              <path d="M14.5 9h3v8h-3V9zm0 11h3v3h-3v-3z" fill="white" />
            </svg>
          </div>

          {/* Pin 2 (Hijau): Kiri Jauh */}
          <div className="absolute top-[52%] left-[33%] -translate-x-1/2 -translate-y-full pointer-events-none drop-shadow-md hover:scale-110 transition-transform cursor-pointer">
            <svg width="40" height="52" viewBox="0 0 32 42" fill="none">
              <path
                d="M16 0C7.163 0 0 7.163 0 16C0 27 16 42 16 42C16 42 32 27 32 16C32 7.163 24.837 0 16 0Z"
                fill="#22C55E"
              />
              <path d="M14.5 9h3v8h-3V9zm0 11h3v3h-3v-3z" fill="white" />
            </svg>
          </div>

          {/* Pin 3 (Merah): Kanan Bawah Tengah (Dekat Jl. Sanggam Bertuah) */}
          <div className="absolute top-[68%] left-[61%] -translate-x-1/2 -translate-y-full pointer-events-none drop-shadow-md hover:scale-110 transition-transform cursor-pointer">
            <svg width="40" height="52" viewBox="0 0 32 42" fill="none">
              <path
                d="M16 0C7.163 0 0 7.163 0 16C0 27 16 42 16 42C16 42 32 27 32 16C32 7.163 24.837 0 16 0Z"
                fill="#EF4444"
              />
              <path d="M14.5 9h3v8h-3V9zm0 11h3v3h-3v-3z" fill="white" />
            </svg>
          </div>

          {/* Pin 4 (Orange): Bawah Tengah (Dekat Jl. Ahmad Yani) */}
          <div className="absolute top-[80%] left-[52%] -translate-x-1/2 -translate-y-full pointer-events-none drop-shadow-md hover:scale-110 transition-transform cursor-pointer">
            <svg width="40" height="52" viewBox="0 0 32 42" fill="none">
              <path
                d="M16 0C7.163 0 0 7.163 0 16C0 27 16 42 16 42C16 42 32 27 32 16C32 7.163 24.837 0 16 0Z"
                fill="#F97316"
              />
              <path d="M14.5 9h3v8h-3V9zm0 11h3v3h-3v-3z" fill="white" />
            </svg>
          </div>

          {/* Pin 5 (Hijau): Kanan Atas (Dekat Jl. Raja Isa) */}
          <div className="absolute top-[55%] left-[73%] -translate-x-1/2 -translate-y-full pointer-events-none drop-shadow-md hover:scale-110 transition-transform cursor-pointer">
            <svg width="40" height="52" viewBox="0 0 32 42" fill="none">
              <path
                d="M16 0C7.163 0 0 7.163 0 16C0 27 16 42 16 42C16 42 32 27 32 16C32 7.163 24.837 0 16 0Z"
                fill="#22C55E"
              />
              <path d="M14.5 9h3v8h-3V9zm0 11h3v3h-3v-3z" fill="white" />
            </svg>
          </div>
        </section>
      </main>
    </div>
  );
}
