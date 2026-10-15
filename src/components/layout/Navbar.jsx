import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-grey-1 px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Bagian Kiri: Logo (Sementara pakai teks & bentuk basic) */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-green flex items-center justify-center text-white font-bold italic">
          R
        </div>
        <span className="font-bold text-xl text-black">
          Rata.<span className="text-green">in</span>
        </span>
      </div>

      {/* Bagian Tengah: Menu Navigasi */}
      <div className="hidden md:flex items-center gap-2">
        <Link
          to="/"
          className="px-5 py-2 rounded-full bg-soft-green text-green font-semibold text-sm"
        >
          Beranda
        </Link>
        <Link
          to="/report"
          className="px-5 py-2 rounded-full text-grey-2 hover:text-green font-medium text-sm transition-colors"
        >
          Lapor
        </Link>
        {/* (Biarkan Peta dan Status tetap pakai <a> untuk sementara karena belum ada halamannya) */}
        <a
          href="#"
          className="px-5 py-2 rounded-full text-grey-2 hover:text-green font-medium text-sm transition-colors"
        >
          Peta
        </a>
        <a
          href="#"
          className="px-5 py-2 rounded-full text-grey-2 hover:text-green font-medium text-sm transition-colors"
        >
          Status
        </a>
      </div>

      {/* Bagian Kanan: Tombol Masuk */}
      <button className="px-6 py-2 rounded-full border border-green text-green font-semibold text-sm hover:bg-soft-green transition-colors">
        Masuk
      </button>
    </nav>
  );
}
