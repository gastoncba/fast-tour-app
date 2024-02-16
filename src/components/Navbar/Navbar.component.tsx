import React from "react";
import { AppBar, Toolbar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Icon } from "../Icon/Icon.component";
import { IconButton } from "../IconButton/IconButton.component";
import { Paragraph } from "../Paragraph/Paragraph.component";
import { iconStyles } from "./styles"

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
          <IconButton icon={props.icon || <Icon type="MENU" sx={iconStyles} />} onClick={() => props.handleClick && props.handleClick()} />
          <Paragraph text={"FastTour"} color={"primary.dark"} variant="h5" />
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
