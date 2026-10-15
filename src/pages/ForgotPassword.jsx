// File: src/pages/ForgotPassword.jsx
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  // State untuk 4 digit OTP
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  // --- Handlers ---
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Lanjut ke step OTP
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setStep(3); // Lanjut ke step Buat Password Baru
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Setelah selesai, kembali ke halaman login
    navigate("/login");
  };

  // Fungsi untuk menangani input OTP (pindah fokus otomatis)
  const handleOtpChange = (index, value) => {
    // Hanya izinkan angka
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    // Ambil karakter terakhir jika user mengetik lebih dari 1 angka
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Pindah ke kotak berikutnya jika diisi
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Pindah ke kotak sebelumnya jika menekan Backspace saat kosong
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="min-h-screen w-full bg-soft-green flex items-center justify-center px-4 py-8">
      <div className="bg-white w-full max-w-105 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col">
        {/* Header Logo Dinamis */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-green flex items-center justify-center text-white font-bold italic">
              R
            </div>
            <span className="font-bold text-2xl text-black">
              Rata.<span className="text-green">in</span>
            </span>
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
                Lupa Password
              </h1>
              <p className="text-grey-2 text-sm">Atur ulang Password.</p>
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
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="text-green font-semibold hover:underline"
                >
                  Daftar sekarang
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
              <span className="font-semibold">{email || "user@gmail.com"}</span>
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
                Atur Ulang Password
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
                Konfirmasi Password
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
  );
}
