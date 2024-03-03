import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Form, Paragraph, showToast } from "../../components";
import { userProvider } from "../../providers";

interface LoginValues {
  email: string;
  password: string;
}

interface LoginProps {
  to: string;
  content: any;
}

export const Login: React.FC<LoginProps> = ({ to, content }) => {
  let navigate = useNavigate();

  const onAction = async (values: LoginValues) => {
    try {
      await userProvider.login(values.email, values.password);
      navigate(to, { replace: true, state: content });
      showToast("success", "Bienvenido a Fast Tour");
    } catch (error) {
      showToast("error", "Email o constraseña incorrectos");
    }
  };

  return (
    <Box>
      <Paragraph text={"Fast Tour"} variant="h1" align="center" sx={{ pb: 4, fontSize: 50 }} />
      <Form
        inputs={[
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
        submitText="Ingresar"
        onAction={(values) => onAction(values)}
      />
    </Box>
  );
};
