import { jwtPayload } from "@/types/auth";
import { useState, useEffect } from "react";

const useLocalUser = () => {
  const [user, setUserState] = useState<jwtPayload | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  // Function to set user in state and localStorage
  const setUser = (newUser: jwtPayload) => {
    localStorage.setItem("user", JSON.stringify(newUser)); // Store immediately
    setUserState(newUser); // Update state
  };

  // Function to update user data
  const updateUser = (updates: Partial<jwtPayload>) => {
    setUserState((prevUser) => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, ...updates };
      localStorage.setItem("user", JSON.stringify(updatedUser)); // Store immediately
      return updatedUser;
    });
  };

  // Function to remove user from state and localStorage
  const removeUser = () => {
    localStorage.removeItem("user"); // Remove immediately
    setUserState(null); // Update state
  };

  return { user, setUser, updateUser, removeUser };
};

export default useLocalUser;
