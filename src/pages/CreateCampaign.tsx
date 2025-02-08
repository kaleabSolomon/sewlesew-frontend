import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { banks, categories, sectors } from "@/data/data";
import { isValidEmail, isValidPhone } from "@/utils/validators";
import { useState } from "react";

const CreateCampaign = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    publicEmail: "",
    publicPhoneNumber: "",
    contactEmail: "",
    contactPhoneNumber: "",
    region: "",
    city: "",
    relativeLocation: "",
    website: "",
    sector: "",
    category: "",
    tinNumber: "",
    licenseNumber: "",
    tinCertificate: null,
    registrationCertificate: null,
    supportingFiles: [],
    title: "",
    description: "",
    goalAmount: "",
    deadline: "",
    bankName: "",
    holderName: "",
    accountNumber: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  console.log(formData);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const validateSectionOne = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.contactEmail)
      newErrors.contactEmail = "Contact Email is required";
    if (!formData.contactPhoneNumber)
      newErrors.contactPhoneNumber = "Contact Phone Number is required";
    if (!formData.region) newErrors.region = "Region is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.sector) newErrors.sector = "Sector is required";
    if (!formData.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, return true
  };

  const validateSectionTwo = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.tinNumber) newErrors.tinNumber = "Tin number is required";
    if (!formData.licenseNumber)
      newErrors.licenseNumber = "license number is required";
    if (!formData.tinCertificate)
      newErrors.tinCertificate = "Please upload your tin ceritificate";
    if (!formData.registrationCertificate)
      newErrors.registrationCertificate =
        "Please upload your registration certificate.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, return true
  };
  const validateSectionThree = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title) newErrors.title = "A title is required";
    if (!formData.description)
      newErrors.description = "A description is required";
    if (!formData.goalAmount)
      newErrors.goalAmount = "A goal amount is required";
    if (!formData.deadline) newErrors.deadline = "A deadline is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, return true
  };
  const validateSectionFour = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.bankName)
      newErrors.bankName = "Please select your prefered bank";
    if (!formData.holderName)
      newErrors.holderName = "Please enter the name on your bank account";
    if (!formData.accountNumber)
      newErrors.accountNumber = "Please enter your account number";
    if (!formData.deadline) newErrors.deadline = "A deadline is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, return true
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    let errorMessage = "";

    // Validate specific fields
    if (name === "publicEmail" || name === "contactEmail") {
      if (value.trim() && !isValidEmail(value)) {
        errorMessage = "Please Enter a valid email";
        console.log(errorMessage);
      }

      console.log(
        "name",
        name,
        "\n",
        "Email",
        value,
        "\n",
        "isValid",
        isValidEmail(value)
      );
    }

    if (name === "publicPhoneNumber" || name === "contactPhoneNumber") {
      if (value.trim() && !isValidPhone(value)) {
        errorMessage = "Please Enter a valid phone number";
      }
    }

    if (name === "deadline") {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const minDate = new Date(today);
      minDate.setDate(today.getDate() + 3); // 3 days in the future

      if (selectedDate < minDate) {
        errorMessage = "Deadline must be at least 3 days from today";
      }
    }
    if (name === "goalAmount") {
      const amount = parseFloat(value);
      if (isNaN(amount) || amount <= 0) {
        errorMessage = "Goal amount must be a positive number";
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: errorMessage, // Update error message for this field
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;

    const validFormats = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    const file = files[0]; // Only validate the first file
    if (!validFormats.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Invalid file format. Allowed: PDF, DOCX, PNG, JPG, JPEG",
      }));
      return;
    }

    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        [name]: "File size must be 5MB or less",
      }));
      return;
    }

    // Clear errors if valid
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Save file to state
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  return (
    <div className="max-w-4xl my-32 mx-auto p-6 bg-white rounded-lg border border-customTeal ">
      <ProgressBar progress={(step * 100) / 4} displayPercentage={false} />

      {step === 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ""}
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-2 "
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
          <input
            type="email"
            name="publicEmail"
            value={formData.publicEmail || ""}
            placeholder="Public Email (Optional)"
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          {errors.publicEmail && (
            <p className="text-red-500 text-sm">{errors.publicEmail}</p>
          )}
          {
            //TODO: add a country code thing here.
          }{" "}
          <input
            type="text"
            name="publicPhoneNumber"
            value={formData.publicPhoneNumber || ""}
            placeholder="Public Phone Number (Optional)"
            onChange={(e) => {
              const value = e.target.value;
              if (!isNaN(Number(value))) {
                handleChange(e);
              }
            }}
            className="w-full p-2 border rounded mb-2"
          />
          {errors.publicPhoneNumber && (
            <p className="text-red-500 text-sm">{errors.publicPhoneNumber}</p>
          )}
          <input
            type="email"
            name="contactEmail"
            placeholder="Contact Email"
            value={formData.contactEmail || ""}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-2"
          />
          {errors.contactEmail && (
            <p className="text-red-500 text-sm">{errors.contactEmail}</p>
          )}
          <input
            type="text"
            name="contactPhoneNumber"
            value={formData.contactPhoneNumber || ""}
            placeholder="Contact Phone Number"
            onChange={(e) => {
              const value = e.target.value;
              if (!isNaN(Number(value))) {
                handleChange(e);
              }
            }}
            required
            className="w-full p-2 border rounded mb-2"
          />
          {errors.contactPhoneNumber && (
            <p className="text-red-500 text-sm">{errors.contactPhoneNumber}</p>
          )}
          <input
            type="text"
            name="region"
            placeholder="Region"
            value={formData.region || ""}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-2"
          />
          {errors.region && (
            <p className="text-red-500 text-sm">{errors.region}</p>
          )}
          <input
            type="text"
            name="city"
            value={formData.city || ""}
            placeholder="City"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-2"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          <input
            type="text"
            name="relativeLocation"
            value={formData.relativeLocation || ""}
            placeholder="Relative Location (Optional)"
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="website"
            value={formData.website || ""}
            placeholder="Website (Optional)"
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <select
            name="sector"
            onChange={handleChange}
            value={formData.sector || ""}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select Sector</option>
            {sectors.map((sector) => {
              return <option value={sector.id}>{sector.label}</option>;
            })}
          </select>
          {errors.sector && (
            <p className="text-red-500 text-sm">{errors.sector}</p>
          )}
          <select
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select Category</option>
            {categories.map((category) => {
              return (
                category.types.includes("Business") && (
                  <option value={category.id}>{category.label}</option>
                )
              );
            })}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
          <div className="flex justify-end">
            <Button
              onClick={() => {
                if (validateSectionOne()) nextStep();
              }}
              variant="primary"
              shape="block"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Legal Information</h2>

          {/* TIN Number */}
          <input
            type="text"
            name="tinNumber"
            placeholder="TIN Number"
            value={formData.tinNumber || ""}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded mb-2 ${
              errors.tinNumber ? "border-red-500" : ""
            }`}
          />

          {errors.tinNumber && (
            <p className="text-red-500 text-sm">{errors.tinNumber}</p>
          )}

          {/* License Number */}
          <input
            type="text"
            name="licenseNumber"
            placeholder="License Number"
            value={formData.licenseNumber || ""}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded mb-2 ${
              errors.licenseNumber ? "border-red-500" : ""
            }`}
          />
          {errors.licenseNumber && (
            <p className="text-red-500 text-sm">{errors.licenseNumber}</p>
          )}

          {/* TIN Certificate */}
          <label className="block font-semibold mb-1">
            TIN Certificate (PDF, DOCX, Image)
          </label>
          <input
            type="file"
            name="tinCertificate"
            onChange={handleFileChange}
            required
            accept=".pdf,.docx,.png,.jpg,.jpeg"
            className={`w-full p-2 border rounded mb-2 ${
              errors.tinCertificate ? "border-red-500" : ""
            }`}
          />
          {errors.tinCertificate && (
            <p className="text-red-500 text-sm">{errors.tinCertificate}</p>
          )}

          {/* Registration Certificate */}
          <label className="block font-semibold mb-1">
            Registration Certificate (PDF, DOCX, Image)
          </label>
          <input
            type="file"
            name="registrationCertificate"
            onChange={handleFileChange}
            required
            accept=".pdf,.docx,.png,.jpg,.jpeg"
            className={`w-full p-2 border rounded mb-2 ${
              errors.registrationCertificate ? "border-red-500" : ""
            }`}
          />
          {errors.registrationCertificate && (
            <p className="text-red-500 text-sm">
              {errors.registrationCertificate}
            </p>
          )}

          {/* Supporting Files */}
          <label className="block font-semibold mb-1">
            Supporting Files (Optional - PDF, DOCX, Image)
          </label>
          <input
            type="file"
            name="supportingFiles"
            multiple
            onChange={handleFileChange}
            accept=".pdf,.docx,.png,.jpg,.jpeg"
            className="w-full p-2 border rounded mb-2"
          />
          {errors.supportingFiles && (
            <p className="text-red-500 text-sm">{errors.supportingFiles}</p>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button onClick={prevStep} variant="destructive" shape="block">
              Back
            </Button>
            <Button
              onClick={() => {
                if (validateSectionTwo()) nextStep();
              }}
              variant="primary"
              shape="block"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Campaign Information</h2>

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title || ""}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded mb-2 ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description || ""}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded mb-2 ${
              errors.description ? "border-red-500" : ""
            }`}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}

          {/* Goal Amount */}
          <input
            type="number"
            name="goalAmount"
            placeholder="Goal Amount"
            value={formData.goalAmount || ""}
            onChange={(e) => {
              const value = e.target.value;
              if (!isNaN(Number(value))) {
                handleChange(e);
              }
            }}
            required
            className={`w-full p-2 border rounded mb-2 ${
              errors.goalAmount ? "border-red-500" : ""
            }`}
          />
          {errors.goalAmount && (
            <p className="text-red-500 text-sm">{errors.goalAmount}</p>
          )}

          {/* Deadline */}
          <input
            type="date"
            name="deadline"
            value={formData.deadline || ""}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded mb-2 ${
              errors.deadline ? "border-red-500" : ""
            }`}
          />
          {errors.deadline && (
            <p className="text-red-500 text-sm">{errors.deadline}</p>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button onClick={prevStep} variant="destructive" shape="block">
              Back
            </Button>
            <Button
              onClick={() => {
                if (validateSectionThree()) nextStep();
              }}
              variant="primary"
              shape="block"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Bank Information</h2>

          {/* Bank Name Dropdown */}
          <select
            name="bankName"
            onChange={handleChange}
            value={formData.bankName || ""}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select Bank</option>

            {banks.map((bank) => {
              return <option value={bank.id}>{bank.label}</option>;
            })}
          </select>
          {errors.bankName && <p className="text-red-500">{errors.bankName}</p>}

          {/* Holder Name Input */}
          <input
            type="text"
            name="holderName"
            placeholder="Holder Name"
            onChange={handleChange}
            value={formData.holderName || ""}
            className="w-full p-2 border rounded mb-2"
          />
          {errors.holderName && (
            <p className="text-red-500">{errors.holderName}</p>
          )}

          {/* Account Number Input */}
          <input
            type="text"
            name="accountNumber"
            placeholder="Account Number"
            onChange={handleChange}
            value={formData.accountNumber || ""}
            className="w-full p-2 border rounded mb-2"
          />
          {errors.accountNumber && (
            <p className="text-red-500">{errors.accountNumber}</p>
          )}

          <div className="flex justify-between">
            <Button onClick={prevStep} variant="destructive" shape="block">
              Back
            </Button>
            <Button
              onClick={() => {
                if (validateSectionFour()) {
                  console.log("Submitted");
                  console.log(formData);
                }
              }}
              variant="primary"
              shape="block"
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCampaign;
