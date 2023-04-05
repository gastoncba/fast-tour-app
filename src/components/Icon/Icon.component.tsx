import React from "react";
import { CardTravel, Close } from "@mui/icons-material";

interface Props {
  type: "BAG" | "CLOSE";
}

export const Icon: React.FC<Props> = ({ type }) => {
  switch (type) {
    case "BAG":
      return <CardTravel />;
    case "CLOSE":
      return <Close />
    default:
      return <></>;
  }
};
