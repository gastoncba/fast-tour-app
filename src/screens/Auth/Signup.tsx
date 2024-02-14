import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Form, showToast } from "../../components";
import { userProvider } from "../../providers/User.provider";

interface SingupValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SingupProps {}

export const Singup: React.FC<SingupProps> = ({}) => {
  let navigate = useNavigate();
  const onAction = async (values: SingupValues) => {
    try {
      await userProvider.signup(values);
      navigate("/app/home", { replace: true });
      showToast("success", "Bienvenido!");
    } catch (error) {
      showToast("error", "Error al intentar registrarse");
    }
  };

  return (
    <Box>
      <Form
        title="Registrate en FastTour!"
        inputs={[
          {
            label: "Nombre",
            type: "text",
            initialValue: { firstName: "" },
            col: 6,
          },
          {
            label: "Apellido",
            type: "text",
            initialValue: { lastName: "" },
            col: 6,
          },
          {
            label: "Email",
            type: "email",
            initialValue: { email: "" },
          },
          {
            label: "Contraseña",
            type: "password",
            initialValue: { password: "" },
          },
        ]}
        submitText="Registrarse"
        onAction={onAction}
      />
    </Box>
  );
};
