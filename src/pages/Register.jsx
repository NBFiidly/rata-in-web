// File: src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo-ratain.png";

export default function Register() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert(
        "Harap setujui Syarat & Ketentuan dan Kebijakan Privasi terlebih dahulu.",
      );
      return;
    }
    // Simulasi pendaftaran berhasil, lalu berpindah ke halaman Login
    navigate("/login");
  };

  return (
    // Pembungkus utama Split Screen (Layout 50/50 di desktop)
    <div className="min-h-screen w-full flex bg-soft-green font-sans">
      {/* ================= BAGIAN KIRI: ILUSTRASI SVG ================= */}
      {/* Tersembunyi di mobile (hidden), muncul di layar besar (lg:flex) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative overflow-hidden bg-white/40 border-r border-green/20">
        <div className="w-full max-w-md relative z-10">
          {/* Ilustrasi SVG Kustom */}
          <svg
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto drop-shadow-2xl"
          >
            <circle cx="200" cy="200" r="180" fill="#E8F5E9" />
            <circle
              cx="200"
              cy="200"
              r="180"
              stroke="#208144"
              strokeWidth="8"
            />
            <path
              d="M100 150 C 100 130, 140 130, 150 140 C 170 120, 210 140, 200 160 C 220 160, 220 190, 190 190 L 100 190 C 80 190, 80 150, 100 150 Z"
              fill="white"
              opacity="0.8"
            />
            <path
              d="M280 120 C 280 110, 310 110, 320 120 C 330 110, 360 120, 350 140 C 370 140, 370 160, 340 160 L 280 160 C 260 160, 260 120, 280 120 Z"
              fill="white"
              opacity="0.6"
            />
            <rect
              x="120"
              y="180"
              width="50"
              height="90"
              rx="4"
              fill="#A7F3D0"
            />
            <rect x="130" y="190" width="10" height="15" fill="white" />
            <rect x="150" y="190" width="10" height="15" fill="white" />
            <rect x="130" y="220" width="10" height="15" fill="white" />
            <rect x="150" y="220" width="10" height="15" fill="white" />
            <rect
              x="180"
              y="140"
              width="70"
              height="130"
              rx="4"
              fill="#34D399"
            />
            <rect x="195" y="155" width="15" height="20" fill="white" />
            <rect x="220" y="155" width="15" height="20" fill="white" />
            <rect x="195" y="190" width="15" height="20" fill="white" />
            <rect x="220" y="190" width="15" height="20" fill="white" />
            <rect
              x="260"
              y="160"
              width="60"
              height="110"
              rx="4"
              fill="#6EE7B7"
            />
            <rect x="275" y="175" width="10" height="15" fill="white" />
            <rect x="295" y="175" width="10" height="15" fill="white" />
            <path
              d="M 60 310 Q 200 240 250 270 T 360 380"
              stroke="#374151"
              strokeWidth="40"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 60 310 Q 200 240 250 270 T 360 380"
              stroke="white"
              strokeWidth="4"
              strokeDasharray="15 15"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M 90 270 Q 110 210 130 270 Z" fill="#208144" />
            <path d="M 280 280 Q 300 220 320 280 Z" fill="#208144" />
            <path d="M 310 320 Q 330 260 350 320 Z" fill="#059669" />
            <path
              d="M220 200 C 200 200, 200 230, 220 250 C 240 230, 240 200, 220 200 Z"
              fill="#F59E0B"
            />
            <circle cx="220" cy="215" r="5" fill="white" />
          </svg>
        </div>
        <div className="mt-10 text-center max-w-sm">
          <h2 className="text-2xl font-bold text-black mb-3">
            Bergabung dengan Rata.in
          </h2>
          <p className="text-sm text-black/70 leading-relaxed font-medium">
            Jadilah bagian dari solusi. Daftarkan diri Anda untuk mulai
            berkontribusi dalam pelaporan dan perbaikan jalan di kota kita.
          </p>
        </div>
      </div>

      {/* ================= BAGIAN KANAN: FORM REGISTER ASLI ================= */}
      {/* Menggunakan lebar penuh di mobile, setengah layar di desktop */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-soft-green">
        {/* Kontainer Form Asli (Sama persis dengan kode awal tanpa diubah kelasnya) */}
        <div className="bg-white w-full max-w-105 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col items-center my-auto">
          {/* Header Logo & Judul */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="flex items-center gap-2 mb-3">
              <img src={logo} alt="Logo" className="w-24 h-24 object-contain" />
            </div>
            <h1 className="text-[22px] font-bold text-black mb-1">
              Buat Akun Baru
            </h1>
            <p className="text-grey-2 text-sm">
              Bergabung dan mulai laporkan kerusakan jalan.
            </p>
          </div>

          {/* Form Input */}
          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-4 w-full"
          >
            {/* Field: Nama Lengkap */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-sm font-semibold text-black">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Nama Anda"
                className="w-full px-4 py-3 rounded-xl border border-grey-1 text-black placeholder-grey-2 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all"
                required
              />
            </div>

            {/* Field: Email */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-sm font-semibold text-black">Email</label>
              <input
                type="email"
                placeholder="user@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-grey-1 text-black placeholder-grey-2 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all"
                required
              />
            </div>

            {/* Field: Password */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-sm font-semibold text-black">
                Password
              </label>
              <input
                type="password"
                placeholder="Minimal 8 karakter"
                className="w-full px-4 py-3 rounded-xl border border-grey-1 text-black placeholder-grey-2 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all"
                minLength={8}
                required
              />
            </div>

            {/* Field: Konfirmasi Password */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-sm font-semibold text-black">
                Konfirmasi Password
              </label>
              <input
                type="password"
                placeholder="Ulangi password"
                className="w-full px-4 py-3 rounded-xl border border-grey-1 text-black placeholder-grey-2 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all"
                minLength={8}
                required
              />
            </div>

            {/* Checkbox Persetujuan Syarat & Ketentuan */}
            <div className="flex items-start gap-2 mt-1 text-left">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-grey-1 text-green focus:ring-green accent-green cursor-pointer"
                required
              />
              <label
                htmlFor="terms"
                className="text-xs text-grey-2 leading-relaxed cursor-pointer select-none"
              >
                Saya setuju dengan{" "}
                <span className="font-medium text-grey-2">
                  Syarat & Ketentuan
                </span>{" "}
                dan{" "}
                <span className="font-medium text-grey-2">
                  Kebijakan Privasi
                </span>
              </label>
            </div>

            {/* Tombol Buat Akun */}
            <button
              type="submit"
              className="w-full py-3.5 bg-green text-white font-bold rounded-xl hover:opacity-90 transition-opacity mt-2"
            >
              Buat Akun
            </button>
          </form>

          {/* Footer Link */}
          <div className="flex items-center justify-center mt-6">
            <p className="text-sm text-grey-2">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-green font-semibold hover:underline"
              >
                Masuk Sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
