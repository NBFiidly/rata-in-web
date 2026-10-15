// File: src/features/report/LocationStep.jsx
import { useState } from "react";

export default function LocationStep({ onNext }) {
  // State: 'waiting' (belum dicari), 'loading' (mencari GPS), 'found' (lokasi didapat)
  const [locationStatus, setLocationStatus] = useState("waiting");

  // Fungsi simulasi mencari lokasi (GPS)
  const handleGetLocation = () => {
    setLocationStatus("loading");

    // Simulasi loading selama 1.5 detik
    setTimeout(() => {
      setLocationStatus("found");
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full text-left py-4">
      {/* Header Langkah 2 */}
      <h2 className="text-2xl font-bold text-black mb-1">Konfirmasi Lokasi</h2>
      <p className="text-grey-2 mb-6">
        Pastikan lokasi kerusakan jalan sudah benar.
      </p>

      {/* Area Peta (Simulasi dengan background dan pattern kotak-kotak) */}
      <div className="w-full h-48 md:h-64 bg-[#e8f4f8] border border-grey-1 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center">
        {/* Dekorasi garis jalan simulasi peta */}
        <div
          className="absolute w-full h-full opacity-30"
          style={{
            backgroundImage: "radial-gradient(#919191 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        {locationStatus === "loading" && (
          <div className="z-10 px-4 py-2 bg-white rounded-full shadow-md text-sm font-medium text-black flex items-center gap-2">
            <svg
              className="animate-spin w-4 h-4 text-green"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Mencari titik GPS...
          </div>
        )}

        {locationStatus === "found" && (
          <div className="z-10 text-red animate-bounce mt-5">
            {/* Ikon Pin Peta Merah */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="white"
              strokeWidth="1.5"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" fill="white" />
            </svg>
          </div>
        )}
      </div>

      {/* Bar Indikator Alamat */}
      <div
        className={`w-full p-4 rounded-xl border mb-6 flex items-start md:items-center gap-3 transition-colors duration-300
        ${locationStatus === "found" ? "bg-soft-green border-green" : "bg-grey-light border-grey-1"}
      `}
      >
        {/* Ikon Titik/Pin di dalam Bar */}
        <div className="mt-0.5 md:mt-0">
          {locationStatus === "found" ? (
            <div className="w-6 h-6 rounded-md bg-green flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full bg-grey-1"></div>
          )}
        </div>

        {/* Teks Alamat */}
        <div className="flex flex-col">
          {locationStatus === "found" ? (
            <>
              <p className="text-black font-semibold text-sm">
                Jl. Engku Putri, Batam Kota
              </p>
              <p className="text-green text-xs">
                Batam, Teluk Tering, Batam Kota, Kepulauan Riau
              </p>
            </>
          ) : (
            <p className="text-grey-2 text-sm">
              {locationStatus === "loading"
                ? "Sedang mendeteksi lokasi Anda..."
                : "Menunggu deteksi lokasi..."}
            </p>
          )}
        </div>
      </div>

      {/* Tombol Aksi Tambahan (GPS / Manual) */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleGetLocation}
          className="flex-1 py-3 border border-green rounded-lg text-green font-semibold text-sm flex items-center justify-center gap-2 hover:bg-soft-green transition-colors"
        >
          {/* Ikon Target GPS */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Gunakan lokasi saya
        </button>
        <button className="flex-1 py-3 border border-grey-1 rounded-lg text-black font-medium text-sm hover:bg-grey-light transition-colors">
          Input Manual
        </button>
      </div>

      {/* Tombol Lanjut ke Analisis AI */}
      <button
        onClick={onNext}
        disabled={locationStatus !== "found"}
        className={`w-full py-3.5 rounded-lg font-semibold transition-all duration-300 ${
          locationStatus === "found"
            ? "bg-green text-white hover:opacity-90"
            : "bg-grey-light text-grey-2 border border-grey-1 cursor-not-allowed opacity-70"
        }`}
      >
        Lanjut ke Analisis AI
      </button>
    </div>
  );
}
