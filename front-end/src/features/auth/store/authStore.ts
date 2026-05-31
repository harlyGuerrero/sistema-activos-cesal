import { create } from "zustand";

interface User {
  id: number;
  nombre: string;
  apellido: string;
  auth: number;
  rol: string;
}

interface AuthStore {
  token: string | null;
  user: User | null;

  setSession: (
    token: string,
    user: User
  ) => void;

  logout: () => void;
}

export const useAuthStore =
  create<AuthStore>((set) => ({
    token:
      localStorage.getItem("token"),

    user: JSON.parse(
      localStorage.getItem("user") ||
        "null"
    ),

    setSession: (token, user) => {
      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      set({
        token,
        user,
      });
    },

    logout: () => {
      localStorage.clear();

      set({
        token: null,
        user: null,
      });
    },
  }));