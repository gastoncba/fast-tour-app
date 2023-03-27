import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomeScreen } from "../screens";

interface Props {}

export const Router: React.FC<Props> = (props:Props) => {
    return(
        <Routes>
            <Route path="/" element={<div>Landing screen</div>} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    )
}