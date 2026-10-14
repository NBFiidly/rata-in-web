// File: src/components/layout/Footer.jsx
export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-grey-1 pt-12 pb-16 mt-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-10 md:gap-4">
        {/* Kolom Kiri: Logo & Deskripsi */}
        <div className="flex flex-col gap-4 max-w-[320px]">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green flex items-center justify-center text-white font-bold italic">
              R
            </div>
            <span className="font-bold text-xl text-black">
              Rata.<span className="text-green">in</span>
            </span>
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
