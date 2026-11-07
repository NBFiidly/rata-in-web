// File: src/features/report/UploadStep.jsx
import { useState, useRef, useEffect } from "react";

export default function UploadStep({ onNext }) {
  const [image, setImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const galleryInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const startCamera = async () => {
    setIsCameraOpen(true);
    setImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (err) {
      console.error("Error akses kamera:", err);
      alert(
        "Tidak dapat mengakses kamera. Pastikan browser memiliki izin/akses kamera.",
      );
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageUrl = canvas.toDataURL("image/png");
      setImage(imageUrl);
      stopCamera();
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    // rounded-3xl
    <div className="bg-white rounded-3xl shadow-sm border border-grey-1 p-5 md:p-10 flex flex-col w-full">
      <div className="text-left mb-4 md:mb-8">
        <h2 className="text-[15px] md:text-[24px] font-bold text-black mb-1 md:mb-2">
          Upload Foto Jalan Rusak
        </h2>
        <p className="text-[11px] md:text-[15px] text-grey-2">
          Ambil foto atau pilih dari galeri untuk memulai analisis.
        </p>
      </div>

      {/* h-80, rounded-2xl md:rounded-2xl */}
      <div className="border-2 border-dashed border-grey-1 rounded-2xl p-4 md:p-8 flex flex-col items-center justify-center text-center h-56 md:h-80 bg-grey-light hover:opacity-80 transition-opacity cursor-pointer mb-5 md:mb-8 relative overflow-hidden">
        {isCameraOpen ? (
          <div className="absolute inset-0 bg-black flex flex-col z-10">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 md:bottom-6 left-0 right-0 flex justify-center gap-3 md:gap-6">
              <button
                onClick={stopCamera}
                className="px-4 py-1.5 md:px-6 md:py-2.5 bg-white/20 text-white rounded-full font-semibold backdrop-blur-sm hover:bg-white/40 text-xs md:text-sm"
              >
                Batal
              </button>
              <button
                onClick={capturePhoto}
                className="px-5 py-1.5 md:px-8 md:py-2.5 bg-green text-white rounded-full font-bold shadow-lg hover:opacity-90 flex items-center gap-1.5 text-xs md:text-sm"
              >
                Jepret
              </button>
            </div>
          </div>
        ) : image ? (
          <img
            src={image}
            alt="Preview Jalan Rusak"
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        ) : (
          <>
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-white border border-grey-1 flex items-center justify-center mb-3 md:mb-5 text-grey-2">
              <svg
                className="w-5 h-5 md:w-7 md:h-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>

            {/* max-w-50 (mobile) dan max-w-sm (desktop) */}
            <h3 className="text-[12px] md:text-[18px] font-bold text-black mb-1.5 md:mb-3 max-w-50 md:max-w-sm leading-snug">
              Ambil Foto atau Upload Gambar Jalan Rusak
            </h3>
            <p className="text-[9px] md:text-[13px] text-grey-2 max-w-50 md:max-w-sm leading-relaxed">
              Seret & lepas file di sini, atau klik untuk memilih JPG, PNG, HEIC
              hingga 10 MB
            </p>
          </>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
      <input
        type="file"
        accept="image/*"
        ref={galleryInputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image && !isCameraOpen && (
        <div className="flex flex-col md:flex-row gap-2.5 md:gap-4">
          <button
            type="button"
            onClick={() => galleryInputRef.current.click()}
            className="flex-1 py-2.5 md:py-4 rounded-xl border border-grey-1 bg-white text-black font-bold text-[12px] md:text-[14px] flex items-center justify-center gap-2 md:gap-3 hover:bg-grey-light transition-colors shadow-sm"
          >
            <svg
              width="14"
              height="14"
              className="md:w-5 md:h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            Pilih dari Galeri
          </button>

          <button
            type="button"
            onClick={startCamera}
            className="flex-1 py-2.5 md:py-4 rounded-xl border border-grey-1 bg-white text-black font-bold text-[12px] md:text-[14px] flex items-center justify-center gap-2 md:gap-3 hover:bg-grey-light transition-colors shadow-sm"
          >
            <svg
              width="14"
              height="14"
              className="md:w-5 md:h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            Buka Kamera
          </button>
        </div>
      )}

      {image && !isCameraOpen && (
        <div className="mb-2 md:mb-4">
          <button
            onClick={() => setImage(null)}
            className="flex items-center justify-center gap-2 w-full py-2.5 md:py-4 rounded-xl border border-red text-red font-bold text-[12px] md:text-[14px] hover:bg-soft-red transition-colors"
          >
            <svg
              width="16"
              height="16"
              className="md:w-5 md:h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Hapus & Ganti Foto
          </button>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!image || isCameraOpen}
        className={`w-full py-3 md:py-4 mt-2.5 md:mt-4 rounded-xl font-bold text-[12px] md:text-[15px] transition-all ${
          image && !isCameraOpen
            ? "bg-green text-white hover:opacity-90 shadow-md"
            : "bg-grey-light text-grey-1 cursor-not-allowed border border-grey-1"
        }`}
      >
        Lanjut ke Lokasi
      </button>
    </div>
  );
}
