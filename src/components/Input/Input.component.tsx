import React, { ChangeEvent } from "react";
import TextField, { StandardTextFieldProps } from "@mui/material/TextField";

interface InputProps extends StandardTextFieldProps {
  label: string;
  type?: string;
  setValue: (value:string) => void
}

export const Input: React.FC<InputProps> = ({ label, value, setValue, type, ...props }) => {

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setValue(value)
  }

  return <TextField {...props} label={label} onChange={handleChange} type={type} />;
};