import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";

import { Heading, Paragraph, Wrapper, Button, Modal, Divider } from "../../components";
import { Trip, Hotel, Place } from "../../models";
import { HotelService } from "../../services";

interface PropsPurchase {}

interface CustomizedState {
  trip: Trip;
}

export const PurchaseScreen: React.FC<PropsPurchase> = () => {
  let location = useLocation();
  const { trip } = location.state as CustomizedState;

  return (
    <>
      <Heading title={trip.name} />
      <Wrapper sx={{ my: 2, p: 2 }}>
        <Paragraph text={"Seleccione hoteles para los lugares a visitar"} />
        {trip.places.map((p) => (
          <HotelSelector place={p} />
        ))}
      </Wrapper>
    </>
  );
};

interface PropsHotelSelector {
  place: Place;
}

const HotelSelector: React.FC<PropsHotelSelector> = ({ place }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]); //Hoteles se recuperan en base al lugar (placeId)
  const [selected, setSelected] = useState<Hotel | null>(null)
  const [open, setOpen] = useState<boolean>(false);

  const getHotels = async () =>  {
    try {
      await HotelService.getHotels()
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getHotels();
  }, [])

  return (
    <>
      <Box sx={{ py: 2 }}>
        <Box sx={{ display: "flex", columnGap: 1 }}>
          <Paragraph text={"Lugar: "} fontWeight={"bold"} />
          <Paragraph text={place.name} />
        </Box>
        <Box sx={{ display: "flex", columnGap: 1 }}>
          <Paragraph text={"Hotel: "} fontWeight={"bold"} />
          {(selected) ? <Paragraph text={"Un hotel"} /> : <Paragraph text={"Seleccione un hotel"} sx={{ fontStyle: "italic" }} color="warning.main" />}
        </Box>
        <Box sx={{ pt: 1 }}>
          <Button title="ver hoteles" onClick={() => setOpen(true)} size="small" color="inherit" />
        </Box>
      </Box>
      <Divider />
      <Modal title="Hoteles" open={open} onClose={() => setOpen(false)} fullWidth>
        <Paragraph text={"hoteles aca"}/>
      </Modal>
    </>
  );
};
