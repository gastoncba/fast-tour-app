import React from "react";
import { observer } from "mobx-react";
import { Box } from "@mui/material";

import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { Travel } from "../../models/Travels.model";
import { Button } from "../../components";
import { cartProvider } from "../../providers";

type Props = {
  trip: Travel;
};

export const TripCard: React.FC<Props> = observer(({ trip }) => {
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
          <Typography
            key={hotel.id}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {hotel.name} ({hotel.star} estrellas)
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        <Box sx={{ display: "flex", flexDirection: "row", columnGap: 2 }}>
          <Button
            text="lo quiero"
            onClick={() => {
              cartProvider.addTrip(trip);
            }}
          />
          {cartProvider.inCart(trip) && (
            <Button
              text="Quitar"
              onClick={() => {
                cartProvider.delTrip(trip);
              }}
            />
          )}
        </Box>
      </CardActions>
    </Card>
  );
});
