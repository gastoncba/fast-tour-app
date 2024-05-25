import React from "react";
import { Avatar as AvatarMUI } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

interface Props {
  alt?: string;
  img?: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  size?: number;
  onClick?: (params?: any) => void;
}

export const Avatar: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <AvatarMUI alt={props.alt} src={props.img} sx={{ width: props.size, height: props.size, ...props.sx }} onClick={props.onClick}>
      {props.children}
    </AvatarMUI>
  );
};