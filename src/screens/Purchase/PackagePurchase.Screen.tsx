import React from "react";
import { Box, IconButton } from "@mui/material";
import { observer } from "mobx-react";

import { cartProvider } from "../../providers";
import { Travel } from "../../models/Travels.model";
import { TravelWithSelectedHotel } from "../../providers/Cart.provider";
import { Paragraph, GridList, Wrapper, Icon } from "../../components";

interface Props {}

export const PackagePurchaseScreen: React.FC<Props> = observer(() => {
  const travels = cartProvider.getCart();

  const handleDeleteTravel = (trip: Travel) => {
    cartProvider.delTrip(trip);
  };

  return (
    <Box sx={{ m: 2 }}>
      <Paragraph text="Tus viajes" type="title" levelTitle={2} />
      {travels.length > 0 ? (
        <GridList
          items={travels}
          renderItem={(value: TravelWithSelectedHotel, key: number) => (
            <Wrapper elevation={1}>
              <Box sx={{ display: "flex", flexDirection: "column", rowGap: 0 }} key={key}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: 1,
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Paragraph text={value.name} type="title" levelTitle={4} />
                  <IconButton onClick={() => handleDeleteTravel(value)}>
                    <Icon type="CLOSE" />
                  </IconButton>
                </Box>
                <Paragraph
                  text={`Fecha: desde ${value.startDate} al ${value.endDate}`}
                  color="gray"
                  style={{ fontSize: 15 }}
                />
                <Paragraph
                  text={`Precio: USD ${value.price}`}
                  color="gray"
                  style={{ fontSize: 15 }}
                />
                <Paragraph
                  text={`Destino: ${value.place.name}`}
                  color="gray"
                  style={{ fontSize: 15 }}
                />
                <Paragraph
                  text={`Hotel: ${value.hotel.name}`}
                  color="gray"
                  style={{ fontSize: 15 }}
                />
              </Box>
            </Wrapper>
          )}
        />
      ) : (
        <Paragraph text="No tienes viajes..." />
      )}
    </Box>
  );
});
