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

  // State untuk animasi penutupan popup di mobile
  const [isClosing, setIsClosing] = useState(false);

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

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      navigate(-1);
    }, 300);
  };

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
          <h2 className="text-2xl font-bold text-black mb-3">Keamanan Akun</h2>
          <p className="text-sm text-black/70 leading-relaxed font-medium">
            Jangan khawatir jika Anda melupakan kata sandi. Kami akan membantu
            Anda memulihkan akses agar Anda bisa kembali menggunakan layanan
            Rata.in.
          </p>
        </div>
      </div>

      {/* ================= BAGIAN KANAN: FORM FORGOT PASSWORD ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-12 absolute inset-0 lg:relative z-50 pointer-events-none lg:bg-soft-green">
        <div
          className={`bg-white w-full max-w-90 sm:max-w-md lg:max-w-105 max-h-[90vh] overflow-y-auto hide-scrollbar lg:max-h-none lg:overflow-visible rounded-3xl lg:rounded-3xl p-7 lg:p-10 shadow-2xl flex flex-col pointer-events-auto ${
            isClosing
              ? "lg:animate-none animate-[slideDownCenter_0.3s_ease-in_forwards]"
              : "lg:animate-none animate-[slideUpCenter_0.4s_cubic-bezier(0.16,1,0.3,1)]"
          }`}
        >
          {/* Header Logo Dinamis */}
          <div className="flex flex-col items-center text-center mb-6 lg:mb-8">
            <div className="flex items-center gap-2 mb-2 lg:mb-4">
              <img
                src={logo}
                alt="Logo"
                className="w-16 h-16 lg:w-24 lg:h-24 object-contain"
              />
            </div>

            {step === 1 && (
              <>
                <h1 className="text-xl lg:text-[22px] font-bold text-black mb-1">
                  Lupa Kata Sandi
                </h1>
                <p className="text-grey-2 text-xs lg:text-sm">
                  Atur ulang Password.
                </p>
              </>
            )}
            {step === 2 && (
              <>
                <h1 className="text-xl lg:text-[22px] font-bold text-black mb-1">
                  Verifikasi OTP
                </h1>
                <p className="text-grey-2 text-xs lg:text-sm">
                  Cek kotak masuk email Anda.
                </p>
              </>
            )}
            {step === 3 && (
              <>
                <h1 className="text-xl lg:text-[22px] font-bold text-black mb-1">
                  Atur Ulang Password
                </h1>
                <p className="text-grey-2 text-xs lg:text-sm px-2 lg:px-4">
                  Buat kata sandi yang kuat untuk akun Anda.
                </p>
              </>
            )}
          </div>

          {/* STEP 1: INPUT EMAIL */}
          {step === 1 && (
            <form
              onSubmit={handleEmailSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[13px] lg:text-sm font-bold text-black">
                  Masukkan Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@gmail.com"
                  className="w-full px-4 py-3 rounded-xl border border-grey text-black placeholder-grey-1 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all text-sm font-medium"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-green text-white font-bold rounded-xl hover:opacity-90 transition-opacity mt-2"
              >
                Kirim
              </button>
              <div className="text-center mt-3">
                <p className="text-[13px] text-grey-2">
                  Sudah ingat password Anda?{" "}
                  <Link
                    to="/login"
                    onClick={(event) => handleNavigate(event, "/login")}
                    className="text-green font-bold hover:underline"
                  >
                    Masuk
                  </Link>
                </p>
              </div>
            </form>
          )}

          {/* STEP 2: INPUT OTP 4 DIGIT */}
          {step === 2 && (
            <form
              onSubmit={handleOtpSubmit}
              className="flex flex-col items-center w-full"
            >
              <p className="text-[13px] lg:text-sm text-black text-center mb-6 px-2 lg:px-4">
                Ketik kode verifikasi yang telah dikirim ke alamat email Anda:
                <br />
                <span className="font-bold text-green">
                  {email || "user@gmail.com"}
                </span>
              </p>
              <div className="flex justify-center gap-2 lg:gap-3 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 lg:w-14 lg:h-14 text-center text-xl lg:text-2xl font-bold rounded-xl border border-grey text-black focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all bg-white"
                  />
                ))}
              </div>
              <p className="text-[11px] lg:text-xs text-grey-2 mb-2 font-medium">
                Kirim ulang OTP dalam 60 detik
              </p>
              <button
                type="button"
                className="text-[13px] lg:text-sm text-black font-bold hover:text-green transition-colors mb-5"
              >
                Kirim ulang
              </button>
              <button
                type="submit"
                disabled={otp.join("").length < 4}
                className={`w-full py-3 font-bold rounded-xl transition-all ${
                  otp.join("").length === 4
                    ? "bg-green text-white hover:opacity-90"
                    : "bg-grey-light border border-grey text-grey-2 cursor-not-allowed"
                }`}
              >
                Verifikasi OTP
              </button>
            </form>
          )}

          {/* STEP 3: BUAT PASSWORD BARU */}
          {step === 3 && (
            <form
              onSubmit={handlePasswordSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[13px] lg:text-sm font-bold text-black">
                  Password Baru
                </label>
                <input
                  type="password"
                  placeholder="Minimal 8 karakter"
                  className="w-full px-4 py-3 rounded-xl border border-grey text-black placeholder-grey-1 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all text-sm font-medium"
                  required
                  minLength={8}
                />
              </div>
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[13px] lg:text-sm font-bold text-black">
                  Konfirmasi Password Baru
                </label>
                <input
                  type="password"
                  placeholder="Ulangi password"
                  className="w-full px-4 py-3 rounded-xl border border-grey text-black placeholder-grey-1 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all text-sm font-medium"
                  required
                  minLength={8}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-green text-white font-bold rounded-xl hover:opacity-90 transition-opacity mt-2"
              >
                Simpan Password Baru
              </button>
            </form>
          )}
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
