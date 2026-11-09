// File: src/components/layout/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo-ratain.png";

const riwayatLaporan = [
  {
    jalan: "Jl. Engku Putri",
    jenis: "Lubang Berat",
    status: "Dalam Proses",
    statusColor: "orange",
  },
  {
    jalan: "Jl. Ahmad Yani",
    jenis: "Retak Sedang",
    status: "Dalam Proses",
    statusColor: "orange",
  },
  {
    jalan: "Jl. Raja Isa",
    jenis: "Lubang Kecil",
    status: "Selesai",
    statusColor: "green",
  },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileClosing, setIsProfileClosing] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true",
  );

  const openProfile = () => {
    setIsProfileClosing(false);
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileClosing(true);
    setTimeout(() => {
      setIsProfileOpen(false);
      setIsProfileClosing(false);
    }, 300);
  };

  // Kunci scroll saat modal profil terbuka
  useEffect(() => {
    if (isProfileOpen) {
      document.documentElement.style.overflowY = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflowY = "scroll";
      document.body.style.overflow = "auto";
    }
    return () => {
      document.documentElement.style.overflowY = "scroll";
      document.body.style.overflow = "auto";
    };
  }, [isProfileOpen]);

  // Listener untuk sinkronisasi status login antar tab/event
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

  // Efek saat pindah halaman (Route Change)
  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setIsProfileOpen(false);
      setIsProfileClosing(false);
      setIsScrolled(false);
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    }, 0);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
    setIsProfileOpen(false);
    setIsProfileClosing(false);
    navigate("/");
  };

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center justify-center w-20 md:w-24 h-9 md:h-10 rounded-md md:rounded-lg text-[13px] md:text-sm transition-colors whitespace-nowrap ${
      isActive
        ? "bg-soft-green text-green font-bold"
        : "text-grey-2 hover:text-green font-medium"
    }`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full bg-white border-b border-grey-light transition-all ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8 bg-white">
          <div className="flex justify-between items-center h-16 md:h-18">
            <div className="w-1/3 flex justify-start">
              <Link to="/" className="flex items-center shrink-0">
                <img
                  src={logo}
                  alt="Rata.in Logo"
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </div>

            <div className="hidden md:flex w-1/3 items-center justify-center gap-1 md:gap-2">
              <Link to="/" className={getLinkClass("/")}>
                Beranda
              </Link>
              <Link to="/report" className={getLinkClass("/report")}>
                Lapor
              </Link>
              <Link to="/peta" className={getLinkClass("/peta")}>
                Peta
              </Link>
              <Link to="/status" className={getLinkClass("/status")}>
                Status
              </Link>
            </div>

            <div className="w-1/3 flex justify-end">
              {isLoggedIn ? (
                <button
                  onClick={openProfile}
                  className="w-9 h-9 md:w-11 md:h-11 shrink-0 rounded-full bg-soft-green flex items-center justify-center border border-transparent hover:border-green transition-all overflow-hidden"
                  type="button"
                  aria-label="Buka menu profil"
                >
                  <img
                    src={logo}
                    alt="Profile"
                    className="w-5 h-5 md:w-7 md:h-7 object-contain"
                  />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 md:px-5 py-2 shrink-0 rounded-md md:rounded-lg border border-green text-green font-semibold text-sm hover:bg-soft-green transition-colors"
                >
                  Masuk
                </Link>
              )}
            </div>
          </div>

          <div className="flex md:hidden items-center justify-between gap-1 py-3 border-t border-grey-light overflow-x-auto hide-scrollbar">
            <Link to="/" className={getLinkClass("/")}>
              Beranda
            </Link>
            <Link to="/report" className={getLinkClass("/report")}>
              Lapor
            </Link>
            <Link to="/peta" className={getLinkClass("/peta")}>
              Peta
            </Link>
            <Link to="/status" className={getLinkClass("/status")}>
              Status
            </Link>
          </div>
        </div>
      </nav>

      {/* MODAL PROFIL */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-100 flex justify-end font-inter overflow-hidden">
          <div
            className={`absolute inset-0 bg-black/40 ${
              isProfileClosing
                ? "animate-[fadeOut_0.3s_ease-in_forwards]"
                : "animate-[fadeIn_0.3s_ease-out]"
            }`}
            onClick={closeProfile}
          ></div>

          <div
            className={`relative w-full md:w-100 h-dvh bg-white shadow-2xl flex flex-col ${
              isProfileClosing
                ? "animate-[slideOutRight_0.3s_ease-in_forwards]"
                : "animate-[slideInRight_0.3s_ease-out]"
            }`}
          >
            <div className="flex justify-between items-center p-4 md:p-5 border-b border-grey shrink-0">
              <h2 className="text-lg md:text-xl font-bold text-black">
                Profil Saya
              </h2>
              <button
                onClick={closeProfile}
                className="w-8 h-8 rounded-full flex items-center justify-center text-grey-2 hover:bg-grey-light hover:text-black transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col">
              <div className="flex items-center gap-4 p-5 md:p-6 border-b border-grey-light">
                <div className="w-18 h-18 rounded-full bg-soft-green flex items-center justify-center border border-green/20 shrink-0">
                  <img
                    src={logo}
                    alt="Avatar"
                    className="w-11 h-11 object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-0.5">
                    Rata In
                  </h3>
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="w-2 h-2 rounded-full bg-green"></div>
                    <span className="text-[13px] md:text-sm text-grey-2 font-medium">
                      Citizen Contributor
                    </span>
                  </div>
                  <span className="text-[13px] md:text-sm text-grey-1">
                    ratain@gmail.com
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6 border-b-8 border-grey-light">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="border border-grey rounded-xl p-4 flex flex-col items-center justify-center shadow-sm">
                    <span className="text-[26px] md:text-3xl font-bold text-black mb-1 leading-none">
                      3
                    </span>
                    <span className="text-xs text-grey-2 font-medium">
                      Total Laporan
                    </span>
                  </div>
                  <div className="bg-soft-green border border-green/20 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm">
                    <span className="text-[26px] md:text-3xl font-bold text-green mb-1 leading-none">
                      1
                    </span>
                    <span className="text-xs text-green font-medium">
                      Berhasil Diperbaiki
                    </span>
                  </div>
                </div>

                <div className="w-full py-3 px-4 rounded-full border border-green bg-soft-green/30 flex items-center justify-center gap-2 text-green shadow-sm">
                  <svg
                    width="16"
                    height="16"
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
                  <span className="text-[11px] md:text-xs font-bold tracking-wide">
                    Kontributor aktif sejak September 2026
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-6 flex-1">
                <h4 className="text-sm font-bold text-black mb-4">
                  Riwayat Laporan
                </h4>
                <div className="flex flex-col gap-3 pb-4">
                  {riwayatLaporan.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-3.5 rounded-xl border border-grey bg-white shadow-sm hover:border-green/40 transition-colors cursor-default"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg border border-grey/50 bg-grey-light flex items-center justify-center text-grey-2 shrink-0">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[13px] md:text-[14px] font-bold text-black leading-tight mb-0.5">
                            {item.jalan}
                          </span>
                          <span className="text-[11px] md:text-[12px] text-grey-2">
                            {item.jenis}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-3 py-1.5 rounded-full ${
                          item.statusColor === "orange"
                            ? "bg-soft-orange text-orange border border-orange/30"
                            : "bg-soft-green text-green border border-green/30"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 md:p-6 border-t border-grey shrink-0 bg-white">
              <button className="flex items-center gap-3 w-full text-grey-2 hover:text-black font-bold text-[13px] md:text-sm mb-5 transition-colors">
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
                Pengaturan Akun
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full text-red hover:opacity-80 font-bold text-[13px] md:text-sm transition-opacity"
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
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Keluar dari Akun
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </>
  );
}
