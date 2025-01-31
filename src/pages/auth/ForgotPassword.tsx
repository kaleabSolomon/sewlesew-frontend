import Button from "@/components/ui/Button";
import { isValidEmail, isValidPhone } from "@/utils/validators";
import { useState } from "react";
import { FiMail, FiPhone } from "react-icons/fi";

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isValidEmail(identifier) && !isValidPhone(identifier)) {
      setError("Please enter a valid email or Ethiopian phone number.");
      return;
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-[450px] text-center">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <p className="text-gray-600 mb-2">
        Enter your email or phone number to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Email or Phone Number"
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-customTeal outline-none"
          />
          <span className="absolute right-4 top-3 text-gray-400">
            {isValidEmail(identifier) ? <FiMail /> : <FiPhone />}
          </span>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <Button
          type="submit"
          className="w-full bg-customTeal text-white py-3 rounded-lg"
        >
          Send Reset Code
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
