// File: src/components/layout/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo-ratain.png";

export default function Navbar() {
  const location = useLocation();

  // State untuk melacak posisi dan visibilitas navbar
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Deteksi apakah layar sudah discroll ke bawah untuk efek Glassmorphism
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Deteksi arah scroll (sembunyi saat ke bawah, muncul saat ke atas)
      // Angka 80 memberikan sedikit jeda agar tidak terlalu sensitif saat baru mulai scroll
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false); // Sembunyikan navbar
      } else {
        setIsVisible(true); // Munculkan navbar
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return isActive
      ? "px-5 py-2 rounded-full bg-soft-green text-green font-semibold text-sm transition-colors"
      : "px-5 py-2 rounded-full text-grey-2 hover:text-green font-medium text-sm transition-colors";
  };

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm py-2" // Efek Glassmorphism saat di-scroll
          : "bg-white shadow-none py-3" // Putih bersih saat berada paling atas
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

        {/* Bagian Kanan: Tombol Masuk */}
        <Link
          to="/login"
          className="px-6 py-2 rounded-full border border-green text-green font-semibold text-sm hover:bg-soft-green transition-colors"
        >
          Masuk
        </Link>
      </div>
    </nav>
  );
}
