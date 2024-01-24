import React from "react";
import { useLocation } from 'react-router-dom'

import { Trips } from './Trips'
import { Countries } from "./Countries";

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
            return <div>Destinos</div>;
          case "country":
            return <Countries />;
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