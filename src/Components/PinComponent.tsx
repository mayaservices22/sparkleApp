import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Components/Urls";
import axios from "axios";
const PinComponent: React.FC = () => {
  const [pin, setPin] = useState<string[]>(Array(4).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "") {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && !pin[index]) {
      inputRefs.current[index - 1].focus();
    }
  };
  const navigate = useNavigate();
  const enteredPin = pin.join("");
  const submitForm = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/pin`, { pin: enteredPin }) // Assuming the API expects an object with the email key
      .then((response) => {
        console.log(response.data);
        // Process response data if necessary
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false); // Reset loading state
        navigate("/mail"); // Redirect to /otp
      });
  };

  return (
    <div className="p-8 mt-32 max-w-md mx-auto bg-white space-y-6 items-center justify-center">
      <div className="text-center flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-[#15274f]">
          Welcome Back
          <br />
        </h1>
        <p className="text-lg text-[#15274f]">
          Kindly put your PIN to log in to your account
        </p>
      </div>

      {/* PIN Input Fields */}
      <div className="flex justify-center space-x-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <input
            key={index}
            type="password"
            value={pin[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            className="w-16 h-16 text-center text-2xl border-b-4 border-gray-300 rounded-none focus:outline-none focus:border-blue-500"
            ref={(ref) => ref && (inputRefs.current[index] = ref)}
          />
        ))}
      </div>
      <p className="text-base text-gray-600 text-center">Forgot PIN?</p>

      {/* Continue Button */}
      <div className="flex justify-center pt-8">
        <button
          onClick={submitForm}
          disabled={loading}
          className={`bg-[#68a502] w-full text-white py-3 px-8 text-lg rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Loading..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default PinComponent;
