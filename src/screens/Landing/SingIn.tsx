import React from "react";
import { useNavigate } from "react-router-dom";

import { Form, Paragraph } from "../../components";

interface Props {}

export const SingIn: React.FC<Props> = () => {
  let navigate = useNavigate();

  return (
    <>
      <Form
        title="Iniciar sesión"
        fields={[
          { name: "email", label: "Correo electrónico", type: "email" },
          { name: "password", label: "Contraseña", type: "password" },
        ]}
        onFinish={(values) => {
          console.log(values);
          navigate("home");
        }}
        onFinishFailed={(errorInfo) => console.log(errorInfo)}
        submitText="Iniciar sesión"
        loadingText="Iniciando sesión..."
        directionInputs="column"
      />
      <Paragraph
        style={{ paddingRight: "5px" }}
        text={"Despues me registro.."}
        type="link"
        onClick={() => navigate("app/home")}
      />
    </>
  );
};
