import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import { toastError, toastSuccess } from "../utils/notify";
export interface User {
  id: string;
  username: string;
}
export interface AuthState {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  nameCheck: (username: string) => Promise<boolean>;
  signup: (username: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authUser: null,
      isSigningUp: false,
      isLoggingIn: false,
      login: async (username: string, password: string) => {
        set({ isLoggingIn: true });
        try {
          const response = await axios.post("/api/auth/signin", {
            username,
            password,
          });
          toastSuccess("Login Success");
          console.log(response.data);
          set({ authUser: response.data.user, isLoggingIn: false });
          window.location.href = "/home"; // Redirect to home page after login
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            toastError(error.response.data.message);
          } else {
            toastError("An unknown error occurred");
          }
          console.error("Login Error: ", error);
          set({ isLoggingIn: false });
        }
      },
      logout: () => {
        axios.post("/api/auth/logout");
        localStorage.clear();
        set({ authUser: null });
        toastSuccess("Logout Success");
        window.location.href = "/auth/login";
      },
      signup: async (username: string, password: string) => {
        set({ isSigningUp: true });
        try {
          const response = await axios.post("/api/auth/signup", {
            username,
            password,
          });
          console.log("Signup Success: ", response.data);
          toastSuccess("Signup Success");
          window.location.href = "/home"; // Redirect to home page after signup
          set({ authUser: response.data.user, isSigningUp: false });
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            toastError(error.response.data.message);
          } else {
            toastError("An unknown error occurred");
          }
          console.error("Signup Error: ", error);
          set({ isSigningUp: false });
        }
      },
      nameCheck: async (username: string) => {
        try {
          const response = await axios.post(`/api/auth/namecheck`, {
            username,
          });
          return response.data.success;
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
