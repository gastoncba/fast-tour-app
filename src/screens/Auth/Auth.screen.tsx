import React, { useState } from "react";
import { Grid, Box } from "@mui/material";

import { Wrapper, Paragraph, Button } from "../../components";
import { Login } from "./Login";
// import { Singup } from "./SingUp";
//import { Recovery } from "./Recovery";

interface AuthProps {}

export const AuthScreen: React.FC<AuthProps> = () => {
  const [activeScreen, setActiveScreen] = useState("login");

  const renderScreen = () => {
    switch (activeScreen) {
      case "login":
        return <Login />;
      case "signup":
        return <></>;
      case "recover":
        return <div>recuperar contraseña</div>;
      default:
        return <Login />;
    }
  };

  return (
    <Grid container justifyContent={"center"} sx={{ py: 2 }}>
      <Grid item xs={12} sm={8} md={6} lg={5} xl={5}>
        <Wrapper sx={{ p: "24px" }}>
          {renderScreen()}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>
            <Paragraph text={activeScreen === "login" ? "No tenes Cuenta?" : activeScreen === "recover" ? "Volver a" : "Ya Tengo cuenta"} />
            <Button
              title={activeScreen === "login" ? "Registrarme" : "Iniciar Sesión"}
              onClick={() => {
                if (activeScreen === "recover") {
                  setActiveScreen("login");
                } else {
                  setActiveScreen(activeScreen === "signup" ? "login" : "signup");
                }
              }}
              variant="text"
            />
          </Box>
          {activeScreen === "login" && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button title="Olvide mi constraseña" onClick={() => setActiveScreen("recover")} variant="text" />
            </Box>
          )}
        </Wrapper>
      </Grid>
    </Grid>
  );
};
