import React from "react";
import { SxProps, Theme } from "@mui/material";
import { CardTravel, Close, ArrowBack, ArrowForward, Visibility, VisibilityOff, Menu, AccountCircle, Home, Person } from "@mui/icons-material";

interface Props {
  type: "BAG" | "CLOSE" | "FORWARD" | "BACK" | "VISIBILITY" | "VISIBILITY-OFF" | "MENU" | "ACCOUNT" | "PROFILE" | "HOME";
  sx?: SxProps<Theme>;
  className?: string;
}

export const Icon: React.FC<Props> = ({ type, sx, className }) => {
  switch (type) {
    case "BAG":
      return <CardTravel sx={sx} className={className} />;
    case "CLOSE":
      return <Close sx={sx} className={className} />;
    case "FORWARD":
      return <ArrowForward sx={sx} className={className} />;
    case "BACK":
      return <ArrowBack sx={sx} className={className} />;
    case "VISIBILITY":
      return <Visibility sx={sx} className={className} />;
    case "VISIBILITY-OFF":
      return <VisibilityOff sx={sx} className={className} />;
    case "MENU": 
      return <Menu sx={sx} className={className} />;
    case "ACCOUNT":
      return <AccountCircle sx={sx} className={className} />;
    case "HOME":
      return <Home sx={sx} className={className} />;
    case "PROFILE": 
      return <Person sx={sx} className={className} />;
    default:
      return <></>;
  }
};
