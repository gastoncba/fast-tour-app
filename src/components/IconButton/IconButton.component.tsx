import React from 'react'
import { SxProps, Theme } from '@mui/material';
import { IconButton as MuiIconButton } from "@mui/material";

interface Props {
  icon: any;
  onClick?: any;
  onMouseOver?: () => any;
  onMouseLeave?: () => any;
  buttonStyle?: SxProps<Theme>;
}

export const IconButton: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <MuiIconButton
      sx={{ ...props.buttonStyle }}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
    >
      {props.icon}
    </MuiIconButton>
  );
};