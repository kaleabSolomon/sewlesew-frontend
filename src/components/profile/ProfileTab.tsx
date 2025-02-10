import { getUserBrief } from "@/services/user";
import { userBrief } from "@/types/user";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import Button from "../ui/Button";

const ProfileTab = () => {
  const [user, setUser] = useState<userBrief | null>(null); // Store user data
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState<any>(null); // Store form input values
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch user profile on mount
    const fetchUserProfile = async () => {
      try {
        const data = await getUserBrief();
        setUser(data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleSave = async () => {
    try {
      const updatedUser = await updateProfile(formData);
      setUser(updatedUser); // Update displayed user data
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="bg-white p-6 w-full max-w-2xl mx-auto">
      {/* Profile Picture */}
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="flex items-center justify-center w-32 h-32 rounded-full border border-customTealLight bg-customTeal overflow-hidden">
          {user?.profilePicture ? (
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
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-gray-500 text-sm">User ID: {user?.id}</p>
        </div>
      </div>

      {/* User Details */}
      <div className="mt-6 space-y-4">
        {["email", "phoneNumber", "dateOfBirth"].map((field) => (
          <div key={field} className="flex justify-between border-b pb-2">
            <span className="font-medium">
              {field === "dateOfBirth"
                ? "Date of Birth"
                : field.charAt(0).toUpperCase() + field.slice(1)}
              :
            </span>

            {isEditing ? (
              field === "dateOfBirth" ? (
                // 📅 Use date picker for dateOfBirth
                <input
                  type="date"
                  name={field}
                  value={formData?.dateOfBirth?.split("T")[0] || ""}
                  onChange={handleChange}
                  className="border p-1 rounded w-2/3"
                />
              ) : (
                // 📩 Regular input for other fields
                <input
                  type="text"
                  name={field}
                  value={formData?.[field] || ""}
                  onChange={handleChange}
                  className="border p-1 rounded w-2/3"
                />
              )
            ) : (
              // 📅 Format date for display, show normal text otherwise
              <span>
                {field === "dateOfBirth"
                  ? user?.dateOfBirth
                    ? new Date(user.dateOfBirth).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Not provided"
                  : user?.[field] || "Not provided"}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Edit & Save Button */}
      <div className="mt-6 flex justify-end space-x-4">
        {isEditing ? (
          <>
            <Button
              onClick={handleSave}
              variant="primary"
              loading={loading}
              shape="curved"
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setFormData(user); // Reset changes
                setIsEditing(false); // Exit edit mode
              }}
              variant="destructive"
              shape="curved"
              loading={loading}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            variant="primary"
            shape="curved"
          >
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileTab;
