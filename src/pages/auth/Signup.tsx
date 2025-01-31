import { useState } from "react";
import { FiMail, FiPhone, FiLock, FiUser } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import { isValidEmail, isValidPhone } from "@/utils/validators";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleIdentifierChange = (value: string) => {
    setIdentifier(value);
    if (!isValidEmail(value) && !isValidPhone(value)) {
      setError("Enter a valid email or Ethiopian phone number");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    setError(""); // Clear previous errors

    if (
      !firstName ||
      !lastName ||
      !identifier ||
      !dateOfBirth ||
      !password ||
      !passwordConfirm
    ) {
      setError("All fields are required");
      return; // Stop submission
    }

    if (!isValidEmail(identifier) && !isValidPhone(identifier)) {
      setError("Enter a valid email or phone number");
      return; // Stop submission
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return; // Stop submission
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return; // Stop submission
    }

    // Determine whether it's an email or phone number
    const requestData = isValidEmail(identifier)
      ? { email: identifier }
      : { phoneNumber: identifier };

    const requestBody = {
      firstName,
      lastName,
      dateOfBirth,
      password,
      passwordConfirm,
      ...requestData, // Includes either email or phoneNumber
    };

    console.log(requestBody);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-[450px]">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div className="relative">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-customTeal outline-none"
          />
          <span className="absolute right-4 top-3 text-gray-400">
            <FiUser />
          </span>
        </div>

        {/* Last Name */}
        <div className="relative">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-customTeal outline-none"
          />
          <span className="absolute right-4 top-3 text-gray-400">
            <FiUser />
          </span>
        </div>

        {/* Email or Phone */}
        <div className="relative">
          <input
            type="text"
            value={identifier}
            onChange={(e) => handleIdentifierChange(e.target.value)}
            placeholder="Email or Phone Number"
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-customTeal outline-none"
          />
          <span className="absolute right-4 top-3 text-gray-400">
            {isValidEmail(identifier) ? <FiMail /> : <FiPhone />}
          </span>
        </div>

        {/* Date of Birth */}
        <div className="relative">
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-customTeal outline-none"
          />
          <span className="absolute right-4 top-3 text-gray-400"></span>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-customTeal outline-none"
          />
          <span className="absolute right-4 top-3 text-gray-400">
            <FiLock />
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-customTeal outline-none"
          />
          <span className="absolute right-4 top-3 text-gray-400">
            <FiLock />
          </span>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          className="w-full bg-customTeal text-white py-3 rounded-lg"
        >
          Sign Up
        </Button>
      </form>

      <div className="border-t-2 border-t-gray-200 mt-4 flex justify-center text-gray-600">
        Or Sign up with
      </div>

      <div className="text-center mt-2">
        <Button className="w-full text-gray-700 border py-3 rounded-lg flex items-center justify-center space-x-2 shadow">
          <FaGoogle />
          <span>Sign up with Google</span>
        </Button>
      </div>

      <div className="flex justify-center text-gray-600">
        Already have an account?
        <Link className="text-customTeal ml-2" to={"/auth/signin"}>
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Signup;
