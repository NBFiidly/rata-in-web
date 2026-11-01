// File: src/components/layout/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo-ratain.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  // State untuk melacak status login reaktif
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );

  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef(null);
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
    lastScrollYRef.current = 0;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowDropdown(false);

    const timer = setTimeout(() => {
      setIsScrolled(false);
      setIsVisible(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Logika Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 80) {
        setIsVisible(false);
        scrollTimeoutRef.current = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
      } else {
        setIsVisible(true);
      }
      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
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
      ? "px-5 py-2 md:rounded-lg rounded-md bg-[#DCFCE7] text-[#16A34A] font-semibold text-sm transition-colors whitespace-nowrap"
      : "px-5 py-2 md:rounded-lg rounded-md text-[#64748B] hover:text-[#16A34A] font-medium text-sm transition-colors whitespace-nowrap";
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 bg-white transition-transform duration-500 ease-in-out border-b border-[#E2E8F0] ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isScrolled ? "shadow-sm" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* BARIS 1: Logo & Auth (Mobile & Desktop) */}
        <div className="flex justify-between items-center h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Rata.in Logo"
              className="h-9 md:h-12 w-auto object-contain"
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
          <div className="shrink-0 relative" ref={dropdownRef}>
            {isLoggedIn ? (
              <div>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#E8F5E9] flex items-center justify-center border border-transparent hover:border-[#22C55E] transition-all overflow-hidden"
                >
                  <img
                    src={logo}
                    alt="Profile"
                    className="w-5 h-5 md:w-7 md:h-7 object-contain"
                  />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2E8F0] rounded-xl shadow-lg py-2 z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-[#EF4444] font-semibold hover:bg-[#FEE2E2] transition-colors"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-md md:rounded-lg border border-green text-green font-semibold text-sm hover:bg-[#F0FDF4] transition-colors"
              >
                Masuk
              </Link>
            )}
          </div>
        </div>

        {/* BARIS 2: Menu Mobile (Sembunyi di Desktop) */}
        <div className="flex md:hidden items-center gap-2 py-3 border-t border-[#F1F5F9] overflow-x-auto hide-scrollbar">
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
