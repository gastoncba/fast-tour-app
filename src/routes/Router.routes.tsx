import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import { AuthScreen, HomeScreen, LandingScreen, NotFoundScreen, PanelScreen, PurchaseScreen, DashboardScreen, ProfileScreen, RecoveryScreen } from "../screens";
import { NavBar, Sidebar, Icon, Menu } from "../components";
import { useRouterItemsController } from "./RouterItemsController.routes";
import { RouterItems } from "./RouterItems.routes";
import { ProtectedRoute } from "./ProtectedRoute.routes";
import { userProvider, tokenProvider } from "../providers";
import { observer } from "mobx-react";

interface Props {}

export const Router: React.FC<Props> = observer((props: Props) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const generalItems = useRouterItemsController();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const logout = () => {
    tokenProvider.clearTokens();
    userProvider.logout();
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
              showIconMenu
              icons={[
                <>
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
                </>,
              ]}
            />
            <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} variant={"temporary"} anchor="left" top={"0px"}>
              <RouterItems generalItems={generalItems} />
            </Sidebar>
            <Box sx={{ p: 2 }}>
              <Routes>
                <Route path="/auth" element={<AuthScreen />} />
                <Route path="/recovery" element={<RecoveryScreen />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route element={<ProtectedRoute conditions={[{ redirectIf: () => !state, redirectTo: "/app/home" }]} />}>
                  <Route path="/purchase" element={<PurchaseScreen />} />
                </Route>
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
                  <Route path="/dashboard" element={<DashboardScreen />} />
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
                  <Route path="/profile" element={<ProfileScreen />} />
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
