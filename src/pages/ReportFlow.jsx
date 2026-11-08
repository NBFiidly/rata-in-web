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
    <div className="min-h-screen bg-grey-light flex flex-col font-inter">
      <Navbar />

      <main className="grow pt-35 md:pt-32 pb-4 md:pb-12 flex flex-col items-center">
        <div className="text-center mb-3 md:mb-8 px-4">
          <h1 className="text-[20px] md:text-4xl font-bold text-black mb-0.5 md:mb-2">
            Lapor Kerusakan Jalan
          </h1>
          <p className="text-[12px] md:text-base text-grey-2">
            Ikuti langkah berikut untuk mengirim laporan
          </p>
        </div>

        <div className="flex items-center justify-between md:justify-center gap-2 md:gap-4 mb-4 md:mb-10 w-full max-w-2xl md:max-w-4xl px-4 overflow-x-auto hide-scrollbar py-2">
          {/* Step 1 */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center font-bold text-[12px] md:text-[15px] transition-all ${
                currentStep > 1
                  ? "bg-green border-green text-white"
                  : currentStep === 1
                    ? "border-green text-green bg-white"
                    : "border-grey-1 text-grey-1 bg-white"
              }`}
            >
              {currentStep > 1 ? (
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
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
              className={`font-semibold text-[10px] md:text-[14px] leading-tight ${currentStep >= 1 ? "text-green" : "text-grey-1"}`}
            >
              Upload
              <br />
              Foto
            </div>
          </div>

          <div className="hidden md:block w-8 md:w-12 h-0.5 bg-grey-1 mx-1 shrink-0"></div>

          {/* Step 2 */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center font-bold text-[12px] md:text-[15px] transition-all ${
                currentStep > 2
                  ? "bg-green border-green text-white"
                  : currentStep === 2
                    ? "border-green text-green bg-white"
                    : "border-grey-1 text-grey-1 bg-white"
              }`}
            >
              {currentStep > 2 ? (
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
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
              className={`font-semibold text-[10px] md:text-[14px] leading-tight ${currentStep >= 2 ? "text-green" : "text-grey-1"}`}
            >
              Lokasi
            </div>
          </div>

          <div className="hidden md:block w-8 md:w-12 h-0.5 bg-grey-1 mx-1 shrink-0"></div>

          {/* Step 3 */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center font-bold text-[12px] md:text-[15px] transition-all ${
                currentStep > 3
                  ? "bg-green border-green text-white"
                  : currentStep === 3
                    ? "border-green text-green bg-white"
                    : "border-grey-1 text-grey-1 bg-white"
              }`}
            >
              {currentStep > 3 ? (
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
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
              className={`font-semibold text-[10px] md:text-[14px] leading-tight ${currentStep >= 3 ? "text-green" : "text-grey-1"}`}
            >
              AI
              <br />
              Analisis
            </div>
          </div>

          <div className="hidden md:block w-8 md:w-12 h-0.5 bg-grey-1 mx-1 shrink-0"></div>

          {/* Step 4 */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center font-bold text-[12px] md:text-[15px] transition-all ${
                currentStep > 4
                  ? "bg-green border-green text-white"
                  : currentStep === 4
                    ? "border-green text-green bg-white"
                    : "border-grey-1 text-grey-1 bg-white"
              }`}
            >
              {currentStep > 4 ? (
                <svg
                  className="w-4 h-4 md:w-5 md:h-5"
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
              className={`font-semibold text-[10px] md:text-[14px] leading-tight ${currentStep >= 4 ? "text-green" : "text-grey-1"}`}
            >
              Konfirmasi
            </div>
          </div>
        </div>

        {/* PERBAIKAN: Mengembalikan max-w-6xl menjadi max-w-3xl agar ukuran kartunya rapi */}
        <div className="w-full max-w-90 md:max-w-3xl px-4">
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