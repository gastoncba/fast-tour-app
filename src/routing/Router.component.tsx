import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CardTravel } from '@mui/icons-material'
import { Badge } from "@mui/material";
import { observer } from 'mobx-react'

import {
  HomeScreen,
  LandingScreen,
  PlacesScreen,
  CountriesScreen,
  NotFoundScreen
} from "../screens";
import { Navbar, Sidebar, Paragraph, List } from "../components";
import { cartProvider } from "../providers";

interface Props {}

export const Router: React.FC<Props> = observer((props: Props) => {
  let navigate = useNavigate();

  const items: { title: string; onClick: () => void }[] = [
    {
      title: "Home",
      onClick: () => navigate("/app/home"),
    },
    {
      title: "Top lugares",
      onClick: () => navigate("/app/places"),
    },
    {
      title: "Top paises",
      onClick: () => navigate("/app/countries"),
    },
  ];

  interface IconProps { 
    cant: number
  }

  const IconCart: React.FC<IconProps> = ({cant}) => {
    return(
      <Badge badgeContent={cant} color="primary">
        <CardTravel />
      </Badge>)
  }

  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route
        path="/app/*"
        element={
          <>
            <Navbar 
                sx={{borderRadius: '10px', mb: 2}}
                color='default'
                title="Fast Tour" 
                onMenuClick={() => console.log("click")} 
                iconsList={[
                    {
                      icon: <IconCart cant={cartProvider.getCant()}/>, 
                      onClick: () => console.log('abrir el modal de los viajes!')}
                ]}
                />
            <Sidebar>
              <Paragraph
                type="title"
                levelTitle={4}
                text="Bienvenido"
                style={{ padding: "0 10px 0 10px" }}
              />
              <List items={items} />
            </Sidebar>
            <Routes>
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/places" element={<PlacesScreen />} />
              <Route path="/countries" element={<CountriesScreen />} />
              <Route path="*" element={<NotFoundScreen message="La página que busca no existe." />} />
            </Routes>
          </>
        }
      />
      <Route path="*" element={<NotFoundScreen message="La página que busca no existe." />} />
    </Routes>
  );
});
