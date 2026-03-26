import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Importing Pages EXACTLY as per your folder structure
import Landing from "./pages/landing"; // 'l' small as per your screenshot
import Login from "./pages/login";     // 'l' small as per your screenshot
import Register from "./pages/Register"; // 'R' capital as per your screenshot
import StudentDashboard from "./pages/StudentDashboard";
import IndustryDashboard from "./pages/IndustryDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* STEP 1: Sabse pehle Landing Page khulega jab user website open karega */}
        <Route path="/" element={<Landing />} />

        {/* STEP 2: Login aur Register ke paths */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* STEP 3: Dashboards ke paths */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/industry" element={<IndustryDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* STEP 4: Agar koi galat URL daale toh wapas Landing Page par bhej do */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;