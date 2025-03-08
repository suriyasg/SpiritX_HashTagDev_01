"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import loginImage from "../../../public/login.png";
import { useAuthStore } from "@/src/store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { toastError } from "@/src/utils/notify";

export default function Login() {
  const { login, authUser, isLoggingIn } = useAuthStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (authUser && authUser.username) {
      router.push("/home");
    }
  });
  const handleLogin = () => {
    if (!email || !password) {
      toastError("Fill all Fields");
      return;
    }
    try {
      login(email, password);
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="flex w-[800px] bg-white shadow-lg rounded-2xl overflow-hidden p-8">
        {/* Left side for the image */}
        <motion.div
          className="w-1/2 flex justify-center items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={loginImage}
            alt="Login"
            className="w-60 h-60 object-cover"
          />{" "}
          {/* Increased image size */}
        </motion.div>

        {/* Right side for the input fields */}
        <motion.div
          className="w-1/2 flex flex-col justify-center px-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Login heading */}
          <motion.div
            className="text-blue-500 text-3xl font-semibold mb-6" // Updated to blue text
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Login
          </motion.div>

          {/* Username input */}
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full p-4 border rounded-lg mb-6 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password input */}
          <div className="relative w-full mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-4 border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Login button */}
          <button
            className={`w-full bg-blue-500 text-white py-4 rounded-lg transition-transform transform mt-4 ${
              isLoggingIn
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600 hover:scale-105"
            }`}
            onClick={handleLogin}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </button>

          {/* Sign-up link */}
          <p className="text-center mt-6 text-gray-500">
            New user?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => router.push("/auth/signup")}
            >
              Sign up
            </span>
          </p>
        </motion.div>
      </div>
      <Toaster />
    </div>
  );
}
