import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { banks, categories, sectors } from "@/data/data";
import { createCampaign } from "@/services/campaign";
import { isValidEmail, isValidPhone } from "@/utils/validators";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

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
    registrationLicense: null,
    personalDocument: null,
    coverImage: null,
    otherImages: [],

    supportingDocuments: [],
    title: "",
    description: "",
    goalAmount: "",
    deadline: "",
    bankName: "",
    holderName: "",
    accountNumber: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState("");

  const navigate = useNavigate();
  const handleIsLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  const handleError = (error: string) => {
    setRequestError(error);
  };
  const { type = "" } = useParams();

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
    if (type === "business" && !formData.sector)
      newErrors.sector = "Sector is required";
    if (!formData.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, return true
  };

  const validateSectionTwo = () => {
    const newErrors: { [key: string]: string } = {};
    if (type !== "personal" && !formData.tinNumber)
      newErrors.tinNumber = "Tin number is required";
    if (type !== "personal" && !formData.licenseNumber)
      newErrors.licenseNumber = "license number is required";
    if (type !== "personal" && !formData.tinCertificate)
      newErrors.tinCertificate = "Please upload your tin ceritificate";
    if (type !== "personal" && !formData.registrationLicense)
      newErrors.registrationLicense =
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
    if (!formData.coverImage)
      newErrors.coverImage = "Please upload A cover Image.";

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
      }
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

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;

    const validFormats = ["image/png", "image/jpeg", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    const file = files[0]; // Only validate the first file
    if (!validFormats.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Invalid file format. Allowed: PNG, JPG, JPEG",
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

  const handleOtherImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;

    const validFormats = ["image/png", "image/jpeg", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes

    // Clear previous errors
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Validate file count
    if (files.length > 4) {
      setErrors((prev) => ({
        ...prev,
        [name]: "You can only upload a maximum of 4 images",
      }));
      return;
    }

    // Validate each file
    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!validFormats.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Invalid file format. Allowed: PNG, JPG, JPEG",
        }));
        return;
      }

      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Each file size must be 5MB or less",
        }));
        return;
      }

      validFiles.push(file);
    }

    // Update formData state with the valid files
    setFormData((prev) => ({
      ...prev,
      [name]: validFiles, // Update otherImages with the array of valid files
    }));
  };

  useEffect(() => {
    if (requestError) {
      toast.dismiss();
      toast.error(requestError[0], { autoClose: 3000 });
    }
    handleError("");
  }, [requestError]);

  return (
    <div className="max-w-4xl my-32 mx-auto p-6 bg-white rounded-lg border border-customTeal ">
      <ProgressBar progress={(step * 100) / 4} displayPercentage={false} />

      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            <span className="text-customTeal">Personal Information:</span> Tell
            us A little bit about you
            {type === "business"
              ? "r business."
              : type === "charity"
              ? "r charity."
              : "."}
          </h2>
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ""}
            placeholder={
              type === "business"
                ? "Business Name. eg. SewleSew plc."
                : type === "charity"
                ? "Charity Name. eg. International Rescue Committee (IRC)"
                : "Full Name. eg. Kaleab Solomon "
            }
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
          {type !== "personal" && (
            <input
              type="text"
              name="website"
              value={formData.website || ""}
              placeholder="Website (Optional)"
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            />
          )}
          {type === "business" && (
            <div>
              <select
                name="sector"
                onChange={handleChange}
                value={formData.sector || ""}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="">Select Sector</option>
                {sectors.map((sector) => {
                  return (
                    <option key={sector.id} value={sector.id}>
                      {sector.label}
                    </option>
                  );
                })}
              </select>
              {errors.sector && (
                <p className="text-red-500 text-sm">{errors.sector}</p>
              )}
            </div>
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
                category.types.includes(type) && (
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
          <h2 className="text-2xl font-semibold mb-4">
            <span className="text-customTeal">Legal Information:</span> We need
            you to upload some documents to verify your cause.
          </h2>

          {/* TIN Number */}
          {type !== "personal" && (
            <div>
              <input
                type="text"
                name="tinNumber"
                placeholder="TIN Number"
                value={formData.tinNumber || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(Number(value))) {
                    handleChange(e);
                  }
                }}
                required
                className={`w-full p-2 border rounded mb-2 ${
                  errors.tinNumber ? "border-red-500" : ""
                }`}
              />

              {errors.tinNumber && (
                <p className="text-red-500 text-sm">{errors.tinNumber}</p>
              )}
            </div>
          )}
          {/* License Number */}

          {type !== "personal" && (
            <div>
              <input
                type="text"
                name="licenseNumber"
                placeholder="License Number"
                value={formData.licenseNumber || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(Number(value))) {
                    handleChange(e);
                  }
                }}
                required
                className={`w-full p-2 border rounded mb-2 ${
                  errors.licenseNumber ? "border-red-500" : ""
                }`}
              />
              {errors.licenseNumber && (
                <p className="text-red-500 text-sm">{errors.licenseNumber}</p>
              )}
            </div>
          )}

          {/* TIN Certificate */}
          {type !== "personal" && (
            <div>
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
            </div>
          )}

          {/* Registration Certificate */}

          {type !== "personal" && (
            <div>
              <label className="block font-semibold mb-1">
                Registration License (PDF, DOCX, Image)
              </label>
              <input
                type="file"
                name="registrationLicense"
                onChange={handleFileChange}
                required
                accept=".pdf,.docx,.png,.jpg,.jpeg"
                className={`w-full p-2 border rounded mb-2 ${
                  errors.registrationLicense ? "border-red-500" : ""
                }`}
              />
              {errors.registratonLicense && (
                <p className="text-red-500 text-sm">
                  {errors.registrationLicense}
                </p>
              )}
            </div>
          )}
          {type === "personal" && (
            <div>
              <label className="block font-semibold mb-1">
                Personal Document (Optional - PDF, DOCX, Image)
              </label>
              <input
                type="file"
                name="personalDocument"
                onChange={handleFileChange}
                accept=".pdf,.docx,.png,.jpg,.jpeg"
                className={`w-full p-2 border rounded mb-2 ${
                  errors.personalDocument ? "border-red-500" : ""
                }`}
              />
              {errors.personalDocument && (
                <p className="text-red-500 text-sm">
                  {errors.personalDocument}
                </p>
              )}
            </div>
          )}

          {/* Supporting Files */}
          <label className="block font-semibold mb-1">
            Supporting Files (Optional - PDF, DOCX, Image)
          </label>
          <input
            type="file"
            name="supportingDocuments"
            multiple
            onChange={handleFileChange}
            accept=".pdf,.docx,.png,.jpg,.jpeg"
            className="w-full p-2 border rounded mb-2"
          />
          {errors.supportingDocuments && (
            <p className="text-red-500 text-sm">{errors.supportingDocuments}</p>
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
          <h2 className="text-xl font-semibold mb-4">
            <span>Campaign Information:</span> This is what will be displayed
            for other people.
          </h2>

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
            type="text"
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
          <label className="block font-semibold mb-1">Cover Image</label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleCoverImageChange}
            required
            className={`w-full p-2 border rounded mb-2 ${
              errors.coverImage ? "border-red-500" : ""
            }`}
          />
          <label className="block font-semibold mb-1">
            Other Images (Optional)
          </label>
          <input
            type="file"
            name="otherImages"
            accept="image/*"
            multiple
            onChange={handleOtherImagesChange}
            className={`w-full p-2 border rounded mb-2 ${
              errors.otherImages ? "border-red-500" : ""
            }`}
          />

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
          <h2 className="text-xl font-semibold mb-4">
            <span>Bank Information:</span> Select where to recieve your
            donations
          </h2>

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
            onChange={(e) => {
              const value = e.target.value;
              if (!isNaN(Number(value))) {
                handleChange(e);
              }
            }}
            value={formData.accountNumber || ""}
            className="w-full p-2 border rounded mb-2"
          />
          {errors.accountNumber && (
            <p className="text-red-500">{errors.accountNumber}</p>
          )}

          <div className="flex justify-between">
            <Button
              onClick={prevStep}
              variant="destructive"
              shape="block"
              disabled={isLoading}
            >
              Back
            </Button>
            <Button
              onClick={async () => {
                const toastId = toast.loading(
                  "Please wait while we create your campaign.\n This may take a few seconds."
                );
                try {
                  if (validateSectionFour()) {
                    formData.contactPhoneNumber = "+251911111111";
                    formData.publicPhoneNumber = "+251911111111";
                    const res = await createCampaign(
                      formData,
                      type,
                      handleIsLoading,
                      handleError
                    );

                    if (res) {
                      toast.update(toastId, {
                        render: "Campaign created successfully!",
                        type: "success",
                        isLoading: false,
                        autoClose: 3000,
                      });

                      navigate("/campaign/confirmation");
                    }
                  }
                } catch (err) {
                  console.error(err);
                  toast.dismiss();
                }
              }}
              loading={isLoading}
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
