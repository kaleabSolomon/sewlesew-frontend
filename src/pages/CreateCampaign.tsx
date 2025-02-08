import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { categories } from "@/data/data";
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
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({
      ...errors,
      [e.target.name]: "", // Clear the error for this field
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
            placeholder="Public Email (Optional)"
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="publicPhoneNumber"
            placeholder="Public Phone Number (Optional)"
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="email"
            name="contactEmail"
            placeholder="Contact Email"
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
            placeholder="Contact Phone Number"
            onChange={handleChange}
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
            placeholder="City"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mb-2"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          <input
            type="text"
            name="relativeLocation"
            placeholder="Relative Location (Optional)"
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="website"
            placeholder="Website (Optional)"
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <select
            name="sector"
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select Sector</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.sector && (
            <p className="text-red-500 text-sm">{errors.sector}</p>
          )}
          <select
            name="category"
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
