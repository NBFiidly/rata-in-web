// File: src/pages/Status.jsx
import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";

export default function Status() {
  // Ubah menjadi true agar halaman menampilkan mode "Sudah Login"
  const isLoggedIn = true;

  return (
    <div className="min-h-screen bg-grey-light flex flex-col">
      <Navbar />

      <main className="grow flex flex-col items-center pt-32 px-4 py-12">
        {!isLoggedIn ? (
          // ... (Kode tampilan belum login biarkan saja seperti sebelumnya jika mau, atau hapus)
          <div>Belum login...</div>
        ) : (
          // ---------------------------------------------------
          // TAMPILAN SUDAH LOGIN (DAFTAR & STATUS LAPORAN)
          // ---------------------------------------------------
          <div className="w-full max-w-4xl flex flex-col gap-6">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">
                  Status Laporan Saya
                </h1>
                <p className="text-grey-2">
                  Pantau perkembangan perbaikan jalan yang Anda laporkan.
                </p>
              </div>
              <Link
                to="/report"
                className="hidden md:flex px-6 py-2.5 bg-green text-white rounded-lg font-semibold hover:opacity-90 items-center gap-2 transition-opacity"
              >
                + Lapor Baru
              </Link>
            </div>

            {/* Kartu Laporan 1 */}
            <div className="bg-white border border-grey-1 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8">
              {/* Info Laporan (Kiri) */}
              <div className="flex flex-col flex-1 gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-green bg-soft-green px-3 py-1 rounded-full uppercase tracking-wide">
                      Sedang Diproses
                    </span>
                    <h2 className="text-lg font-bold text-black mt-3">
                      Jl. Engku Putri, Batam Kota
                    </h2>
                    <p className="text-sm text-grey-2 mt-1">
                      ID: #RTN-2026-0003 • Dilaporkan 15 Okt 2026
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2 p-4 bg-grey-light rounded-xl border border-grey-1">
                  <div>
                    <p className="text-xs text-grey-2 mb-1">Jenis</p>
                    <p className="text-sm font-semibold text-black">
                      Lubang Jalan
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-grey-2 mb-1">Keparahan</p>
                    <p className="text-sm font-semibold text-red">
                      Berat (Tinggi)
                    </p>
                  </div>
                </div>
              </div>

              {/* Garis Pemisah Vertikal (Desktop) */}
              <div className="hidden md:block w-px bg-grey-1"></div>

              {/* Timeline Status (Kanan) */}
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-sm font-bold text-black mb-6">
                  Timeline Perbaikan:
                </h3>

                <div className="flex flex-col gap-6 relative">
                  {/* Garis konektor */}
                  <div className="absolute left-2.75 top-2 bottom-2 w-0.5 bg-grey-1 z-0"></div>

                  {/* Step 1: Laporan Diterima (Selesai) */}
                  <div className="flex gap-4 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-green flex items-center justify-center shrink-0 mt-0.5 border-4 border-white shadow-sm">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-black">
                        Laporan Diterima
                      </p>
                      <p className="text-xs text-grey-2 mt-0.5">
                        15 Okt 2026, 14:00 WIB
                      </p>
                    </div>
                  </div>

                  {/* Step 2: Verifikasi & Analisis (Selesai) */}
                  <div className="flex gap-4 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-green flex items-center justify-center shrink-0 mt-0.5 border-4 border-white shadow-sm">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-black">
                        Diverifikasi oleh Dinas
                      </p>
                      <p className="text-xs text-grey-2 mt-0.5">
                        16 Okt 2026, 09:30 WIB
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Dalam Perbaikan (Aktif) */}
                  <div className="flex gap-4 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-green flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <div className="w-2.5 h-2.5 bg-green rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-green">
                        Sedang Diperbaiki
                      </p>
                      <p className="text-xs text-grey-2 mt-0.5">
                        Tim teknis sedang di lokasi
                      </p>
                    </div>
                  </div>

                  {/* Step 4: Selesai (Belum) */}
                  <div className="flex gap-4 relative z-10">
                    <div className="w-6 h-6 rounded-full bg-grey-1 flex items-center justify-center shrink-0 mt-0.5 border-4 border-white shadow-sm"></div>
                    <div>
                      <p className="text-sm font-semibold text-grey-2">
                        Selesai
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
