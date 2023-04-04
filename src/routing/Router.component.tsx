import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CardTravel } from '@mui/icons-material'

import {
  HomeScreen,
  LandingScreen,
  PlacesScreen,
  CountriesScreen,
  NotFoundScreen
} from "../screens";
import { Navbar, Sidebar, Paragraph, List } from "../components";

interface Props {}

export const Router: React.FC<Props> = (props: Props) => {
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

  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route
        path="/app/*"
        element={
          <>
            <Navbar 
                title="mi app" 
                onMenuClick={() => console.log("click")} 
                iconsList={[
                    {icon: <CardTravel />, onClick: () => console.log('click card travel!')}
                ]}
                />
            <Sidebar>
              <Paragraph
                type="title"
                levelTitle={2}
                text="Fast Tour"
                style={{ paddingLeft: "50px" }}
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
};
