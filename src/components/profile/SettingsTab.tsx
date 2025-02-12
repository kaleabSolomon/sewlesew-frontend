import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import Button from "../ui/Button";
import { changePassword } from "@/services/user";
import LogoutBtn from "../ui/LogoutBtn";

const SettingsTab = () => {
  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Settings</h1>
      <div className="flex flex-col justfy-between">
        <div className="px-10">
          <h1 className="text-lg  py-3">Change Password</h1>
          <ChangePassword />
        </div>
        <div className="flex-end flex items-center justify-end mt-20 gap-x-3 px-6">
          <LogoutBtn />
        </div>
      </div>
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((prev) => !prev);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword((prev) => !prev);
  };

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const handleError = (err: string) => {
    setError(err);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await changePassword(
        {
          oldPassword,
          newPassword,
          passwordConfirm: confirmNewPassword,
        },
        handleLoading,
        handleError
      );
      alert("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      console.log(err);
      setError("Failed to update password.");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className=" rounded-lg space-y-2 ">
      <div className="space-y-2">
        <label className="block text-sm ">Old Password</label>
        <div className="relative">
          <input
            type={showOldPassword ? "password" : "text"}
            placeholder="Enter your old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <button
            type="button"
            onClick={toggleOldPasswordVisibility}
            className="absolute right-4 top-3 text-customTeal/50"
          >
            {showOldPassword ? <FaEyeSlash /> : <FaEye />}
          </button>{" "}
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm">New Password</label>
        <div className="relative">
          <input
            type={showNewPassword ? "password" : "text"}
            placeholder="Enter a new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <button
            type="button"
            onClick={toggleNewPasswordVisibility}
            className="absolute right-4 top-3 text-customTeal/50"
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm ">Confirm New Password</label>
        <div className="relative">
          <input
            type={showConfirmNewPassword ? "password" : "text"}
            placeholder="Confirm new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
          <button
            type="button"
            onClick={toggleConfirmNewPasswordVisibility}
            className="absolute right-4 top-3 text-customTeal/50"
          >
            {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </form>
  );
};

export default SettingsTab;
