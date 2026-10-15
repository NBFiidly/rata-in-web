import { useState } from "react";
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
    <div className="min-h-screen bg-grey-light py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-sm border border-grey-1">
        {/* Header dan Stepper sekarang selalu tampil untuk semua langkah */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Lapor Kerusakan Jalan
          </h1>
          <p className="text-grey-2">
            Ikuti langkah berikut untuk mengirim laporan
          </p>
        </div>

        <Stepper currentStep={currentStep} />

        <div className="mt-8 bg-white flex justify-center">
          <div className="w-full max-w-2xl">
            {currentStep === 1 && <UploadStep onNext={nextStep} />}

            {currentStep === 2 && <LocationStep onNext={nextStep} />}

            {currentStep === 3 && (
              // Gunakan onNext agar tombol manual bisa memicu perpindahan
              <AnalysisStep onNext={nextStep} />
            )}

            {currentStep === 4 && <ConfirmStep />}
          </div>
        </div>
      </div>
    </div>
  );
}
