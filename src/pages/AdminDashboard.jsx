// File: src/pages/AdminDashboard.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo-ratain.png";
import jalanImg from "../assets/img/jalan.jpeg";

// Data simulasi (Mock Data) untuk tabel
const mockReports = [
  {
    id: "#RTN-2026-0008",
    street: "Jl. Yos Sudarso",
    date: "24 September 2026",
    damage: "Lubang Berat",
    severity: "Berat",
    status: "Laporan Dikirim",
    progress: 20,
    image: jalanImg,
  },
  {
    id: "#RTN-2026-0007",
    street: "Jl. Gajah Mada",
    date: "24 September 2026",
    damage: "Retak Sedang",
    severity: "Sedang",
    status: "Analisis AI",
    progress: 40,
    image: jalanImg,
  },
  {
    id: "#RTN-2026-0006",
    street: "Jl. Duyung",
    date: "23 September 2026",
    damage: "Retak Sedang",
    severity: "Sedang",
    status: "Analisis AI",
    progress: 40,
    image: jalanImg,
  },
  {
    id: "#RTN-2026-0005",
    street: "Jl. Letjen Suprapto",
    date: "23 September 2026",
    damage: "Lubang Berat",
    severity: "Berat",
    status: "Diverifikasi",
    progress: 60,
    image: jalanImg,
  },
  {
    id: "#RTN-2026-0004",
    street: "Jl. Imam Bonjol",
    date: "22 September 2026",
    damage: "Lubang Kecil",
    severity: "Ringan",
    status: "Selesai",
    progress: 100,
    image: jalanImg,
  },
  {
    id: "#RTN-2026-0003",
    street: "Jl. Engku Putri",
    date: "22 September 2026",
    damage: "Lubang Berat",
    severity: "Berat",
    status: "Diverifikasi",
    progress: 60,
    image: jalanImg,
  },
  {
    id: "#RTN-2026-0002",
    street: "Jl. Ahmad Yani",
    date: "20 September 2026",
    damage: "Retak Sedang",
    severity: "Sedang",
    status: "Proses Perbaikan",
    progress: 80,
    image: jalanImg,
  },
  {
    id: "#RTN-2026-0001",
    street: "Jl. Raja Isa",
    date: "10 September 2026",
    damage: "Lubang Kecil",
    severity: "Ringan",
    status: "Selesai",
    progress: 100,
    image: jalanImg,
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const datePickerRef = useRef(null);
  const [selectedReport, setSelectedReport] = useState(mockReports[5]); // Default pilih Jl. Engku Putri
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [reportSearch, setReportSearch] = useState("");
  const [displayedMonth, setDisplayedMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [reportsPerPage, setReportsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const filteredReports = mockReports.filter((report) => {
    const searchTerm = reportSearch.trim().toLocaleLowerCase("id-ID");
    return (
      report.id.toLocaleLowerCase("id-ID").includes(searchTerm) ||
      report.street.toLocaleLowerCase("id-ID").includes(searchTerm)
    );
  });
  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  const firstReportIndex = (currentPage - 1) * reportsPerPage;
  const visibleReports = filteredReports.slice(
    firstReportIndex,
    firstReportIndex + reportsPerPage,
  );
  const lastReportIndex = Math.min(
    firstReportIndex + reportsPerPage,
    filteredReports.length,
  );
  const monthName = displayedMonth.toLocaleDateString("id-ID", {
    month: "long",
  });
  const displayedYear = displayedMonth.getFullYear();
  const firstWeekdayOffset = (new Date(displayedYear, displayedMonth.getMonth(), 1).getDay() + 6) % 7;
  const daysInMonth = new Date(
    displayedYear,
    displayedMonth.getMonth() + 1,
    0,
  ).getDate();
  const calendarCells = Array.from(
    { length: firstWeekdayOffset + daysInMonth },
    (_, index) => (index < firstWeekdayOffset ? null : index - firstWeekdayOffset + 1),
  );
  const yearOptions = Array.from(
    { length: 21 },
    (_, index) => displayedYear - 10 + index,
  );

  useEffect(() => {
    if (!isProfileMenuOpen && !isDatePickerOpen) return undefined;

    const handlePointerDown = (event) => {
      if (
        isProfileMenuOpen &&
        !profileMenuRef.current?.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
      if (isDatePickerOpen && !datePickerRef.current?.contains(event.target)) {
        setIsDatePickerOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsProfileMenuOpen(false);
      if (event.key === "Escape") setIsDatePickerOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDatePickerOpen, isProfileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const handleExportReports = () => {
    const csvValue = (value) => {
      const text = String(value ?? "");
      return `"${text.replaceAll('"', '""')}"`;
    };
    const rows = [
      ["ID Laporan", "Jalan", "Tanggal", "Kerusakan", "Tingkat", "Status", "Progres"],
      ...mockReports.map((report) => [
        report.id,
        report.street,
        report.date,
        report.damage,
        report.severity,
        report.status,
        `${report.progress}%`,
      ]),
    ];
    const csvContent = `\uFEFF${rows.map((row) => row.map(csvValue).join(",")).join("\r\n")}`;
    const downloadUrl = URL.createObjectURL(
      new Blob([csvContent], { type: "text/csv;charset=utf-8" }),
    );
    const link = document.createElement("a");
    const today = new Date();
    const dateStamp = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    link.href = downloadUrl;
    link.download = `laporan-jalan-${dateStamp}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
  };

  // Fungsi helper untuk warna status/tingkat kerusakan
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Berat":
        return "text-[#DD4343]";
      case "Sedang":
        return "text-[#D97706]";
      case "Ringan":
        return "text-green";
      default:
        return "text-grey-2";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Laporan Dikirim":
        return "text-grey-2 font-medium";
      case "Analisis AI":
        return "text-grey-2 font-medium";
      case "Diverifikasi":
        return "text-green font-bold";
      case "Proses Perbaikan":
        return "text-[#D97706] font-bold";
      case "Selesai":
        return "text-green font-bold";
      default:
        return "text-grey-2";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      <div className="flex-1 flex">
        <div
          className={`flex-1 flex flex-col h-screen overflow-y-auto ${selectedReport ? "pr-90" : ""}`}
        >
          {/* Header Atas */}
          <header className="bg-white border-b border-grey-1 px-8 py-3 flex justify-between items-center">
            <img
              src={logo}
              alt="Rata.in Admin"
              className="h-12 w-auto object-contain"
            />
            <div className="flex items-center gap-6">
              <a
                href="/"
                target="_blank"
                className="text-sm font-semibold text-black flex items-center gap-1 hover:text-green"
              >
                Lihat situs warga{" "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
              <button className="text-grey-2 hover:text-black">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </button>
              <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen((isOpen) => !isOpen)}
                  aria-haspopup="menu"
                  aria-expanded={isProfileMenuOpen}
                  aria-controls="admin-profile-menu"
                  className="flex items-center gap-3 rounded-lg p-2 text-left hover:bg-grey-light transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-soft-green text-green flex items-center justify-center font-bold text-xs">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-black leading-tight">
                      Admin Dinas
                    </span>
                    <span className="text-xs text-grey-2">Pengelola laporan</span>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {isProfileMenuOpen && (
                  <div
                    id="admin-profile-menu"
                    role="menu"
                    className="absolute right-0 top-full z-50 mt-2 min-w-40 rounded-lg border border-grey-1 bg-white p-1 shadow-lg"
                  >
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red hover:bg-grey-light transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="p-8 flex flex-col gap-6">
            {/* Judul & Date Picker */}
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-2xl font-bold text-black mb-1">
                  Dasbor Admin
                </h1>
                <p className="text-sm text-grey-2">
                  Pantau laporan warga dan koordinasikan perbaikan jalan di
                  Batam.
                </p>
              </div>
              <div className="relative" ref={datePickerRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    setIsDatePickerOpen((isOpen) => !isOpen);
                  }}
                  aria-haspopup="dialog"
                  aria-expanded={isDatePickerOpen}
                  aria-controls="admin-date-picker"
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-grey-1 rounded-lg text-sm font-semibold text-black shadow-sm"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {selectedDate.toLocaleDateString("id-ID", {
                    month: "long",
                    year: "numeric",
                  })}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {isDatePickerOpen && (
                  <div
                    id="admin-date-picker"
                    role="dialog"
                    aria-label="Pilih tanggal laporan"
                    className="absolute right-0 top-full z-40 mt-2 w-72 rounded-xl border border-grey-1 bg-white p-4 shadow-xl"
                  >
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setDisplayedMonth(
                            new Date(displayedYear, displayedMonth.getMonth() - 1, 1),
                          )
                        }
                        aria-label="Bulan sebelumnya"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-grey-2 hover:bg-grey-light hover:text-black"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                      </button>
                      <div className="flex flex-1 items-center justify-center gap-2">
                        <span className="text-sm font-semibold text-black">
                          {monthName}
                        </span>
                        <select
                          aria-label="Pilih tahun"
                          value={displayedYear}
                          onChange={(event) =>
                            setDisplayedMonth(
                              new Date(
                                Number(event.target.value),
                                displayedMonth.getMonth(),
                                1,
                              ),
                            )
                          }
                          className="rounded-md border border-grey-1 bg-white px-2 py-1 text-sm font-semibold text-black focus:outline-none focus:border-green"
                        >
                          {yearOptions.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setDisplayedMonth(
                            new Date(displayedYear, displayedMonth.getMonth() + 1, 1),
                          )
                        }
                        aria-label="Bulan berikutnya"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-grey-2 hover:bg-grey-light hover:text-black"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                    <div className="mb-2 grid grid-cols-7 text-center text-xs font-medium text-grey-2">
                      {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map(
                        (day) => (
                          <span key={day} className="py-1">
                            {day}
                          </span>
                        ),
                      )}
                    </div>
                    <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
                      {calendarCells.map((day, index) => {
                        if (day === null) {
                          return <span key={`empty-${index}`} />;
                        }

                        const date = new Date(
                          displayedYear,
                          displayedMonth.getMonth(),
                          day,
                        );
                        const isSelected =
                          selectedDate.getFullYear() === displayedYear &&
                          selectedDate.getMonth() === displayedMonth.getMonth() &&
                          selectedDate.getDate() === day;
                        const today = new Date();
                        const isToday =
                          today.getFullYear() === displayedYear &&
                          today.getMonth() === displayedMonth.getMonth() &&
                          today.getDate() === day;

                        return (
                          <button
                            key={date.toISOString()}
                            type="button"
                            onClick={() => {
                              setSelectedDate(date);
                              setIsDatePickerOpen(false);
                            }}
                            aria-label={date.toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                            aria-pressed={isSelected}
                            className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full transition-colors ${isSelected ? "bg-green text-white font-bold" : isToday ? "border border-green text-green font-semibold" : "text-black hover:bg-grey-light"}`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 4 Kartu Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-grey-1 shadow-sm flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-soft-green text-green flex items-center justify-center mb-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-black mb-1">8</span>
                <span className="text-xs font-bold text-black mb-1">
                  Total laporan
                </span>
                <span className="text-[11px] text-grey-2">
                  Seluruh laporan warga
                </span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-grey-1 shadow-sm flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-soft-green text-green flex items-center justify-center mb-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-black mb-1">3</span>
                <span className="text-xs font-bold text-black mb-1">
                  Menunggu verifikasi
                </span>
                <span className="text-[11px] text-grey-2">
                  1 dikirim • 2 analisis AI
                </span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-grey-1 shadow-sm flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-soft-green text-green flex items-center justify-center mb-3">
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
                <span className="text-2xl font-bold text-black mb-1">3</span>
                <span className="text-xs font-bold text-black mb-1">
                  Dalam penanganan
                </span>
                <span className="text-[11px] text-grey-2">
                  2 diverifikasi • 1 perbaikan
                </span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-grey-1 shadow-sm flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-soft-green text-green flex items-center justify-center mb-3">
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
                <span className="text-2xl font-bold text-black mb-1">2</span>
                <span className="text-xs font-bold text-black mb-1">
                  Selesai
                </span>
                <span className="text-[11px] text-grey-2">
                  25% dari total laporan
                </span>
              </div>
            </div>

            {/* Tabel Area */}
            <div className="bg-white rounded-xl border border-grey-1 shadow-sm flex flex-col pb-4">
              <div className="p-5 flex justify-between items-center border-b border-grey-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-black">
                    Kelola Laporan
                  </h2>
                  <span className="px-2.5 py-1 bg-grey-light text-grey-2 text-xs font-semibold rounded-full">
                    {filteredReports.length} laporan
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleExportReports}
                  className="px-4 py-2 border border-grey-1 rounded-lg text-sm font-semibold text-black hover:bg-grey-light transition-colors"
                >
                  Ekspor laporan
                </button>
              </div>

              {/* Filter Area */}
              <div className="p-5 flex flex-col gap-4 border-b border-grey-1">
                <div className="relative w-full">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-2"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    value={reportSearch}
                    onChange={(event) => {
                      setReportSearch(event.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Cari berdasarkan ID laporan atau nama jalan..."
                    aria-label="Cari berdasarkan ID laporan atau nama jalan"
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-grey-1 rounded-lg text-sm font-medium text-black placeholder-grey-2 focus:outline-none focus:border-green focus:ring-1 focus:ring-green"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-grey-2">
                      Status laporan
                    </label>
                    <select className="w-full px-3 py-2 bg-white border border-grey-1 rounded-lg text-sm text-black focus:outline-none focus:border-green appearance-none">
                      <option>Semua status</option>
                      <option>Laporan di Terima</option>
                      <option>Analaisis AI</option>
                      <option>Diverifikasi</option>
                      <option>Dalam Penanganan</option>
                      <option>Selesai</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-grey-2">
                      Tingkat kerusakan
                    </label>
                    <select className="w-full px-3 py-2 bg-white border border-grey-1 rounded-lg text-sm text-black focus:outline-none focus:border-green appearance-none">
                      <option>Semua tingkat</option>
                      <option>Ringan</option>
                      <option>Sedang</option>
                      <option>Berat</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-grey-2">
                      Wilayah
                    </label>
                    <select className="w-full px-3 py-2 bg-white border border-grey-1 rounded-lg text-sm text-black focus:outline-none focus:border-green appearance-none">
                      <option>Semua kecamatan</option>
                      <option>Batam Kota</option>
                      <option>Baru Ampar</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Table Data */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-grey-1 text-[11px] text-black font-semibold">
                      <th className="py-3 px-5 w-10">
                        <input
                          type="checkbox"
                          className="rounded border-grey-1 text-green focus:ring-green accent-green"
                        />
                      </th>
                      <th className="py-3 px-2">
                        Laporan & lokasi <span className="text-grey-2">↓</span>
                      </th>
                      <th className="py-3 px-2">Kerusakan</th>
                      <th className="py-3 px-2 text-center">Status laporan</th>
                      <th className="py-3 px-5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {visibleReports.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-5 py-8 text-center text-grey-2"
                        >
                          Tidak ada laporan yang cocok dengan pencarian.
                        </td>
                      </tr>
                    ) : (
                      visibleReports.map((report) => {
                      const isSelected = selectedReport?.id === report.id;
                      return (
                        <tr
                          key={report.id}
                          onClick={() => setSelectedReport(report)}
                          className={`border-b border-grey-1 cursor-pointer transition-colors ${isSelected ? "bg-soft-green/30 border-l-4 border-l-green" : "hover:bg-grey-light border-l-4 border-l-transparent"}`}
                        >
                          <td className="py-4 px-5">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              readOnly
                              className="rounded border-grey-1 text-green focus:ring-green accent-green"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex flex-col">
                              <span className="text-[11px] text-grey-2 font-medium">
                                {report.id}
                              </span>
                              <span className="font-bold text-black text-sm">
                                {report.street}
                              </span>
                              <span className="text-[11px] text-grey-2 mt-0.5">
                                {report.date}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs text-grey-2">
                                {report.damage}
                              </span>
                              <span
                                className={`text-[11px] font-bold ${getSeverityColor(report.severity)}`}
                              >
                                {report.severity}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <span
                              className={`text-[11px] ${getStatusColor(report.status)}`}
                            >
                              {report.status}
                            </span>
                          </td>
                          <td className="py-3 px-5 text-right">
                            <button
                              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors ${isSelected ? "bg-green text-white" : "bg-grey-light text-black hover:bg-grey-1"}`}
                            >
                              Lihat Detail
                            </button>
                          </td>
                        </tr>
                      );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-5 pt-4 flex justify-between items-center text-xs text-grey-2 font-medium">
                <div className="flex items-center gap-3">
                  <label htmlFor="reports-per-page">Laporan per halaman</label>
                  <select
                    id="reports-per-page"
                    value={reportsPerPage}
                    onChange={(event) => {
                      setReportsPerPage(Number(event.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-2 py-1 bg-white border border-grey-1 rounded text-xs text-black focus:outline-none focus:border-green"
                  >
                    {Array.from({ length: 10 }, (_, index) => (index + 1) * 5).map(
                      (count) => (
                        <option key={count} value={count}>
                          {count}
                        </option>
                      ),
                    )}
                  </select>
                  <span>
                    Menampilkan {filteredReports.length ? firstReportIndex + 1 : 0}-
                    {lastReportIndex} dari {filteredReports.length} laporan
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                    disabled={currentPage === 1 || totalPages === 0}
                    aria-label="Halaman sebelumnya"
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-grey-light disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    &lt;
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        aria-label={`Halaman ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                        className={`w-7 h-7 flex items-center justify-center rounded ${currentPage === page ? "bg-soft-green text-green font-bold" : "hover:bg-grey-light"}`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) => Math.min(page + 1, totalPages))
                    }
                    disabled={totalPages === 0 || currentPage >= totalPages}
                    aria-label="Halaman berikutnya"
                    className="w-7 h-7 flex items-center justify-center rounded hover:bg-grey-light disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* ================= RIGHT PANEL (DETAIL LAPORAN) ================= */}
        {selectedReport && (
          <aside className="w-90 bg-white border-l border-grey-1 fixed right-0 top-0 h-full z-30 shadow-2xl overflow-y-auto flex flex-col">
            <div className="p-5 border-b border-grey-1 flex flex-col gap-1 sticky top-0 bg-white z-10">
              <div className="flex justify-between items-center w-full mb-2">
                <span className="text-[11px] font-medium text-grey-2">
                  {selectedReport.id}
                </span>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-black hover:text-red"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="flex justify-between items-center w-full">
                <h2 className="text-lg font-bold text-black">Detail Laporan</h2>
                <span
                  className={`text-[11px] font-bold ${getSeverityColor(selectedReport.severity)}`}
                >
                  {selectedReport.severity}
                </span>
              </div>
              <p className="text-sm font-bold text-black flex items-center gap-1 mt-1">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {selectedReport.street}
              </p>
            </div>

            <div className="p-5 flex flex-col gap-6 flex-1">
              {/* Image Box */}
              <div className="w-full h-44 bg-grey-light rounded-xl relative overflow-hidden flex items-end shadow-sm">
                <img
                  src={selectedReport.image || jalanImg}
                  alt={`Dokumentasi ${selectedReport.street}`}
                  className="w-full h-full object-cover absolute inset-0"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent pointer-events-none"></div>
                <div className="relative z-10 text-white text-[11px] font-medium px-3 py-2 w-full flex justify-between items-center">
                  <span>Dokumentasi laporan warga</span>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-col gap-2 text-xs">
                <div className="flex justify-between border-b border-grey-1 pb-2">
                  <span className="text-grey-2">Wilayah</span>
                  <span className="font-semibold text-black text-right">
                    Batam Kota, Kepulauan Riau
                  </span>
                </div>
                <div className="flex justify-between border-b border-grey-1 pb-2">
                  <span className="text-grey-2">Deteksi AI</span>
                  <span className="font-semibold text-black text-right">
                    {selectedReport.damage}
                  </span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-grey-2">Dilaporkan</span>
                  <span className="font-semibold text-black text-right">
                    {selectedReport.date}
                  </span>
                </div>
              </div>

              {/* Progres Bar */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-bold text-black">
                  <span>Progres laporan</span>
                  <span>{selectedReport.progress}%</span>
                </div>
                <div className="w-full bg-grey-light h-1.5 rounded-full overflow-hidden flex">
                  <div
                    className="bg-green h-full"
                    style={{ width: `${selectedReport.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Timeline (Alur Status) */}
              <div className="flex flex-col gap-4">
                <h3 className="text-[11px] font-bold text-grey-2 uppercase tracking-wider">
                  Alur Status
                </h3>
                <div className="flex flex-col gap-4 relative pl-3">
                  <div className="absolute left-4.25 top-2 bottom-2 w-0.5 bg-grey-1 z-0"></div>

                  <div className="flex gap-4 relative z-10">
                    <div className="w-3 h-3 rounded-full bg-green shrink-0 mt-1 ring-4 ring-white"></div>
                    <div>
                      <p className="text-xs font-bold text-black leading-none">
                        Laporan Dikirim
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 relative z-10">
                    <div className="w-3 h-3 rounded-full bg-green shrink-0 mt-1 ring-4 ring-white"></div>
                    <div>
                      <p className="text-xs font-bold text-black leading-none">
                        Analisis AI
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 relative z-10">
                    <div className="w-5 h-5 -ml-1 rounded-full bg-green shrink-0 ring-4 ring-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-black leading-none mb-1">
                        Diverifikasi
                      </p>
                      <p className="text-[10px] text-grey-2 leading-none">
                        Telah ditinjau oleh Admin Dinas
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 relative z-10">
                    <div className="w-3 h-3 rounded-full bg-grey-1 shrink-0 mt-1 ring-4 ring-white"></div>
                    <div>
                      <p className="text-xs font-bold text-grey-2 leading-none">
                        Proses Perbaikan
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 relative z-10">
                    <div className="w-3 h-3 rounded-full bg-grey-1 shrink-0 mt-1 ring-4 ring-white"></div>
                    <div>
                      <p className="text-xs font-bold text-grey-2 leading-none">
                        Selesai
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Verifikasi & Perbaikan */}
              <div className="flex flex-col gap-4 pt-4 border-t border-grey-1">
                <h3 className="text-[11px] font-bold text-grey-2 uppercase tracking-wider">
                  Verifikasi & perbaikan
                </h3>

                <div className="bg-soft-green border border-green/30 p-3 rounded-lg flex gap-3">
                  <svg
                    className="text-green shrink-0 mt-0.5"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-green">
                      Laporan sudah diverifikasi
                    </span>
                    <span className="text-[10px] text-green/80">
                      Admin Dinas • 22 September 2026
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium text-grey-2">
                    Status laporan
                  </label>
                  <select className="w-full px-3 py-2 bg-white border border-grey-1 rounded-lg text-xs font-medium text-black focus:outline-none focus:border-green">
                    <option>Diverifikasi</option>
                    <option>Proses Perbaikan</option>
                    <option>Selesai</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium text-grey-2">
                    Tim perbaikan
                  </label>
                  <select className="w-full px-3 py-2 bg-white border border-grey-1 rounded-lg text-xs font-medium text-black focus:outline-none focus:border-green">
                    <option>Pilih tim penanggung jawab</option>
                    <option>Tim Jalan Batam Kota</option>
                    <option>UPT Pemeliharaan Jalan</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-medium text-grey-2">
                    Catatan admin
                  </label>
                  <textarea
                    rows="3"
                    className="w-full px-3 py-2 bg-white border border-grey-1 rounded-lg text-xs font-medium text-black focus:outline-none focus:border-green resize-none"
                    defaultValue="Prioritaskan lubang berat. Tetapkan tim untuk memulai proses perbaikan."
                  ></textarea>
                </div>

                <button className="w-full py-2.5 bg-green text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
                  Simpan perubahan
                </button>
                <p className="text-[10px] text-grey-2 text-center">
                  Perubahan status akan terlihat pada halaman laporan warga.
                </p>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
