import React from 'react';
import { Card, CardContent, Box, SxProps } from '@mui/material';

interface Props {
  sx?: SxProps;
  elevation?: number
  children: React.ReactNode;
}

export const Wrapper: React.FC<Props> = ({ sx, children, elevation }) => {
  return (
    <Box sx={sx}>
      <Card elevation={elevation || 7}>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};