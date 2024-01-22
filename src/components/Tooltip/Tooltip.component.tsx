import React from 'react';
import { Tooltip as MUITootip, Typography } from '@mui/material'

import { styles } from './styles'

interface TooltipProps {
    text: string; 
    position?: "bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start"
    children: JSX.Element; 
  }

export const Tooltip: React.FC<TooltipProps> = ({ text, children, position }) => {

  return (
    <MUITootip
      title={<Typography sx={styles}>{text}</Typography>}
      placement={position}
    >
      {children}
    </MUITootip>
  );
};

