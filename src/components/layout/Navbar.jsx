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

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoginClosing, setIsLoginClosing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const openLogin = () => {
    setIsLoginClosing(false);
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginClosing(true);
    setTimeout(() => {
      setIsLoginOpen(false);
      setIsLoginClosing(false);
      setShowPassword(false);
    }, 300);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    window.dispatchEvent(new Event("authChange"));
    closeLogin();
  };

  useEffect(() => {
    const handleOpenLogin = () => openLogin();
    window.addEventListener("openLogin", handleOpenLogin);
    return () => window.removeEventListener("openLogin", handleOpenLogin);
  }, []);

  useEffect(() => {
    if (isProfileOpen || isLoginOpen) {
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
  }, [isProfileOpen, isLoginOpen]);

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

  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setIsProfileOpen(false);
      setIsProfileClosing(false);
      setIsLoginOpen(false);
      setIsLoginClosing(false);
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
    closeProfile();
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
                >
                  <img
                    src={logo}
                    alt="Profile"
                    className="w-5 h-5 md:w-7 md:h-7 object-contain"
                  />
                </button>
              ) : (
                <button
                  onClick={openLogin}
                  className="px-4 md:px-5 py-2 shrink-0 rounded-md md:rounded-lg border border-green text-green font-semibold text-sm hover:bg-soft-green transition-colors cursor-pointer"
                >
                  Masuk
                </button>
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

      {/* MODAL LOGIN */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-120 flex justify-center items-center p-4 font-inter overflow-hidden">
          <div
            className={`absolute inset-0 bg-black/40 ${
              isLoginClosing
                ? "animate-[fadeOut_0.3s_ease-in_forwards]"
                : "animate-[fadeIn_0.3s_ease-out]"
            }`}
            onClick={closeLogin}
          ></div>

          <div
            className={`relative bg-white w-full max-w-90 md:max-w-md rounded-3xl p-7 lg:p-10 shadow-2xl flex flex-col ${
              isLoginClosing
                ? "animate-[slideDownCenter_0.3s_ease-in_forwards]"
                : "animate-[slideUpCenter_0.4s_cubic-bezier(0.16,1,0.3,1)]"
            }`}
          >
            <div className="flex flex-col items-center text-center mb-6 lg:mb-8">
              <img
                src={logo}
                alt="Rata.in Logo"
                className="h-16 w-16 lg:h-20 lg:w-20 object-contain mb-2 lg:mb-3"
              />
              <h1 className="text-xl lg:text-[22px] font-bold text-black mb-1 lg:mb-2">
                Masuk ke Rata.in
              </h1>
              <p className="text-grey-2 text-xs lg:text-sm">
                Laporkan kerusakan jalan di sekitar Anda
              </p>
            </div>

            <form
              onSubmit={handleLoginSubmit}
              className="flex flex-col gap-4 lg:gap-5 w-full"
            >
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[13px] lg:text-sm font-bold text-black">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="user@gmail.com"
                  className="w-full px-4 py-3 rounded-xl border border-grey text-black placeholder-grey-1 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all text-sm font-medium"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[13px] lg:text-sm font-bold text-black">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan Password"
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-grey text-black placeholder-grey-1 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all text-sm font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-grey-2 hover:text-green focus:outline-none transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-0.5 mb-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-grey text-green focus:ring-green accent-green"
                  />
                  <span className="text-[13px] text-grey-2 font-medium">
                    ingat saya
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  onClick={closeLogin}
                  className="text-[13px] text-[#3b82f6] hover:underline font-bold"
                >
                  Lupa Password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-green text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                Masuk
              </button>
            </form>

            <div className="flex flex-col items-center mt-5 lg:mt-6">
              <p className="text-[13px] text-grey-2 mb-5">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  onClick={closeLogin}
                  className="text-green font-bold hover:underline"
                >
                  Daftar sekarang
                </Link>
              </p>

              <div className="flex items-center w-full mb-5">
                <div className="flex-1 h-px bg-grey"></div>
                <span className="px-3 text-[11px] text-grey-1 uppercase tracking-wider font-bold">
                  atau
                </span>
                <div className="flex-1 h-px bg-grey"></div>
              </div>

              <button
                type="button"
                className="w-full py-3 bg-white border border-grey rounded-xl flex items-center justify-center gap-3 hover:bg-grey-light transition-colors shadow-sm font-bold text-[13px] text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="18px"
                  height="18px"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                Masuk dengan Google
              </button>
            </div>
          </div>
        </div>
      )}

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
            {/* Header Modal Profil */}
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
            {/* Isi Profil */}
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
                        className={`text-[10px] font-bold px-3 py-1.5 rounded-full ${item.statusColor === "orange" ? "bg-soft-orange text-orange border border-orange/30" : "bg-soft-green text-green border border-green/30"}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Footer Profil */}
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
        @keyframes slideUpCenter { 0% { transform: translateY(100vh); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes slideDownCenter { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(100vh); opacity: 0; } }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes slideOutRight { from { transform: translateX(0); } to { transform: translateX(100%); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
      `}</style>
    </>
  );
}
