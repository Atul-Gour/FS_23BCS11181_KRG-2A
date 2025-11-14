// pages/SignUp.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";  // <-- added
import Logo from "../assets/Logo.jpg";
import { Navigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();  // <-- added
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    houseNo: "",
    area: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (agreed) setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // get old users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check if username/email already exists
    const exists = users.find(
      (u) => u.username === formData.username || u.email === formData.email
    );
    if (exists) {
      alert("Username or Email already exists!");
      return;
    }

    // save new user
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Sign Up Completed! Redirecting to Preferences...");
    
    // Redirect to Preferences page after signup
    navigate("/preferences");  
    console.log("Form Submitted:", formData);

    // ✅ redirect user to Home page after submit
    navigate("/Home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#001A2A]">
      <div className="flex w-[1200px] h-[700px] bg-white/95 rounded-2xl shadow-2xl ring-1 ring-gray-200 overflow-hidden backdrop-blur-sm">
        {/* Left - Form */}
        <div className="w-1/2 flex flex-col items-center justify-center p-12">
          <h2 className="text-3xl font-extrabold mb-2 text-[#001A2A] tracking-wide drop-shadow-sm">
            {step === 1 ? "Join Us!" : "Additional Details"}
          </h2>
          <p className="text-[#001A2A] mb-8 text-base font-medium italic">
            {step === 1 ? "Create New Account" : "Tell us more about yourself"}
          </p>

          <form
            className="w-full space-y-4"
            onSubmit={step === 1 ? handleNext : handleSubmit}
          >
            {/* Step 1 */}
            {step === 1 && (
              <>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Username (unique)"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address (unique)"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* Checkbox */}
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="terms" className="text-[#001A2A] text-sm">
                    By signing up, you agree to the{" "}
                    <span className="text-indigo-600 underline cursor-pointer">
                      Terms of Services
                    </span>
                    ,{" "}
                    <span className="text-indigo-600 underline cursor-pointer">
                      Privacy Policy
                    </span>
                    , and{" "}
                    <span className="text-indigo-600 underline cursor-pointer">
                      Cookies Policy
                    </span>
                    .
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!agreed}
                  className={`w-full py-3 rounded-lg font-bold tracking-wider shadow-md transition mt-3
                    ${
                      agreed
                        ? "bg-[#001A2A] text-white hover:bg-indigo-800"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                >
                  Next
                </button>
              </>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <>
                {/* Age/Height/Weight */}
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 bg-white rounded-xl shadow-lg p-4 text-center hover:scale-105 transition">
                    <p className="text-sm text-[#001A2A] mb-2">Age</p>
                    <input
                      type="number"
                      name="age"
                      placeholder="e.g., 25"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex-1 bg-white rounded-xl shadow-lg p-4 text-center hover:scale-105 transition">
                    <p className="text-sm text-[#001A2A] mb-2">Height (cm)</p>
                    <input
                      type="number"
                      name="height"
                      placeholder="e.g., 170"
                      value={formData.height}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex-1 bg-white rounded-xl shadow-lg p-4 text-center hover:scale-105 transition">
                    <p className="text-sm text-[#001A2A] mb-2">Weight (kg)</p>
                    <input
                      type="number"
                      name="weight"
                      placeholder="e.g., 65"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="bg-gray-50 p-6 rounded-2xl shadow-inner border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 text-[#001A2A]">
                    Address
                  </h3>

                  <input
                    type="text"
                    name="houseNo"
                    placeholder="House No."
                    value={formData.houseNo}
                    onChange={handleChange}
                    required
                    className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />

                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      name="area"
                      placeholder="Area"
                      value={formData.area}
                      onChange={handleChange}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/2 bg-gray-300 text-black py-3 rounded-lg hover:bg-gray-400 transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-[#001A2A] text-white py-3 rounded-lg hover:bg-indigo-800 transition"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

        {/* Right - Image */}
        <div className="w-1/2 h-full flex items-center justify-center">
          <img
            src={Logo}
            alt="Fitmate"
            className="w-[95%] h-[95%] object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
