"use client";

import { createContext, useContext, useState, useCallback } from "react";


const AppContext = createContext(null);

export function AppProvider({ children }) {
  
  const signup = useCallback(async(name, email, password, ship_address, role) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST", body: JSON.stringify({ name, email, passwordHash: password, role }), headers: {
          "Content-Type": "application/json"
        }
      });
      const res = await response.json();
      console.log("register response", res);

      if (!res.ok) {
        return res.message || "Signup failed."; // your backend error
      }
      
      setMessage(res.message);
      console.log("This message is forward to main file", res);
      
      
      return null;

    } catch(error) {
      return "Network error. Please try again.";
    }
  }, []);

  

  return (
    <AppContext.Provider value={{
      signup
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}