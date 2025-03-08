"use client";
import { useAuthStore } from "@/src/store/useAuthStore";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { authUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.push("/auth/login");
    }
  }, [authUser, router]);
  return (
    <>
      {authUser && (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold">Welcome to the Home Page!</h1>
            <p className="text-lg mt-3">You have successfully logged in.</p>
          </motion.div>
        </div>
      )}
    </>
  );
}
