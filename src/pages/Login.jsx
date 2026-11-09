// File: src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo-ratain.png";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    window.dispatchEvent(new Event("authChange"));
    navigate("/status");
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      navigate(-1);
    }, 300);
  };

  return (
    <div className="min-h-screen w-full flex font-inter bg-grey-light lg:bg-soft-green relative overflow-hidden">
      <div className="absolute inset-0 flex flex-col items-center pt-32 px-4 lg:hidden opacity-40 pointer-events-none z-0">
        <div className="w-40 h-32 bg-soft-green rounded-full blur-xl mb-4"></div>
        <h2 className="text-xl font-bold text-black mb-2">
          Masuk dulu untuk melihat
        </h2>
        <h2 className="text-xl font-bold text-black mb-4">
          status laporan Anda
        </h2>
      </div>

      <div
        className={`absolute inset-0 bg-black/40 z-40 lg:hidden ${
          isClosing
            ? "animate-[fadeOut_0.3s_ease-in_forwards]"
            : "animate-[fadeIn_0.3s_ease-out]"
        }`}
        onClick={handleClose}
      ></div>

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
            Bersama Rata.in
          </h2>
          <p className="text-sm text-black/70 leading-relaxed font-medium">
            Langkah awal menuju jalanan yang lebih aman. Masuk ke akun Anda
            untuk mulai melaporkan kerusakan infrastruktur.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-12 absolute inset-0 lg:relative z-50 pointer-events-none lg:bg-soft-green">
        <div
          className={`bg-white w-full max-w-90 sm:max-w-md lg:max-w-105 rounded-3xl p-7 lg:p-10 shadow-2xl flex flex-col pointer-events-auto ${
            isClosing
              ? "lg:animate-none animate-[slideDownCenter_0.3s_ease-in_forwards]"
              : "lg:animate-none animate-[slideUpCenter_0.4s_cubic-bezier(0.16,1,0.3,1)]"
          }`}
        >
          <div className="flex flex-col items-center text-center mb-6 lg:mb-8">
            <img
              src={logo}
              alt="Rata.in Logo"
              className="h-16 w-16 lg:h-24 lg:w-24 object-contain mb-2 lg:mb-3"
            />
            <h1 className="text-xl lg:text-[22px] font-bold text-black mb-1 lg:mb-2">
              Masuk ke Rata.in
            </h1>
            <p className="text-grey-2 text-xs lg:text-sm">
              Laporkan kerusakan jalan di sekitar Anda
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 lg:gap-5 w-full"
          >
            <div className="flex flex-col gap-1.5 text-left">
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

            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-[13px] lg:text-sm font-bold text-black">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan Password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-grey text-black placeholder-grey-1 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all text-sm font-medium"
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

            <div className="flex items-center justify-between mt-0.5 mb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-grey text-green focus:ring-green accent-green"
                />
                <span className="text-[13px] text-grey-2 font-medium">
                  ingat saya
                </span>
              </label>
              <Link
                to="/forgot-password"
                onClick={handleClose}
                className="text-[13px] text-[#3b82f6] hover:underline font-bold"
              >
                Lupa Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Masuk
            </button>
          </form>

          <div className="flex flex-col items-center mt-5 lg:mt-6">
            <p className="text-[13px] text-grey-2 mb-5">
              Belum punya akun?{" "}
              <Link
                to="/register"
                onClick={handleClose}
                className="text-green font-bold hover:underline"
              >
                Daftar sekarang
              </Link>
            </p>

            <div className="flex items-center w-full mb-5">
              <div className="flex-1 h-px bg-grey"></div>
              <span className="px-3 text-[11px] text-grey-1 uppercase tracking-wider font-bold">
                atau
              </span>
              <div className="flex-1 h-px bg-grey"></div>
            </div>

            <button
              type="button"
              className="w-full py-3 bg-white border border-grey rounded-xl flex items-center justify-center gap-3 hover:bg-grey-light transition-colors shadow-sm font-bold text-[13px] text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="18px"
                height="18px"
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

      <style>{`
        @keyframes slideUpCenter { 0% { transform: translateY(100vh); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes slideDownCenter { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(100vh); opacity: 0; } }
        @keyframes fadeIn { 0% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes fadeOut { 0% { opacity: 1; } 100% { opacity: 0; } }
      `}</style>
    </div>
  );
}
