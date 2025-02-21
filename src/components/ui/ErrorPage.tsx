import { useRouteError } from "react-router-dom";
import Button from "./Button";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="max-w-lg text-center p-8 bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-5xl font-extrabold text-red-500 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-lg text-gray-300 mb-4">
          We encountered an unexpected error. Please try again later.
        </p>
        {error?.statusText || error?.message ? (
          <p className="text-sm text-gray-400 italic mb-6">
            <i>{error.statusText || error.message}</i>
          </p>
        ) : null}
        <Button
          variant="secondary"
          onClick={() => (window.location.href = "/")}
          className="w-full"
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
}
