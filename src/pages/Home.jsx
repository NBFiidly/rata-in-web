import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Memanggil Navbar di bagian paling atas */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-16 flex flex-col items-center">
        {/* --- SECTION 1: Hero Banner --- */}
        <div className="text-center max-w-3xl flex flex-col items-center gap-5 mb-20">
          <span className="text-green font-semibold text-sm tracking-wide">
            Sustainable Cities & Communities
          </span>
          <h1 className="text-4xl md:text-[54px] font-bold text-black leading-tight">
            Laporkan Jalan Rusak,
            <br />
            <span className="text-green">Bangun Jalan</span> Lebih Aman
          </h1>
          <p className="text-grey-2 text-lg px-4 md:px-12 leading-relaxed">
            Gunakan teknologi AI Computer Vision untuk mendeteksi tingkat
            kerusakan jalan dan membantu mempercepat proses perbaikan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              to="/report"
              className="px-6 py-3.5 bg-green text-white rounded-lg font-medium hover:opacity-90 flex items-center justify-center gap-2"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Laporkan Sekarang
            </Link>
            <button className="px-6 py-3.5 border border-grey-1 text-black rounded-lg font-medium hover:bg-grey-light flex items-center justify-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Lihat Peta Kerusakan
            </button>
          </div>
        </div>

        {/* --- SECTION 2: Tiga Kartu Fitur --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-20">
          {/* Card 1: Upload */}
          <div className="border border-grey-1 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-soft-green flex items-center justify-center mb-5 text-green">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <h3 className="font-semibold text-green flex items-center gap-2 mb-2">
              <span className="text-[10px] bg-soft-green px-2 py-0.5 rounded-full">
                01
              </span>{" "}
              Upload Foto
            </h3>
            <p className="text-grey-2 text-sm leading-relaxed">
              Laporkan kondisi jalan dengan mudah hanya dengan satu foto dari
              smartphone Anda.
            </p>
          </div>

          {/* Card 2: AI */}
          <div className="border border-grey-1 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-soft-orange flex items-center justify-center mb-5 text-orange">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M12 12 2.1 7.1" />
                <path d="M12 12l9.9 4.9" />
              </svg>
            </div>
            <h3 className="font-semibold text-orange flex items-center gap-2 mb-2">
              <span className="text-[10px] bg-soft-orange px-2 py-0.5 rounded-full">
                02
              </span>{" "}
              AI Analisis
            </h3>
            <p className="text-grey-2 text-sm leading-relaxed">
              Sistem mendeteksi jenis dan tingkat kerusakan secara otomatis.
            </p>
          </div>

          {/* Card 3: Prioritas */}
          <div className="border border-grey-1 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-soft-red flex items-center justify-center mb-5 text-red">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="font-semibold text-red flex items-center gap-2 mb-2">
              <span className="text-[10px] bg-soft-red px-2 py-0.5 rounded-full">
                03
              </span>{" "}
              Prioritas Perbaikan
            </h3>
            <p className="text-grey-2 text-sm leading-relaxed">
              Laporan membantu pemerintah menentukan jalan mana yang harus
              diperbaiki lebih dulu.
            </p>
          </div>
        </div>

        {/* --- SECTION 3: Cara Kerja (Blok Hijau) --- */}
        <div className="w-full bg-green rounded-3xl p-10 md:p-16 text-white flex flex-col shadow-lg">
          <h2 className="text-3xl font-bold mb-2">Cara Kerja Rata.in</h2>
          <p className="mb-12 text-white/90">
            Proses pelaporan yang cepat dan otomatis dengan teknologi AI
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl border border-white/30 shadow-inner">
                1
              </div>
              <h4 className="font-semibold text-lg">Foto Jalan rusak</h4>
              <p className="text-sm text-white/80 px-2">
                Ambil foto dari kamera atau galeri
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl border border-white/30 shadow-inner">
                2
              </div>
              <h4 className="font-semibold text-lg">Masukkan Lokasi</h4>
              <p className="text-sm text-white/80 px-2">
                Masukkan lokasi jalan rusak
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl border border-white/30 shadow-inner">
                3
              </div>
              <h4 className="font-semibold text-lg">AI Analisis</h4>
              <p className="text-sm text-white/80 px-2">
                Computer Vision mendeteksi kerusakan
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl border border-white/30 shadow-inner">
                4
              </div>
              <h4 className="font-semibold text-lg">Laporan Terkirim</h4>
              <p className="text-sm text-white/80 px-2">
                Pemerintah menerima laporan & memproses
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
