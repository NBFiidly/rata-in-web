// File: src/features/report/LocationStep.jsx
import { useState, useEffect, useRef } from "react";

export default function LocationStep({ onNext }) {
  const [locationText, setLocationText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLocationFound, setIsLocationFound] = useState(false);
  const [coords, setCoords] = useState({ lat: 1.1119, lng: 103.9575 });

  const [isManualMode, setIsManualMode] = useState(false);
  const textAreaRef = useRef(null);

  const autoDetectLocation = () => {
    setIsManualMode(false);
    setIsLoading(true);
    setIsLocationFound(false);
    setLocationText("Mencari satelit GPS...");

    if (!navigator.geolocation) {
      setLocationText("Browser Anda tidak mendukung deteksi lokasi.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );
          const data = await response.json();
          const address = data.display_name
            ? data.display_name
            : `Koordinat: ${latitude}, ${longitude}`;

          setLocationText(address);
          setIsLocationFound(true);
        } catch (error) {
          console.error("Gagal mendapatkan alamat:", error);
          setLocationText(
            `Gagal memuat teks alamat. (Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)})`,
          );
          setIsLocationFound(true);
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Error lokasi:", error);
        setLocationText(
          "Gagal melacak lokasi. Pastikan GPS aktif dan izin diberikan.",
        );
        setIsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => autoDetectLocation(), 10);
    return () => clearTimeout(timer);
  }, []);

  const enableManualMode = () => {
    setIsManualMode(true);
    setIsLoading(false);

    if (locationText.includes("Mencari") || locationText.includes("Gagal")) {
      setLocationText("");
    }

    setTimeout(() => {
      if (textAreaRef.current) textAreaRef.current.focus();
    }, 50);
  };

  useEffect(() => {
    if (!isManualMode || locationText.trim().length < 5) return;

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationText)}`,
        );
        const data = await response.json();

        if (data && data.length > 0) {
          setCoords({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          });
          setIsLocationFound(true);
        } else {
          console.log("Lokasi spesifik tidak ditemukan di database OSM.");
        }
      } catch (error) {
        console.error("Gagal mencari lokasi dari teks:", error);
      } finally {
        setIsLoading(false);
      }
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [locationText, isManualMode]);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-left mb-2">
        <h2 className="text-xl font-bold text-black mb-1">Konfirmasi Lokasi</h2>
        <p className="text-sm text-grey-2">
          Pastikan lokasi kerusakan jalan sudah benar.
        </p>
      </div>

      <div className="w-full h-[280px] bg-[#E2E8F0] relative overflow-hidden rounded-xl border border-grey-1 shadow-inner">
        {/* PERBAIKAN: Dibuat selalu terang (opacity-100 blur-0) kecuali saat benar-benar loading mencari koordinat */}
        <iframe
          src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=16&output=embed`}
          className={`w-full h-full border-0 grayscale-[30%] mix-blend-multiply transition-all duration-700 ${isLoading ? "opacity-40 blur-[2px]" : "opacity-100 blur-0"}`}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="absolute inset-0 bg-blue-100/10 pointer-events-none"></div>

        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm z-10">
            <div className="w-8 h-8 border-4 border-green border-t-transparent rounded-full animate-spin mb-3"></div>
            <span className="text-sm font-bold text-black bg-white/80 px-3 py-1 rounded-full shadow-sm">
              Mencari Lokasi...
            </span>
          </div>
        )}

        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none drop-shadow-xl transition-all duration-500 transform ${(isLocationFound || isManualMode) && !isLoading ? "scale-100 translate-y-[-100%]" : "scale-0 translate-y-0"}`}
        >
          <svg
            width="40"
            height="52"
            viewBox="0 0 32 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 0C7.163 0 0 7.163 0 16C0 27 16 42 16 42C16 42 32 27 32 16C32 7.163 24.837 0 16 0Z"
              fill={isManualMode ? "#F97316" : "#208144"}
            />
            <path d="M14.5 9h3v8h-3V9zm0 11h3v3h-3v-3z" fill="white" />
          </svg>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-black/30 rounded-[100%] blur-[2px]"></div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <div
            className={`w-3 h-3 rounded-full ${isManualMode ? "bg-[#F97316]" : isLocationFound ? "bg-green" : isLoading ? "bg-[#F97316] animate-pulse" : "bg-[#EF4444]"}`}
          ></div>
        </div>
        <textarea
          ref={textAreaRef}
          value={locationText}
          onChange={(e) => setLocationText(e.target.value)}
          readOnly={!isManualMode}
          rows="2"
          placeholder={
            isManualMode
              ? "Ketik alamat (Cth: Mandiangin Timur, Jambi)..."
              : "Menunggu deteksi lokasi..."
          }
          className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm font-medium text-black focus:outline-none resize-none leading-snug transition-all ${
            isManualMode
              ? "border-[#F97316] bg-white ring-2 ring-[#F97316]/20"
              : "border-grey-1 bg-grey-light/30"
          }`}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          type="button"
          onClick={autoDetectLocation}
          className={`flex-1 py-3 border rounded-xl flex items-center justify-center gap-2 font-semibold transition-colors ${
            !isManualMode
              ? "border-green text-green bg-soft-green/30"
              : "border-grey-1 text-black hover:bg-grey-light"
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          Gunakan lokasi saya
        </button>

        <button
          type="button"
          onClick={enableManualMode}
          className={`flex-1 py-3 border rounded-xl flex items-center justify-center gap-2 font-semibold transition-colors ${
            isManualMode
              ? "border-[#F97316] text-[#F97316] bg-[#FFF7ED]"
              : "border-grey-1 text-black hover:bg-grey-light"
          }`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          Input Manual
        </button>
      </div>

      <button
        onClick={onNext}
        disabled={
          isManualMode
            ? locationText.trim().length === 0
            : !isLocationFound || isLoading
        }
        className={`w-full py-3.5 mt-2 rounded-xl font-bold transition-all shadow-sm ${
          (isManualMode && locationText.trim().length > 0) ||
          (isLocationFound && !isManualMode)
            ? "bg-green text-white hover:opacity-90"
            : "bg-grey-1 text-grey-2 cursor-not-allowed"
        }`}
      >
        Lanjut ke Analisis AI
      </button>
    </div>
  );
}
