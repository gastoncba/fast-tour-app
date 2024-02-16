import { Divider as DividerMUI } from "@mui/material";

interface PropsDivider {
    variant?: "fullWidth" | "inset" | "middle",
    component?: "li" | "div"  
}

export const Divider:React.FC<PropsDivider> = ({ variant = "fullWidth", component = "div"}) => {
    return(
        <DividerMUI variant={variant} component={component} />
    )
}