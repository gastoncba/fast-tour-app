import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

import { cartProvider } from "../../providers";
import { Trip } from "../../models/Trip.model";
import { TripWithSelectedHotel } from "../../providers/Cart.provider";
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

  const navigate = useNavigate()

  const handleDeleteTravel = (trip: Trip) => {
    cartProvider.delTrip(trip);
  };

  const finish = () => {
    cartProvider.reset();
    setOpenModal(false)
    // Toast({
    //   type: 'success',
    //   message: "Compra finalizada",
    // });
  }

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Box sx={{mb: 2}}>
        <Paragraph text="Tus viajes" />
        <Paragraph text={`Total USD ${cartProvider.getTotal()}`} />
        </Box>
        {travels.length > 0 ? (
          <>
            <GridList
              items={travels}
              renderItem={(value: TripWithSelectedHotel, key: number) => (
                <Wrapper>
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
                      />
                      <IconButton onClick={() => handleDeleteTravel(value)}>
                        <Icon type="CLOSE" />
                      </IconButton>
                    </Box>
                    <Paragraph
                      text={`Fecha: desde ${value.startDate} al ${value.endDate}`}
                    />
                    <Paragraph
                      text={`Precio: USD ${value.price}`}
                    />
                  </Box>
                </Wrapper>
              )}
            />
            {/* <Button
              text="Comprar"
              onClick={() => {
                setOpenModal(true);
              }}
              style={{ margin: "10px 0 10px 0" }}
            /> */}
          </>
        ) : (
          <Box display={'flex'} flexDirection={'row'} columnGap={1}>
          <Paragraph text="No tienes viajes..." />
          <Paragraph text="volver" />
          </Box>
        )}
      </Box>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Confirmar compra"
      >
        <Paragraph
          text="¿Está seguro de que desea comprar los siguientes viajes?"
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
          {/* <Button text="Revisar compra" onClick={() => setOpenModal(false)}/>
          <Button text="Confirmar compra" onClick={finish}/>
          <Button text="Cancelar compra" onClick={() => setOpenModal(false)} /> */}
        </Box>
      </Modal>
    </>
  );
});
