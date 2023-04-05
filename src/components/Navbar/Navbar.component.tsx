import React from "react";
import { useNavigate } from "react-router-dom";
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
import { Icon } from "../Icon/Icon.component";

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
  const navigate = useNavigate();

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
          <Box sx={{ px: 2 }}>
            <IconButton
              color="inherit"
              aria-label="back"
              onClick={() => navigate(-1)}
            >
              <Icon type="BACK" />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="forward"
              onClick={() => navigate(1)}
            >
              <Icon type="FORWARD" />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          {iconsList.map((item, index) => (
            <IconButton
              key={index}
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
