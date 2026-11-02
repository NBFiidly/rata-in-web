// File: src/pages/ReportFlow.jsx
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Stepper from "../components/Stepper";
import UploadStep from "../features/report/UploadStep";
import LocationStep from "../features/report/LocationStep";
import AnalysisStep from "../features/report/AnalysisStep";
import ConfirmStep from "../features/report/ConfirmStep";

export default function ReportFlow() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  return (
    <div className="min-h-screen bg-grey-light flex flex-col justify-between">
      {/* Navbar Atas */}
      <Navbar />

      {/* Konten Utam Lapor */}
      <main className="grow pt-[126px] px-3 pb-3 md:pt-32 md:px-4 md:py-12">
        <div className="max-w-3xl mx-auto bg-white p-4 md:p-10 rounded-xl shadow-sm border border-grey-1 md:h-auto">
          <div className="text-center mb-3 md:mb-8">
            <h1 className="text-xl md:text-3xl font-bold text-black mb-1 md:mb-2">
              Lapor Kerusakan Jalan
            </h1>
            <p className="text-xs md:text-base text-grey-2">
              Ikuti langkah berikut untuk mengirim laporan
            </p>
          </div>

          <Stepper currentStep={currentStep} />

          <div className="mt-3 md:mt-8 bg-white flex justify-center">
            <div className="w-full max-w-2xl">
              {currentStep === 1 && <UploadStep onNext={nextStep} />}
              {currentStep === 2 && <LocationStep onNext={nextStep} />}
              {currentStep === 3 && <AnalysisStep onNext={nextStep} />}
              {currentStep === 4 && <ConfirmStep />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
