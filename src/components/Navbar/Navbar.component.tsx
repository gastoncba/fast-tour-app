import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Icon } from "../Icon/Icon.component";
import { IconButton } from "../IconButton/IconButton.component";
import { Paragraph } from "../Paragraph/Paragraph.component";
import { Avatar } from "../Avatar/Avatar.component";
import { iconStyles } from "./styles";

interface Props {
  icon?: JSX.Element;
  handleClick?: () => void;
  position?: "absolute" | "fixed" | "relative" | "static" | "sticky";
  elevation?: number;
  navigate?: boolean;
  icons?: JSX.Element;
}

export const NavBar: React.FunctionComponent<Props> = (props: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position={props.position || "sticky"}
        elevation={props.elevation || 0}
        sx={{
          backgroundColor: "white",
        }}>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
            <Avatar sx={iconStyles} onClick={() => props.handleClick && props.handleClick()}>
              <Icon type="MENU" />
            </Avatar>
            <Paragraph text={"FastTour"} color={"primary.dark"} variant="h5" />
          </Box>
          {props.navigate && (
            <Box sx={{ display: "flex", flexDirection: "row", columnGap: 0, alignItems: "center" }}>
              <Box>
                <IconButton icon={<Icon type="BACK" />} onClick={() => navigate(-1)} />
              </Box>
              <Box>
                <IconButton icon={<Icon type="FORWARD" />} onClick={() => navigate(1)} />
              </Box>
            </Box>
          )}
          <Box sx={{ flexGrow: 1 }} />
          {props.icons && props.icons}
        </Toolbar>
      </AppBar>
    </>
  );
};
