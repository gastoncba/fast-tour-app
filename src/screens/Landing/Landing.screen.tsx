import React from "react";
import { useNavigate } from 'react-router-dom'

interface LandingProps {}

export const LandingScreen:React.FC<LandingProps> = () => {
    
    let navigate = useNavigate();

    return(<>
    <div>Landing</div>
    <button onClick={() => navigate("/app/home")}>
        ir al home
    </button>
    </>)
}