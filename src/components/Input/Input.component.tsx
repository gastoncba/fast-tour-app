import React, { useState } from "react";
import { Input as AntdInput, Alert } from "antd";

interface Props {
  isNumberInput: boolean;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Input: React.FC<Props> = ({
  isNumberInput,
  onChange,
  placeholder,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (isNumberInput) {
      // Si el input es para números, solo permitimos números
      const regex = /^[0-9\b]+$/;
      if (regex.test(value)) {
        onChange(value);
        setHasError(false);
      } else {
        setHasError(true);
      }
    } else {
      // Si el input es para texto, permitimos cualquier caracter
      onChange(value);
      setHasError(false);
    }
  };

  return (
    <div>
      <AntdInput
        {...rest}
        onChange={handleInputChange}
        placeholder={placeholder || ""}
      />
      {hasError && (
        <Alert
          message={`El valor ingresado no es válido. Por favor, ingrese un ${
            isNumberInput ? "número" : "texto"
          }`}
          type="error"
          showIcon
        />
      )}
    </div>
  );
};
