import React, { useState } from "react";
import { MdMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Components/Urls";
import axios from "axios";


const EmailVerification: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };


  const handleSubmit = () => {
    setLoading(true); // Set loading to true before the API call
  
    axios
      .post(`${BASE_URL}/`, { email }) // Assuming the API expects an object with the email key
      .then((response) => {
        console.log(response.data);
        // Process response data if necessary
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false); // Reset loading state
        navigate("/otp"); // Redirect to /otp
      });
  };
  

  return (
    <div className="relative min-h-screen p-4 bg-white">
      <div className="absolute top-4 left-4"></div>
      <section className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="text-center mb-24">
          <h1 className="text-3xl font-semibold text-gray-800 mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-lg">Enter email address or Phone Number</p>
        </div>
        <div className="flex flex-row items-center gap-4 border-b border-gray-300 pb-3 mb-8 w-full max-w-md">
          <MdMail className="text-gray-600 text-2xl" />
          <input
            type="text"
            placeholder="Email or Phone Number"
            value={email}
            onChange={handleEmailChange}
            className="flex-1 p-3 text-lg rounded-md focus:outline-none"
          />
        </div>
        <div className="w-full max-w-md mt-24">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full bg-[#68a502] p-3 rounded-full text-white text-lg hover:bg-[#5b8e02] ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : "Verify Email"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default EmailVerification;
