import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { categories, sectors } from "@/data/data";
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
    if (e.target.files) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
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
            className="w-full p-2 border rounded mb-2"
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
          <input
            type="text"
            name="tinNumber"
            placeholder="TIN Number"
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="file"
            name="tinCertificate"
            onChange={handleFileChange}
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex justify-between">
            <Button onClick={prevStep} variant="destructive" shape="block">
              Back
            </Button>
            <Button onClick={nextStep} variant="primary" shape="block">
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Campaign Information</h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          ></textarea>
          <div className="flex justify-between">
            <Button onClick={prevStep} variant="destructive" shape="block">
              Back
            </Button>
            <Button onClick={nextStep} variant="primary" shape="block">
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Bank Information</h2>
          <input
            type="text"
            name="bankName"
            placeholder="Bank Name"
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="holderName"
            placeholder="Holder Name"
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex justify-between">
            <Button onClick={prevStep} variant="destructive" shape="block">
              Back
            </Button>
            <Button onClick={nextStep} variant="primary" shape="block">
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCampaign;
