"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState<string>();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    router.push("/login");
  };

  useEffect(() => {
    async function getUsername() {
      const response = await fetch('/api/auth/signin', {
        method: 'GET',
      });
      const data = await response.json();
      setUsername(data.cookie);
    }
    getUsername();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold">Welcome {username}!</h1>
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
