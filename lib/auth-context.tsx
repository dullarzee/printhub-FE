"use client";

import { createContext, useContext, useState, useEffect } from "react";
import BEendpoints from "./urls/backendUrl";
import axios from "axios";

interface User {
  _id: string;
  email: string;
  name: string;
  phone: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    name: string,
    phone: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
}

axios.defaults.withCredentials = true;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    checkAuth();
  }, []);

  // const checkAuth = async () => {
  //   try {
  //     const res = await fetch("/api/auth/me");
  //     if (res.ok) {
  //       const data = await res.json();
  //       setUser(data.user);
  //     }
  //   } catch (error) {
  //     console.error("Auth check failed:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(BEendpoints.check_auth);
      console.log("check auth response: ", data);
      if (data.ok) setUser(data.data);
      else setUser(null);
    } catch (err) {
      setUser(null);
      //throw Error("Couldn't verify authentication");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(BEendpoints.login, { email, password });

      if (data.ok) {
        setUser(data.data);
        console.log(data);
      }
    } catch (err: any) {
      throw new Error(err.response.data.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    phone: string,
  ) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BEendpoints.signup}`, {
        email,
        password,
        name,
        phone,
      });

      if (data.ok) {
        console.log(data);
        setUser(data.data);
      }
    } catch (err: any) {
      console.log(err.response.data);
      throw new Error(err.response.data.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
