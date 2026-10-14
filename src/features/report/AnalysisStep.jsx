import { useState, useEffect } from "react";

export default function AnalysisStep() {
  // State untuk mengatur apakah AI sedang menganalisis atau sudah selesai
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    // Simulasi proses AI berjalan selama 3 detik, lalu state berubah
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // ----------------------------------------------------------------
  // KONDISI 1: TAMPILAN LOADING ANIMASI
  // ----------------------------------------------------------------
  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-6 w-full">
        {/* Kontainer Animasi Loading */}
        <div className="w-[102px] h-[102px] relative flex items-center justify-center">
          {/* Ikon Kaca Pembesar di Tengah */}
          <div className="inline-flex p-2 items-center justify-center rounded-full bg-soft-green absolute z-10 w-14 h-14">
            <svg
              width="29"
              height="27"
              viewBox="0 0 29 27"
              fill="none"
              className="absolute"
            >
              <path
                d="M14.3949 2.89438L2.45837 25.0701H26.3314L23.4492 19.7142C24.2473 20.1591 25.1098 20.4567 26.0002 20.5945L28.6692 25.5522C28.7482 25.6989 28.7898 25.8652 28.7897 26.0345C28.7897 26.2039 28.748 26.3702 28.669 26.5168C28.5899 26.6634 28.4762 26.7851 28.3392 26.8697C28.2023 26.9542 28.047 26.9986 27.889 26.9985H0.899826C0.741872 26.9985 0.586701 26.9539 0.44991 26.8693C0.313118 26.7847 0.199527 26.6629 0.120551 26.5164C0.0415758 26.3698 -1.00318e-06 26.2035 0 26.0343C1.00322e-06 25.8651 0.0415796 25.6988 0.120557 25.5522L13.6156 0.48204C13.6946 0.33548 13.8082 0.213776 13.945 0.129161C14.0818 0.0445458 14.2369 0 14.3949 0C14.5528 0 14.708 0.0445458 14.8448 0.129161C14.9816 0.213776 15.0952 0.33548 15.1741 0.48204L19.6914 8.87316C19.357 9.76964 19.1663 10.7202 19.1272 11.6847L14.3949 2.89438Z"
                fill="var(--color-green)"
              />
            </svg>
          </div>
          {/* Lingkaran Luar (Berputar) */}
          <div className="w-full h-full absolute animate-spin">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              className="absolute left-[1px] top-[1px]"
            >
              <path
                d="M49.8125 97.625C76.2186 97.625 97.625 76.2186 97.625 49.8125C97.625 23.4064 76.2186 2 49.8125 2C23.4064 2 2 23.4064 2 49.8125C2 76.2186 23.4064 97.625 49.8125 97.625Z"
                stroke="var(--color-soft-green)"
                strokeWidth="4"
              />
            </svg>
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              className="absolute left-[50px] top-[50px]"
            >
              <path
                d="M47.8125 0C47.8125 26.4061 26.4061 47.8125 0 47.8125"
                stroke="var(--color-green)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 w-full mt-2">
          <p className="text-black font-semibold text-2xl text-center">
            Menganalisis foto
          </p>
          <p className="text-grey-2 text-base text-center">
            Computer Vision sedang memproses gambar
          </p>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------
  // KONDISI 2: TAMPILAN HASIL DETEKSI AI (KODE FIGMA YANG DIRAPIKAN)
  // ----------------------------------------------------------------
  return (
    <div className="flex flex-col w-full text-left py-4">
      {/* Judul Area */}
      <h2 className="text-2xl font-bold text-black mb-1">
        AI Analisis Kerusakan
      </h2>
      <p className="text-grey-2 mb-6">
        Sistem akan menganalisis foto menggunakan Computer Vision.
      </p>

      {/* Kotak Utama Hasil (Berwarna Merah Muda) */}
      <div className="w-full flex flex-col p-5 md:p-6 rounded-xl border border-[#EB8E8E] bg-[#FCECEC] gap-5 shadow-sm">
        {/* Header: Ikon Peringatan & Teks */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#F8D9D9]">
            {/* Menggunakan SVG ikon alert standar agar kode lebih rapi */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#DD4343"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </div>
          <h3 className="text-black text-lg font-semibold">Hasil Deteksi AI</h3>
        </div>

        {/* Grid 3 Kolom untuk Kartu Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-2">
          {/* Card 1: Jenis */}
          <div className="flex flex-col items-center justify-center py-4 px-2 rounded-xl border border-[#EB8E8E] bg-white">
            <p className="text-grey-2 text-xs mb-1">Jenis</p>
            <p className="text-black text-base font-semibold leading-tight">
              Lubang
            </p>
            <p className="text-grey-2 text-[11px]">Road Pothole</p>
          </div>

          {/* Card 2: Keparahan (Merah Solid) */}
          <div className="flex flex-col items-center justify-center py-4 px-2 rounded-xl border border-[#EB8E8E] bg-[#DD4343]">
            <p className="text-white/90 text-xs mb-1">Keparahan</p>
            <p className="text-white text-base font-semibold leading-tight">
              BERAT
            </p>
            <p className="text-white/90 text-[11px]">HIGH</p>
          </div>

          {/* Card 3: Tingkat Urgensi */}
          <div className="flex flex-col items-center justify-center py-4 px-2 rounded-xl border border-[#EB8E8E] bg-white">
            <p className="text-grey-2 text-xs mb-1 text-center">
              Tingkat Urgensi
            </p>
            <p className="text-[#DD4343] text-base font-semibold leading-tight text-center">
              Segera diperbaiki
            </p>
            <p className="text-[#DD4343] text-[11px]">Immediate Repair</p>
          </div>
        </div>
      </div>
    </div>
  );
}
