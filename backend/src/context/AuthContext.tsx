"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types/user";
import { authService } from "../services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const loadUserData = async () => {
        try {
          const response = await authService.verifyToken(token);
          setUser(response.data);
        } catch {
          localStorage.removeItem("token");
        } finally {
          setLoading(false);
        }
      };
      loadUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      router.push("/dashboard");
    } catch (err: any) {
      const message = err?.response?.data?.message || "Login failed";
      toast.error(message);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    try {
      await authService.register({ name, email, password, role });
      toast.success("Account created! Please sign in.");
      router.push("/login");
    } catch (err: any) {
      const message = err?.response?.data?.message || "Registration failed";
      toast.error(message);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch {
      localStorage.removeItem("token");
    } finally {
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};