// File: src/pages/ForgotPassword.jsx
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo-ratain.png";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleOtpChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    // Pembungkus utama Split Screen (Layout 50/50 di desktop)
    <div className="min-h-screen w-full flex bg-soft-green font-sans">
      {/* ================= BAGIAN KIRI: ILUSTRASI SVG ================= */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative overflow-hidden bg-white/40 border-r border-green/20">
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
        <div className="mt-10 text-center max-w-sm">
          <h2 className="text-2xl font-bold text-black mb-3">Keamanan Akun</h2>
          <p className="text-sm text-black/70 leading-relaxed font-medium">
            Jangan khawatir jika Anda melupakan kata sandi. Kami akan membantu
            Anda memulihkan akses agar Anda bisa kembali menggunakan layanan
            Rata.in.
          </p>
        </div>
      </div>

      {/* ================= BAGIAN KANAN: FORM FORGOT PASSWORD ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-soft-green">
        {/* Kontainer Form Asli (Sama persis dengan kode awal tanpa diubah kelasnya) */}
        <div className="bg-white w-full max-w-105 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col my-auto">
          {/* Header Logo Dinamis */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Logo" className="w-24 h-24 object-contain" />
              <span className="font-bold text-2xl text-black"></span>
            </div>

            {step === 1 && (
              <>
                <h1 className="text-[22px] font-bold text-black mb-1">
                  Lupa Kata Sandi
                </h1>
                <p className="text-grey-2 text-sm">Atur ulang Password.</p>
              </>
            )}
            {step === 2 && (
              <>
                <h1 className="text-[22px] font-bold text-black mb-1">
                  Verifikasi OTP
                </h1>
                <p className="text-grey-2 text-sm">
                  Cek kotak masuk email Anda.
                </p>
              </>
            )}
            {step === 3 && (
              <>
                <h1 className="text-[22px] font-bold text-black mb-1">
                  Atur Ulang Password
                </h1>
                <p className="text-grey-2 text-sm px-4">
                  Buat kata sandi yang kuat untuk masuk ke akun Anda.
                </p>
              </>
            )}
          </div>

          {/* --------------------------------------------------- */}
          {/* STEP 1: INPUT EMAIL */}
          {/* --------------------------------------------------- */}
          {step === 1 && (
            <form
              onSubmit={handleEmailSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-sm font-semibold text-black">
                  Masukkan Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@gmail.com"
                  className="w-full px-4 py-3 rounded-xl border border-grey-1 text-black placeholder-grey-2 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-green text-white font-bold rounded-xl hover:opacity-90 transition-opacity mt-2"
              >
                Kirim
              </button>

              <div className="text-center mt-2">
                <p className="text-sm text-grey-2">
                  Sudah ingat password Anda?{" "}
                  <Link
                    to="/login"
                    className="text-green font-semibold hover:underline"
                  >
                    Masuk
                  </Link>
                </p>
              </div>
            </form>
          )}

          {/* --------------------------------------------------- */}
          {/* STEP 2: INPUT OTP 4 DIGIT */}
          {/* --------------------------------------------------- */}
          {step === 2 && (
            <form
              onSubmit={handleOtpSubmit}
              className="flex flex-col items-center w-full"
            >
              <p className="text-sm text-black text-center mb-6 px-4">
                Ketik kode verifikasi yang telah dikirim ke alamat email Anda:
                <br />
                <span className="font-semibold">
                  {email || "user@gmail.com"}
                </span>
              </p>

              {/* Kotak Input 4 Digit */}
              <div className="flex justify-center gap-3 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-14 h-14 text-center text-2xl font-bold rounded-xl border border-grey-1 text-black focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all bg-white"
                  />
                ))}
              </div>

              <p className="text-xs text-grey-2 mb-2">
                Kirim ulang OTP dalam 60 detik
              </p>
              <button
                type="button"
                className="text-sm text-black font-semibold hover:text-green transition-colors mb-6"
              >
                Kirim ulang
              </button>

              {/* Tombol Atur Ulang (Disabled jika OTP belum lengkap) */}
              <button
                type="submit"
                disabled={otp.join("").length < 4}
                className={`w-full py-3.5 font-bold rounded-xl transition-all ${
                  otp.join("").length === 4
                    ? "bg-green text-white hover:opacity-90"
                    : "bg-grey-1 text-grey-2 cursor-not-allowed"
                }`}
              >
                Atur Ulang Password
              </button>
            </form>
          )}

          {/* --------------------------------------------------- */}
          {/* STEP 3: BUAT PASSWORD BARU */}
          {/* --------------------------------------------------- */}
          {step === 3 && (
            <form
              onSubmit={handlePasswordSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-sm font-semibold text-black">
                  Password Baru
                </label>
                <input
                  type="password"
                  placeholder="Minimal 8 karakter"
                  className="w-full px-4 py-3 rounded-xl border border-grey-1 text-black placeholder-grey-2 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all"
                  required
                  minLength={8}
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-sm font-semibold text-black">
                  Konfirmasi Password Baru
                </label>
                <input
                  type="password"
                  placeholder="Ulangi password"
                  className="w-full px-4 py-3 rounded-xl border border-grey-1 text-black placeholder-grey-2 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all"
                  required
                  minLength={8}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-green text-white font-bold rounded-xl hover:opacity-90 transition-opacity mt-2"
              >
                Perbarui Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
