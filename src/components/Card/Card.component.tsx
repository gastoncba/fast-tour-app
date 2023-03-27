import React from 'react';
import { Card as CardMUI, CardMedia, CardContent, Typography } from '@mui/material';

interface CardProps {
  image: string;
  title: string;
  subtitle: string;
}

export const Card: React.FC<CardProps> = ({ image, title, subtitle }) => {
  return (
    <CardMUI sx={{ maxWidth: 345 }} elevation={7}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography variant="h5" component="h5">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </CardMUI>
  );
};