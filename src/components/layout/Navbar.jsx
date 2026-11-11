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

const mobileNavItems = [
  { path: "/", label: "Beranda", icon: "home" },
  { path: "/report", label: "Lapor", icon: "report" },
  { path: "/peta", label: "Peta", icon: "map" },
  { path: "/status", label: "Status", icon: "status" },
];

let lastMobileNavIndex;

function MobileNavIcon({ icon, active }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "white" : "var(--color-grey-2)"}
      strokeWidth={active ? "2.5" : "2"}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icon === "home" && (
        <>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </>
      )}
      {icon === "report" && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </>
      )}
      {icon === "map" && (
        <>
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
          <line x1="8" y1="2" x2="8" y2="18"></line>
          <line x1="16" y1="6" x2="16" y2="22"></line>
        </>
      )}
      {icon === "status" && (
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      )}
    </svg>
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileClosing, setIsProfileClosing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true",
  );

  const routeActiveIndex = Math.max(
    0,
    mobileNavItems.findIndex((item) => item.path === location.pathname),
  );
  const [activeIndex, setActiveIndex] = useState(
    () => lastMobileNavIndex ?? routeActiveIndex,
  );

  useEffect(() => {
    lastMobileNavIndex = routeActiveIndex;
    const frame = requestAnimationFrame(() => setActiveIndex(routeActiveIndex));
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, routeActiveIndex]);

  const activeCenter = 4 + ((activeIndex + 0.5) * 92) / mobileNavItems.length;
  const activeCenterX = activeCenter * 10;
  const navBackgroundPath = `M40 0 H${activeCenterX - 100} C${activeCenterX - 55} 0 ${activeCenterX - 55} 36 ${activeCenterX} 36 C${activeCenterX + 55} 36 ${activeCenterX + 55} 0 ${activeCenterX + 100} 0 H960 Q1000 0 1000 20 V80 Q1000 100 960 100 H40 Q0 100 0 80 V20 Q0 0 40 0 Z`;

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

  const handleOpenAuth = () => {
    window.dispatchEvent(
      new CustomEvent("openAuthModal", {
        detail: { type: "login", direction: "none" },
      }),
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
    closeProfile();
    navigate("/");
  };

  // --- MENGUNCI LAYAR SAAT MODAL PROFIL DIBUKA ---
  useEffect(() => {
    if (isProfileOpen) {
      document.body.classList.add("profile-modal-active");
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll";
    } else {
      document.body.classList.remove("profile-modal-active");
      if (!document.body.classList.contains("auth-modal-active")) {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflowY = "";
        if (scrollY) window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
  }, [isProfileOpen]);

  useEffect(() => {
    const checkLoginStatus = () =>
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    window.addEventListener("storage", checkLoginStatus);
    window.addEventListener("authChange", checkLoginStatus);
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("authChange", checkLoginStatus);
    };
  }, []);

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
    const contentScroller = document.querySelector(
      ".home-scroll-content, .mobile-route-scroll",
    );
    const handleScroll = () => {
      const contentScrolled = contentScroller
        ? contentScroller.scrollTop > 20
        : false;
      setIsScrolled(window.scrollY > 20 || contentScrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    if (contentScroller) {
      contentScroller.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (contentScroller) {
        contentScroller.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Class untuk menu pada versi Desktop
  const getDesktopLinkClass = (path) =>
    `flex items-center justify-center w-24 h-10 rounded-lg text-sm transition-colors whitespace-nowrap ${location.pathname === path ? "bg-soft-green text-green font-bold" : "text-grey-2 hover:text-green font-medium"}`;

  return (
    <>
      {/* 1. NAVBAR DESKTOP (Hanya Tampil di Layar Besar - Top Bar) */}
      <nav
        className={`fixed top-0 left-0 z-50 w-full bg-white border-b border-grey-light transition-shadow duration-300 hidden md:block ${isScrolled ? "shadow-sm" : ""}`}
      >
        <div className="max-w-6xl mx-auto px-8 bg-white">
          <div className="flex justify-between items-center h-18">
            <div className="w-1/3 flex justify-start">
              <Link to="/" className="flex items-center shrink-0">
                <img
                  src={logo}
                  alt="Rata.in Logo"
                  className="h-12 w-auto object-contain"
                />
              </Link>
            </div>
            <div className="flex w-1/3 items-center justify-center gap-2">
              <Link to="/" className={getDesktopLinkClass("/")}>
                Beranda
              </Link>
              <Link to="/report" className={getDesktopLinkClass("/report")}>
                Lapor
              </Link>
              <Link to="/peta" className={getDesktopLinkClass("/peta")}>
                Peta
              </Link>
              <Link to="/status" className={getDesktopLinkClass("/status")}>
                Status
              </Link>
            </div>
            <div className="w-1/3 flex justify-end">
              {isLoggedIn ? (
                <button
                  onClick={openProfile}
                  className="w-11 h-11 shrink-0 rounded-full bg-soft-green flex items-center justify-center border border-transparent hover:border-green transition-all overflow-hidden cursor-pointer"
                >
                  <img
                    src={logo}
                    alt="Profile"
                    className="w-7 h-7 object-contain"
                  />
                </button>
              ) : (
                <button
                  onClick={handleOpenAuth}
                  className="px-5 py-2 shrink-0 rounded-lg border border-green text-green font-semibold text-sm hover:bg-soft-green transition-colors cursor-pointer"
                >
                  Masuk
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* HEADER MOBILE (Top Bar khusus Mobile: Logo Kiri & Profil Kanan) */}
      <div
        className={`fixed top-0 left-0 z-50 w-full bg-white/90 backdrop-blur-sm transition-all duration-300 md:hidden flex justify-between items-center h-16 px-5 ${isScrolled ? "shadow-sm" : ""}`}
      >
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={logo}
            alt="Rata.in Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>
        <div className="flex items-center">
          {isLoggedIn ? (
            <button
              onClick={openProfile}
              className="w-10 h-10 shrink-0 rounded-full bg-soft-green flex items-center justify-center border border-transparent hover:border-green transition-all overflow-hidden cursor-pointer"
            >
              <img
                src={logo}
                alt="Profile"
                className="w-6 h-6 object-contain"
              />
            </button>
          ) : (
            <button
              onClick={handleOpenAuth}
              className="px-5 py-2 shrink-0 rounded-lg border border-green text-green font-bold text-sm hover:bg-soft-green transition-colors cursor-pointer"
            >
              Masuk
            </button>
          )}
        </div>
      </div>

      {/* 2. NAVBAR MOBILE (Docked Bottom Bar dengan Animated Concave Notch) */}
      <nav
        aria-label="Navigasi utama"
        className="fixed inset-x-0 bottom-0 z-50 md:hidden"
        style={{ height: "calc(78px + env(safe-area-inset-bottom))" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 bg-white"
          style={{ height: "env(safe-area-inset-bottom)" }}
        />
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[78px] w-full overflow-visible drop-shadow-[0_-2px_8px_rgba(0,0,0,0.06)]"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            style={{
              d: `path("${navBackgroundPath}")`,
              transition: "d 420ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
        </svg>

        {/* Container Ikon (Grid flexbox agar sejajar) */}
        <div className="relative z-10 flex h-[78px] w-full items-center px-[4%]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 z-20 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-green shadow-[0_8px_18px_rgba(49,170,94,0.35)]"
            style={{
              left: `${activeCenter}%`,
              transform: "translate(-50%, -50%)",
              transition: "left 420ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <MobileNavIcon icon={mobileNavItems[activeIndex].icon} active />
          </div>

          {/* Menu Beranda */}
          <Link
            to="/"
            aria-current={activeIndex === 0 ? "page" : undefined}
            className="relative flex h-full flex-1 flex-col items-center justify-center gap-1"
          >
            {/* Ikon Inaktif (Tampil saat tidak dipilih) */}
            <div
              className={`transition-all duration-300 ${activeIndex === 0 ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-grey-2)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>

            <span
              className={`text-[10px] leading-[1.2] transition-all duration-300 ${activeIndex === 0 ? "text-green font-bold -translate-y-2.5" : "text-grey-2 font-medium"}`}
            >
              Beranda
            </span>
          </Link>

          {/* Menu Lapor */}
          <Link
            to="/report"
            aria-current={activeIndex === 1 ? "page" : undefined}
            className="relative flex h-full flex-1 flex-col items-center justify-center gap-1"
          >
            <div
              className={`transition-all duration-300 ${activeIndex === 1 ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-grey-2)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </div>

            <span
              className={`text-[10px] leading-[1.2] transition-all duration-300 ${activeIndex === 1 ? "text-green font-bold -translate-y-2.5" : "text-grey-2 font-medium"}`}
            >
              Lapor
            </span>
          </Link>

          {/* Menu Peta */}
          <Link
            to="/peta"
            aria-current={activeIndex === 2 ? "page" : undefined}
            className="relative flex h-full flex-1 flex-col items-center justify-center gap-1"
          >
            <div
              className={`transition-all duration-300 ${activeIndex === 2 ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-grey-2)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                <line x1="8" y1="2" x2="8" y2="18"></line>
                <line x1="16" y1="6" x2="16" y2="22"></line>
              </svg>
            </div>

            <span
              className={`text-[10px] leading-[1.2] transition-all duration-300 ${activeIndex === 2 ? "text-green font-bold -translate-y-2.5" : "text-grey-2 font-medium"}`}
            >
              Peta
            </span>
          </Link>

          {/* Menu Status */}
          <Link
            to="/status"
            aria-current={activeIndex === 3 ? "page" : undefined}
            className="relative flex h-full flex-1 flex-col items-center justify-center gap-1"
          >
            <div
              className={`transition-all duration-300 ${activeIndex === 3 ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-grey-2)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>

            <span
              className={`text-[10px] leading-[1.2] transition-all duration-300 ${activeIndex === 3 ? "text-green font-bold -translate-y-2.5" : "text-grey-2 font-medium"}`}
            >
              Status
            </span>
          </Link>
        </div>
      </nav>

      {/* ================= MODAL PROFIL ================= */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end font-inter overflow-hidden">
          <div
            className={`absolute inset-0 bg-black/40 ${isProfileClosing ? "animate-[fadeOut_0.3s_ease-in_forwards]" : "animate-[fadeIn_0.3s_ease-out]"}`}
            onClick={closeProfile}
          ></div>
          <div
            className={`relative w-full md:w-[400px] h-dvh bg-white shadow-2xl flex flex-col ${isProfileClosing ? "animate-[slideOutRight_0.3s_ease-in_forwards]" : "animate-[slideInRight_0.3s_ease-out]"}`}
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
            <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col pb-20 md:pb-0">
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
                        className={`text-[10px] font-bold px-3 py-1.5 rounded-full ${item.statusColor === "orange" ? "bg-soft-orange text-orange border border-orange/30" : "bg-soft-green text-green border border-green/30"}`}
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
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideOutRight { from { transform: translateX(0); } to { transform: translateX(100%); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
      `}</style>
    </>
  );
}
