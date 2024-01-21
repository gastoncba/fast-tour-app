import React from 'react'
import { Button as MuiButton, SxProps, Theme } from "@mui/material";

export interface ButtonI {
  title?: string;
  onClick: (params?: any) => void;
  variant?: "contained" | "outlined" | "text";
  style?: SxProps<Theme>;
  startIcon?: any;
  onMouseOver?: (params?: any) => any;
  onMouseLeave?: (params?: any) => any;
  color?: 'primary' | 'secondary' | 'inherit'
  disabled?: boolean
}

export const Button: React.FunctionComponent<ButtonI> = (props: ButtonI) => {
  return (
    <MuiButton
      sx={props.style}
      variant={props.variant || "contained"}
      startIcon={props.startIcon}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
      color={props.color || 'primary'}
      disabled={props.disabled || false}
    >
      {props.title}
    </MuiButton>
  );
};