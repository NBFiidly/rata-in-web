// File: src/pages/Login.jsx
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo-ratain.png";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/status");
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
          <h2 className="text-2xl font-extrabold text-black mb-3">
            Bersama Rata.in
          </h2>
          <p className="text-sm text-black/70 leading-relaxed font-medium">
            Langkah awal menuju jalanan yang lebih aman. Masuk ke akun Anda
            untuk mulai melaporkan kerusakan infrastruktur.
          </p>
        </div>
      </div>

      {/* ================= BAGIAN KANAN: FORM LOGIN ASLI ================= */}
      {/* Menggunakan lebar penuh di mobile, setengah layar di desktop */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-soft-green">
        {/* Kontainer Form Asli (Sama persis dengan kode awal tanpa diubah kelasnya) */}
        <div className="bg-white w-full max-w-[420px] rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col">
          {/* Header Form */}
          <div className="flex flex-col items-center text-center mb-8">
            <img
              src={logo}
              alt="Rata.in Logo"
              className="h-12 w-auto object-contain mb-3"
            />
            <h1 className="text-[22px] font-bold text-black mb-2">
              Masuk ke Rata.in
            </h1>
            <p className="text-grey-2 text-sm">
              Laporkan kerusakan jalan di sekitar Anda.
            </p>
          </div>

          {/* Form Input */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full">
            {/* Field Email */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-sm font-semibold text-black">Email</label>
              <input
                type="email"
                placeholder="user@gmail.com"
                className="w-full px-4 py-3 rounded-xl border border-grey-1 text-black placeholder-grey-2 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all"
                required
              />
            </div>

            {/* Field Password */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-sm font-semibold text-black">
                Password
              </label>
              <input
                type="password"
                placeholder="Masukkan Password"
                className="w-full px-4 py-3 rounded-xl border border-grey-1 text-black placeholder-grey-2 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all"
                required
              />
            </div>

            {/* Opsi Tambahan (Ingat saya & Lupa Password) */}
            <div className="flex items-center justify-between mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-grey-1 text-green focus:ring-green accent-green"
                />
                <span className="text-sm text-black">ingat saya</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-[#3b82f6] hover:underline font-medium"
              >
                Lupa Password?
              </Link>
            </div>

            {/* Tombol Masuk */}
            <button
              type="submit"
              className="w-full py-3.5 bg-green text-white font-bold rounded-xl hover:opacity-90 transition-opacity mt-2"
            >
              Masuk
            </button>
          </form>

          {/* Bagian Bawah Form */}
          <div className="flex flex-col items-center mt-6">
            <p className="text-sm text-grey-2 mb-6">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="text-green font-semibold hover:underline"
              >
                Daftar sekarang
              </Link>
            </p>

            {/* Garis Pemisah */}
            <div className="flex items-center w-full mb-6">
              <div className="flex-1 h-px bg-grey-1"></div>
              <span className="px-4 text-xs text-grey-2 uppercase tracking-wider font-medium">
                atau
              </span>
              <div className="flex-1 h-px bg-grey-1"></div>
            </div>

            {/* Tombol Google */}
            <button
              type="button"
              className="w-full py-3 border border-grey-1 rounded-xl flex items-center justify-center gap-3 hover:bg-grey-light transition-colors font-semibold text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="20px"
                height="20px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Masuk dengan Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
