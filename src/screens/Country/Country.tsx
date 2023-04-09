import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Country } from "../../models/Country.model";

interface Props {
  country: Country;
}

export const CountryDetail: React.FC<Props> = ({ country }) => {
  let navigate = useNavigate();

  return (
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image={country.img}
        title={country.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h5">
          {country.name}
        </Typography>
        {country.places.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            No hay lugares disponibles en este momento
          </Typography>
        ) : (
          <>
            <Typography variant="body2">Lugares disponibles</Typography>
            <List>
              {country.places.map((place) => (
                <ListItemButton
                  key={place.id}
                  onClick={() => navigate("/app/home", { state: place })}
                >
                  <ListItemText primary={place.name} />
                </ListItemButton>
              ))}
            </List>
          </>
        )}
      </CardContent>
    </Card>
  );
};
