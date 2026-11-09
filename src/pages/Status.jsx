// File: src/pages/Status.jsx
import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";

const getSeverityStyle = (severity) => {
  if (severity === "Berat") return "bg-soft-red text-red border border-red/30";
  if (severity === "Sedang")
    return "bg-soft-orange text-orange border border-orange/30";
  return "bg-soft-green text-green border border-green/30";
};

const ReportDetailContent = ({ report }) => {
  if (!report) return null;
  return (
    <>
      <p className="text-xs text-grey-1 font-medium mb-1">{report.id}</p>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-black">Detail Laporan</h3>
        <span
          className={`text-[11px] font-bold px-3 py-1 rounded-full ${getSeverityStyle(
            report.keparahan,
          )}`}
        >
          {report.keparahan}
        </span>
      </div>

      <div className="flex flex-col gap-3 mb-5 border-b border-grey pb-5">
        <div className="flex justify-between items-center">
          <span className="text-sm text-grey-2">Lokasi</span>
          <span className="text-sm font-medium text-black text-right">
            {report.lokasi}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-grey-2">Kota</span>
          <span className="text-sm font-medium text-black text-right">
            {report.kota}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-grey-2">Deteksi AI</span>
          <span className="text-sm font-medium text-black text-right">
            {report.kategori}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-grey-2">Diperbarui</span>
          <span className="text-sm font-medium text-black text-right">
            {report.tanggal}
          </span>
        </div>
      </div>

      <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-5">
        Alur Status
      </h4>

      <div className="flex flex-col gap-6 relative">
        <div className="absolute left-3.5 top-4 bottom-4 w-0.5 bg-grey z-0"></div>
        <div
          className="absolute left-3.5 top-4 w-0.5 bg-green z-0 transition-all duration-500"
          style={{
            height: `${(report.activeStep / (report.timeline.length - 1)) * 100}%`,
            maxHeight: "100%",
          }}
        ></div>

        {report.timeline.map((step, idx) => {
          const isDone = step.done;
          const isActive = idx === report.activeStep;

          return (
            <div key={idx} className="flex gap-4 relative z-10">
              <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center bg-white z-10">
                {isDone ? (
                  <div className="w-7 h-7 rounded-full bg-green flex items-center justify-center shadow-sm">
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
                  </div>
                ) : isActive ? (
                  <div className="w-7 h-7 rounded-full bg-green flex items-center justify-center shadow-sm">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-white border-2 border-grey flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-grey rounded-full"></div>
                  </div>
                )}
              </div>

              <div className="pt-0.5 pb-1">
                <p
                  className={`text-[13px] md:text-sm font-bold ${
                    isDone || isActive ? "text-black" : "text-grey-2"
                  }`}
                >
                  {step.tahap}
                </p>
                <p className="text-[11px] md:text-[12px] text-grey-1 mt-0.5 leading-snug">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

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
      activeStep: 2,
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
          done: false,
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const searchTerm = searchQuery.trim().toLocaleLowerCase("id-ID");
  const filteredReports = reports.filter(
    (report) =>
      report.id.toLocaleLowerCase("id-ID").includes(searchTerm) ||
      report.lokasi.toLocaleLowerCase("id-ID").includes(searchTerm),
  );

  const displayedReport =
    filteredReports.find((report) => report.id === selectedReport?.id) ??
    filteredReports[0] ??
    null;

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleReportClick = (report) => {
    setSelectedReport(report);
    if (window.innerWidth < 1024) {
      setIsModalOpen(true);
      setIsClosing(false);
    }
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-grey-light flex flex-col font-inter">
      <Navbar />

      <main className="grow flex flex-col items-center pt-35 md:pt-32 px-4 pb-12 w-full max-w-7xl mx-auto">
        {!isLoggedIn ? (
          <div className="flex flex-col items-center justify-center text-center max-w-md w-full my-auto h-full">
            <div className="relative mb-8 flex justify-center items-center h-32 w-40">
              <div className="w-32 h-32 bg-soft-green rounded-full absolute z-0"></div>
              <div className="relative z-10 bg-white shadow-sm border border-grey rounded-xl p-4 w-28 h-24 transform -rotate-6 flex flex-col gap-2.5 mr-6">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-grey rounded-sm"></div>
                  <div className="h-2.5 w-14 bg-grey/50 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-grey rounded-sm"></div>
                  <div className="h-2.5 w-10 bg-grey/50 rounded-full"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 bg-grey rounded-sm"></div>
                  <div className="h-2.5 w-12 bg-grey/50 rounded-full"></div>
                </div>
              </div>
              <div className="absolute right-0 bottom-2 z-20 w-12 h-12 bg-green rounded-full flex items-center justify-center shadow-lg border-4 border-soft-green">
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
            <button
              onClick={() => window.dispatchEvent(new Event("openLogin"))}
              className="px-6 py-2.5 bg-green text-white rounded-lg font-bold hover:opacity-90 flex items-center gap-2 transition-opacity shadow-sm cursor-pointer"
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
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-6 relative">
            <div className="text-center w-full mt-2 md:mt-4">
              <h1 className="text-[24px] md:text-[28px] font-bold text-black mb-1">
                Status Laporan Saya
              </h1>
              <p className="text-sm md:text-base text-grey-2 px-2 md:px-0">
                Pantau perkembangan laporan kerusakan yang Anda kirim.
              </p>
            </div>

            <div className="flex flex-col w-full gap-4">
              <div className="relative w-full md:w-85 lg:w-96">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-grey-1)"
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
                  placeholder="Cari laporan berdasarkan ID..."
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-grey rounded-xl text-sm font-medium text-black placeholder:font-medium placeholder:text-grey-1 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4 w-full">
                <div className="bg-white border border-grey rounded-xl p-3 md:p-5 flex flex-col items-center justify-center text-center shadow-sm">
                  <span className="text-2xl md:text-[32px] font-bold text-black leading-none mb-1">
                    3
                  </span>
                  <span className="text-xs md:text-sm text-grey-2 font-medium">
                    Total Laporan
                  </span>
                </div>
                <div className="bg-soft-orange border border-orange/30 rounded-xl p-3 md:p-5 flex flex-col items-center justify-center text-center shadow-sm">
                  <span className="text-2xl md:text-[32px] font-bold text-orange leading-none mb-1">
                    2
                  </span>
                  <span className="text-xs md:text-sm text-orange font-medium">
                    Dalam Proses
                  </span>
                </div>
                <div className="bg-soft-green border border-green/30 rounded-xl p-3 md:p-5 flex flex-col items-center justify-center text-center shadow-sm">
                  <span className="text-2xl md:text-[32px] font-bold text-green leading-none mb-1">
                    1
                  </span>
                  <span className="text-xs md:text-sm text-green font-medium">
                    Selesai
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
              <div className="lg:col-span-8 flex flex-col gap-4">
                {filteredReports.length === 0 ? (
                  <div className="bg-white border border-grey rounded-xl p-6 text-center text-sm text-grey-2">
                    Tidak ada laporan yang cocok dengan pencarian.
                  </div>
                ) : (
                  filteredReports.map((report) => {
                    const isSelected = displayedReport?.id === report.id;
                    return (
                      <div
                        key={report.id}
                        onClick={() => handleReportClick(report)}
                        className={`p-6 rounded-xl border bg-white cursor-pointer transition-all flex flex-col ${
                          isSelected && window.innerWidth >= 1024
                            ? "border-green shadow-md ring-1 ring-green"
                            : "border-grey shadow-sm hover:border-green/50"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-grey-2 font-medium">
                              {report.id}
                            </span>
                            <span
                              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${getSeverityStyle(report.keparahan)}`}
                            >
                              {report.keparahan}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-grey-1">Dilaporkan</p>
                            <p className="text-sm font-bold text-black">
                              {report.tanggal}
                            </p>
                          </div>
                        </div>

                        <h2 className="text-xl font-bold text-black mb-0.5">
                          {report.lokasi}
                        </h2>
                        <p className="text-sm text-grey-2 mb-6">
                          {report.kota}, {report.provinsi}
                        </p>

                        <div className="flex items-center gap-2 text-sm text-grey-2 mb-4 font-medium">
                          <div
                            className={`w-2.5 h-2.5 rounded-full ${report.keparahan === "Berat" ? "bg-red" : report.keparahan === "Sedang" ? "bg-orange" : "bg-green"}`}
                          ></div>
                          <span>{report.kategori}</span>
                          <span className="text-grey-1">•</span>
                          <span>{report.kategoriEn}</span>
                        </div>

                        <div className="flex flex-col w-full gap-1.5">
                          <div className="flex justify-between text-xs font-medium text-grey-2">
                            <span>Progress</span>
                            <span>{report.progress}%</span>
                          </div>
                          <div className="flex h-2.5 gap-1 w-full relative">
                            <div className="absolute inset-0 flex gap-1">
                              <div className="h-full flex-1 bg-grey rounded-l-full"></div>
                              <div className="h-full flex-1 bg-grey"></div>
                              <div className="h-full flex-1 bg-grey"></div>
                              <div className="h-full flex-1 bg-grey rounded-r-full"></div>
                            </div>
                            <div
                              className="absolute left-0 top-0 bottom-0 bg-green rounded-full transition-all duration-500 ease-out z-10"
                              style={{ width: `${report.progress}%` }}
                            ></div>
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
                  })
                )}
              </div>

              <div className="hidden lg:flex lg:col-span-4 flex-col">
                {displayedReport ? (
                  <div className="bg-white rounded-xl border border-grey p-6 shadow-sm sticky top-28">
                    <ReportDetailContent report={displayedReport} />
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-grey p-6 text-center text-sm text-grey-2">
                    Detail laporan akan muncul saat ada hasil pencarian.
                  </div>
                )}
              </div>
            </div>

            {isModalOpen && (
              <div className="fixed inset-0 z-60 flex justify-center items-center p-4 lg:hidden overflow-hidden">
                <div
                  className={`absolute inset-0 bg-black/40 ${
                    isClosing
                      ? "animate-[fadeOut_0.3s_ease-in_forwards]"
                      : "animate-[fadeIn_0.3s_ease-out]"
                  }`}
                  onClick={closeModal}
                ></div>

                <div
                  className={`relative w-full max-w-85 bg-white rounded-2xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl ${
                    isClosing
                      ? "animate-[slideDownCenter_0.3s_ease-in_forwards]"
                      : "animate-[slideUpCenter_0.4s_cubic-bezier(0.16,1,0.3,1)]"
                  }`}
                >
                  <ReportDetailContent report={displayedReport} />
                </div>
              </div>
            )}

            <style>{`
              @keyframes slideUpCenter {
                0% { transform: translateY(100vh); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
              }
              @keyframes slideDownCenter {
                0% { transform: translateY(0); opacity: 1; }
                100% { transform: translateY(100vh); opacity: 0; }
              }
              @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
              }
              @keyframes fadeOut {
                0% { opacity: 1; }
                100% { opacity: 0; }
              }
            `}</style>
          </div>
        )}
      </main>
    </div>
  );
}
