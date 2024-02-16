import React from "react";
import { Box, SxProps } from "@mui/material";

interface Props {
  sx?: SxProps;
  children: React.ReactNode;
}

export const Wrapper: React.FC<Props> = ({ sx, children }) => {
  return (
    <Box
      sx={{
        color: "rgb(54, 65, 82)",
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        boxShadow: "none",
        backgroundImage: "none",
        borderRadius: "8px",
        overflow: "hidden",
        //marginBottom: "24px",
        backgroundColor: "rgb(255, 255, 255)",
        ...sx,
      }}>
      {children}
    </Box>
  );
};
