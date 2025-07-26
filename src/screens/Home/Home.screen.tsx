import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Card, GridList, Loader, Paragraph, showToast, Modal, List, Collapse, Icon, IconButton, Banner, Filter } from "../../components/index";
import { Pagination } from "../../components/Pagination/Pagination.component";
import { Trip } from "../../models/Trip.model";
import { CountryService, PlaceService, TripService } from "../../services";
import { Country, Place, PaginatedResponse } from "../../models";

interface HomeProps {}

export const HomeScreen: React.FC<HomeProps> = (props: HomeProps) => {
  const [tripsData, setTripsData] = useState<PaginatedResponse<Trip>>({
    page: 1,
    items: [],
    count: 0,
    totalItems: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [trip, setTrip] = useState<Trip>({ id: 0, name: "", description: null, img: null, price: 0, startDate: "", endDate: "", places: [] });
  const [open, setOpen] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  let navigate = useNavigate();

  const fetchTrips = async (page: number = 1, limit: number = 10, query?: string) => {
    setIsLoading(true);
    try {
      const response = await TripService.getTripsPaginated(page, limit, query);
      setTripsData(response);
    } catch (error) {
      showToast({ message: "Error al cargar los viajes disponibles", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
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
    getCountries();
  }, []);

  useEffect(() => {
    fetchTrips(currentPage, pageSize);
  }, [currentPage, pageSize]);

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
    const query = name ? `name=${encodeURIComponent(name)}` : "";
    fetchTrips(1, pageSize, query);
    setCurrentPage(1);
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
    fetchTrips(1, pageSize, params);
    setCurrentPage(1);
  };

  const handlerClose = async () => {
    fetchTrips(currentPage, pageSize);
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
          {tripsData.items.length > 0 ? (
            <>
              <GridList
                direction="row"
                items={tripsData.items}
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
              <Pagination
                data={tripsData}
                onPageChange={handlePageChange}
                loading={isLoading}
                showSizeChanger={true}
                showQuickJumper={true}
                showTotal={true}
              />
            </>
          ) : (
            <Paragraph text="No se encontraron viajes" variant="h5" align="center" />
          )}
        </>
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
