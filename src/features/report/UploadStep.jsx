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
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-left mb-2">
        <h2 className="text-xl font-bold text-black mb-1">
          Upload Foto Jalan Rusak
        </h2>
        <p className="text-sm text-grey-2">
          Ambil foto atau pilih dari galeri untuk memulai analisis.
        </p>
      </div>

      {/* Area Pratinjau (Preview) & Live Camera */}
      <div className="border-2 border-dashed border-grey-1 rounded-xl p-8 flex flex-col items-center justify-center text-center min-h-[280px] bg-grey-light/50 relative overflow-hidden">
        {isCameraOpen ? (
          <div className="absolute inset-0 bg-black flex flex-col">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
              <button
                onClick={stopCamera}
                className="px-4 py-2 bg-white/20 text-white rounded-full font-semibold backdrop-blur-sm hover:bg-white/40"
              >
                Batal
              </button>
              <button
                onClick={capturePhoto}
                className="px-6 py-2 bg-green text-white rounded-full font-bold shadow-lg hover:opacity-90 flex items-center gap-2"
              >
                📸 Jepret
              </button>
            </div>
          </div>
        ) : image ? (
          <img
            src={image}
            alt="Preview Jalan Rusak"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            <div className="w-12 h-12 rounded-lg bg-grey-1 flex items-center justify-center text-grey-2 mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-black mb-1">
              Ambil Foto atau Upload Gambar Jalan Rusak
            </h3>
            <p className="text-xs text-grey-2">
              Seret & lepas file di sini, atau klik untuk memilih
              <br />
              JPG, PNG, HEIC hingga 10 MB
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

      {/* TAMPILKAN TOMBOL PILIH JIKA BELUM ADA FOTO */}
      {!image && !isCameraOpen && (
        <div className="flex flex-col md:flex-row gap-4">
          <button
            type="button"
            onClick={() => galleryInputRef.current.click()}
            className="flex-1 py-3 border border-grey-1 rounded-xl flex items-center justify-center gap-2 font-semibold text-black hover:bg-grey-light transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
            className="flex-1 py-3 border border-grey-1 rounded-xl flex items-center justify-center gap-2 font-semibold text-black hover:bg-grey-light transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            Buka Kamera
          </button>
        </div>
      )}

      {/* TAMPILKAN TOMBOL HAPUS JIKA FOTO SUDAH ADA (Desain Lebih Profesional) */}
      {image && !isCameraOpen && (
        <button
          onClick={() => setImage(null)}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-[#DD4343] text-[#DD4343] font-bold hover:bg-[#FCECEC] transition-colors"
        >
          <svg
            width="20"
            height="20"
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
      )}

      {/* Tombol Lanjut */}
      <button
        onClick={onNext}
        disabled={!image || isCameraOpen}
        className={`w-full py-3.5 mt-2 rounded-xl font-bold transition-all ${
          image && !isCameraOpen
            ? "bg-green text-white hover:opacity-90 shadow-md"
            : "bg-grey-1 text-grey-2 cursor-not-allowed"
        }`}
      >
        Lanjut ke Lokasi
      </button>
    </div>
  );
}
