import React, { useState } from "react";
import { Input as AntdInput, Alert } from "antd";

interface Props {
  isNumberInput: boolean;
  onInputChange: (value: string) => void;
  placeholder?: string;
}

export const Input: React.FC<Props> = ({
  isNumberInput,
  onInputChange,
  placeholder,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const regex = /^[1-9][0-9]*$/;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isValid = isNumberInput ? regex.test(value) : true;
    onInputChange(value);
    setHasError(!isValid);
  };

  const errorMessage = `El valor ingresado no es válido. Por favor, ingrese un ${
    isNumberInput ? "número" : "texto"
  }`;

  return (
    <div>
      <AntdInput
        {...rest}
        onChange={handleInputChange}
        placeholder={placeholder || ""}
      />
      {hasError && (
        <Alert
          message={errorMessage}
          type="error"
          showIcon
        />
      )}
    </div>
  );
};
