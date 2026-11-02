
// Menerima prop 'currentStep' (angka 1-4)
export default function Stepper({ currentStep }) {
  const steps = [
    { num: 1, label: "Upload Foto" },
    { num: 2, label: "Lokasi" },
    { num: 3, label: "AI Analisis" },
    { num: 4, label: "Konfirmasi" },
  ];

  return (
    <div className="grid grid-cols-4 items-start w-full mb-4 md:flex md:items-center md:justify-center md:gap-0 md:mb-8">
      {steps.map((step, index) => {
        // Tentukan apakah langkah ini sudah lewat, sedang aktif, atau belum
        const isCompleted = currentStep > step.num;
        const isActive = currentStep === step.num;

        return (
          <div key={step.num} className="relative flex flex-col items-center md:flex-row md:items-center">
            {/* Lingkaran Angka / Centang */}
            <div
              className={`flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full border-2 text-xs md:text-sm font-bold
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
              className={`mt-1 text-[10px] leading-tight text-center md:mt-0 md:ml-2 md:text-sm md:font-medium md:text-left md:whitespace-nowrap ${isCompleted || isActive ? "text-black" : "text-grey-2"}`}
            >
              {step.label}
            </span>

            {/* Garis Penghubung (Kecuali item terakhir) */}
            {index < steps.length - 1 && (
              <div
                className={`absolute left-[calc(50%+18px)] top-3.5 w-[calc(100%-36px)] h-0.5 md:static md:w-12 md:mx-4 ${currentStep > step.num ? "bg-green" : "bg-grey-2"}`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
