import React from 'react';
import { Box } from '@mui/material'

import { Paragraph } from '../../components'

interface NotFoundScreenProps {
  message: string;
  align?: "center" | "left" | "right" | "inherit" | "justify" 
}

export const NotFoundScreen: React.FC<NotFoundScreenProps> = ({ message, align }) => {
  return (
    <Box>
      <Paragraph text='404 - Página no encontrada' variant='h4' align={align || "center"} />
      <Paragraph text={message} align={align || "center"} />
    </Box>
  );
};