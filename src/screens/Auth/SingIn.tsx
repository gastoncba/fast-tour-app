import React from "react";
import { useNavigate } from "react-router-dom";

import { Form } from "../../components";

interface Props {}

export const SingIn: React.FC<Props> = () => {
  let navigate = useNavigate();

  return (
    <>
      <Form
        title="Iniciar sesión"
        fields={[
          {
            initialValue: { email: "" },
            type:"email",
            label: "email"
          },
          {
            initialValue: { password: "" },
            type: "password",
            label: "contraseña"
          }
        ]}
        onAction={() => new Promise<void>(async(resolve, reject) => {})}
      />
    </>
  );
};
