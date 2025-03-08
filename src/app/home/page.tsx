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



  return (
    <>
      
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold">Welcome {authUser?.username}!</h1>
            <p className="text-lg mt-3">You have successfully logged in.</p>
            <button
              onClick={handleLogout}
              className="mt-5 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </motion.div>
        </div>
     
    </>
  );
}
