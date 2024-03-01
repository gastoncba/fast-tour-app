import { SxProps, Theme } from "@mui/material";
import { themeMaterial } from "../../settings/materialTheme.setting";

const { dark, light } = themeMaterial.palette.primary;

export const iconStyles: SxProps<Theme> = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  lineHeight: 1,
  userSelect: "none",
  cursor: "pointer",
  borderRadius: "8px",
  width: "34px",
  height: "34px",
  fontSize: "1.2rem",
  overflow: "hidden",
  transition: "all 0.2s ease-in-out 0s",
  background: "rgb(237, 231, 246)",
  color: dark,
  ":hover": {
    background: dark,
    color: light,
  },
};