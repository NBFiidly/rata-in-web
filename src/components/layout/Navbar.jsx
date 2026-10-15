// File: src/components/layout/Navbar.jsx
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo-ratain.png";

export default function Navbar() {
  const location = useLocation();

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return isActive
      ? "px-5 py-2 rounded-full bg-soft-green text-green font-semibold text-sm transition-colors"
      : "px-5 py-2 rounded-full text-grey-2 hover:text-green font-medium text-sm transition-colors";
  };

  return (
    <nav className="w-full bg-white border-b border-grey-1 sticky top-0 z-50 py-2">
      {/* Bungkusan max-w-6xl mx-auto px-4 membuat posisi logo dan tombol Masuk sejajar dengan konten halaman & mendekat ke menu tengah */}
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Bagian Kiri: Logo Asli (Ukuran tinggi disesuaikan presisi 60-66px sesuai Figma) */}
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
