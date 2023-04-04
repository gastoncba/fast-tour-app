import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  SxProps,
  Theme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

import { Paragraph } from "../Paragraph/Paragraph.component";

interface NavbarProps {
  title: string;
  onMenuClick: () => void;
  iconsList: {
    icon: JSX.Element;
    onClick?: () => void;
  }[];
  color?: "primary" | "inherit" | "default" | "secondary" | "transparent";
  elevation?: number;
  colorTitle?: "black" | "gray" | "white";
  sx?: SxProps<Theme>;
}

export const Navbar: React.FC<NavbarProps> = ({
  title,
  onMenuClick,
  iconsList,
  color,
  sx,
  elevation,
  colorTitle = "black",
}) => {
  return (
    <AppBar
      position="static"
      color={color || "inherit"}
      elevation={elevation || 1}
      sx={sx}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Paragraph
            text={title}
            type="title"
            levelTitle={3}
            color={colorTitle}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          {iconsList.map((item) => (
            <IconButton
              color="inherit"
              aria-label="account"
              onClick={item.onClick}
            >
              {item.icon}
            </IconButton>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
