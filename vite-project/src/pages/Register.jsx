import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Firebase imports (Ensure firebase.js exists in src/)
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

// Background Video Path
import bgVideo from "../assets/bg-video.mp4";

export default function Register() {
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    identifier: "", // Enrollment No for Student
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Google Sign-In Logic (Same as Login Page)
  const handleGoogleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Registration Successful:", user.displayName);
      
      // Successfully registered, now send to dashboard
      if (role === "student") {
        navigate("/student");
      } else {
        navigate("/industry");
      }
    } catch (error) {
      console.error("Google Auth Error:", error.message);
      alert("Google Sign-in failed. Please try again.");
    }
  };

  const handleManualRegister = (e) => {
    e.preventDefault();
    console.log("Registering with:", formData);
    // Add your backend registration logic here
    navigate("/login");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 py-10 overflow-hidden">
      
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="fixed top-0 left-0 w-full h-full object-cover z-0">
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="fixed top-0 left-0 w-full h-full bg-black/60 z-10"></div>

      {/* Register Card */}
      <div className="relative z-20 flex w-full max-w-5xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        
        {/* Left Side Info */}
        <div className="hidden lg:flex w-1/2 bg-indigo-900/40 p-12 flex-col justify-center text-white">
          <h1 className="text-4xl font-bold mb-6">Join the C2C Network!</h1>
          <p className="text-lg text-gray-200">
            Create an account to bridge the gap between your campus and the corporate world.
          </p>
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 bg-white/95">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-500">Join as a {role === "student" ? "Student" : "Industry Partner"}</p>
          </div>

          {/* Role Selection */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6 relative">
            <button onClick={() => setRole("student")} className={`flex-1 py-2 text-sm font-bold rounded-lg z-10 ${role === "student" ? "text-white" : "text-gray-600"}`}>Student</button>
            <button onClick={() => setRole("industry")} className={`flex-1 py-2 text-sm font-bold rounded-lg z-10 ${role === "industry" ? "text-white" : "text-gray-600"}`}>Industry</button>
            <motion.div className="absolute top-1 bottom-1 left-1 bg-indigo-600 rounded-lg shadow-md" animate={{ x: role === "student" ? 0 : "100%", width: "calc(50% - 4px)" }} />
          </div>

          {/* GOOGLE REGISTER BUTTON - NEWLY ENABLED */}
          <button
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg shadow-sm hover:bg-gray-50 transition-all mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </button>

          <div className="flex items-center mb-6"><div className="flex-1 border-t border-gray-300"></div><span className="px-3 text-gray-400 text-xs">OR REGISTER MANUALLY</span><div className="flex-1 border-t border-gray-300"></div></div>

          <form onSubmit={handleManualRegister} className="space-y-4">
            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
            <input type="text" name="identifier" placeholder={role === "student" ? "University Roll No / Enrollment No" : "Company Registration No"} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
            <input type="password" name="password" placeholder="Create Password" onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
            
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95">REGISTER</button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account? <span onClick={() => navigate("/login")} className="text-indigo-700 font-bold cursor-pointer hover:underline">Login here</span>
          </p>
        </div>
      </div>
    </div>
  );
}