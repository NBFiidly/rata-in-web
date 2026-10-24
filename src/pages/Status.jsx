// File: src/pages/Status.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function Status() {
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

  // Data Dummy untuk Laporan
  const [reports] = useState([
    {
      id: "RTN-2026-0003",
      kategori: "Lubang Berat",
      kategoriEn: "Road Pothole",
      lokasi: "Jl. Engku Putri",
      kota: "Batam",
      provinsi: "Kepulauan Riau",
      tanggal: "22 September 2026",
      keparahan: "Berat",
      progress: 60,
      activeStep: 2, // 0: Dikirim, 1: Analisis, 2: Diverifikasi, 3: Proses, 4: Selesai
      timeline: [
        {
          tahap: "Laporan Dikirim",
          desc: "Laporan berhasil masuk ke sistem",
          done: true,
        },
        {
          tahap: "Analisis AI",
          desc: "AI mendeteksi jenis dan tingkat kerusakan",
          done: true,
        },
        {
          tahap: "Diverifikasi",
          desc: "Tim Dinas memverifikasi laporan",
          done: true,
        },
        {
          tahap: "Proses Perbaikan",
          desc: "Jadwal perbaikan sudah ditetapkan",
          done: false,
        },
        {
          tahap: "Selesai",
          desc: "Jalan telah selesai diperbaiki",
          done: false,
        },
      ],
    },
    {
      id: "RTN-2026-0002",
      kategori: "Retak Sedang",
      kategoriEn: "Road Crack",
      lokasi: "Jl. Ahmad Yani",
      kota: "Batam",
      provinsi: "Kepulauan Riau",
      tanggal: "20 September 2026",
      keparahan: "Sedang",
      progress: 80,
      activeStep: 3,
      timeline: [
        {
          tahap: "Laporan Dikirim",
          desc: "Laporan berhasil masuk ke sistem",
          done: true,
        },
        {
          tahap: "Analisis AI",
          desc: "AI mendeteksi jenis dan tingkat kerusakan",
          done: true,
        },
        {
          tahap: "Diverifikasi",
          desc: "Tim Dinas memverifikasi laporan",
          done: true,
        },
        {
          tahap: "Proses Perbaikan",
          desc: "Jadwal perbaikan sudah ditetapkan",
          done: true,
        },
        {
          tahap: "Selesai",
          desc: "Jalan telah selesai diperbaiki",
          done: false,
        },
      ],
    },
    {
      id: "RTN-2026-0001",
      kategori: "Lubang Kecil",
      kategoriEn: "Minor Pothole",
      lokasi: "Jl. Raja Isa",
      kota: "Batam",
      provinsi: "Kepulauan Riau",
      tanggal: "10 September 2026",
      keparahan: "Ringan",
      progress: 100,
      activeStep: 4,
      timeline: [
        {
          tahap: "Laporan Dikirim",
          desc: "Laporan berhasil masuk ke sistem",
          done: true,
        },
        {
          tahap: "Analisis AI",
          desc: "AI mendeteksi jenis dan tingkat kerusakan",
          done: true,
        },
        {
          tahap: "Diverifikasi",
          desc: "Tim Dinas memverifikasi laporan",
          done: true,
        },
        {
          tahap: "Proses Perbaikan",
          desc: "Jadwal perbaikan sudah ditetapkan",
          done: true,
        },
        {
          tahap: "Selesai",
          desc: "Jalan telah selesai diperbaiki",
          done: true,
        },
      ],
    },
  ]);

  const [selectedReport, setSelectedReport] = useState(reports[0]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <main className="grow flex flex-col items-center pt-[104px] px-4 pb-12 w-full max-w-7xl mx-auto">
        {!isLoggedIn ? (
          // ==================== TAMPILAN BELUM LOGIN ====================
          <div className="flex flex-col items-center justify-center text-center max-w-md w-full my-auto h-full">
            <div className="relative mb-8 flex justify-center items-center h-32 w-40">
              <div className="w-32 h-32 bg-[#F0FDF4] rounded-full absolute z-0"></div>
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
              </svg>{" "}
              Masuk
            </Link>
          </div>
        ) : (
          // ==================== TAMPILAN SUDAH LOGIN ====================
          <div className="w-full flex flex-col gap-6">
            {/* Header */}
            <div className="text-left w-full">
              <h1 className="text-[28px] font-bold text-[#1E293B] mb-1">
                Status Laporan Saya
              </h1>
              <p className="text-[#64748B] text-base">
                Pantau perkembangan laporan kerusakan yang Anda kirim.
              </p>
            </div>

            {/* Pencarian & Statistik */}
            <div className="flex flex-col w-full gap-4">
              {/* Search Bar */}
              <div className="relative w-full max-w-[600px]">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Cari laporan berdasarkan ID atau nama jalan..."
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* 3 Kartu Statistik */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-sm">
                  <span className="text-[32px] font-bold text-[#1E293B] leading-none mb-1">
                    3
                  </span>
                  <span className="text-sm text-[#64748B] font-medium">
                    Total Laporan
                  </span>
                </div>
                <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-sm">
                  <span className="text-[32px] font-bold text-[#EA580C] leading-none mb-1">
                    2
                  </span>
                  <span className="text-sm text-[#9A3412] font-medium">
                    Dalam Laporan
                  </span>
                </div>
                <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-sm">
                  <span className="text-[32px] font-bold text-[#16A34A] leading-none mb-1">
                    1
                  </span>
                  <span className="text-sm text-[#166534] font-medium">
                    Selesai
                  </span>
                </div>
              </div>
            </div>

            {/* Layout Utama: Daftar Kiri (Grid 8) + Detail Kanan (Grid 4) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
              {/* KOLOM KIRI: Daftar Laporan */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                {reports.map((report) => {
                  const isSelected = selectedReport.id === report.id;

                  // Helper function untuk warna badge keparahan
                  const getSeverityStyle = (severity) => {
                    if (severity === "Berat")
                      return "bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]";
                    if (severity === "Sedang")
                      return "bg-[#FFF7ED] text-[#F97316] border border-[#FED7AA]";
                    return "bg-[#F0FDF4] text-[#22C55E] border border-[#BBF7D0]";
                  };

                  return (
                    <div
                      key={report.id}
                      onClick={() => setSelectedReport(report)}
                      className={`p-6 rounded-xl border bg-white cursor-pointer transition-all flex flex-col ${
                        isSelected
                          ? "border-green shadow-md ring-1 ring-green"
                          : "border-[#E2E8F0] shadow-sm hover:border-green/50"
                      }`}
                    >
                      {/* Header Card: ID, Badge, Tanggal */}
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[#64748B] font-medium">
                            {report.id}
                          </span>
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${getSeverityStyle(report.keparahan)}`}
                          >
                            {report.keparahan}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-[#94A3B8]">Dilaporkan</p>
                          <p className="text-sm font-bold text-[#1E293B]">
                            {report.tanggal}
                          </p>
                        </div>
                      </div>

                      {/* Nama Jalan & Lokasi */}
                      <h2 className="text-xl font-bold text-[#1E293B] mb-0.5">
                        {report.lokasi}
                      </h2>
                      <p className="text-sm text-[#64748B] mb-6">
                        {report.kota}, {report.provinsi}
                      </p>

                      {/* Jenis Kerusakan (Dot indicator) */}
                      <div className="flex items-center gap-2 text-sm text-[#475569] mb-4 font-medium">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${report.keparahan === "Berat" ? "bg-[#EF4444]" : report.keparahan === "Sedang" ? "bg-[#F97316]" : "bg-[#22C55E]"}`}
                        ></div>
                        <span>{report.kategori}</span>
                        <span className="text-[#CBD5E1]">•</span>
                        <span>{report.kategoriEn}</span>
                      </div>

                      {/* Progress Bar (Custom Design) */}
                      <div className="flex flex-col w-full gap-1.5">
                        <div className="flex justify-between text-xs font-medium text-[#64748B]">
                          <span>Progress</span>
                          <span>{report.progress}%</span>
                        </div>

                        {/* Bar Segmentasi */}
                        <div className="flex h-2.5 gap-1 w-full relative">
                          {/* Garis Dasar Abu-abu */}
                          <div className="absolute inset-0 flex gap-1">
                            <div className="h-full flex-1 bg-[#E2E8F0] rounded-l-full"></div>
                            <div className="h-full flex-1 bg-[#E2E8F0]"></div>
                            <div className="h-full flex-1 bg-[#E2E8F0]"></div>
                            <div className="h-full flex-1 bg-[#E2E8F0] rounded-r-full"></div>
                          </div>

                          {/* Garis Hijau Progress Aktif */}
                          <div
                            className="absolute left-0 top-0 bottom-0 bg-[#22C55E] rounded-full transition-all duration-500 ease-out z-10"
                            style={{ width: `${report.progress}%` }}
                          ></div>

                          {/* Titik Pembatas (Dots) */}
                          <div className="absolute inset-0 flex justify-between z-20 items-center px-1">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${report.progress >= 0 ? "bg-white" : "bg-transparent"}`}
                            ></div>
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${report.progress >= 25 ? "bg-white" : "bg-transparent"}`}
                            ></div>
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${report.progress >= 50 ? "bg-white" : "bg-transparent"}`}
                            ></div>
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${report.progress >= 75 ? "bg-white" : "bg-transparent"}`}
                            ></div>
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${report.progress >= 100 ? "bg-white" : "bg-transparent"}`}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* KOLOM KANAN: Detail & Alur Status */}
              <div className="lg:col-span-4 flex flex-col">
                <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm sticky top-[100px]">
                  {/* Header Detail */}
                  <p className="text-xs text-[#94A3B8] font-medium mb-1">
                    {selectedReport.id}
                  </p>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-[#1E293B]">
                      Detail Laporan
                    </h3>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        selectedReport.keparahan === "Berat"
                          ? "bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]"
                          : selectedReport.keparahan === "Sedang"
                            ? "bg-[#FFF7ED] text-[#F97316] border border-[#FED7AA]"
                            : "bg-[#F0FDF4] text-[#22C55E] border border-[#BBF7D0]"
                      }`}
                    >
                      {selectedReport.keparahan}
                    </span>
                  </div>

                  {/* List Spesifikasi */}
                  <div className="flex flex-col gap-3 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#64748B]">Lokasi</span>
                      <span className="text-sm font-medium text-[#1E293B]">
                        {selectedReport.lokasi}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#64748B]">Kota</span>
                      <span className="text-sm font-medium text-[#1E293B]">
                        {selectedReport.kota}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#64748B]">Deteksi AI</span>
                      <span className="text-sm font-medium text-[#1E293B]">
                        {selectedReport.kategori}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-[#64748B]">Diperbarui</span>
                      <span className="text-sm font-medium text-[#1E293B]">
                        {selectedReport.tanggal}
                      </span>
                    </div>
                  </div>

                  {/* ALUR STATUS (Timeline) */}
                  <h4 className="text-sm font-bold text-[#1E293B] uppercase tracking-wider mb-5">
                    Alur Status
                  </h4>

                  <div className="flex flex-col gap-6 relative">
                    {/* Garis vertikal timeline bg */}
                    <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-[#E2E8F0] z-0"></div>

                    {/* Garis hijau aktif */}
                    <div
                      className="absolute left-[15px] top-4 w-[2px] bg-[#22C55E] z-0 transition-all duration-500"
                      style={{
                        height: `${(selectedReport.activeStep / (selectedReport.timeline.length - 1)) * 100}%`,
                        maxHeight: "100%",
                      }}
                    ></div>

                    {selectedReport.timeline.map((step, idx) => {
                      const isDone = step.done;
                      const isActive = idx === selectedReport.activeStep;

                      return (
                        <div key={idx} className="flex gap-4 relative z-10">
                          {/* Icon Lingkaran */}
                          <div
                            className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border-4 border-white ${
                              isDone
                                ? "bg-[#22C55E]"
                                : "bg-white border-2 !border-[#E2E8F0]"
                            }`}
                          >
                            {isDone ? (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            ) : (
                              <div className="w-1.5 h-1.5 bg-[#CBD5E1] rounded-full"></div>
                            )}
                          </div>

                          {/* Teks Status */}
                          <div className="pt-1 pb-1">
                            <p
                              className={`text-sm font-bold ${isDone || isActive ? "text-[#1E293B]" : "text-[#64748B]"}`}
                            >
                              {step.tahap}
                            </p>
                            <p className="text-[12px] text-[#64748B] mt-0.5 leading-snug">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
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
