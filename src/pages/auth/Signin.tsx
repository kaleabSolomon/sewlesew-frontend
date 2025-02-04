import { useEffect, useState } from "react";
import { FiMail, FiLock, FiPhone } from "react-icons/fi";
import Button from "@/components/ui/Button";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isValidEmail, isValidPhone } from "@/utils/validators";
import { signIn } from "@/services/auth";
import { useAuthContext } from "@/context/authContext";

const SignIn = () => {
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateAuthData } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(identifier) && !isValidPhone(identifier)) {
      setError("Enter a valid email or Ethiopian phone number.");
      return;
    }
    const toastId = toast.loading("Signing you in...");
    try {
      const data = await signIn(
        { identifier, password },
        handleIsLoading,
        handleError,
        updateAuthData
      );

      if (data) {
        toast.update(toastId, {
          render: "Signed in successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      toast.dismiss();
    }
  };

  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error, { autoClose: 3000 });
      handleError("");
    }
  }, [error]);

  const handlePasswordChange = (pwd: string) => {
    setPassword(pwd);
  };
  const handleIsLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };
  const handleError = (error: string) => {
    setError(error);
  };
  const handleIdentifierChange = (ident: string) => {
    setIdentifier(ident);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-[450px]">
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
          loading={isLoading}
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
      <div className="flex justify-center text-gray-600">
        dont have an account?
        <Link className="text-customTeal ml-2" to={"/auth/signup"}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
