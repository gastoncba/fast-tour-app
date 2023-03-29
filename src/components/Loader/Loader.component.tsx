import React from "react";
import { CircularProgress, Box, SxProps, Theme} from '@mui/material'

interface Props {
    size?:number,
    sx?: SxProps<Theme>
}

export const Loader:React.FC<Props> = ({size, sx}) => {
    return(
        <Box display={'flex'} justifyContent='center' sx={sx}>
            <CircularProgress size={size || 30}/>
        </Box>
    )
}