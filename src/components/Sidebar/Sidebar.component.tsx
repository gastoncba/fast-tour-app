import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Drawer } from "@mui/material";

import { sidebarStyles } from "./styles";

interface PropsSidebar {
  children: React.ReactNode;
  variant?: "permanent" | "persistent" | "temporary";
  anchor?: "left" | "top" | "right" | "bottom";
  show: boolean;
  onClose?: () => void;
  top?: number | string;
  width?: number | string;
}

export const Sidebar: React.FC<PropsSidebar> = ({ children, variant = "persistent", show, anchor = "right", onClose, width, top }) => {
  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Drawer
      variant={variant}
      open={show}
      anchor={anchor}
      onClose={handleClose}
      sx={{
        [`& .MuiDrawer-paper`]: {
          ...sidebarStyles,
          top: top || 160,
          width: width || 240,
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "transparent",
        },
      }}>
      <PerfectScrollbar component="div">{children}</PerfectScrollbar>
    </Drawer>
  );
};
