// File: src/features/report/ConfirmStep.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmStep() {
  // State untuk melacak apakah form sudah dikirim
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  // Fungsi simulasi pengiriman laporan
  const handleSubmit = () => {
    // Di aplikasi nyata, di sini adalah tempat memanggil API backend (fetch/axios)
    setIsSubmitted(true);
  };

  // ----------------------------------------------------------------
  // KONDISI 1: TAMPILAN SUKSES (Setelah tombol kirim ditekan)
  // ----------------------------------------------------------------
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 w-full text-center">
        {/* Ikon Centang Hijau Besar */}
        <div className="w-20 h-20 bg-soft-green rounded-full flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-green)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-black mb-2">
          Laporan Terkirim!
        </h2>
        <p className="text-black font-medium mb-4">
          ID Laporan: <span className="font-bold">#RTN-2026-0003</span>
        </p>
        <p className="text-grey-2 mb-8 max-w-md">
          Laporan Anda telah berhasil dikirim dan akan diverifikasi oleh tim
          kami dalam 24 jam.
        </p>

        {/* Tombol Selesai, menuju halaman status */}
        <button
          onClick={() => navigate("/status")}
          className="px-8 py-3 bg-green text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Selesai
        </button>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // KONDISI 2: TAMPILAN RINGKASAN KONFIRMASI (Sebelum dikirim)
  // ----------------------------------------------------------------
  return (
    <div className="flex flex-col w-full text-left py-4">
      {/* Header Langkah 4 */}
      <h2 className="text-2xl font-bold text-black mb-1">Konfirmasi Laporan</h2>
      <p className="text-grey-2 mb-6">
        Periksa kembali detail laporan sebelum mengirim
      </p>

      <div className="flex flex-col gap-3 mb-6">
        {/* Baris 1: Foto */}
        <div className="flex items-center gap-4 p-4 border border-grey-1 rounded-xl bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-grey-2)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
          <div>
            <p className="text-xs text-grey-2 mb-0.5">Foto</p>
            <p className="text-sm font-semibold text-black">
              foto_jalan_rusak.jpg
            </p>
          </div>
        </div>

        {/* Baris 2: Lokasi */}
        <div className="flex items-center gap-4 p-4 border border-grey-1 rounded-xl bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#DD4343"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <div>
            <p className="text-xs text-grey-2 mb-0.5">Lokasi</p>
            <p className="text-sm font-semibold text-black">
              Jl. Engku Putri, Batam Kota
            </p>
          </div>
        </div>

        {/* Baris 3: Jenis Kerusakan */}
        <div className="flex items-center gap-4 p-4 border border-grey-1 rounded-xl bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#31AA5E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <div>
            <p className="text-xs text-grey-2 mb-0.5">Jenis Kerusakan</p>
            <p className="text-sm font-semibold text-black">
              Lubang Jalan (Road Pothole)
            </p>
          </div>
        </div>

        {/* Baris 4: Keparahan */}
        <div className="flex items-center gap-4 p-4 border border-grey-1 rounded-xl bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ed8936"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
          <div>
            <p className="text-xs text-grey-2 mb-0.5">Keparahan</p>
            <p className="text-sm font-semibold text-black uppercase">
              Berat - High
            </p>
          </div>
        </div>
      </div>

      {/* Textarea Catatan Tambahan */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-black mb-2">
          Catatan Tambahan (opsional)
        </label>
        <textarea
          className="w-full p-4 border border-grey-1 rounded-xl bg-white text-sm text-black placeholder-grey-2 focus:outline-none focus:border-green transition-colors resize-none"
          rows="3"
          placeholder="Tambahkan keterangan lain jika diperlukan..."
        ></textarea>
      </div>

      {/* Tombol Kirim */}
      <button
        onClick={handleSubmit}
        className="w-full py-3.5 bg-green text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        Kirim Laporan
      </button>
    </div>
  );
}
