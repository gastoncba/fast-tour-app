import React from "react";
import { Typography } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

interface Props {
  align?: "center" | "inherit" | "justify" | "left" | "right";
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "caption" | "overline";
  text: string | number;
  fontSize?: number | string;
  color?: "primary" | "primary.light" | "primary.dark" | "GrayText" | "secondary" | "secondary.light" | "secondary.dark" | "GrayText" | "white" | "warning.main" | "success.main";
  sx?: SxProps<Theme>;
  className?: string;
  fontWeight?: number | "light" | "regular" | "medium" | "bold";
}

export const Paragraph: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <Typography color={props.color} align={props.align} variant={props.variant || "body1"} sx={{ fontSize: props.fontSize, fontWeight: props.fontWeight, ...props.sx }} className={props.className}>
        {props.text}
      </Typography>
    </>
  );
};
