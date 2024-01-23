import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { Card, GridList, Loader, Paragraph, showToast, Modal, List, Collapse, Icon, IconButton } from "../../components/index";
import { Trip } from "../../models/Trip.model";
import { TripService } from "../../services";

interface HomeProps {}

export const HomeScreen: React.FC<HomeProps> = (props: HomeProps) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [trip, setTrip] = useState<Trip>({ id: 0, name: "", description: null, img: null, price: 0, startDate: "", endDate: "", places: [] });
  const [open, setOpen] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  const getTrips = async () => {
    setIsLoading(true);
    try {
      let trips = await TripService.getTrips();
      setTrips(trips);
    } catch {
      showToast("error", "Error al cargar los viajes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTrips();
  }, []);

  const getTrip = async (tripId: number) => {
    setIsLoadingDetail(true);
    try {
      let trip = await TripService.getTrip(tripId);
      setTrip(trip);
      setIsLoadingDetail(false);
    } catch (error) {
      showToast("error", "Error al cargar la información del viaje");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader sx={{ py: 6 }} />
      ) : (
        <>
          <Paragraph text="Viajes disponibles" variant="h4" sx={{ py: 2 }} />
          {trips.length > 0 ? (
            <GridList
              direction="row"
              items={trips}
              renderItem={(item: Trip) => (
                <Card
                  title={item.name}
                  description={`Salida y Regreso: ${item.startDate} al ${item.endDate}`}
                  other={`Precio: USD ${item.price}`}
                  coverImage={item.img}
                  onClickArea={() => {
                    setModalTitle(item.name);
                    setOpen(true);
                    getTrip(item.id);
                  }}
                />
              )}
            />
          ) : (
            <Paragraph text="No se encontraron viajes" variant="h5" align="center" />
          )}
        </>
      )}
      <Modal open={open} onClose={() => setOpen(false)} title={modalTitle} fullWidth>
        <>
          {isLoadingDetail ? (
            <Loader />
          ) : (
            <Card title={trip.name} description={trip.description ? trip.description : "Sin descripción"} other={trip.startDate + " al " + trip.endDate} onAction={{ onClick: () => {}, title: "agregar" }}>
              <Paragraph text={"Precio USD " + trip.price} />
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Paragraph text={"Lugares"} sx={{ fontWeight: "bold" }} />
                <IconButton icon={<Icon type="EXPAND-MORE" />} onClick={() => setExpanded(!expanded)} />
              </Box>
              <Collapse expanded={expanded}>
                <List items={trip.places.map((p) => ({ id: 1, primaryText: p.name, secondaryText: p.country.name, value: p }))} />
              </Collapse>
            </Card>
          )}
        </>
      </Modal>
    </>
  );
};
