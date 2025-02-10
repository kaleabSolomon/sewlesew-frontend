import { userBrief } from "@/types/user";
import { FaUser } from "react-icons/fa6";

const user: userBrief = {
  id: "12345",
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@example.com",
  phoneNumber: "+251912345678",
  dateOfBirth: "1995-06-15",
  profilePicture: null, // Replace with actual URL if available
};

const ProfileTab = () => {
  return (
    <div className="bg-white p-6  w-full max-w-2xl mx-auto">
      {/* Profile Picture */}
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="flex items-center justify-center w-32 h-32 rounded-full border border-customTealLight bg-customTeal overflow-hidden">
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover border-2 border-gray-300"
            />
          ) : (
            <FaUser className="text-5xl text-white" />
          )}
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-500 text-sm">User ID: {user.id}</p>
        </div>
      </div>

      {/* User Details */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Email:</span>
          <span>{user.email || "Not provided"}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Phone:</span>
          <span>{user.phoneNumber || "Not provided"}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium">Date of Birth:</span>
          <span>{user.dateOfBirth}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
