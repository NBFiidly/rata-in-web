// File: src/pages/Home.jsx
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar />

      <main className="max-w-6xl w-full mx-auto px-4 py-12 md:py-16 flex flex-col items-start text-left">
        {/* --- SECTION 1: Hero Banner (Rata Kiri dengan Font Semula) --- */}
        <section className="w-full flex flex-col items-start text-left mb-16">
          <span className="text-green font-bold text-sm md:text-base mb-3">
            Sustainable Cities & Communities
          </span>

          <h1 className="text-3xl md:text-5xl font-bold text-black leading-tight mb-4">
            Laporkan Jalan Rusak,
            <br />
            <span className="text-green">Bangun Jalan</span> Lebih Aman
          </h1>

          <p className="text-grey-2 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
            Gunakan teknologi AI Computer Vision untuk mendeteksi tingkat
            kerusakan jalan dan membantu mempercepat proses perbaikan.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
              to="/report"
              className="px-6 py-3.5 bg-green text-white rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Laporkan Sekarang
            </Link>

            <Link
              to="/peta"
              className="px-6 py-3.5 border border-grey-1 bg-white text-black rounded-xl font-semibold hover:bg-grey-light transition-colors flex items-center justify-center gap-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
              Lihat Peta Kerusakan
            </Link>
          </div>
        </section>

        {/* --- SECTION 2: 3 Kartu Fitur Utama --- */}
        <section className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl border border-grey-1 bg-white flex flex-col items-start text-left gap-3">
            <div className="w-12 h-12 rounded-xl bg-soft-green flex items-center justify-center text-green">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-green bg-soft-green px-2 py-0.5 rounded">
                01
              </span>
              <h3 className="font-bold text-black text-base">Upload Foto</h3>
            </div>
            <p className="text-grey-2 text-sm leading-relaxed">
              Laporkan kondisi jalan dengan mudah hanya dengan satu foto dari
              smartphone Anda.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl border border-grey-1 bg-white flex flex-col items-start text-left gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#FEF3C7] flex items-center justify-center text-[#D97706]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded">
                02
              </span>
              <h3 className="font-bold text-black text-base">AI Analisis</h3>
            </div>
            <p className="text-grey-2 text-sm leading-relaxed">
              Sistem mendeteksi jenis dan tingkat kerusakan secara otomatis.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl border border-grey-1 bg-white flex flex-col items-start text-left gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#FCECEC] flex items-center justify-center text-red">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-red bg-[#FCECEC] px-2 py-0.5 rounded">
                03
              </span>
              <h3 className="font-bold text-black text-base">
                Prioritas Perbaikan
              </h3>
            </div>
            <p className="text-grey-2 text-sm leading-relaxed">
              Laporan membantu pemerintah menentukan jalan mana yang harus
              diperbaiki lebih dulu.
            </p>
          </div>
        </section>

        {/* --- SECTION 3: Cara Kerja Rata.in --- */}
        <section className="w-full bg-gradient-to-tr from-[#207E43] via-green to-[#208144] text-white p-8 md:p-12 rounded-2xl flex flex-col items-start text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Cara Kerja Rata.in
          </h2>
          <p className="text-white/80 text-sm md:text-base mb-10">
            Proses pelaporan yang cepat dan otomatis dengan teknologi AI
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg mb-3">
                1
              </div>
              <h4 className="font-bold text-sm mb-1">Foto Jalan rusak</h4>
              <p className="text-white/80 text-xs">
                Ambil foto dari kamera atau galeri
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg mb-3">
                2
              </div>
              <h4 className="font-bold text-sm mb-1">Masukkan Lokasi</h4>
              <p className="text-white/80 text-xs">
                Masukkan lokasi jalan rusak
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg mb-3">
                3
              </div>
              <h4 className="font-bold text-sm mb-1">AI Analisis</h4>
              <p className="text-white/80 text-xs">
                Computer Vision mendeteksi kerusakan
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg mb-3">
                4
              </div>
              <h4 className="font-bold text-sm mb-1">Laporan Terkirim</h4>
              <p className="text-white/80 text-xs">
                Pemerintah menerima laporan & memproses
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
