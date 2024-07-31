import React, { useState, useEffect, useRef } from "react";
import { FaEnvelope } from "react-icons/fa"; // Importing a mail icon from react-icons
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {  useNavigate } from "react-router-dom";
import { BASE_URL } from "../Components/Urls";
import axios from "axios";

interface OtpInputProps {
  length?: number;
  onChange?: (otp: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (onChange) {
        onChange(newOtp.join(""));
      }

      if (value && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const navigate = useNavigate();

  const enteredOtp = otp.join("");
  const handleSubmit = () => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/otp`, { otp: enteredOtp }) // Assuming the API expects an object with the email key
      .then((response) => {
        console.log(response.data);
        // Process response data if necessary
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false); // Reset loading state
        navigate("/pin"); // Redirect to /otp
      });
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-lg space-y-6 mt-16 ">
      {/* Heading */}
      <h1 className="text-center text-3xl font-bold mb-4">Check your email</h1>

      {/* Paragraph Text */}
      <p className="text-center text-gray-700 text-lg mb-4">
        We have sent an OTP to your email. Input the code below
      </p>

      {/* Yellow Mail Icon */}
      <div className="flex justify-center mb-4 pt-8">
        <FaEnvelope className="text-yellow-500 text-5xl" />
      </div>

      {/* OTP Input Fields */}
      <div className="flex justify-center space-x-3 pb-6">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            type="text"
            value={otp[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength={1}
            className="w-16 h-16 text-center border-b-2 border-gray-300 rounded-none focus:outline-none focus:border-blue-500 text-2xl"
            ref={(ref) => ref && (inputRefs.current[index] = ref)}
          />
        ))}
      </div>

      {/* Buttons */}
      <Stack spacing={2} direction="column">
        <Button
          variant="contained"
          sx={{
            bgcolor: "#68a502",
            "&:hover": { bgcolor: "#4b8e2b" },
            borderRadius: "9999px", // Rounded full
            padding: "12px 24px", // Add padding
          }}
          color="success"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Validating..." : "Validate OTP"}
        </Button>
      </Stack>

      {/* Additional Text */}
      <p className="text-center text-gray-600 text-lg">
        I didn't receive any email from Sparkle
      </p>
    </div>
  );
};

export default OtpInput;
