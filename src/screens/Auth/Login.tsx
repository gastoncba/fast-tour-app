import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Form, Paragraph, showToast } from "../../components";
import { userProvider } from "../../providers/User.provider";

interface LoginValues {
  email: string;
  password: string;
}

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  let navigate = useNavigate();

  const onAction = async (values: LoginValues) => {
    try {
      await userProvider.login(values.email, values.password);
      navigate("/app/home", { replace: true });
      showToast("success", "Bienvenido a Fast Tour");
    } catch (error) {
      showToast("error", "Email o constraseña incorrectos");
    }
  };

  return (
    <Box>
    <Paragraph text={"Fast Tour"} variant="h1" align="center" sx={{ pb: 4, fontSize: 50 }}/>
      <Form
        fields={[
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
