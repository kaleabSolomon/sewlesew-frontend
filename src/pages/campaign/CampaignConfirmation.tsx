import Lottie from "lottie-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import reviewingAnimation from "@/assets/reviewing.json";

const ConfirmationPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
      <div className="w-64 h-64">
        <Lottie animationData={reviewingAnimation} loop={true} />
      </div>
      <h1 className="text-2xl font-semibold text-gray-800 mt-4">
        Campaign Submitted!
      </h1>
      <p className="text-gray-600 mt-2">
        Your campaign is under review. Please wait while we process it.
      </p>
      <p className="text-gray-500 text-sm mt-1">
        Redirecting to home in 3 seconds...
      </p>
    </div>
  );
};

export default ConfirmationPage;
