import React from "react";

import { Form } from "../../components";

interface Props {}

export const SingUp: React.FC<Props> = () => {

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
    </>
  );
};
