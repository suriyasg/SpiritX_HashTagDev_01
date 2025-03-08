"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import signupImage from "../../../public/signup.jpg"; // your signup image
import { useAuthStore } from "@/src/store/useAuthStore";

export default function Signup() {
  const { signup, authUser, isSigningUp, nameCheck } = useAuthStore();
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (authUser && authUser.username) {
      router.push("/home");
    }
  });
  const validateUsername = (value: string): string => {
    if (value.length < 8) {
      return "Username must be at least 8 characters long";
    }
    return "";
  };

  const validatePassword = (value: string): string => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA0-9]).{8,}$/;
    if (!regex.test(value)) {
      return "Password must contain one uppercase, one lowercase, and one special character";
    }
    return "";
  };

  const validateConfirmPassword = (value: string): string => {
    if (value !== password) {
      return "Passwords do not match";
    }
    return "";
  };

  const handleSignup = () => {
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);

    setErrors({
      username: usernameError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    if (usernameError || passwordError || confirmPasswordError) {
      return;
    }
    try {
      signup(username, password);
    } catch (error) {
      console.error("Signup Error: ", error);
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
            src={signupImage}
            alt="Signup"
            className="w-60 h-60 object-cover"
          />{" "}
          {/* Adjust image size */}
        </motion.div>

        {/* Right side for the input fields */}
        <motion.div
          className="w-1/2 flex flex-col justify-center px-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Sign Up heading */}
          <motion.div
            className="text-green-500 text-3xl font-semibold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Sign Up
          </motion.div>

          {/* Username input */}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-4 border rounded-lg mb-6 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            value={username}
            onChange={async (e) => {
              setUsername(e.target.value);
              if (e.target.value.length >= 8) {
                // Check if username is at least 8 characters long

                const response = await nameCheck(e.target.value);
                if (response) {
                  // If username exists, show error
                  setErrors((prev) => ({
                    ...prev,
                    username: "Username already exists",
                  }));
                }
              }
              setErrors((prev) => ({
                ...prev,
                username: validateUsername(e.target.value),
              }));
            }}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mb-2">{errors.username}</p>
          )}

          {/* Password input */}
          <div className="relative w-full mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-4 border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 pr-10"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  password: validatePassword(e.target.value),
                }));
              }}
            />
            <button
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password}</p>
          )}

          {/* Confirm Password input */}
          <div className="relative w-full mb-6">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full p-4 border rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 pr-10"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  confirmPassword: validateConfirmPassword(e.target.value),
                }));
              }}
            />
            <button
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mb-2">
              {errors.confirmPassword}
            </p>
          )}

          {/* Sign Up button */}
          <button
            className={`w-full text-white py-4 rounded-lg transition-transform transform hover:scale-105 mt-4 ${
              isSigningUp
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
            onClick={handleSignup}
            disabled={isSigningUp}
          >
            {isSigningUp ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Login link */}
          <p className="text-center mt-6 text-gray-500">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
