import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    highSchool: "",
    gpa: "",
    score: "",
    major: "",
    statement: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.post(
        "http://localhost:5000/api/college-application",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Application submitted!");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        highSchool: "",
        gpa: "",
        score: "",
        major: "",
        statement: "",
        resume: null,
      });
    } catch (error) {
      toast.error("Submission failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 via-blue-100 to-purple-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl space-y-5"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">
          Job Application Form
        </h2>

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <div className="flex items-center gap-4">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  checked={formData.gender === "Male"}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  checked={formData.gender === "Female"}
                />{" "}
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  onChange={handleChange}
                  checked={formData.gender === "Other"}
                />{" "}
                Other
              </label>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Street Address</label>
            <input
              name="street"
              placeholder="Street, Building no."
              value={formData.street}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">City</label>
            <input
              name="city"
              placeholder="Your city"
              value={formData.city}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">State</label>
            <input
              name="state"
              placeholder="State / Province"
              value={formData.state}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Postal Code</label>
            <input
              name="postalCode"
              placeholder="ZIP / Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Country</label>
            <input
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
        </div>

        {/* Education Qualification */}
        <div>
          <label className="block text-sm font-medium">
            Education Qualification
          </label>
          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Select qualification</option>
            <option value="B.Sc Computer Science">B.Sc Computer Science</option>
            <option value="BCA">BCA</option>
            <option value="B.Tech IT">B.Tech IT</option>
            <option value="MCA">MCA</option>
            <option value="M.Sc Computer Science">M.Sc Computer Science</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium">
            Years of Experience
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="input"
            required
          >
            <option value="">Select experience</option>
            {[...Array(11).keys()].map((year) => (
              <option key={year} value={year}>
                {year} {year === 1 ? "year" : "years"}
              </option>
            ))}
          </select>
        </div>

        {/* Statement */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Personal Statement
          </label>
          <textarea
            name="statement"
            placeholder="Tell us about yourself, your goals..."
            value={formData.statement}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={6}
            required
          />
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Resume (PDF / DOCX)
          </label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
