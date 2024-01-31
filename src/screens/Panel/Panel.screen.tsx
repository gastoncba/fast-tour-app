import React from "react";
import { useLocation } from 'react-router-dom'

import { Trips } from './Trips'
import { Countries } from "./Countries";
import { Places } from "./Places";
import { Hotels } from "./Hotels";

interface PanelProps {}

interface CustomizedState {
    value: string;
  }

export const PanelScreen: React.FC<PanelProps> = () => {

    let location = useLocation();
    const { value } = location.state as CustomizedState;
    console.log(value)

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
          default:
            return <Trips />;
        }
      };

    return(
        <>
        {renderScreen()}
        </>
    )
}