import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Firebase imports (Ensure firebase.js is correctly set up in src folder)
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

// Background Video (Path check kar lena apne assets folder ke hisab se)
import bgVideo from "../assets/bg-video.mp4";

export default function Login() {
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  // State for Form Data
  const [formData, setFormData] = useState({
    identifier: "", // Student ke liye Enrollment No, Industry ke liye Email
    password: ""
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manual Login Logic
  const handleLogin = (e) => {
    e.preventDefault();
    if (role === "student") {
      console.log("Student logging in with Enrollment No:", formData.identifier);
      navigate("/student");
    } else {
      console.log("Industry logging in with User Id:", formData.identifier);
      navigate("/industry");
    }
  };

  // Google OAuth Login Logic
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Login Successful:", user.displayName);
      
      // Role based redirection
      if (role === "student") {
        navigate("/student");
      } else {
        navigate("/industry");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      alert("Google Login Failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 py-10 overflow-hidden">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      {/* Login Card */}
      <div className="relative z-20 flex w-full max-w-5xl bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden min-h-[600px] border border-white/20">
        
        {/* Left Side: Animated Graphics */}
        <div className="hidden lg:flex w-1/2 bg-black/30 relative items-center justify-center overflow-hidden">
          <motion.div
            animate={{ y: [0, -40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-72 h-72 bg-purple-500/40 rounded-full mix-blend-screen filter blur-[80px]"
          />
          <motion.div
            animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/40 rounded-full mix-blend-screen filter blur-[80px]"
          />

          <div className="relative z-10 text-white text-center p-8">
            <h1 className="text-4xl font-extrabold mb-4 drop-shadow-md underline decoration-indigo-500">C2C PORTAL</h1>
            <p className="text-gray-200 font-medium drop-shadow-md">
              Connecting Campus directly to the Corporate world.
            </p>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center relative bg-white/95">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-800">
              {role === "student" ? "Student Portal" : "Industry Portal"}
            </h2>
            <p className="text-gray-500 mt-2 text-sm font-medium">Please login to continue</p>
          </div>

          {/* Role Selection Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6 relative shadow-inner border border-gray-200">
            <button
              onClick={() => setRole("student")}
              className={`flex-1 py-3 text-sm font-bold rounded-lg z-10 transition-colors ${role === "student" ? "text-white" : "text-gray-600"}`}
            >
              Student
            </button>
            <button
              onClick={() => setRole("industry")}
              className={`flex-1 py-3 text-sm font-bold rounded-lg z-10 transition-colors ${role === "industry" ? "text-white" : "text-gray-600"}`}
            >
              Industry
            </button>
            <motion.div
              className="absolute top-1 bottom-1 left-1 bg-indigo-600 rounded-lg shadow-md"
              initial={false}
              animate={{ x: role === "student" ? 0 : "100%", width: "calc(50% - 4px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg shadow-sm hover:bg-gray-50 hover:shadow-md transition-all mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm font-medium">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <form onSubmit={handleLogin}>
            {/* Dynamic Input: Enrollment No or Email */}
            <div className="relative mb-4">
              <input 
                type="text" 
                id="identifier" 
                name="identifier" 
                placeholder=" " 
                required
                value={formData.identifier} 
                onChange={handleChange} 
                className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent peer transition-all" 
              />
              <label 
                htmlFor="identifier" 
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
              >
                {role === "student" ? "University Roll No / Enrollment No" : "User ID"}
              </label>
            </div>

            {/* Password Input */}
            <div className="relative mb-6">
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder=" " 
                required
                value={formData.password} 
                onChange={handleChange} 
                className="block px-3 pb-2 pt-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent peer transition-all" 
              />
              <label 
                htmlFor="password" 
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 cursor-text"
              >
                Password
              </label>
            </div>

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-lg shadow-md hover:shadow-indigo-500/40 active:scale-95 transition-all font-bold text-lg tracking-wide">
              LOGIN
            </button>
          </form>

          <p className="text-center mt-6 text-sm font-medium text-gray-600">
            Don't have an account?{" "}
            <span 
              onClick={() => navigate("/register")}
              className="text-indigo-700 font-bold cursor-pointer hover:underline"
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}