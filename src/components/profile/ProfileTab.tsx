import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import Button from "../ui/Button";
import { useUser } from "@/context/userContext";
import { updateUser } from "@/services/user";
import { toast } from "react-toastify";
import { isValidEmail, isValidPhone } from "@/utils/validators";

const ProfileTab = () => {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    profilePicture: "",
  });
  const [updatedData, setUpdatedData] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store the actual file
  const [isLoading, setIsLoading] = useState(false);
  const [reqError, setReqError] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    console.log("FormData updated:", selectedFile);
  }, [selectedFile]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        dateOfBirth: user.dateOfBirth || "",
        profilePicture: user.profilePicture || "",
      });
    }
  }, [user]);
  const handleIsLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const handleReqError = (err: string) => {
    setReqError(err);
  };
  // 🔹 Validate input fields
  const validateInput = (name: string, value: string) => {
    let error = "";

    if (name === "email" && value) {
      if (!isValidEmail(value)) {
        error = "Invalid email format";
      }
    }

    if (name === "phoneNumber" && value) {
      if (!isValidPhone(value)) {
        error = "Invalid phone number";
      }
    }

    if (name === "dateOfBirth" && value) {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13 || age > 100) {
        error = "Age must be between 13 and 100";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // 🔹 Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateInput(name, value);
    setFormData({ ...formData, [name]: value });
    setUpdatedData({ ...updatedData, [name]: value });
  };

  // 🔹 Handle profile image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
      setSelectedFile(file); // Store the file for later upload
      const imageUrl = URL.createObjectURL(file); // Preview the image
      setFormData((prev) => ({ ...prev, profilePicture: imageUrl }));
    }
  };

  // 🔹 Handle profile update
  const handleSave = async () => {
    const toastId = toast.loading("Updating your Data...");
    const fmData = new FormData();

    if (selectedFile) {
      fmData.append("profileImg", selectedFile);
    }

    // Append other updated fields
    Object.entries(updatedData).forEach(([key, value]) => {
      fmData.append(key, value as string);
    });

    console.log("Now Were on save. The data to be sent to api is: ", fmData);
    // Prevent saving if errors exist
    try {
      const usr = await updateUser(fmData, handleIsLoading, handleReqError);
      if (usr) {
        toast.update(toastId, {
          render: "Profile updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setUser(usr); // Update global user state
        setFormData({
          firstName: usr.firstName || "",
          lastName: usr.lastName || "",
          email: usr.email || "",
          phoneNumber: usr.phoneNumber || "",
          dateOfBirth: usr.dateOfBirth || "",
          profilePicture: usr.profilePicture || "",
        });
        // setFormData({
        //   email: user.email || "",
        //   phoneNumber: user.phoneNumber || "",
        //   dateOfBirth: user.dateOfBirth || "",
        //   profilePicture: user.profilePicture || "",
        // });

        setIsEditing(false);
        setUpdatedData({});
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  useEffect(() => {
    if (reqError) {
      toast.dismiss();
      toast.error(reqError, { autoClose: 3000 });
      handleReqError("");
    }
  }, [reqError]);
  return (
    <div className="bg-white p-6 w-full max-w-2xl mx-auto">
      {/* Profile Picture */}
      <div className="flex flex-col items-center justify-center space-y-8">
        <label className="cursor-pointer">
          <div className=" w-32 h-32 rounded-full flex justify-center items-center border border-customTealLight bg-customTeal overflow-hidden">
            {formData?.profilePicture ? (
              <img
                src={formData.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover border-2 border-gray-300"
              />
            ) : (
              <FaUser className="text-5xl text-white" />
            )}
          </div>
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          )}
        </label>

        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold py-2">
            {user?.email ? user.email : user?.phoneNumber}
          </h2>
          <p className="text-gray-500 text-sm">User ID: {user?.id}</p>
        </div>
      </div>

      {/* User Details */}
      <div className="mt-6 space-y-4">
        {["firstName", "lastName", "dateOfBirth"].map((field) => (
          <div key={field} className="flex justify-between border-b pb-2">
            <span className="font-medium">
              {field === "dateOfBirth"
                ? "Date of Birth"
                : field.charAt(0).toUpperCase() + field.slice(1)}
              :
            </span>

            {isEditing ? (
              field === "dateOfBirth" ? (
                <input
                  type="date"
                  name={field}
                  value={formData?.dateOfBirth?.split("T")[0] || ""}
                  onChange={handleChange}
                  className="border p-1 rounded w-2/3"
                />
              ) : (
                <input
                  type="text"
                  name={field}
                  value={formData?.[field] || ""}
                  onChange={handleChange}
                  className="border p-1 rounded w-2/3"
                />
              )
            ) : (
              <span>
                {field === "dateOfBirth"
                  ? user?.dateOfBirth
                    ? new Date(user.dateOfBirth).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Not provided"
                  : field === "firstName"
                  ? user?.firstName || "Not provided"
                  : field === "lastName"
                  ? user?.lastName || "Not provided"
                  : "Not provided"}
              </span>
            )}
          </div>
        ))}
        {/* 🔹 Show validation errors */}
        {Object.keys(errors).map(
          (key) =>
            errors[key as keyof typeof errors] && (
              <p key={key} className="text-red-500 text-sm">
                {errors[key as keyof typeof errors]}
              </p>
            )
        )}
      </div>

      {/* Edit & Save Button */}
      <div className="mt-6 flex justify-end space-x-4">
        {isEditing ? (
          <>
            <Button
              onClick={handleSave}
              variant="primary"
              shape="curved"
              disabled={Object.values(errors).some(Boolean) || isLoading}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setFormData({
                  firstName: user?.firstName || "",
                  lastName: user?.lastName || "",
                  email: user?.email || "",
                  phoneNumber: user?.phoneNumber || "",
                  dateOfBirth: user?.dateOfBirth || "",
                  profilePicture: user?.profilePicture || "",
                });
                setIsEditing(false); // Exit edit mode
              }}
              variant="destructive"
              shape="curved"
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
