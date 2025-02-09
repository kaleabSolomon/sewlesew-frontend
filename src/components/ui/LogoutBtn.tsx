import { useState } from "react";
import Button from "./Button";
import { logout } from "@/services/auth";
import useLocalUser from "@/hooks/useLocalStorage";
import { FiLogOut } from "react-icons/fi";

const LogoutBtn = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { removeUser } = useLocalUser();

  const handleLogout = async () => {
    try {
      await logout(removeUser);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {/* Logout Button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="destructive"
        shape="rounded"
      >
        <FiLogOut className="mr-2" /> Logout
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setIsOpen(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutBtn;
