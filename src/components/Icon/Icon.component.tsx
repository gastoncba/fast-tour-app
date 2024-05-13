import React from "react";
import { SxProps, Theme } from "@mui/material";
import {
  BarChart,
  Remove,
  AdminPanelSettings,
  FilterAlt,
  CardTravel,
  MoreVert,
  ExpandMore,
  AddOutlined,
  FiberManualRecord,
  Close,
  ArrowBack,
  ArrowForward,
  Visibility,
  VisibilityOff,
  Menu,
  AccountCircle,
  Home,
  Person,
  ArrowDropDown,
  ArrowDropUp,
  PeopleAlt,
} from "@mui/icons-material";

export type IconType =
  | "REMOVE"
  | "ADMIN-PANEL"
  | "CHART"
  | "FILTER"
  | "EXPAND-MORE"
  | "MORE-VERT"
  | "PLUS"
  | "FIBER-MANUAL"
  | "ARROW-DROP-DOWN"
  | "ARROW-DROP-UP"
  | "BAG"
  | "CLOSE"
  | "FORWARD"
  | "BACK"
  | "VISIBILITY"
  | "VISIBILITY-OFF"
  | "MENU"
  | "ACCOUNT"
  | "PROFILE"
  | "HOME"
  | "USERS";

interface Props {
  type: IconType;
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
    case "FIBER-MANUAL":
      return <FiberManualRecord sx={sx} className={className} />;
    case "ARROW-DROP-DOWN":
      return <ArrowDropDown sx={sx} className={className} />;
    case "ARROW-DROP-UP":
      return <ArrowDropUp sx={sx} className={className} />;
    case "PLUS":
      return <AddOutlined sx={sx} className={className} />;
    case "EXPAND-MORE":
      return <ExpandMore sx={sx} className={className} />;
    case "MORE-VERT":
      return <MoreVert sx={sx} className={className} />;
    case "FILTER":
      return <FilterAlt sx={sx} className={className} />;
    case "CHART":
      return <BarChart sx={sx} className={className} />;
    case "ADMIN-PANEL":
      return <AdminPanelSettings sx={sx} className={className} />;
    case "REMOVE":
      return <Remove sx={sx} className={className} />;
    case "USERS":
      return <PeopleAlt sx={sx} className={className} />;
    default:
      return <></>;
  }
};
