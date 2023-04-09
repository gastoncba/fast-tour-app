import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import { Place } from "../../models/Place.model";

interface Props {
  place: Place;
  onClick: (id: string) => void; 
}

export const PlaceDetail: React.FC<Props> = ({ place, onClick }) => {
  const { name, travels, country, img } = place;

  return (
    <Card>
      <CardMedia image={img} sx={{ height: 140 }}/>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {country.name}
        </Typography>
        <Typography variant="body2" component="p">
          Viajes disponibles:
        </Typography>
        {travels.length !== 0 ? (
          <List>
            {travels.map((travel) => (
              <ListItemButton key={travel.id} onClick={() => onClick(travel.id)}>
                <ListItemText
                  primary={travel.name}
                  secondary={`${travel.price} USD`}
                />
              </ListItemButton>
            ))}
          </List>
        ) : (
          <Typography variant="body2" component="strong">
            No existen viajes disponibles en este momento
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
