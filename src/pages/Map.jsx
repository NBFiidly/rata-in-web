// File: src/pages/Map.jsx
import Navbar from "../components/layout/Navbar";

const pins = [
  { top: "48%", left: "53%", color: "var(--color-red)" },
  { top: "52%", left: "33%", color: "var(--color-green)" },
  { top: "68%", left: "61%", color: "var(--color-red)" },
  { top: "80%", left: "52%", color: "var(--color-orange)" },
  { top: "55%", left: "73%", color: "var(--color-green)" },
];

const MapView = ({ className }) => (
  <div className={`relative overflow-hidden ${className}`}>
    {/* PERBAIKAN: Menghapus kelas 'grayscale' agar warna peta Google kembali normal */}
    <iframe
      src="https://maps.google.com/maps?q=1.1275,104.0565&z=14&output=embed"
      className="w-full h-full border-0 opacity-90"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>

    {pins.map((pin, i) => (
      <div
        key={i}
        className="absolute -translate-x-1/2 -translate-y-full pointer-events-none drop-shadow-md hover:scale-110 transition-transform cursor-pointer"
        style={{ top: pin.top, left: pin.left }}
      >
        <svg width="40" height="52" viewBox="0 0 32 42" fill="none">
          <path
            d="M16 0C7.163 0 0 7.163 0 16C0 27 16 42 16 42C16 42 32 27 32 16C32 7.163 24.837 0 16 0Z"
            fill={pin.color}
          />
          <path d="M14.5 9h3v8h-3V9zm0 11h3v3h-3v-3z" fill="white" />
        </svg>
      </div>
    ))}
  </div>
);

export default function Map() {
  const locations = [
    { title: "Jl. Engku Putri", desc: "Lubang Berat", color: "bg-red" },
    { title: "Jl. Ahmad Yani", desc: "Retak Sedang", color: "bg-orange" },
    { title: "Jl. Raja Isa", desc: "Retak Kecil", color: "bg-green" },
    { title: "Jl. Sanggam Bertuah", desc: "Lubang Berat", color: "bg-red" },
    { title: "Jl. Gajah Mada", desc: "Aspal Terkelupas", color: "bg-orange" },
    { title: "Jl. Yos Sudarso", desc: "Retak Kecil", color: "bg-green" },
    { title: "Jl. Trans Barelang", desc: "Lubang Berat", color: "bg-red" },
    { title: "Jl. Sudirman", desc: "Retak Sedang", color: "bg-orange" },
    { title: "Jl. Laksamana Bintan", desc: "Retak Kecil", color: "bg-green" },
  ];

  return (
    <div className="h-dvh md:h-screen w-full bg-grey-light flex flex-col font-inter overflow-hidden">
      <Navbar />

      <main className="mobile-route-scroll flex-1 w-full pt-2 md:pt-20 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
        <aside className="w-full md:w-80 lg:w-100 h-auto md:h-full bg-grey-light border-r border-grey overflow-visible md:overflow-y-auto shrink-0 hide-scrollbar z-10 flex flex-col pb-10 md:pb-0">
          {/* STATISTIK */}
          <div className="p-4 md:p-6 flex flex-col gap-4 md:gap-6 shrink-0">
            <h1 className="text-[20px] md:text-[22px] font-bold text-black text-center md:text-left">
              Statistik Kerusakan
            </h1>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center p-4 rounded-xl border border-grey bg-white shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-grey-2 mb-1 font-medium">
                    Total Laporan
                  </span>
                  <span className="text-[28px] font-bold text-black leading-none">
                    30
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-grey-light text-grey-2 border border-grey/50 flex items-center justify-center">
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

              <div className="flex justify-between items-center p-4 rounded-xl bg-soft-red border border-red/30 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-red mb-1 font-medium">
                    Kerusakan Berat
                  </span>
                  <span className="text-[28px] font-bold text-red leading-none">
                    17
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/60 text-red flex items-center justify-center">
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

              <div className="flex justify-between items-center p-4 rounded-xl bg-soft-orange border border-orange/30 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-orange mb-1 font-medium">
                    Sedang diperbaiki
                  </span>
                  <span className="text-[28px] font-bold text-orange leading-none">
                    10
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/60 text-orange flex items-center justify-center">
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

              <div className="flex justify-between items-center p-4 rounded-xl bg-soft-green border border-green/30 shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs text-green mb-1 font-medium">
                    Selesai diperbaiki
                  </span>
                  <span className="text-[28px] font-bold text-green leading-none">
                    20
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/60 text-green flex items-center justify-center">
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
          </div>

          {/* AREA PETA KHUSUS MOBILE */}
          <MapView className="w-full h-80 md:hidden block shrink-0 border-y border-grey" />

          {/* DAFTAR LOKASI */}
          <div className="p-4 md:p-6 pt-5 md:pt-0 pb-0 md:pb-0 shrink-0">
            <h2 className="text-[12px] font-bold text-grey-2 uppercase tracking-wider mb-4 text-center md:text-left">
              LOKASI KERUSAKAN
            </h2>
            <div className="flex flex-col gap-3 pb-0 md:pb-8">
              {locations.map((loc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl border border-grey bg-white shadow-sm hover:border-green/50 transition-colors cursor-pointer"
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full ${loc.color} shrink-0`}
                  ></div>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-black leading-tight mb-0.5">
                      {loc.title}
                    </span>
                    <span className="text-[13px] text-grey-2">{loc.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* AREA PETA KHUSUS DESKTOP */}
        <MapView className="flex-1 h-full bg-grey-light hidden md:block" />
      </main>
    </div>
  );
}
