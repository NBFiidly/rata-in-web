// File: src/components/layout/Footer.jsx
import logo from "../../assets/img/logo-ratain.png";

export default function Footer() {
  return (
    <footer className="w-full bg-white pt-12 pb-16 mt-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-10 md:gap-4">
        {/* Kolom Kiri: Logo & Deskripsi */}
        <div className="flex flex-col gap-4 max-w-[320px]">
          {/* Logo Gambar Rata.in */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="Rata.in Logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          {/* Deskripsi */}
          <p className="text-black text-sm leading-relaxed">
            Platform pelaporan kerusakan jalan berbasis AI untuk mendukung kota
            yang lebih baik dan berkelanjutan.
          </p>
        </div>

        {/* Kolom Kanan: Tautan Navigasi */}
        <div className="flex flex-wrap gap-16 md:gap-24">
          {/* Kolom Platform */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-black text-base">Platform</h4>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="text-black text-sm hover:text-green transition-colors"
              >
                Beranda
              </a>
              <a
                href="#"
                className="text-black text-sm hover:text-green transition-colors"
              >
                Lapor Kerusakan
              </a>
              <a
                href="#"
                className="text-black text-sm hover:text-green transition-colors"
              >
                Peta Kerusakan
              </a>
              <a
                href="#"
                className="text-black text-sm hover:text-green transition-colors"
              >
                Status Laporan
              </a>
            </div>
          </div>

          {/* Kolom Informasi */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-black text-base">Informasi</h4>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="text-black text-sm hover:text-green transition-colors"
              >
                Tentang Kami
              </a>
              <a
                href="#"
                className="text-black text-sm hover:text-green transition-colors"
              >
                Kebijakan Privasi
              </a>
              <a
                href="#"
                className="text-black text-sm hover:text-green transition-colors"
              >
                Syarat & Ketentuan
              </a>
              <a
                href="#"
                className="text-black text-sm hover:text-green transition-colors"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
