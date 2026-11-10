// File: src/components/auth/AuthModal.jsx
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/img/logo-ratain.png";

export default function AuthModal() {
  const inputRefs = useRef([]);
  const authScrollPosition = useRef(0);

  const [authModal, setAuthModal] = useState(null);
  const [isAuthClosing, setIsAuthClosing] = useState(false);
  const [slideDir, setSlideDir] = useState("none");

  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState(["", "", "", ""]);

  useEffect(() => {
    const handleOpen = (e) => {
      const { type, direction } = e.detail || {
        type: "login",
        direction: "none",
      };
      setSlideDir(direction);
      setAuthModal(type);
      setIsAuthClosing(false);

      if (type === "forgot") {
        setForgotStep(1);
        setForgotOtp(["", "", "", ""]);
        setForgotEmail("");
      }
    };

    window.addEventListener("openAuthModal", handleOpen);
    return () => window.removeEventListener("openAuthModal", handleOpen);
  }, []);

  const isAuthOpen = Boolean(authModal);

  useEffect(() => {
    if (isAuthOpen) {
      document.body.classList.add("auth-modal-active");
      const scrollY = window.scrollY;
      authScrollPosition.current = scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = `${document.documentElement.clientWidth}px`;
      document.body.style.overflowY = "";
    } else {
      document.body.classList.remove("auth-modal-active");
      if (!document.body.classList.contains("profile-modal-active")) {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflowY = "";
        window.scrollTo(0, authScrollPosition.current);
      }
    }
  }, [isAuthOpen]);

  const switchAuth = (type, direction) => {
    setSlideDir(direction);
    setAuthModal(type);
  };

  const closeAuth = () => {
    setIsAuthClosing(true);
    setTimeout(() => {
      setAuthModal(null);
      setIsAuthClosing(false);
      setShowPassword(false);
      setShowRegPassword(false);
      setShowRegConfirmPassword(false);
      setSlideDir("none");
    }, 300);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    window.dispatchEvent(new Event("authChange"));
    closeAuth();
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert(
        "Harap setujui Syarat & Ketentuan dan Kebijakan Privasi terlebih dahulu.",
      );
      return;
    }
    switchAuth("login", "left");
  };
  const handleForgotEmailSubmit = (e) => {
    e.preventDefault();
    setForgotStep(2);
  };
  const handleForgotOtpSubmit = (e) => {
    e.preventDefault();
    setForgotStep(3);
  };
  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    switchAuth("login", "left");
  };

  const handleOtpChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;
    const newOtp = [...forgotOtp];
    newOtp[index] = value.substring(value.length - 1);
    setForgotOtp(newOtp);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !forgotOtp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  if (!authModal) return null;

  return (
    <div className="fixed inset-0 z-120 flex justify-center items-center p-4 md:p-0 font-inter overflow-hidden">
      <div
        className={`absolute inset-0 bg-black/40 ${isAuthClosing ? "animate-[fadeOut_0.3s_ease-in_forwards]" : "animate-[fadeIn_0.3s_ease-out]"}`}
        onClick={closeAuth}
      ></div>

      <div
        className={`relative bg-white w-full max-w-90 md:max-w-md rounded-3xl lg:rounded-3xl p-7 lg:p-10 shadow-2xl flex flex-col pointer-events-auto transition-all duration-300 ease-in-out ${isAuthClosing ? "animate-[slideDownCenter_0.3s_ease-in_forwards]" : "animate-[slideUpCenter_0.4s_cubic-bezier(0.16,1,0.3,1)]"}`}
      >
        <div
          key={authModal}
          className={`w-full flex flex-col ${slideDir === "right" ? "animate-[slideInRightContent_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]" : slideDir === "left" ? "animate-[slideInLeftContent_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]" : "animate-[fadeSlideUpContent_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]"}`}
        >
          {authModal === "login" && (
            <>
              <div className="flex flex-col items-center text-center mb-6 lg:mb-8 shrink-0">
                <img
                  src={logo}
                  alt="Rata.in Logo"
                  className="h-16 w-16 lg:h-20 lg:w-20 object-contain mb-2 lg:mb-3"
                />
                <h1 className="text-xl lg:text-[22px] font-bold text-black mb-1 lg:mb-2">
                  Masuk ke Rata.in
                </h1>
                <p className="text-grey-2 text-xs lg:text-sm">
                  Laporkan kerusakan jalan di sekitar Anda
                </p>
              </div>
              <form
                onSubmit={handleLoginSubmit}
                className="flex flex-col gap-4 lg:gap-5 w-full shrink-0"
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
                  <button
                    type="button"
                    onClick={() => switchAuth("forgot", "right")}
                    className="text-[13px] text-[#3b82f6] hover:underline font-bold bg-transparent border-none p-0 cursor-pointer"
                  >
                    Lupa Password?
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-green text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Masuk
                </button>
              </form>
              <div className="flex flex-col items-center mt-5 lg:mt-6 shrink-0">
                <p className="text-[13px] text-grey-2 mb-5">
                  Belum punya akun?{" "}
                  <button
                    type="button"
                    onClick={() => switchAuth("register", "right")}
                    className="text-green font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
                  >
                    Daftar sekarang
                  </button>
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
            </>
          )}

          {authModal === "register" && (
            <>
              <div className="flex flex-col items-center text-center mb-5 lg:mb-6 shrink-0 mt-2 lg:mt-0">
                <div className="flex items-center gap-2 mb-2 lg:mb-3">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
                  />
                </div>
                <h1 className="text-xl lg:text-[22px] font-bold text-black mb-1">
                  Buat Akun Baru
                </h1>
                <p className="text-grey-2 text-xs lg:text-sm">
                  Bergabung dan mulai laporkan kerusakan jalan.
                </p>
              </div>
              <form
                onSubmit={handleRegisterSubmit}
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
                      type={showRegPassword ? "text" : "password"}
                      placeholder="Minimal 8 karakter"
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-grey text-black placeholder-grey-1 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all text-sm font-medium"
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-grey-2 hover:text-green focus:outline-none transition-colors"
                    >
                      {showRegPassword ? (
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
                      type={showRegConfirmPassword ? "text" : "password"}
                      placeholder="Ulangi password"
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-grey text-black placeholder-grey-1 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all text-sm font-medium"
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowRegConfirmPassword(!showRegConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-grey-2 hover:text-green focus:outline-none transition-colors"
                    >
                      {showRegConfirmPassword ? (
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
                    <span className="font-bold text-black">
                      Syarat & Ketentuan
                    </span>{" "}
                    dan{" "}
                    <span className="font-bold text-black">
                      Kebijakan Privasi
                    </span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-green text-white font-bold rounded-xl hover:opacity-90 transition-opacity mt-1"
                >
                  Buat Akun
                </button>
              </form>
              <div className="flex items-center justify-center mt-5 mb-2 shrink-0">
                <p className="text-[13px] text-grey-2">
                  Sudah punya akun?{" "}
                  <button
                    type="button"
                    onClick={() => switchAuth("login", "left")}
                    className="text-green font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
                  >
                    Masuk Sekarang
                  </button>
                </p>
              </div>
            </>
          )}

          {authModal === "forgot" && (
            <>
              <div className="flex flex-col items-center text-center mb-6 lg:mb-8 shrink-0">
                <div className="flex items-center gap-2 mb-2 lg:mb-4">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
                  />
                </div>
                {forgotStep === 1 && (
                  <>
                    <h1 className="text-xl lg:text-[22px] font-bold text-black mb-1">
                      Lupa Kata Sandi
                    </h1>
                    <p className="text-grey-2 text-xs lg:text-sm">
                      Atur ulang Password.
                    </p>
                  </>
                )}
                {forgotStep === 2 && (
                  <>
                    <h1 className="text-xl lg:text-[22px] font-bold text-black mb-1">
                      Verifikasi OTP
                    </h1>
                    <p className="text-grey-2 text-xs lg:text-sm">
                      Cek kotak masuk email Anda.
                    </p>
                  </>
                )}
                {forgotStep === 3 && (
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
              {forgotStep === 1 && (
                <form
                  onSubmit={handleForgotEmailSubmit}
                  className="flex flex-col gap-4 w-full shrink-0"
                >
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[13px] lg:text-sm font-bold text-black">
                      Masukkan Email
                    </label>
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
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
                  <div className="text-center mt-3 mb-2">
                    <p className="text-[13px] text-grey-2">
                      Sudah ingat password Anda?{" "}
                      <button
                        type="button"
                        onClick={() => switchAuth("login", "left")}
                        className="text-green font-bold hover:underline bg-transparent border-none p-0 cursor-pointer"
                      >
                        Masuk
                      </button>
                    </p>
                  </div>
                </form>
              )}
              {forgotStep === 2 && (
                <form
                  onSubmit={handleForgotOtpSubmit}
                  className="flex flex-col items-center w-full shrink-0"
                >
                  <p className="text-[13px] lg:text-sm text-black text-center mb-6 px-2 lg:px-4">
                    Ketik kode verifikasi yang telah dikirim ke alamat email
                    Anda:
                    <br />
                    <span className="font-bold text-green">
                      {forgotEmail || "user@gmail.com"}
                    </span>
                  </p>
                  <div className="flex justify-center gap-2 lg:gap-3 mb-6">
                    {forgotOtp.map((digit, index) => (
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
                    className="text-[13px] lg:text-sm text-black font-bold hover:text-green transition-colors mb-5 bg-transparent border-none p-0 cursor-pointer"
                  >
                    Kirim ulang
                  </button>
                  <button
                    type="submit"
                    disabled={forgotOtp.join("").length < 4}
                    className={`w-full py-3 font-bold rounded-xl transition-all ${forgotOtp.join("").length === 4 ? "bg-green text-white hover:opacity-90" : "bg-grey-light border border-grey text-grey-2 cursor-not-allowed"}`}
                  >
                    Verifikasi OTP
                  </button>
                </form>
              )}
              {forgotStep === 3 && (
                <form
                  onSubmit={handleNewPasswordSubmit}
                  className="flex flex-col gap-4 w-full shrink-0"
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
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUpCenter { 0% { transform: translateY(100vh); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes slideDownCenter { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(100vh); opacity: 0; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        @keyframes slideInRightContent { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInLeftContent { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeSlideUpContent { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
