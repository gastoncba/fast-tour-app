import React from "react";
import { useLocation } from 'react-router-dom'

import { Trips } from './Trips'

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
            return <div></div>;
          case "country":
            return <div></div>;
          default:
            return <div></div>;
        }
      };

    return(
        <>
        {renderScreen()}
        </>
    )
}