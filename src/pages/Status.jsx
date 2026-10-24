// File: src/pages/Status.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function Status() {
  // 1. Lacak status login yang dihubungkan dengan custom event
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    window.addEventListener("storage", checkLoginStatus);
    window.addEventListener("authChange", checkLoginStatus);
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("authChange", checkLoginStatus);
    };
  }, []);

  return (
    <div className="min-h-screen bg-grey-light flex flex-col">
      <Navbar />

      <main className="grow flex flex-col items-center pt-32 px-4 py-12">
        {!isLoggedIn ? (
          // ---------------------------------------------------
          // TAMPILAN BELUM LOGIN (Desain Sesuai Screenshot)
          // ---------------------------------------------------
          <div className="flex flex-col items-center justify-center text-center max-w-md w-full my-auto h-full">
            {/* Ilustrasi Gembok dan Dokumen */}
            <div className="relative mb-8 flex justify-center items-center h-32 w-40">
              <div className="w-32 h-32 bg-[#F0FDF4] rounded-full absolute z-0"></div>

              {/* Dokumen Icon */}
              <div className="relative z-10 bg-white shadow-sm border border-grey-1 rounded-xl p-4 w-28 h-24 transform -rotate-6 flex flex-col gap-2.5 mr-6">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-grey-1 rounded-sm"></div>
                  <div className="h-2.5 w-14 bg-grey-1/50 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-grey-1 rounded-sm"></div>
                  <div className="h-2.5 w-10 bg-grey-1/50 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-grey-1 rounded-sm"></div>
                  <div className="h-2.5 w-12 bg-grey-1/50 rounded-full"></div>
                </div>
              </div>

              {/* Gembok Icon Bulat */}
              <div className="absolute right-0 bottom-2 z-20 w-12 h-12 bg-green rounded-full flex items-center justify-center shadow-lg border-4 border-[#F0FDF4]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>

              {/* Sparkles */}
              <div className="absolute top-2 right-4 text-green/40">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <line x1="12" y1="2" x2="12" y2="6"></line>
                  <line x1="20" y1="10" x2="16" y2="10"></line>
                  <line x1="18" y1="4" x2="15" y2="7"></line>
                </svg>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-black mb-3 leading-snug">
              Masuk dulu untuk melihat <br /> status laporan Anda
            </h1>
            <p className="text-grey-2 text-sm mb-6 leading-relaxed">
              Login terlebih dahulu untuk mengakses dan memantau laporan
              kerusakan jalan yang Anda kirim.
            </p>
            <Link
              to="/login"
              className="px-6 py-2.5 bg-green text-white rounded-lg font-bold hover:opacity-90 flex items-center gap-2 transition-opacity shadow-sm"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Masuk
            </Link>
          </div>
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
