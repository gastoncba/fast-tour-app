import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Card, GridList, Loader, Paragraph, showToast, Modal, List, Collapse, Icon, IconButton, Banner, Filter, Pagination } from "../../components/index";
import { Trip } from "../../models/Trip.model";
import { CountryService, PlaceService, TripService } from "../../services";
import { Country, Place } from "../../models";
import { PAGINATION } from "../../settings/const.setting";

interface HomeProps {}

export const HomeScreen: React.FC<HomeProps> = (props: HomeProps) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [trip, setTrip] = useState<Trip>({ id: 0, name: "", description: null, img: null, price: 0, startDate: "", endDate: "", places: [] });
  const [open, setOpen] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showPagination, setShowPagination] = useState<boolean>(false);

  let navigate = useNavigate();

  const fetchTotalTrips = async () => {
    try {
      const trips = await TripService.getTrips();
      const total = trips.length;
      setTotalPages(Math.ceil(total / PAGINATION));
    } catch (error) {
      console.error("Error al obtener el total de viajes", error);
    }
  };

  const getTrips = async (params?: string) => {
    setIsLoading(true);
    setShowPagination(!params);
    try {
      const skip = (page - 1) * PAGINATION;
      let trips = await TripService.getTrips(params ? params : `take=${PAGINATION}&skip=${skip}`);
      setTrips(trips);
    } catch {
      showToast({ message: "Error al cargar los viajes disponibles", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const getCountries = async () => {
    try {
      let ct = await CountryService.getCountries();
      setCountries(ct);
    } catch (error) {
      console.log("error => ", error);
    }
  };

  useEffect(() => {
    fetchTotalTrips();
    getCountries();
  }, []);

  useEffect(() => {
    getTrips();
  }, [page]);

  const getTrip = async (tripId: number) => {
    setIsLoadingDetail(true);
    try {
      let trip = await TripService.getTrip(tripId);
      setTrip(trip);
      setIsLoadingDetail(false);
    } catch (error) {
      showToast({ message: "Error al cargar la información del viaje", type: "error" });
    }
  };

  const searchByName = async (name: string) => {
    const params = name ? `name=${encodeURIComponent(name)}` : "";
    if (!params) await fetchTotalTrips();
    getTrips(params);
  };

  const getPlaces = async (params?: string) => {
    try {
      let places = await PlaceService.getPlaces(params);
      setPlaces(places);
    } catch (error) {
      showToast({ message: "Error al cargar los lugares", type: "error" });
    }
  };

  const handlerCountry = async (country: string) => {
    let selected = countries.find((c) => c.name === country);
    if (selected) {
      let params = new URLSearchParams();
      params.append("countryId", selected.id.toString());
      await getPlaces(params.toString());
    }
  };

  const applyFilter = (params: string) => {
    getTrips(params);
  };

  const handlerClose = async () => {
    await fetchTotalTrips();
    await getTrips();
  };

  return (
    <>
      <Banner title="Fast Tour" subtitle="Encuentra las mejores experiencias alrededor del globo." height={"auto"} imageUrl="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg" />
      <Filter
        apply={applyFilter}
        filter
        type="trip"
        searchByName={searchByName}
        places={places.map((p) => ({ value: p.name, other: p }))}
        countries={countries.map((c) => ({ value: c.name, other: c }))}
        selectCountry={handlerCountry}
        onCloseModalFilter={() => setPlaces([])}
        onCloseSearch={handlerClose}
        clearResult={handlerClose}
      />
      {isLoading ? (
        <Loader sx={{ py: 6 }} />
      ) : (
        <>
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
      {showPagination && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination page={page} count={totalPages} changePage={(value) => setPage(value)} showFirstButton showLastButton color="primary" />
        </Box>
      )}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setExpanded(false);
        }}
        title={modalTitle}
        fullWidth>
        <>
          {isLoadingDetail ? (
            <Loader />
          ) : (
            <Card
              title={trip.name}
              description={trip.description ? trip.description : "Sin descripción"}
              other={trip.startDate + " al " + trip.endDate}
              onAction={{ onClick: () => navigate("/app/purchase", { state: { trip, summary: false } }), title: "comprar" }}>
              <Paragraph text={"Precio USD " + trip.price} />
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Paragraph text={"Lugares a visitar"} sx={{ fontWeight: "bold" }} />
                <IconButton icon={<Icon type="EXPAND-MORE" />} onClick={() => setExpanded(!expanded)} />
              </Box>
              <Collapse expanded={expanded}>
                <List items={trip.places.map((p) => ({ id: p.id, primaryText: p.name, secondaryText: p.country.name, value: p }))} />
              </Collapse>
            </Card>
          )}
        </>
      </Modal>
    </>
  );
};
