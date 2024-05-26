import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import { useLocation } from "react-router-dom";

import { Wrapper, Paragraph, Button } from "../../components";
import { Login } from "./Login";
import { Singup } from "./Signup";

type typeAuthScreen = "login" | "signup" | "recover";

interface AuthProps {}

export const AuthScreen: React.FC<AuthProps> = () => {
  const location = useLocation();
  const { state } = location;
  const [activeScreen, setActiveScreen] = useState<typeAuthScreen>(state !== null ? state.type : "login");
  const [to] = useState<string>(state !== null ? state.redirect : "/app/home");
  const [content] = useState<any>(state !== null ? state.content : null);

  const renderScreen = () => {
    switch (activeScreen) {
      case "login":
        return <Login to={to} content={content} />;
      case "signup":
        return <Singup to={to} content={content} />;
      case "recover":
        return <div>recuperar contraseña</div>;
      default:
        return <Login to={to} content={content} />;
    }
  };

  return (
    <Grid container justifyContent={"center"} sx={{ py: 2 }}>
      <Grid item xs={12} sm={8} md={6} lg={5} xl={4}>
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
