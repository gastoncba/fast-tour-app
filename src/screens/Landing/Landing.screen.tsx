import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Grid, Theme, useMediaQuery } from "@mui/material";

import { Paragraph, Image, Button, NavBar, Animation } from "../../components";
import { OpenLink } from "../../utils";

import travel from "../../assets/images/travel.png";

interface LandingProps {}

export const LandingScreen: React.FC<LandingProps> = () => {
  const navigate = useNavigate();
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const icons: { title: string; click: () => void }[] = [
    {
      title: "Documentación",
      click: () => OpenLink.getPageInfo("https://github.com/gastoncba/fast-tour-app"),
    },
    {
      title: "Iniciar Sesión",
      click: () => navigate("/app/auth"),
    },
  ];

  return (
    <>
      <NavBar
        icons={icons.map((icon) => (
          <Button title={icon.title} onClick={icon.click} />
        ))}
      />
      <Box sx={{ p: 4, display: "flex", flexDirection: "column", rowGap: 1, ...landingStyles }}>
        <Container maxWidth="xl">
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
                <Animation type="UP" duration={0.7} delay={0.5}>
                  <Paragraph text={"Tu Plataforma Única Para Comprar Viajes."} variant="h3" />
                </Animation>
                <Animation type="UP" duration={0.8} delay={0.5}>
                  <Paragraph
                    text={
                      "Explora y reserva tus destinos soñados con nuestra plataforma integral. Ya sea que busques aventuras exóticas, escapadas relajantes o experiencias culturales, tenemos una variedad de opciones para satisfacer tus deseos de viaje."
                    }
                  />
                </Animation>
              </Box>
              <Animation type="UP" duration={0.9} delay={0.5}>
                <Button title="ir al inicio" onClick={() => navigate("/app/home")} style={{ my: 4 }} />
              </Animation>
            </Grid>
            <Grid item md={6}>
              <Animation type="RIGHT">
                <Box
                  sx={{
                    display: isMd ? "flex" : "none",
                    justifyContent: "center",
                  }}>
                  <Image src={travel} height={340} />
                </Box>
              </Animation>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

const landingStyles = {
  background: "linear-gradient(360deg, rgb(238, 242, 246) 1.09%, rgb(255, 255, 255) 100%)",
};
