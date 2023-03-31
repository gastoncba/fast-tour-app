import React, { ReactNode } from "react";
import { Paper, Theme, SxProps} from "@mui/material";

interface Props {
  children: ReactNode;
  elevation?: number
  sx?: SxProps<Theme> 
}

export const Wrapper: React.FC<Props> = ({ children, elevation, sx }) => {
  return <Paper elevation={elevation || 7} sx={sx}>{children}</Paper>;
};
;
