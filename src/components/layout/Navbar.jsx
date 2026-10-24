// File: src/components/layout/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo-ratain.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  // State untuk melacak status login reaktif
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef(null);

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

  // PERBAIKAN: Gunakan setTimeout untuk menghindari "cascading renders" secara sinkronus
  useEffect(() => {
    window.scrollTo(0, 0); 
    lastScrollYRef.current = 0;

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
    window.dispatchEvent(new Event("authChange"));
    navigate("/"); // Redirect ke beranda setelah logout
  };

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return isActive
      ? "px-5 py-2 rounded-full bg-soft-green text-green font-semibold text-sm transition-colors"
      : "px-5 py-2 rounded-full text-grey-2 hover:text-green font-medium text-sm transition-colors";
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm py-2"
          : "bg-white shadow-none py-3"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Bagian Kiri: Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Rata.in Logo"
            className="h-14.5 md:h-16.5 w-auto object-contain"
          />
        </Link>

        {/* Bagian Tengah: Menu Navigasi */}
        <div className="hidden md:flex items-center gap-2">
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

        {/* Bagian Kanan: Logika Login / Logout dengan desain bulatan hijau */}
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              title="Klik untuk Keluar"
              className="w-11 h-11 rounded-full bg-soft-green flex items-center justify-center border border-green/20 hover:ring-2 hover:ring-green transition-all overflow-hidden"
            >
              <img src={logo} alt="Profile" className="w-7 h-7 object-contain" />
            </button>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 rounded-full border border-green text-green font-semibold text-sm hover:bg-soft-green transition-colors inline-block"
            >
              Masuk
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}