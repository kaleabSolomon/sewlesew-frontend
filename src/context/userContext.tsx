import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phoneNumber: string | null;
  dateOfBirth: string;
  profilePicture: string | null;
  campaigns: Campaign[];
  Donation: Donation[];
}

type Campaign = {
  id: string;
  userId: string;
  businessId: string | null;
  charityId: string | null;
  category: string; // If there are multiple categories, use a union type
  createdAt: string; // Consider `Date` if parsing as Date object
  deadline: string; // Consider `Date` if parsing as Date object
  description: string;
  goalAmount: string; // Consider `number` if it's meant to be numeric
  raisedAmount: string; // Consider `number` if it's meant to be numeric
  status: string; // Adjust based on possible statuses
  title: string;
  updatedAt: string; // Consider `Date` if parsing as Date object
};
type Donation = {
  id: string;
  campaignId: string;
  campaign: Campaign;
  userId?: string | null;
  amount: number;
  txRef: string;
  paymentStatus: "VERIFIED" | "PENDING" | "FAILED"; // Add more statuses if needed
  email?: string | null;
  isAnonymous: boolean;
  createdAt: string; // ISO date string
};

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
