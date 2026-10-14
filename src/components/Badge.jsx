
// Menerima prop 'variant' (berat, sedang, ringan) dan 'children' (teks label)
export default function Badge({ variant = "ringan", children }) {
  // Menentukan warna background dan text berdasarkan variant
  const getVariantStyles = () => {
    switch (variant) {
      case "berat":
        // Asumsi warna dari Figma: background Soft Red, text Red
        return "bg-soft-red text-red";
      case "sedang":
        // Asumsi warna dari Figma: background Soft Orange, text Orange
        return "bg-soft-orange text-orange";
      case "ringan":
      default:
        // Asumsi warna dari Figma: background Soft Green, text Green
        return "bg-soft-green text-green";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getVariantStyles()}`}
    >
      {children}
    </span>
  );
}
