import React, { useState } from "react";
import { Container, Box } from "@mui/material";

import { Paragraph } from "../../components";
import { SingIn } from "./SingIn";
import { SingUp } from "./SingUp";

interface Props {}

export const LandingScreen: React.FC<Props> = () => {
  const [singIn, setSingIn] = useState<boolean>(true);

  return (
    <Container maxWidth="sm" sx={{ pt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paragraph text="Bienvenido a Fast Tour" type="title" />
      </Box>
      {singIn ? <SingIn /> : <SingUp />}
      <Paragraph
        text={singIn ? "Registrarme" : "Ya tengo cuenta"}
        type="link"
        onClick={() => setSingIn(!singIn)}
      />
    </Container>
  );
};
