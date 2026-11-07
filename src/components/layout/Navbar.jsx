// File: src/components/layout/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo-ratain.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // State untuk melacak status login reaktif
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  const dropdownRef = useRef(null);

  // Pantau perubahan dari proses Login/Logout
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

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hindari cascading render saat pindah halaman
  useEffect(() => {
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowDropdown(false);
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");

    const timer = setTimeout(() => {
      setIsScrolled(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Logika Scroll
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
    navigate("/");
  };

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return isActive
      ? "px-2.5 py-2 md:px-5 md:rounded-lg rounded-md bg-soft-green text-green font-semibold text-sm transition-colors whitespace-nowrap"
      : "px-2.5 py-2 md:px-5 md:rounded-lg rounded-md text-grey-2 hover:text-green font-medium text-sm transition-colors whitespace-nowrap";
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full bg-white border-b border-grey-light font-inter transition-all ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 bg-white">
        {/* BARIS 1: Logo & Auth (Mobile & Desktop) */}
        <div className="flex justify-between items-center h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Rata.in Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Menu Desktop (Sembunyi di Mobile) */}
          <div className="hidden md:flex items-center justify-center gap-2 flex-1">
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

          {/* Auth (Masuk/Logout) */}
          <div
            className="shrink-0 ml-auto relative flex items-center"
            ref={dropdownRef}
          >
            {isLoggedIn ? (
              <div>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-9 h-9 md:w-11 md:h-11 shrink-0 rounded-full bg-soft-green flex items-center justify-center border border-transparent hover:border-green transition-all overflow-hidden"
                  type="button"
                  aria-label="Buka menu profil"
                  aria-expanded={showDropdown}
                >
                  <img
                    src={logo}
                    alt="Profile"
                    className="w-5 h-5 md:w-7 md:h-7 object-contain"
                  />
                </button>
                {showDropdown && (
                  // z-[60] diubah jadi z-60
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-grey-light rounded-xl shadow-lg py-2 z-60">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red font-semibold hover:bg-soft-red transition-colors"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
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

        {/* BARIS 2: Menu Mobile (Sembunyi di Desktop) */}
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
  );
}
