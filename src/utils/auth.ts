import { jwtPayload } from "@/types/auth";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const isAuthenticated = (): boolean => {
  const decodedToken = decodeToken("access_token");
  if (!decodedToken) return false;
  const isAuthed = decodedToken.exp
    ? decodedToken.exp > Date.now() / 1000
    : false;

  return isAuthed;
};

export function decodeToken(tokenName: string) {
  const token = Cookies.get(tokenName);

  if (!token) return null;

  const decodedToken: jwtPayload = jwtDecode(token);

  return decodedToken;
}
export function getTokenExpiryTime(token: string) {
  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp ? decoded.exp - now : 0;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return 0; // Treat invalid token as expired
  }
}
