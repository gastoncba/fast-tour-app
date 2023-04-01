import React from 'react';

import { Card, CardContent, Typography } from '@mui/material';
import { Travel } from '../../models/Travels.model';

// type Hotel = {
//   id: number;
//   name: string;
//   star: number;
// };

// type Place = {
//   id: number;
//   name: string;
// };

// type Trip = {
//   id: number;
//   name: string;
//   price: number;
//   startDate: string;
//   endDate: string;
//   place: Place;
//   hotels: Hotel[];
// };

type Props = {
  trip: Travel;
};

export const TripCard: React.FC<Props> = ({ trip }) => {
  const { name, price, startDate, endDate, place, hotels } = trip;

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {place.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {startDate} - {endDate}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {price} USD
        </Typography>
        <Typography variant="h6" color="textPrimary" component="p">
          Hoteles:
        </Typography>
        {hotels.map((hotel) => (
          <Typography key={hotel.id} variant="body2" color="textSecondary" component="p">
            {hotel.name} ({hotel.star} estrellas)
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};