"use client";
import { useAuthStore } from "@/src/store/useAuthStore";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { authUser, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  useEffect(() => {
    if (!authUser) {
      router.push("/auth/login");
    }
  }, [authUser, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
      <motion.div
        className="text-center backdrop-blur-lg bg-white/80 p-10 rounded-2xl shadow-2xl border border-gray-300 text-gray-900"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
          Welcome {authUser?.username || "User"}!
        </h1>
        <p className="text-lg mt-3 text-gray-700">
          You have successfully logged in.
        </p>

        <motion.button
          onClick={handleLogout}
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 15px rgba(239, 68, 68, 0.8)",
          }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-3 text-lg font-semibold rounded-xl bg-red-600 text-white hover:bg-red-700 transition duration-300 shadow-md"
        >
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
}
