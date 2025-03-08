import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useRouter } from "next/navigation";
import axios from "axios";
export interface User {
  id: string;
  username: string;
}
export interface AuthState {
  router: ReturnType<typeof useRouter>;
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  nameCheck: (username: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      router: useRouter(),
      authUser: null,
      isSigningUp: false,
      isLoggingIn: false,
      login: async (username: string, password: string) => {
        set({ isLoggingIn: true });
        try {
          const response = await axios.post("/api/auth/login", {
            username,
            password,
          });
          console.log("Login Success: ", response.data);
          set({ authUser: response.data, isLoggingIn: false });
        } catch (error) {
          console.error("Login Error: ", error);
          set({ isLoggingIn: false });
        }
      },
      logout: () => {
        axios.post("/api/auth/logout");
        set({ authUser: null });
        get().router.push("/auth/login");
      },
      signup: async (username: string, password: string) => {
        set({ isSigningUp: true });
        try {
          const response = await axios.post("/api/auth/signup", {
            username,
            password,
          });
          console.log("Signup Success: ", response.data);
          set({ authUser: response.data, isSigningUp: false });
        } catch (error) {
          console.error("Signup Error: ", error);
          set({ isSigningUp: false });
        }
      },
      nameCheck: async (username: string) => {
        try {
          const response = await axios.post(`/api/auth/namecheck`, {
            username,
          });
          return response.data;
        } catch (error) {
          console.error("Check Name Error: ", error);
        }
      },
    }),
    {
      name: "auth-storage", // Storage key
      storage: createJSONStorage(() => localStorage), // Use localStorage to persist state
    }
  )
);
