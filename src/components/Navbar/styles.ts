import { SxProps, Theme } from "@mui/material";
import { themeMaterial } from "../../settings/materialTheme.setting";

const { main, light } = themeMaterial.palette.primary

export const iconStyles: SxProps<Theme> = {
  borderRadius: "8px",
  ".setting-item-icon": {
    background: "primary.light",
    color: "primary.main",
    "&:hover": {
        transition: "all .2s ease-in-out",
        backgroundColor: main,
        color: light,
      },
  },
  color: main,
};