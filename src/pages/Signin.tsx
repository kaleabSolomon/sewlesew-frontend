import { useState } from "react";
import { FiMail, FiLock, FiPhone } from "react-icons/fi";
import Button from "@/components/ui/Button";
import { FaGoogle } from "react-icons/fa6";

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidEthiopianPhone = (phone: string) => {
  return /^(?:\+251|0)?(?:9[0-9]{8})$/.test(phone);
};

const SignIn = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(identifier) && !isValidEthiopianPhone(identifier)) {
      setError("Enter a valid email or Ethiopian phone number.");
      return;
    }
    setError("");
    console.log("Logging in with:", { identifier, password });
  };

  const handlePasswordChange = (pwd: string) => {
    setPassword(pwd);
  };

  const handleIdentifierChange = (ident: string) => {
    setIdentifier(ident);
  };

  return (
    <div className="flex w-full h-full">
      <div className="hidden xl:flex xl:flex-col w-[40%] h-screen justify-center items-center bg-customTealLight text-white ">
        <h1 className="text-6xl font-bold font-pds mb-10 tracking-widest">
          SEWLESEW
        </h1>
        <p className="text-3xl font-semibold">
          Happiness comes from your action
        </p>
      </div>
      <div className="w-full xl:w-[60%] h-screen flex flex-col justify-center items-center">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-4">SignIn</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                placeholder="Password"
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
              Sign In
            </Button>
          </form>

          <div className="border-t-2 border-t-gray-200 mt-4 flex justify-center text-gray-600">
            Or Sign up with
          </div>

          <div className="text-center mt-2">
            <Button className="w-full  text-gray-700 border py-3 rounded-lg flex items-center justify-center space-x-2 shadow">
              <FaGoogle />
              <span>Sign in with Google</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
