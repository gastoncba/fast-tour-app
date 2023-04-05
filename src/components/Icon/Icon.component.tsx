import React from "react";
import {
  CardTravel,
  Close,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";

interface Props {
  type: "BAG" | "CLOSE" | "FORWARD" | "BACK";
}

export const Icon: React.FC<Props> = ({ type }) => {
  switch (type) {
    case "BAG":
      return <CardTravel />;
    case "CLOSE":
      return <Close />;
    case "FORWARD":
      return <ArrowForward />;
    case "BACK":
      return <ArrowBack />;
    default:
      return <></>;
  }
};
