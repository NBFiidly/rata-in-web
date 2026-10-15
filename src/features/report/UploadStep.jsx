// File: src/features/report/UploadStep.jsx
import { useState, useRef } from "react";

export default function UploadStep({ onNext }) {
  // State untuk menyimpan data file foto yang diunggah
  const [file, setFile] = useState(null);

  // Referensi untuk memicu input file tersembunyi
  const fileInputRef = useRef(null);

  // Fungsi saat file dipilih
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Fungsi untuk membuka jendela pemilihan file
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col w-full text-left py-4">
      {/* Header Langkah 1 */}
      <h2 className="text-2xl font-bold text-black mb-1">
        Upload Foto Jalan Rusak
      </h2>
      <p className="text-grey-2 mb-6">
        Ambil foto atau pilih dari galeri untuk memulai analisis.
      </p>

      {/* Input File Tersembunyi */}
      <input
        type="file"
        accept="image/png, image/jpeg, image/heic"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {/* Area Kotak Drag & Drop */}
      <div
        onClick={triggerFileInput}
        className={`w-full flex flex-col items-center justify-center p-10 rounded-xl border-2 border-dashed cursor-pointer transition-colors mb-6
          ${
            file
              ? "border-green bg-soft-green" // Wujud saat foto sudah diupload
              : "border-grey-1 bg-grey-light hover:bg-grey-1/30" // Wujud awal
          }
        `}
      >
        {/* Ikon Upload (Panah ke Atas) */}
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${file ? "bg-green/20" : "bg-grey-1"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={file ? "var(--color-green)" : "var(--color-grey-2)"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
        </div>

        {/* Teks di dalam kotak */}
        {!file ? (
          <>
            <h3 className="text-black font-semibold text-base mb-1 text-center">
              Ambil Foto atau Upload Gambar Jalan Rusak
            </h3>
            <p className="text-grey-2 text-sm text-center">
              Seret & lepas file di sini, atau klik untuk memilih
            </p>
            <p className="text-grey-2 text-xs text-center mt-1">
              JPG, PNG, HEIC hingga 10 MB
            </p>
          </>
        ) : (
          <>
            <h3 className="text-green font-semibold text-base mb-1 text-center">
              {file.name}
            </h3>
            <p className="text-grey-2 text-sm text-center">
              {(file.size / (1024 * 1024)).toFixed(1)} MB - Siap dianalisis
            </p>
            <div className="flex items-center gap-1 mt-2 text-green text-sm font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Upload Berhasil
            </div>
          </>
        )}
      </div>

      {/* Tombol Aksi Tambahan */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={triggerFileInput}
          className="flex-1 py-3 border border-grey-1 rounded-lg text-black font-medium text-sm flex items-center justify-center gap-2 hover:bg-grey-light transition-colors"
        >
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
          Pilih dari Galeri
        </button>
        <button className="flex-1 py-3 border border-grey-1 rounded-lg text-black font-medium text-sm flex items-center justify-center gap-2 hover:bg-grey-light transition-colors">
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
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
            <circle cx="12" cy="13" r="3" />
          </svg>
          Buka Kamera
        </button>
      </div>

      {/* Tombol Lanjut (Aktif jika ada file) */}
      <button
        onClick={onNext}
        disabled={!file}
        className={`w-full py-3.5 rounded-lg font-semibold transition-colors ${
          file
            ? "bg-green text-white hover:opacity-90"
            : "bg-grey-light text-grey-2 border border-grey-1 cursor-not-allowed opacity-70"
        }`}
      >
        Lanjut ke Lokasi
      </button>
    </div>
  );
}
