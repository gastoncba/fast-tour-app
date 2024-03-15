import { Divider as DividerMUI, SxProps, Theme } from "@mui/material";

interface PropsDivider {
    variant?: "fullWidth" | "inset" | "middle",
    component?: "li" | "div"  ,
    sx?: SxProps<Theme>
}

export const Divider:React.FC<PropsDivider> = ({ variant = "fullWidth", component = "div", sx }) => {
    return(
        <DividerMUI variant={variant} component={component} sx={sx}/>
    )
}