import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomeScreen, LandingScreen } from "../screens";

interface Props {}

export const Router: React.FC<Props> = (props:Props) => {
    return(
        <Routes>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    )
}