import React from "react";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

import { Paragraph, Divider, RouterList, Button } from "../components";
import { Item } from "../components/RouterList/RouterList.component";

interface PropsRouterItems {
  generalItems: Item[];
  logout?: () => void;
}

export const RouterItems: React.FC<PropsRouterItems> = ({ generalItems, logout }) => {
  let location = useLocation();

  const isCurrent = (path: string) => {
    return "/app/" + path === location.pathname;
  };

  return (
    <Box display={"flex"} flexDirection={"column"} rowGap={1} sx={{ p: 2 }}>
      <Paragraph text={"Fast Tour"} fontWeight={"bold"} variant="h6" align="center"/>
      <Divider variant="fullWidth" />
      <RouterList itemsMenu={generalItems} sx={{ px: 2 }} isCurrent={isCurrent} />
      {logout && <Button title="Cerrar sesión" onClick={logout} variant="text" />}
    </Box>
  );
};
