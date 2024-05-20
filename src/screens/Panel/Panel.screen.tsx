import React from "react";
import { useLocation } from "react-router-dom";

import { Trips } from "./Trips";
import { Countries } from "./Countries";
import { Places } from "./Places";
import { Hotels } from "./Hotels";
import { Users } from "./Users";
import { Orders } from "./Orders";

interface PanelProps {}

interface CustomizedState {
  value: string;
}

export const PanelScreen: React.FC<PanelProps> = () => {
  let location = useLocation();
  const { value } = location.state as CustomizedState;

  const renderScreen = () => {
    switch (value) {
      case "trip":
        return <Trips />;
      case "place":
        return <Places />;
      case "country":
        return <Countries />;
      case "hotel":
        return <Hotels />;
      case "user":
          return <Users />;
      case "order":
          return <Orders />;
      default:
        return <Trips />;
    }
  };

  return <>{renderScreen()}</>;
};
