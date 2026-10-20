// File: src/components/layout/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo-ratain.png";

export default function Navbar() {
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef(null);

  // PERBAIKAN 1: Reset posisi layar dan bentuk navbar setiap pindah halaman
  useEffect(() => {
    window.scrollTo(0, 0); // Kembalikan ke paling atas
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsScrolled(false); // Matikan efek glassmorphism
    setIsVisible(true); // Munculkan navbar
    lastScrollYRef.current = 0;
  }, [location.pathname]); // Akan bereaksi setiap kali link menu diklik

  // PERBAIKAN 2: Logika Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Deteksi efek Glassmorphism
      setIsScrolled(currentScrollY > 20);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Deteksi arah scroll
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 80) {
        setIsVisible(false); // Sembunyikan saat scroll ke bawah

        // Munculkan otomatis jika berhenti scroll 1.2 detik
        scrollTimeoutRef.current = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
      } else {
        setIsVisible(true); // Munculkan saat scroll ke atas
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
