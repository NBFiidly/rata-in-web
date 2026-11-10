import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ReportFlow from "./pages/ReportFlow";
import Status from "./pages/Status";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Map from "./pages/Map";
import AdminDashboard from "./pages/AdminDashboard";
import AuthModal from "./components/auth/AuthModal";

function App() {
  return (
    <BrowserRouter>
      {/* 
        Letakkan AuthModal secara global di sini.
        Ia akan disembunyikan secara default dan hanya muncul
        ketika event "openAuthModal" dipicu oleh Navbar.
      */}
      <AuthModal />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<ReportFlow />} />
        <Route path="/status" element={<Status />} />
        <Route path="/peta" element={<Map />} />

        {/* 
          Rute-rute di bawah ini tetap dipertahankan sebagai halaman fallback 
          (misal: jika user mengakses url /login secara langsung dari address bar)
        */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
