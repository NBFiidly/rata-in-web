// File: src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo-ratain.png";

export default function Register() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  // State untuk mengontrol visibilitas masing-masing password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State untuk animasi penutupan popup di mobile
  const [isClosing, setIsClosing] = useState(false);

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

  // Fungsi untuk memicu animasi keluar sebelum kembali (tombol silang/backdrop)
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      navigate(-1);
    }, 300);
  };

  // Fungsi navigasi khusus antar modal agar animasi penutup berjalan
  const handleNavigate = (event, path) => {
    event.preventDefault();
    if (window.innerWidth >= 1024) {
      navigate(path);
      return;
    }

    setIsClosing(true);
    setTimeout(() => navigate(path), 300);
  };

  return (
    // ROOT diubah menjadi transparan dan fixed di mobile agar background asli tembus
    <div className="fixed inset-0 z-50 lg:relative lg:z-auto lg:min-h-screen w-full flex bg-transparent lg:bg-soft-green font-inter overflow-hidden">
      {/* ================= BACKDROP GELAP (HANYA MOBILE) ================= */}
      <div
        className={`absolute inset-0 bg-black/40 z-40 lg:hidden ${
          isClosing
            ? "animate-[fadeOut_0.3s_ease-in_forwards]"
            : "animate-[fadeIn_0.3s_ease-out]"
        }`}
        onClick={handleClose}
      ></div>

      {/* ================= BAGIAN KIRI: ILUSTRASI SVG (DESKTOP SAJA) ================= */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative overflow-hidden bg-white/40 border-r border-green/20 z-0">
        <div className="w-full max-w-md relative z-10">
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
        <div className="mt-10 text-center max-w-sm z-10">
          <h2 className="text-2xl font-bold text-black mb-3">
            Bergabung dengan Rata.in
          </h2>
          <p className="text-sm text-black/70 leading-relaxed font-medium">
            Jadilah bagian dari solusi. Daftarkan diri Anda untuk mulai
            berkontribusi dalam pelaporan dan perbaikan jalan di kota kita.
          </p>
        </div>
      </div>

      {/* ================= BAGIAN KANAN: FORM REGISTER ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-12 absolute inset-0 lg:relative z-50 pointer-events-none lg:bg-soft-green">
        <div
          className={`bg-white w-full max-w-90 sm:max-w-md lg:max-w-105 rounded-3xl lg:rounded-3xl p-7 lg:p-10 shadow-2xl flex flex-col items-center pointer-events-auto max-h-[90vh] overflow-y-auto hide-scrollbar lg:max-h-none lg:overflow-visible lg:h-auto ${
            isClosing
              ? "lg:animate-none animate-[slideDownCenter_0.3s_ease-in_forwards]"
              : "lg:animate-none animate-[slideUpCenter_0.4s_cubic-bezier(0.16,1,0.3,1)]"
          }`}
        >
          {/* Header Logo & Judul */}
          <div className="flex flex-col items-center text-center mb-5 lg:mb-6 shrink-0 mt-4 lg:mt-0">
            <div className="flex items-center gap-2 mb-2 lg:mb-3">
              <img
                src={logo}
                alt="Logo"
                className="w-16 h-16 lg:w-24 lg:h-24 object-contain"
              />
            </div>
            <h1 className="text-xl lg:text-[22px] font-bold text-black mb-1">
              Buat Akun Baru
            </h1>
            <p className="text-grey-2 text-xs lg:text-sm">
              Bergabung dan mulai laporkan kerusakan jalan.
            </p>
          </div>

          {/* Form Input */}
          <form
            onSubmit={handleRegister}
            className="flex flex-col gap-3.5 lg:gap-4 w-full shrink-0"
          >
            <div className="flex flex-col gap-1 lg:gap-1.5 text-left">
              <label className="text-[13px] lg:text-sm font-bold text-black">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Nama Anda"
                className="w-full px-4 py-3 rounded-xl border border-grey text-black placeholder-grey-1 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all text-sm font-medium"
                required
              />
            </div>

            <div className="flex flex-col gap-1 lg:gap-1.5 text-left">
              <label className="text-[13px] lg:text-sm font-bold text-black">
                Email
              </label>
              <input
                type="email"
                placeholder="user@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-grey text-black placeholder-grey-1 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all text-sm font-medium"
                required
              />
            </div>

            <div className="flex flex-col gap-1 lg:gap-1.5 text-left">
              <label className="text-[13px] lg:text-sm font-bold text-black">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 8 karakter"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-grey text-black placeholder-grey-1 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all text-sm font-medium"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-grey-2 hover:text-green focus:outline-none transition-colors"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1 lg:gap-1.5 text-left">
              <label className="text-[13px] lg:text-sm font-bold text-black">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Ulangi password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-grey text-black placeholder-grey-1 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all text-sm font-medium"
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-grey-2 hover:text-green focus:outline-none transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 mt-1 text-left">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-grey text-green focus:ring-green accent-green cursor-pointer shrink-0"
                required
              />
              <label
                htmlFor="terms"
                className="text-[11px] lg:text-xs text-grey-2 leading-relaxed cursor-pointer select-none"
              >
                Saya setuju dengan{" "}
                <span className="font-bold text-black">Syarat & Ketentuan</span>{" "}
                dan{" "}
                <span className="font-bold text-black">Kebijakan Privasi</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-green text-white font-bold rounded-xl hover:opacity-90 transition-opacity mt-1"
            >
              Buat Akun
            </button>
          </form>

          <div className="flex items-center justify-center mt-5 mb-4 lg:mb-0 shrink-0">
            <p className="text-[13px] text-grey-2">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                onClick={(event) => handleNavigate(event, "/login")}
                className="text-green font-bold hover:underline"
              >
                Masuk Sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUpCenter { 0% { transform: translateY(100vh); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes slideDownCenter { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(100vh); opacity: 0; } }
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes fadeOut { 0% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>
    </div>
  );
}
