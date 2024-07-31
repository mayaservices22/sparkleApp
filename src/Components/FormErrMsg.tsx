import React from "react";
import "../App.css";

// Define types for the props
interface FormErrMsgProps {
  errors: {
    [key: string]: {
      message?: string;
    };
  };
  inputName: string;
}

const FormErrMsg: React.FC<FormErrMsgProps> = ({ errors, inputName }) => {
  return <span className="errorMessage">{errors[inputName]?.message}</span>;
};

export default FormErrMsg;
