// File: src/pages/Map.jsx
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Map() {
  return (
    <div className="min-h-screen bg-grey-light flex flex-col justify-between">
      <Navbar />

      <main className="grow max-w-7xl w-full mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        {/* Panel Statistik Sebaran Laporan (Sisi Kiri) */}
        <div className="w-full md:w-80 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-2xl border border-grey-1 shadow-sm">
            <h2 className="text-xl font-bold text-black mb-1">
              Peta Kerusakan
            </h2>
            <p className="text-grey-2 text-sm mb-6">
              Sebaran lokasi laporan jalan rusak yang terdeteksi di kota.
            </p>

            <div className="flex flex-col gap-3">
              <div className="p-3.5 bg-soft-green rounded-xl border border-green/30 flex justify-between items-center">
                <span className="text-sm font-semibold text-black">
                  Total Laporan
                </span>
                <span className="text-lg font-bold text-green">24</span>
              </div>
              <div className="p-3.5 bg-[#FCECEC] rounded-xl border border-[#EB8E8E] flex justify-between items-center">
                <span className="text-sm font-semibold text-black">
                  Rusak Berat
                </span>
                <span className="text-lg font-bold text-red">8</span>
              </div>
              <div className="p-3.5 bg-[#FEF3C7] rounded-xl border border-[#F59E0B]/30 flex justify-between items-center">
                <span className="text-sm font-semibold text-black">
                  Rusak Sedang
                </span>
                <span className="text-lg font-bold text-[#D97706]">11</span>
              </div>
            </div>
          </div>
        </div>

        {/* Area Peta Utama (Sisi Kanan) */}
        <div className="flex-1 bg-white rounded-2xl border border-grey-1 shadow-sm p-4 min-h-120 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-grey-1"></div>

          <div className="z-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-soft-green rounded-full flex items-center justify-center mb-3 text-green">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-black mb-1">
              Area Peta Interaktif
            </h3>
            <p className="text-grey-2 text-sm max-w-md">
              Di sini akan disematkan Leaflet JS / Google Maps untuk menampilkan
              pin titik kerusakan secara live.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
