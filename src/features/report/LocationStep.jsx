// File: src/features/report/LocationStep.jsx
import { useState, useEffect, useRef } from "react";

export default function LocationStep({ onNext }) {
  const [locationText, setLocationText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLocationFound, setIsLocationFound] = useState(false);
  const [coords, setCoords] = useState({ lat: 1.1119, lng: 103.9575 });

  const [isManualMode, setIsManualMode] = useState(false);
  const [mapType, setMapType] = useState("roadmap");

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
    // rounded-3xl
    <div className="bg-white rounded-3xl shadow-sm border border-grey-1 p-5 md:p-8 flex flex-col w-full">
      <div className="text-center mb-3 md:mb-6">
        <h2 className="text-[15px] md:text-[20px] font-bold text-black mb-0.5 md:mb-1.5">
          Konfirmasi Lokasi
        </h2>
        <p className="text-[11px] md:text-[14px] text-grey-2">
          Pastikan lokasi kerusakan jalan sudah benar.
        </p>
      </div>

      {/* md:h-80 dan rounded-2xl md:rounded-2xl */}
      <div className="w-full h-44 md:h-80 bg-grey-light relative overflow-hidden rounded-2xl border border-grey-1 mb-2.5 md:mb-4">
        <iframe
          src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=16&t=${mapType === "satellite" ? "k" : "m"}&output=embed`}
          className={`w-full h-full border-0 transition-all duration-700 pointer-events-none ${isLoading ? "opacity-50 blur-[2px]" : "opacity-90 blur-0"}`}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="absolute top-2 right-2 z-20 flex bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-md border border-grey-1">
          <button
            type="button"
            onClick={() => setMapType("roadmap")}
            className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${
              mapType === "roadmap"
                ? "bg-green text-white shadow-sm"
                : "text-grey-2 hover:text-black"
            }`}
          >
            Peta
          </button>
          <button
            type="button"
            onClick={() => setMapType("satellite")}
            className={`px-2 py-1 text-[10px] font-bold rounded-md transition-all ${
              mapType === "satellite"
                ? "bg-green text-white shadow-sm"
                : "text-grey-2 hover:text-black"
            }`}
          >
            Satelit
          </button>
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm z-10">
            <div className="w-6 h-6 md:w-8 md:h-8 border-[3px] border-green border-t-transparent rounded-full animate-spin mb-2"></div>
          </div>
        )}
      </div>

      <div className="relative mb-2 md:mb-4">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <div
            className={`w-3 h-3 rounded-full ${isManualMode ? "bg-[#F97316]" : isLocationFound ? "bg-green" : isLoading ? "bg-grey-2 animate-pulse" : "bg-[#EF4444]"}`}
          ></div>
        </div>
        {/* rounded-xl */}
        <textarea
          ref={textAreaRef}
          value={locationText}
          onChange={(e) => setLocationText(e.target.value)}
          readOnly={!isManualMode}
          rows="1"
          placeholder={
            isManualMode ? "Ketik alamat..." : "Menunggu deteksi lokasi..."
          }
          className={`w-full pl-9 pr-3 py-2.5 md:py-3 rounded-xl text-[10px] md:text-[13px] font-medium text-black focus:outline-none resize-none leading-snug transition-all overflow-hidden whitespace-nowrap ${
            isManualMode
              ? "border border-[#F97316] bg-white ring-2 ring-[#F97316]/20"
              : "border border-grey-1 bg-grey-light"
          }`}
          style={{ whiteSpace: "nowrap", overflowX: "auto" }}
        />
      </div>

      <div className="flex gap-2 md:gap-3 mb-3 md:mb-6">
        <button
          type="button"
          onClick={autoDetectLocation}
          className={`flex-1 py-2.5 md:py-3 border rounded-xl flex items-center justify-center gap-1.5 text-[10px] md:text-[13px] font-bold transition-colors shadow-sm ${
            !isManualMode
              ? "border-green text-green"
              : "border-grey-1 text-black hover:bg-grey-light"
          }`}
        >
          <svg
            width="14"
            height="14"
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
          className={`flex-1 py-2.5 md:py-3 border rounded-xl flex items-center justify-center gap-1.5 text-[10px] md:text-[13px] font-bold transition-colors shadow-sm ${
            isManualMode
              ? "border-black text-black"
              : "border-grey-1 text-black hover:bg-grey-light"
          }`}
        >
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
        className={`w-full py-2.5 md:py-3.5 rounded-xl font-bold text-[12px] md:text-[14px] transition-all shadow-sm ${
          (isManualMode && locationText.trim().length > 0) ||
          (isLocationFound && !isManualMode)
            ? "bg-green text-white hover:opacity-90"
            : "bg-grey-light text-grey-1 cursor-not-allowed border border-grey-1"
        }`}
      >
        Lanjut ke Analisis AI
      </button>
    </div>
  );
}
