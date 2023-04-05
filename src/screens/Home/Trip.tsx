import React, { useState, useCallback } from "react";
import { observer } from "mobx-react";

import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { Travel } from "../../models/Travels.model";
import { Button, List } from "../../components";
import { cartProvider } from "../../providers";
import { Hotel } from "../../models/Hotel.model";

type Props = {
  trip: Travel;
};

export const TripCard: React.FC<Props> = observer(({ trip }) => {
  const { name, price, startDate, endDate, place, hotels } = trip;
  const [selectedHotel, setSelectedHotel] = useState<Hotel>(hotels[0]);

  const onHotelSelect = useCallback((hotel: Hotel) => {
    setSelectedHotel(hotel);
  }, []);

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
        {hotels.length > 0 && (
          <List
            items={hotels.map((hotel) => ({
              title: hotel.name,
              onClick: () => onHotelSelect(hotel),
            }))}
          />
        )}
      </CardContent>
      <CardActions>
        {cartProvider.inCart(trip) ? (
          <Button
            text="Quitar"
            onClick={() => {
              cartProvider.delTrip(trip);
            }}
          />
        ) : (
          <Button
            text="lo quiero"
            onClick={() => {
              cartProvider.addTrip({ ...trip, hotel: selectedHotel });
            }}
          />
        )}
      </CardActions>
    </Card>
  );
});
