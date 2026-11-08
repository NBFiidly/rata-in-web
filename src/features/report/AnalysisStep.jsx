// File: src/features/report/AnalysisStep.jsx
import { useState, useEffect } from "react";

export default function AnalysisStep({ onNext }) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-grey-1 p-8 md:p-16 flex flex-col items-center justify-center gap-4 md:gap-6 w-full min-h-60 md:min-h-75">
        <div className="w-20 h-20 md:w-24 md:h-24 relative flex items-center justify-center">
          <div className="inline-flex p-2 items-center justify-center rounded-full bg-soft-green absolute z-10 w-10 h-10 md:w-12 md:h-12">
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-green)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
          <div className="w-full h-full absolute animate-spin">
            <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
              <path
                d="M50 96C75.4051 96 96 75.4051 96 50C96 24.5949 75.4051 4 50 4C24.5949 4 4 24.5949 4 50C4 75.4051 24.5949 96 50 96Z"
                stroke="var(--color-soft-green)"
                strokeWidth="4"
              />
              <path
                d="M48 4C23.6995 4 4 23.6995 4 48"
                stroke="var(--color-green)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 w-full mt-2">
          <p className="text-black font-bold text-base md:text-xl text-center">
            Menganalisis foto
          </p>
          <p className="text-grey-2 text-xs md:text-sm text-center px-4">
            Computer Vision sedang memproses gambar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-grey-1 p-5 md:p-10 flex flex-col w-full text-left">
      <h2 className="text-lg md:text-[24px] font-bold text-black mb-1 md:mb-2">
        AI Analisis Kerusakan
      </h2>
      <p className="text-xs md:text-[15px] text-grey-2 mb-4 md:mb-6 leading-relaxed">
        Sistem akan menganalisis foto menggunakan Computer Vision.
      </p>

      {/* Kotak Hasil Deteksi */}
      <div className="w-full flex flex-col p-3 md:p-6 rounded-2xl border border-[#EB8E8E] bg-[#FCECEC] gap-3 md:gap-5 shadow-sm mb-5 md:mb-8">
        <div className="flex items-center gap-2.5 md:gap-3 px-1 md:px-0">
          <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-soft-red text-red shrink-0">
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </div>
          <h3 className="text-black text-[14px] md:text-lg font-bold">
            Hasil Deteksi AI
          </h3>
        </div>

        {/* Grid 3 Kolom */}
        <div className="grid grid-cols-3 gap-1.5 md:gap-4 w-full">
          <div className="flex flex-col items-center justify-center py-2 md:py-5 px-1 rounded-xl border border-[#EB8E8E] bg-white text-center h-full">
            <p className="text-grey-2 text-[9px] md:text-xs mb-0.5 md:mb-1">
              Jenis
            </p>
            <p className="text-black text-[11px] md:text-base font-bold leading-tight mb-0.5">
              Lubang
            </p>
            <p className="text-grey-2 text-[8px] md:text-[11px] leading-none">
              Road Pothole
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-2 md:py-5 px-1 rounded-xl border border-[#EB8E8E] bg-red text-center h-full">
            <p className="text-white/90 text-[9px] md:text-xs mb-0.5 md:mb-1">
              Keparahan
            </p>
            <p className="text-white text-[11px] md:text-base font-bold leading-tight mb-0.5">
              BERAT
            </p>
            <p className="text-white/90 text-[8px] md:text-[11px] leading-none uppercase">
              High
            </p>
          </div>

          <div className="flex flex-col items-center justify-center py-2 md:py-5 px-1 rounded-xl border border-[#EB8E8E] bg-white text-center h-full">
            <p className="text-grey-2 text-[9px] md:text-xs mb-0.5 md:mb-1 leading-tight">
              Tingkat Urgensi
            </p>
            <p className="text-red text-[10px] md:text-base font-bold leading-tight mb-0.5">
              Segera diperbaiki
            </p>
            <p className="text-red text-[8px] md:text-[11px] leading-none">
              Immediate Repair
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-3 md:py-4 bg-green text-white rounded-xl text-[13px] md:text-[15px] font-bold hover:opacity-90 transition-opacity shadow-sm"
      >
        Lanjut ke Konfirmasi
      </button>
    </div>
  );
}
