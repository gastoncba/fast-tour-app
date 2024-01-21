import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { observer } from "mobx-react";

import { HomeScreen, LandingScreen, NotFoundScreen } from "../screens";
import { NavBar, Sidebar, RouterList } from "../components";
import { RouterItemsController } from "./RouterItemsController";
import { RouterItems } from "./RouterItems";

interface Props {}

export const Router: React.FC<Props> = observer((props: Props) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const generalItems = RouterItemsController();
  let navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route
        path="/app/*"
        element={
          <>
            <NavBar elevation={2} navigate handleClick={() => setShowSidebar(!showSidebar)} />
            <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} variant="temporary" anchor="left" top={"0px"}>
              <RouterItems generalItems={generalItems} />
            </Sidebar>
            <Box sx={{ p: 2 }}>
              <Routes>
                <Route path="/home" element={<HomeScreen />} />
                <Route path="*" element={<NotFoundScreen message="La página que busca no existe." />} />
              </Routes>
            </Box>
          </>
        }
      />
      <Route path="*" element={<NotFoundScreen message="La página que busca no existe." />} />
    </Routes>
  );
});
