import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Grid } from "@mui/material";

import { Heading, Paragraph, Wrapper, Button, Modal, Divider, showToast, Loader, GridList, Card, Rate, IconButton, Icon, Form, Counter } from "../../components";
import { Trip, Hotel, Place, PlaceVisited } from "../../models";
import { HotelService, OrderServices } from "../../services";
import { userProvider } from "../../providers";
import { ConversionUtils } from "../../utils";

interface PropsPurchase {}

interface CustomizedState {
  trip: Trip;
  summary: boolean;
  visited: PlaceVisited[] | undefined;
}

export const PurchaseScreen: React.FC<PropsPurchase> = () => {
  let location = useLocation();
  let navigate = useNavigate();

  const { trip, summary, visited } = location.state as CustomizedState;
  const [placesVisited, setPlacesVisited] = useState<PlaceVisited[]>(visited ? visited : trip.places.map((p) => ({ place: p, hotel: null })));
  const [showSummary, setShowSummary] = useState<boolean>(summary);
  const [contact, setContact] = useState<{ firstName: string; lastName: string; email: string }>(
    userProvider.user.isLogged ? { firstName: userProvider.user.firstName, lastName: userProvider.user.lastName, email: userProvider.user.email } : { firstName: "", lastName: "", email: "" }
  );
  const [numberPeople, setNumberPeople] = useState<number>(1);
  const total = userProvider.user.isLogged ? trip.price - trip.price * 0.2 : trip.price;
  const discount = trip.price - trip.price * 0.2;

  const addPlaceVisited = (hotel: Hotel, place: Place) => {
    const index = placesVisited.findIndex((item) => item.place === place);
    if (index !== -1) {
      const updatedPlaceVisited = [...placesVisited];
      updatedPlaceVisited[index] = { place, hotel };
      setPlacesVisited(updatedPlaceVisited);
    }
  };

  const removePlaceVisited = (hotel: Hotel, place: Place) => {
    const index = placesVisited.findIndex((item) => item.hotel?.id === hotel.id);

    if (index !== -1) {
      const updatedPlaceVisited = [...placesVisited];
      updatedPlaceVisited[index] = { place, hotel: null };
      setPlacesVisited(updatedPlaceVisited);
    }
  };

  const send = async (value: any) => {
    setContact(value);
  };

  const buy = async () => {
    try {
      const order = {
        tripId: trip.id,
        userId: userProvider.user.isLogged ? userProvider.user.id : undefined,
        placesVisited: placesVisited.map((pv) => ({ hotelId: pv.hotel ? pv.hotel.id : -1, placeId: pv.place.id })),
        firstName: !userProvider.user.isLogged ? contact.firstName : undefined,
        lastName: !userProvider.user.isLogged ? contact.lastName : undefined,
        email: !userProvider.user.isLogged ? contact.email : undefined,
        purchaseDate: ConversionUtils.getCurrentDate(),
        numberPeople,
        total,
      };
      console.log(order);
      await OrderServices.createOrder(order);
      showToast({ message: "Su orden fue registrada correctamente", type: "success" });
    } catch (error) {
      showToast({ message: "Error al intentar registrar su orden", type: "error" });
      console.log(error);
    }
  };

  return (
    <>
      <Heading title={"Compra de viaje"} />
      <Wrapper sx={{ my: 2, p: 2 }}>
        {showSummary ? (
          <Grid container>
            <Grid item lg={6}>
              <Box sx={{ px: 4, py: 2 }}>
                <Paragraph text={trip.name} variant="h5" sx={{ pb: 1 }} />
                <Box sx={{ display: "flex", columnGap: 1 }}>
                  <Paragraph text={"Descripción:"} fontWeight={"bold"} sx={{ fontStyle: "italic" }} />
                  <Paragraph text={trip.description || "Sin Descripción"} />
                </Box>
                <Paragraph text={"Desde el " + trip.startDate + " hasta el " + trip.endDate} />
                <Box sx={{ display: "flex", columnGap: 1 }}>
                  <Paragraph text={"Precio: "} fontWeight={"bold"} sx={{ fontStyle: "italic" }} />
                  <Paragraph text={"USD " + trip.price} />
                </Box>
                <Box sx={{ display: "flex", columnGap: 1 }}>
                  <Paragraph text={"Cantidad de personas: "} fontWeight={"bold"} sx={{ fontStyle: "italic" }} />
                  <Paragraph text={numberPeople} />
                </Box>
                <Paragraph text={"hoteles elegidos: "} fontWeight={"bold"} sx={{ fontStyle: "italic", py: 1 }} />
                {placesVisited.map((pv) => (
                  <HotelSelector key={pv.place.id} place={pv.place} hotel={pv.hotel} addHotel={() => {}} removeHotel={() => {}} readonly />
                ))}
              </Box>
            </Grid>
            <Grid item lg={6}>
              <Paragraph text={"Datos de contacto"} variant="h5" sx={{ py: 2 }} />
              {userProvider.user.isLogged || contact.firstName !== "" ? (
                <Box>
                  <Box sx={{ display: "flex", columnGap: 1 }}>
                    <Box sx={{ display: "flex", columnGap: 1 }}>
                      <Paragraph text={"Nombre:"} fontWeight={"bold"} sx={{ fontStyle: "italic" }} />
                      <Paragraph text={userProvider.user.firstName || contact.firstName} />
                    </Box>
                    <Box sx={{ display: "flex", columnGap: 1 }}>
                      <Paragraph text={"Apellido:"} fontWeight={"bold"} sx={{ fontStyle: "italic" }} />
                      <Paragraph text={userProvider.user.lastName || contact.lastName} />
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", columnGap: 1 }}>
                    <Paragraph text={"Email:"} fontWeight={"bold"} sx={{ fontStyle: "italic" }} />
                    <Paragraph text={userProvider.user.email || contact.email} />
                  </Box>
                  {!userProvider.user.isLogged && (
                    <Box sx={{ py: 2 }}>
                      <Button title="Borrar datos" color="inherit" onClick={() => setContact({ firstName: "", lastName: "", email: "" })} />
                    </Box>
                  )}
                </Box>
              ) : (
                <>
                  <Form
                    inputs={[
                      {
                        label: "Nombre",
                        type: "text",
                        initialValue: { firstName: "" },
                      },
                      {
                        label: "Apellido",
                        type: "text",
                        initialValue: { lastName: "" },
                      },
                      {
                        label: "Email",
                        type: "email",
                        initialValue: { email: "" },
                      },
                    ]}
                    colorButton="inherit"
                    onAction={send}
                  />
                  <Box sx={{ py: 1 }}>
                    <Button variant="text" title="Tengo cuenta!" onClick={() => navigate("/app/auth", { state: { type: "login", redirect: "/app/purchase", content: { trip, summary: true, visited: placesVisited } } })} />
                    <Button variant="text" title="Registrame" onClick={() => navigate("/app/auth", { state: { type: "signup", redirect: "/app/purchase", content: { trip, summary: true, visited: placesVisited } } })} />
                  </Box>
                </>
              )}
              <Box sx={{ py: 1 }}>
                {!userProvider.user.isLogged ? (
                  <Paragraph text={"Total a pagar : USD " + total} variant="h5" />
                ) : (
                  <Box>
                    <Paragraph text={"Total sin descuento : USD " + trip.price} color="primary" fontWeight={"bold"} />
                    <Paragraph text={"20% de descuento : USD " + discount} color="primary" fontWeight={"bold"} />
                    <Divider sx={{ pt: 1 }} />
                    <Paragraph text={"Total a pagar : USD " + total} variant="h5" sx={{ py: 2 }} />
                  </Box>
                )}
              </Box>
              {!userProvider.user.isLogged && <Paragraph text={"Si tenes cuenta recibis un 20% de descuento"} color="success.main" sx={{ fontStyle: "italic" }} fontWeight={"bold"} />}
            </Grid>
          </Grid>
        ) : (
          <>
            <Paragraph text={"Seleccione hoteles para los lugares a visitar"} />
            {placesVisited.map((pv) => (
              <HotelSelector place={pv.place} hotel={pv.hotel} addHotel={(hotel) => addPlaceVisited(hotel, pv.place)} removeHotel={(hotel) => removePlaceVisited(hotel, pv.place)} key={pv.place.id} />
            ))}
            <Box sx={{ display: "flex", flexDirection: "row", columnGap: 1, alignItems: "center", pt: 2 }}>
              <Paragraph text={`Cantidad de días para reclamar el premio`} />
              <Counter onChange={(number) => setNumberPeople(number)} initialValue={numberPeople} />
            </Box>
          </>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          <Button title={showSummary ? "Atras" : "Continuar"} onClick={() => setShowSummary(!showSummary)} style={{ mt: 2 }} disabled={placesVisited.some((pv) => !pv.hotel)} />
          {showSummary && (
            <Button
              title="Confirmar"
              onClick={() => showToast({ message: "Comprar viaje", type: "confirmation", confirmOptions: { description: "Desea comprar este viaje?", confirm: { onClick: () => buy() } } })}
              style={{ mt: 2 }}
              disabled={contact.firstName === ""}
            />
          )}
        </Box>
      </Wrapper>
    </>
  );
};

interface PropsHotelSelector {
  place: Place;
  hotel: Hotel | null;
  addHotel: (hotel: Hotel) => void;
  removeHotel: (hotel: Hotel) => void;
  readonly?: boolean;
}

const HotelSelector: React.FC<PropsHotelSelector> = ({ place, hotel, addHotel, removeHotel, readonly = false }) => {
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
      showToast({ message: "Error al cargar los hoteles de " + place.name, type: "error" });
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
                  {!readonly && (
                    <IconButton
                      icon={<Icon type="CLOSE" sx={{ fontSize: "20px" }} />}
                      size="small"
                      onClick={() => {
                        setSelected(null);
                        removeHotel(selected);
                      }}
                    />
                  )}
                </Box>
                {!readonly && <Paragraph text={selected.description || "Sin descripción"} color="GrayText" sx={{ fontStyle: "italic" }} />}
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
        {!readonly && (
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
        )}
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
              xl={12}
              items={hotels}
              renderItem={(item: Hotel) => (
                <Card
                  title={item.name}
                  description={item.description || "Sin descripción"}
                  onClickArea={() => {
                    setSelected(item);
                    addHotel(item);
                    showToast({ message: "Hotel " + item.name + " seleccionado", type: "success" });
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
