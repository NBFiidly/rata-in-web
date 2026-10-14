import { useState } from "react";
import Stepper from "../components/ui/Stepper";
import AnalysisStep from "../features/report/AnalysisStep";

export default function ReportFlow() {
  // State untuk menyimpan posisi langkah saat ini (dimulai dari 1)
  const [currentStep, setCurrentStep] = useState(1);

  // Fungsi untuk simulasi tombol Lanjut dan Kembali
  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-grey-light py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-grey-1">
        {/* Header Halaman */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-black mb-2">
            Lapor Kerusakan Jalan
          </h1>
          <p className="text-grey-2">
            Ikuti langkah berikut untuk mengirim laporan
          </p>
        </div>

        {/* Memanggil Komponen Stepper */}
        <Stepper currentStep={currentStep} />

        {/* Area Konten Dinamis Berdasarkan Step */}
        <div className="mt-12 bg-white">
          {currentStep === 1 && (
            <div className="p-16 border-2 border-dashed border-grey-2 rounded-xl text-center">
              <h2 className="text-xl font-semibold text-black mb-2">
                Area Upload Foto
              </h2>
              <p className="text-grey-2">
                Nantinya form Drag & Drop gambar ditaruh di sini
              </p>
            </div>
          )}
          {currentStep === 2 && (
            <div className="p-16 border-2 border-dashed border-grey-2 rounded-xl text-center">
              <h2 className="text-xl font-semibold text-black mb-2">
                Area Konfirmasi Lokasi
              </h2>
              <p className="text-grey-2">
                Peta (Map) dari Google Maps / Leaflet akan ditaruh di sini
              </p>
            </div>
          )}
          {currentStep === 3 && <AnalysisStep />}
          {currentStep === 4 && (
            <div className="p-16 border-2 border-dashed border-grey-2 rounded-xl text-center">
              <h2 className="text-xl font-semibold text-black mb-2">
                Area Konfirmasi Akhir
              </h2>
              <p className="text-grey-2">
                Ringkasan laporan sebelum dikirim ke database
              </p>
            </div>
          )}
        </div>

        {/* Tombol Simulasi Navigasi */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2.5 rounded-md font-medium transition-colors ${
              currentStep === 1
                ? "bg-grey-1 text-grey-2 cursor-not-allowed opacity-50"
                : "border border-grey-2 text-black hover:bg-grey-1"
            }`}
          >
            Kembali
          </button>

          <button
            onClick={nextStep}
            className="px-6 py-2.5 rounded-md font-medium bg-green text-white hover:opacity-90 transition-opacity"
          >
            {currentStep === 4 ? "Kirim Laporan" : "Lanjut"}
          </button>
        </div>
      </div>
    </div>
  );
}
