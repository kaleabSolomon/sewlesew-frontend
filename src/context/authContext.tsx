import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtPayload } from "@/types/auth";
import { decodeToken } from "@/utils/auth";

// Define the type for the context value
interface AuthContextType {
  authData: jwtPayload | null;
  updateAuthData: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }

  return context;
}

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [authData, setAuthData] = useState<jwtPayload | null>(null);

  // Function to update auth data from token
  const updateAuthData = () => {
    const decodedUser = decodeToken("access_token") as jwtPayload;
    setAuthData(decodedUser);
  };

  // Run updateAuthData once when the provider mounts
  useEffect(() => {
    updateAuthData();
  }, []);

  return (
    <AuthContext.Provider value={{ authData, updateAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}
