import Button from "@/components/ui/Button";
import AuthLayout from "@/layout/AuthLayout";
import { useState } from "react";
import { FiLock } from "react-icons/fi";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[450px] text-center">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <p className="text-gray-600 mb-2">
          Enter a new password for your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-customTeal outline-none"
            />
            <span className="absolute right-4 top-3 text-gray-400">
              <FiLock />
            </span>
          </div>

          <div className="relative">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-customTeal outline-none"
            />
            <span className="absolute right-4 top-3 text-gray-400">
              <FiLock />
            </span>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <Button
            type="submit"
            className="w-full bg-customTeal text-white py-3 rounded-lg"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
