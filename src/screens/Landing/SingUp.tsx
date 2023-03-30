import React from "react";
import { useNavigate } from "react-router-dom";

import { Form, Paragraph } from "../../components";

interface Props {}

export const SingUp: React.FC<Props> = () => {
  let navigate = useNavigate();

  return (
    <>
      <Form
        title="Registrate"
        fields={[
          { name: "firstName", label: "Nombre", type: "text" },
          { name: "lastName", label: "Apellido", type: "text" },
          { name: "email", label: "Correo electrónico", type: "email" },
          { name: "password", label: "Contraseña", type: "password" },
        ]}
        onFinish={(values) => console.log(values)}
        onFinishFailed={(errorInfo) => console.log(errorInfo)}
        submitText="Registrarme"
        loadingText="Registrando..."
        directionInputs="column"
      />
      <Paragraph
        style={{paddingRight: '5px'}}
        text={"Despues me registro.."}
        type="link"
        onClick={() => navigate("home")}
      />
    </>
  );
};
