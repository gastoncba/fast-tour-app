import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { observer } from "mobx-react";

import { cartProvider } from "../../providers";
import { Travel } from "../../models/Travels.model";
import { TravelWithSelectedHotel } from "../../providers/Cart.provider";
import {
  Paragraph,
  GridList,
  Wrapper,
  Icon,
  Button,
  Modal,
} from "../../components";

interface Props {}

export const PackagePurchaseScreen: React.FC<Props> = observer(() => {
  const travels = cartProvider.getCart();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleDeleteTravel = (trip: Travel) => {
    cartProvider.delTrip(trip);
  };

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Box sx={{mb: 2}}>
        <Paragraph text="Tus viajes" type="title" levelTitle={2} />
        <Paragraph text={`Total USD ${cartProvider.getTotal()}`} color='gray' style={{fontSize: 15}}/>
        </Box>
        {travels.length > 0 ? (
          <>
            <GridList
              items={travels}
              renderItem={(value: TravelWithSelectedHotel, key: number) => (
                <Wrapper elevation={1}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", rowGap: 0 }}
                    key={key}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: 1,
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Paragraph
                        text={value.name}
                        type="title"
                        levelTitle={4}
                      />
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
            <Button
              text="Comprar"
              onClick={() => {
                setOpenModal(true);
              }}
              style={{ margin: "10px 0 10px 0" }}
            />
          </>
        ) : (
          <Paragraph text="No tienes viajes..." />
        )}
      </Box>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Confirmar compra"
      >
        <Paragraph
          text="¿Está seguro de que desea comprar los siguientes viajes?"
          style={{ fontSize: 20 }}
        />
        <Box
          sx={{
            display: "flex",
            direction: "row",
            columnGap: 2,
            justifyContent: "space-evenly",
            pt: 2,
          }}
        >
          <Button text="Revisar compra" />
          <Button text="Confirmar compra" />
          <Button text="Cancelar compra" />
        </Box>
      </Modal>
    </>
  );
});
