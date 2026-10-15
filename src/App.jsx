import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReportFlow from "./pages/ReportFlow";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute untuk Halaman Utama */}
        <Route path="/" element={<Home />} />

        {/* Rute untuk Halaman Pelaporan */}
        <Route path="/report" element={<ReportFlow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
