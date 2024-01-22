import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { observer } from "mobx-react";

import { AuthScreen, HomeScreen, LandingScreen, NotFoundScreen, PanelScreen } from "../screens";
import { NavBar, Sidebar, Icon, IconButton, Menu } from "../components";
import { RouterItemsController } from "./RouterItemsController";
import { RouterItems } from "./RouterItems";
import { ProtectedRoute } from "./ProtectedRoute.component";
import { userProvider, tokenProvider } from "../providers";

interface Props {}

export const Router: React.FC<Props> = observer((props: Props) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const generalItems = RouterItemsController();
  let navigate = useNavigate();

  const logout = () => {
    tokenProvider.clearTokens();
    userProvider.user.isLogged = false;
    setTimeout(() => {
      setShowSidebar(false);
      navigate("/app/home", { replace: true });
    }, 2000);
  };

  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route
        path="/app/*"
        element={
          <>
            <NavBar
              elevation={2}
              handleClick={() => setShowSidebar(!showSidebar)}
              icons={
                <>
                  <IconButton icon={<Icon type="BAG" sx={{ color: "black" }} />} />
                  <Menu
                    icon={<Icon type="ACCOUNT" sx={{ color: "black" }} />}
                    items={[
                      {
                        id: 1,
                        name: !userProvider.user.isLogged ? "Iniciar Sesión" : "Cerrar Sesión",
                        onClick: !userProvider.user.isLogged ? () => navigate("/app/auth") : () => logout(),
                      },
                      {
                        id: 2,
                        name: "Perfil",
                        onClick: () => navigate("/app/profile"),
                      },
                    ]}
                  />
                </>
              }
            />
            <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} variant="temporary" anchor="left" top={"0px"}>
              <RouterItems generalItems={generalItems} />
            </Sidebar>
            <Box sx={{ p: 2 }}>
              <Routes>
                <Route path="/auth" element={<AuthScreen />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route
                  element={
                    <ProtectedRoute
                      conditions={[
                        {
                          redirectIf: () => !userProvider.user.isLogged,
                          redirectTo: "/app/home",
                        },
                        {
                          redirectIf: () => !userProvider.isAdmin(),
                          redirectTo: "/app/home",
                        },
                      ]}
                    />
                  }>
                  <Route path="/panel" element={<PanelScreen />} />
                  <Route path="/dashboard" element={<div>dashboard</div>} />
                </Route>
                <Route
                  element={
                    <ProtectedRoute
                      conditions={[
                        {
                          redirectIf: () => !userProvider.user.isLogged,
                          redirectTo: "/app/home",
                        },
                      ]}
                    />
                  }>
                  <Route path="/profile" element={<div>perfil de {userProvider.user.firstName}</div>} />
                </Route>
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
