import Button from "@/components/ui/Button";
import { useAuthContext } from "@/context/authContext";
import { resendCode, verifyAccount } from "@/services/auth";
import { useState, useEffect } from "react";
import { FiClock, FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyAccount = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(600); // 10 minutes = 600 seconds
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerificationLoading = (isLoading: boolean) => {
    setVerificationLoading(isLoading);
  };
  const handleError = (error: string) => {
    setError(error);
  };

  const handleResendLoading = (isLoading: boolean) => {
    setResendLoading(isLoading);
  };

  const { authData, updateAuthData } = useAuthContext();

  console.log(authData?.identifier);

  // Countdown timer effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Format timer display (MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Handle verification submission
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      setError("Enter a valid 6-digit code.");
      return;
    }

    try {
      const data = await verifyAccount(
        Number(code),
        authData?.identifier || "",
        handleVerificationLoading,
        handleError,
        updateAuthData
      );

      if (data) {
        toast.success("verified account successfully. logging you in.");
        if (authData) {
          authData.isVerified = true;
        }
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error, { autoClose: 3000 });
      handleError("");
    }
  }, [error]);
  // Handle Resend Code
  const handleResend = async () => {
    setError("");

    try {
      const data = await resendCode(
        authData?.identifier || "sth",
        handleResendLoading,
        handleError
      );

      if (data) {
        toast.success("verification code has been sent.");
      }
    } catch (err) {
      console.log(err);
    }

    setTimer(600); // Reset countdown to 10 minutes
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-[450px] text-center">
      <h2 className="text-2xl font-bold mb-4">Verify Your Account</h2>
      <p className="text-gray-600 mb-2">
        Enter the 6-digit code sent to your email or phone.
      </p>

      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="123456"
          className="w-full px-4 py-3 border rounded-lg text-center text-xl tracking-widest focus:ring focus:ring-customTeal outline-none"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          className="w-full bg-customTeal text-white py-3 rounded-lg"
          loading={verificationLoading}
        >
          Verify
        </Button>
      </form>

      <div className="flex items-center justify-between text-gray-600 mt-4">
        <div className="flex items-center space-x-2">
          <FiClock className="text-lg" />
          <span>{formatTime(timer)}</span>
        </div>

        <Button
          className="text-customTeal flex items-center space-x-2"
          onClick={handleResend}
          loading={resendLoading}
        >
          <FiRefreshCw />
          <span>Resend Code</span>
        </Button>
      </div>
    </div>
  );
};

export default VerifyAccount;
