// File: src/components/layout/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/logo-ratain.png";

export default function Navbar() {
  const location = useLocation();

  // State HANYA untuk tampilan (UI)
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // useRef untuk melacak data di balik layar tanpa memicu re-render
  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Deteksi efek Glassmorphism
      setIsScrolled(currentScrollY > 20);

      // Bersihkan timer sebelumnya setiap kali ada pergerakan scroll
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // 2. Deteksi arah scroll
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 80) {
        // Jika scroll ke BAWAH: sembunyikan navbar
        setIsVisible(false);

        // Buat timer: Munculkan kembali setelah berhenti scroll selama 1.2 detik
        scrollTimeoutRef.current = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
      } else {
        // Jika scroll ke ATAS: langsung munculkan navbar
        setIsVisible(true);
      }

      // Catat posisi scroll terakhir
      lastScrollYRef.current = currentScrollY;
    };

    // Tambahkan passive: true agar performa scroll browser tetap mulus
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []); // Dependency array kosong agar event listener tidak di-reset terus menerus

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
            className="h-14.5 md:h-12.5 w-auto object-contain"
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
