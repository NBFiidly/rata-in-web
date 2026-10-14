
// Menerima prop 'currentStep' (angka 1-4)
export default function Stepper({ currentStep }) {
  const steps = [
    { num: 1, label: "Upload Foto" },
    { num: 2, label: "Lokasi" },
    { num: 3, label: "AI Analisis" },
    { num: 4, label: "Konfirmasi" },
  ];

  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps.map((step, index) => {
        // Tentukan apakah langkah ini sudah lewat, sedang aktif, atau belum
        const isCompleted = currentStep > step.num;
        const isActive = currentStep === step.num;

        return (
          <div key={step.num} className="flex items-center">
            {/* Lingkaran Angka / Centang */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-bold
              ${isCompleted || isActive ? "border-green bg-green text-white" : "border-grey-2 text-grey-2 bg-white"}
            `}
            >
              {isCompleted ? (
                // Ikon Centang Sederhana (SVG)
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                step.num
              )}
            </div>

            {/* Label Teks */}
            <span
              className={`ml-2 text-sm font-medium ${isCompleted || isActive ? "text-black" : "text-grey-2"}`}
            >
              {step.label}
            </span>

            {/* Garis Penghubung (Kecuali item terakhir) */}
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-4 ${currentStep > step.num ? "bg-green" : "bg-grey-2"}`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
