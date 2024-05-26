import { Box } from "@mui/material";

import { Wrapper, Form, Paragraph, showToast } from "../../components";
import { useState } from "react";
import { userProvider } from "../../providers";
import { URL_RECOVERY } from "../../settings/const.setting";

interface RecoveryProps {}

export const Recovery: React.FC<RecoveryProps> = () => {
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const recovery = async (values: { email: string }) => {
    try {
      await userProvider.recoverPassword(values.email, URL_RECOVERY);
      showToast({ message: "Se ha enviado un correo para restablcer su contraseña", type: "success" });
      setShowMessage(true);
    } catch (error: any) {
      const msg = error.error.response.data.message === "EMAIL-NOT-FOUND" ? "El dirección de correo ingresada no se encuentra esta registrada" : "Error al enviar el correo para restablecer su contraseña";
      showToast({ message: msg, type: "error" });
    }
  };

  return (
    <Wrapper>
      <Paragraph text={"Recuperar Contraseña"} variant="h4" align="center" />
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", rowGap: 2 }}>
        <Paragraph text={"Ingrese su dirección de correo electrónico y le enviaremos un enlace de recuperación."} />
        <Form
          inputs={[
            {
              label: "Email",
              type: "email",
              initialValue: { email: "" },
            },
          ]}
          onAction={recovery}
        />
        {showMessage && <Paragraph text={"Se ha enviado el enlace de recuperación a su correo electronico"} color="warning.main" align="center" />}
      </Box>
    </Wrapper>
  );
};
