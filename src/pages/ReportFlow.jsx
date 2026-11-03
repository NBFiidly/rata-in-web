// File: src/pages/ReportFlow.jsx
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import UploadStep from "../features/report/UploadStep";
import LocationStep from "../features/report/LocationStep";
import AnalysisStep from "../features/report/AnalysisStep";
import ConfirmStep from "../features/report/ConfirmStep";

export default function ReportFlow() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-grey-light flex flex-col font-sans">
      <Navbar />

      <main className="grow pt-[140px] md:pt-32 pb-4 md:pb-12 flex flex-col items-center">
        {/* Header di luar kartu putih */}
        <div className="text-center mb-3 md:mb-6 px-4">
          <h1 className="text-[20px] md:text-3xl font-bold text-black mb-0.5 md:mb-1">
            Lapor Kerusakan Jalan
          </h1>
          <p className="text-[12px] md:text-base text-grey-2">
            Ikuti langkah berikut untuk mengirim laporan
          </p>
        </div>

        {/* Stepper dengan Logika Ceklis */}
        <div className="flex items-center justify-between md:justify-center gap-2 md:gap-3 mb-4 md:mb-8 w-full max-w-2xl px-5 md:px-2 overflow-x-auto hide-scrollbar">
          {/* Step 1 */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center font-bold text-[10px] md:text-xs transition-all ${
                currentStep > 1
                  ? "bg-green border-green text-white"
                  : currentStep === 1
                    ? "border-green text-green bg-white"
                    : "border-grey-1 text-grey-1 bg-white"
              }`}
            >
              {currentStep > 1 ? (
                <svg
                  className="w-3.5 h-3.5 md:w-4 md:h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                "1"
              )}
            </div>
            <div
              className={`font-semibold text-[10px] md:text-xs leading-tight ${currentStep >= 1 ? "text-green" : "text-grey-1"}`}
            >
              Upload
              <br />
              Foto
            </div>
          </div>

          <div className="hidden md:block w-10 h-[2px] bg-grey-1 mx-1 shrink-0"></div>

          {/* Step 2 */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center font-bold text-[10px] md:text-xs transition-all ${
                currentStep > 2
                  ? "bg-green border-green text-white"
                  : currentStep === 2
                    ? "border-green text-green bg-white"
                    : "border-grey-1 text-grey-1 bg-white"
              }`}
            >
              {currentStep > 2 ? (
                <svg
                  className="w-3.5 h-3.5 md:w-4 md:h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                "2"
              )}
            </div>
            <div
              className={`font-semibold text-[10px] md:text-xs leading-tight ${currentStep >= 2 ? "text-green" : "text-grey-1"}`}
            >
              Lokasi
            </div>
          </div>

          <div className="hidden md:block w-10 h-[2px] bg-grey-1 mx-1 shrink-0"></div>

          {/* Step 3 */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center font-bold text-[10px] md:text-xs transition-all ${
                currentStep > 3
                  ? "bg-green border-green text-white"
                  : currentStep === 3
                    ? "border-green text-green bg-white"
                    : "border-grey-1 text-grey-1 bg-white"
              }`}
            >
              {currentStep > 3 ? (
                <svg
                  className="w-3.5 h-3.5 md:w-4 md:h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                "3"
              )}
            </div>
            <div
              className={`font-semibold text-[10px] md:text-xs leading-tight ${currentStep >= 3 ? "text-green" : "text-grey-1"}`}
            >
              AI
              <br />
              Analisis
            </div>
          </div>

          <div className="hidden md:block w-10 h-[2px] bg-grey-1 mx-1 shrink-0"></div>

          {/* Step 4 */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className={`w-6 h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center font-bold text-[10px] md:text-xs transition-all ${
                currentStep > 4
                  ? "bg-green border-green text-white"
                  : currentStep === 4
                    ? "border-green text-green bg-white"
                    : "border-grey-1 text-grey-1 bg-white"
              }`}
            >
              {currentStep > 4 ? (
                <svg
                  className="w-3.5 h-3.5 md:w-4 md:h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                "4"
              )}
            </div>
            <div
              className={`font-semibold text-[10px] md:text-xs leading-tight ${currentStep >= 4 ? "text-green" : "text-grey-1"}`}
            >
              Konfirmasi
            </div>
          </div>
        </div>

        {/* Area Kartu Konten */}
        <div className="w-full max-w-[360px] md:max-w-md px-4">
          {currentStep === 1 && <UploadStep onNext={nextStep} />}
          {currentStep === 2 && (
            <LocationStep onNext={nextStep} onPrev={prevStep} />
          )}
          {currentStep === 3 && (
            <AnalysisStep onNext={nextStep} onPrev={prevStep} />
          )}
          {currentStep === 4 && <ConfirmStep />}
        </div>
      </main>
    </div>
  );
}
