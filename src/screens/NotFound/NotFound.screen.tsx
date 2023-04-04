import React from 'react';
import { Box } from '@mui/material'

import { Paragraph } from '../../components'

interface NotFoundScreenProps {
  message: string;
}

export const NotFoundScreen: React.FC<NotFoundScreenProps> = ({ message }) => {
  return (
    <Box>
      <Paragraph text='404 - Página no encontrada' type='title'/>
      <Paragraph text={message} />
    </Box>
  );
};