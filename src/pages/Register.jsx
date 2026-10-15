// File: src/pages/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="min-h-screen w-full bg-soft-green flex items-center justify-center px-4 py-8">
      {/* Card Sign Up */}
      <div className="bg-white w-full max-w-105 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col items-center">
        {/* Header Logo & Judul */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-green flex items-center justify-center text-white font-bold italic">
              R
            </div>
            <span className="font-bold text-2xl text-black">
              Rata.<span className="text-green">in</span>
            </span>
          </div>
          <h1 className="text-[22px] font-bold text-black mb-1">
            Buat Akun Baru
          </h1>
          <p className="text-grey-2 text-sm">
            Bergabung dan mulai laporkan kerusakan jalan.
          </p>
        </div>

        {/* Form Input */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full">
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
            <label className="text-sm font-semibold text-black">Password</label>
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
              <span className="font-medium text-grey-2">Kebijakan Privasi</span>
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
  );
}
