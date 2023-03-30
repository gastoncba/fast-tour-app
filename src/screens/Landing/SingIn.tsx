import React from "react";

import { Form } from "../../components";

interface Props {}

export const SingIn: React.FC<Props> = () => {
  return (
    <Form
      title="Iniciar sesión"
      fields={[
        { name: "email", label: "Correo electrónico", type: "email" },
        { name: "password", label: "Contraseña", type: "password" },
      ]}
      onFinish={(values) => console.log(values)}
      onFinishFailed={(errorInfo) => console.log(errorInfo)}
      submitText="Iniciar sesión"
      loadingText="Iniciando sesión..."
      directionInputs="column"
    />
  );
};
