import React from "react";
import { Typography , Theme, SxProps} from "@mui/material";

interface Props {
    text: string,
    variant?: 'body2' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'subtitle2'
    sx?: SxProps<Theme>
    color?: 'GrayText' | 'Primary'
}

export const Paragraph: React.FC<Props> = ({text, variant, sx, color}) => {
    return(
    <Typography variant={variant || 'body2'} sx={sx} color={color}>
        {text}
    </Typography>
    )
}