import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid } from "@mui/material";

import { Heading, Paragraph, Wrapper, Button, Modal, Divider, showToast, Loader, GridList, Card, Rate, IconButton, Icon, Form } from "../../components";
import { Trip, Hotel, Place } from "../../models";
import { HotelService } from "../../services";

interface PropsPurchase {}

interface CustomizedState {
  trip: Trip;
}

export const PurchaseScreen: React.FC<PropsPurchase> = () => {
  let location = useLocation();
  const { trip } = location.state as CustomizedState;
  const [placeVisited, setPlaceVisited] = useState<{ place: Place; hotel: Hotel | null }[]>(trip.places.map((p) => ({ place: p, hotel: null })));
  const [showForm, setShowForm] = useState<boolean>(false);

  const addPlaceVisited = (hotel: Hotel, place: Place) => {
    const index = placeVisited.findIndex((item) => item.place === place);
    if (index !== -1) {
      const updatedPlaceVisited = [...placeVisited];
      updatedPlaceVisited[index] = { place, hotel };
      setPlaceVisited(updatedPlaceVisited);
    }
  };

  const removePlaceVisited = (hotel: Hotel, place: Place) => {
    const index = placeVisited.findIndex((item) => item.hotel?.id === hotel.id);

    if (index !== -1) {
      const updatedPlaceVisited = [...placeVisited];
      updatedPlaceVisited[index] = { place, hotel: null };
      setPlaceVisited(updatedPlaceVisited);
    }
  };

  const send = async () => {};

  return (
    <>
      <Heading title={trip.name} />
      <Wrapper sx={{ my: 2, p: 2 }}>
        {showForm ? (
          <Grid container>
            <Grid item lg={6}>
              <Form
                title="Datos de contacto"
                inputs={[
                  {
                    label: "Nombre",
                    type: "text",
                    initialValue: { name: "" },
                  },
                  {
                    label: "Apellido",
                    type: "text",
                    initialValue: { lastName: "" },
                  },
                  {
                    label: "Email",
                    type: "email",
                    initialValue: { email: "" }
                  },
                  {
                    label: "Cantidad de personas",
                    type: "number",
                    initialValue: { cantPeople: 1 }
                  }
                ]}
                onAction={send}
              />
            </Grid>
          </Grid>
        ) : (
          <>
            <Paragraph text={"Seleccione hoteles para los lugares a visitar"} />
            {placeVisited.map((pv) => (
              <HotelSelector place={pv.place} hotel={pv.hotel} addHotel={(hotel) => addPlaceVisited(hotel, pv.place)} removeHotel={(hotel) => removePlaceVisited(hotel, pv.place)} key={pv.place.id} />
            ))}
          </>
        )}
        <Button title={showForm ? "Atras" : "Continuar"} onClick={() => setShowForm(!showForm)} style={{ mt: 2 }} disabled={placeVisited.some((pv) => !pv.hotel)} />
      </Wrapper>
    </>
  );
};

interface PropsHotelSelector {
  place: Place;
  hotel: Hotel | null;
  addHotel: (hotel: Hotel) => void;
  removeHotel: (hotel: Hotel) => void;
}

const HotelSelector: React.FC<PropsHotelSelector> = ({ place, hotel, addHotel, removeHotel }) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selected, setSelected] = useState<Hotel | null>(hotel);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getHotels = async () => {
    setLoading(true);
    const params = "placeId=" + encodeURIComponent(place.id);
    try {
      let hotels = await HotelService.getHotels(params);
      setHotels(hotels);
    } catch (error) {
      showToast("error", "Error al cargar los hoteles de " + place.name);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{ py: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
          <Box sx={{ display: "flex", columnGap: 1 }}>
            <Paragraph text={"Lugar: "} fontWeight={"bold"} />
            <Paragraph text={place.name} />
          </Box>
          <Box sx={{ display: "flex", columnGap: 1, alignItems: "baseline" }}>
            <Paragraph text={"Hotel: "} fontWeight={"bold"} />
            {selected ? (
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
                  <Paragraph text={selected.name} />
                  <IconButton
                    icon={<Icon type="CLOSE" sx={{ fontSize: "20px" }} />}
                    size="small"
                    onClick={() => {
                      setSelected(null);
                      removeHotel(selected);
                    }}
                  />
                </Box>
                <Paragraph text={selected.description || "Sin descripción"} color="GrayText" sx={{ fontStyle: "italic" }} />
                <Box>
                  <Paragraph text={"Estrellas: "} />
                  <Rate value={selected.stars} readonly />
                </Box>
              </Box>
            ) : (
              <Paragraph text={"Seleccione un hotel"} sx={{ fontStyle: "italic" }} color="warning.main" />
            )}
          </Box>
        </Box>
        <Box sx={{ pt: 2 }}>
          <Button
            title="ver hoteles"
            onClick={() => {
              setOpen(true);
              getHotels();
            }}
            size="small"
            color="inherit"
          />
        </Box>
      </Box>
      <Divider />
      <Modal title="Hoteles" open={open} onClose={() => setOpen(false)} fullWidth>
        <>
          {loading ? (
            <Loader />
          ) : hotels.length > 0 ? (
            <GridList
              sm={12}
              lg={12}
              items={hotels}
              renderItem={(item: Hotel) => (
                <Card
                  title={item.name}
                  description={item.description || "Sin descripción"}
                  onClickArea={() => {
                    setSelected(item);
                    addHotel(item);
                    showToast("success", "Hotel " + item.name + " seleccionado");
                  }}>
                  <Box sx={{ pt: 1 }}>
                    <Paragraph text={"Estrellas: "} />
                    <Rate value={item.stars} readonly />
                  </Box>
                </Card>
              )}
            />
          ) : (
            <Paragraph text={"No se encontraron hoteles para " + place.name} />
          )}
        </>
      </Modal>
    </>
  );
};
