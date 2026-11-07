// File: src/features/report/ConfirmStep.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmStep() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  // KONDISI SUKSES
  if (isSubmitted) {
    return (
      <div className="bg-white rounded-[20px] md:rounded-[24px] shadow-sm border border-grey-1 p-8 md:p-16 flex flex-col items-center justify-center text-center w-full min-h-[400px]">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-soft-green rounded-full flex items-center justify-center mb-4 md:mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            className="md:w-10 md:h-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-green)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 className="text-[20px] md:text-[28px] font-bold text-black mb-1 md:mb-2">
          Laporan Terkirim!
        </h2>
        <p className="text-black text-[13px] md:text-base font-medium mb-3 md:mb-4">
          ID Laporan: <span className="font-bold">#RTN-2026-0003</span>
        </p>
        <p className="text-grey-2 text-[12px] md:text-[15px] mb-6 md:mb-8 max-w-[280px] md:max-w-md">
          Laporan Anda telah berhasil dikirim dan akan diverifikasi oleh tim
          kami dalam 24 jam.
        </p>

        <button
          onClick={() => navigate("/status")}
          className="px-8 md:px-12 py-3 md:py-3.5 bg-green text-white rounded-xl text-[13px] md:text-[15px] font-bold hover:opacity-90 transition-opacity shadow-sm"
        >
          Selesai
        </button>
      </div>
    );
  }

  // KONDISI KONFIRMASI
  return (
    <div className="bg-white rounded-[20px] md:rounded-[24px] shadow-sm border border-grey-1 p-5 md:p-10 flex flex-col w-full text-left">
      <h2 className="text-[15px] md:text-[24px] font-bold text-black mb-1 md:mb-2">
        Konfirmasi Laporan
      </h2>
      <p className="text-[11px] md:text-[15px] text-grey-2 mb-4 md:mb-6">
        Periksa kembali detail laporan sebelum mengirim
      </p>

      <div className="flex flex-col gap-2.5 md:gap-4 mb-4 md:mb-6">
        {/* Info 1: Foto */}
        <div className="flex items-center gap-3 p-3 md:p-4 border border-grey-1 rounded-[12px] md:rounded-xl bg-grey-light/30">
          <svg
            width="20"
            height="20"
            className="md:w-6 md:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-grey-2)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <div>
            <p className="text-[10px] md:text-xs text-grey-2 mb-0.5">Foto</p>
            <p className="text-[12px] md:text-[15px] font-bold text-black">
              foto_jalan_rusak.jpg
            </p>
          </div>
        </div>

        {/* Info 2: Lokasi */}
        <div className="flex items-center gap-3 p-3 md:p-4 border border-grey-1 rounded-[12px] md:rounded-xl bg-grey-light/30">
          <svg
            width="20"
            height="20"
            className="md:w-6 md:h-6"
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
            <p className="text-[10px] md:text-xs text-grey-2 mb-0.5">Lokasi</p>
            <p className="text-[12px] md:text-[15px] font-bold text-black">
              Jl. Engku Putri, Batam Kota
            </p>
          </div>
        </div>

        {/* Info 3: Jenis Kerusakan */}
        <div className="flex items-center gap-3 p-3 md:p-4 border border-grey-1 rounded-[12px] md:rounded-xl bg-grey-light/30">
          <svg
            width="20"
            height="20"
            className="md:w-6 md:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#31AA5E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <div>
            <p className="text-[10px] md:text-xs text-grey-2 mb-0.5">
              Jenis Kerusakan
            </p>
            <p className="text-[12px] md:text-[15px] font-bold text-black">
              Lubang Jalan (Road Pothole)
            </p>
          </div>
        </div>

        {/* Info 4: Keparahan */}
        <div className="flex items-center gap-3 p-3 md:p-4 border border-grey-1 rounded-[12px] md:rounded-xl bg-grey-light/30">
          <svg
            width="20"
            height="20"
            className="md:w-6 md:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E56A29"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
          <div>
            <p className="text-[10px] md:text-xs text-grey-2 mb-0.5">
              Keparahan
            </p>
            <p className="text-[12px] md:text-[15px] font-bold text-black uppercase">
              Berat - HIGH
            </p>
          </div>
        </div>
      </div>

      {/* Catatan Tambahan */}
      <div className="mb-4 md:mb-8">
        <label className="block text-[11px] md:text-[14px] font-bold text-black mb-1.5 md:mb-2">
          Catatan Tambahan (opsional)
        </label>
        <textarea
          className="w-full p-3 md:p-4 border border-grey-1 rounded-[12px] md:rounded-xl bg-white text-[12px] md:text-[15px] text-black placeholder-grey-2 focus:outline-none focus:border-green transition-colors resize-none"
          rows="2"
          placeholder="Tambahkan keterangan lain jika diperlukan..."
        ></textarea>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 md:py-4 bg-green text-white rounded-xl text-[12px] md:text-[15px] font-bold hover:opacity-90 transition-opacity shadow-sm"
      >
        Kirim Laporan
      </button>
    </div>
  );
}
