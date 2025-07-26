import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { Collapse, List, Chip, Heading, GridList, Card, Paragraph, showToast, Loader, Icon, Form, Modal, Tooltip, Range, SearchBar, Menu, Filter } from "../../components";
import { Pagination } from "../../components/Pagination/Pagination.component";
import { Country, Place, Trip, PaginatedResponse } from "../../models";
import { CountryService, PlaceService, TripService } from "../../services";
import { IconButton } from "../../components/IconButton/IconButton.component";

export const TripEmpty: Trip = { id: -1, name: "", description: null, img: null, price: 0, startDate: "", endDate: "", places: [] };

interface TripProps {}

export const Trips: React.FC<TripProps> = () => {
  const [tripsData, setTripsData] = useState<PaginatedResponse<Trip>>({
    page: 1,
    items: [],
    count: 0,
    totalItems: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [countries, setCountries] = useState<Country[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingPlaces, setLoadingPlaces] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedPlaces, setSelectedPlaces] = useState<{ name: string; placeId: number }[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [trip, setTrip] = useState<Trip>(TripEmpty);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);
  const [openModalDetail, setOpenDetail] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

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

  const handlerCountry = async (country: string) => {
    let selected = countries.find((c) => c.name === country);
    if (selected) {
      let params = new URLSearchParams();
      params.append("countryId", selected.id.toString());
      await getPlaces(params.toString());
    }
  };

  const getPlaces = async (params?: string) => {
    setLoadingPlaces(true);
    try {
      let places = await PlaceService.getPlaces(params);
      setPlaces(places);
    } catch (error) {
      showToast({ message: "Error al cargar los lugares", type: "error" });
    } finally {
      setLoadingPlaces(false);
    }
  };

  const handlerSelect = (value: string) => {
    if (selectedPlaces.find((p) => p.name === value)) {
      return;
    }
    const place = places.find((p) => p.name === value);
    if (place) {
      setSelectedPlaces([...selectedPlaces, { name: value, placeId: place.id }]);
    }
  };

  const handlerDelete = (value: string) => {
    const newItems = selectedPlaces.filter((place) => place.name !== value);
    setSelectedPlaces(newItems);
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
      showToast({ message: "Error al cargar los paises disponibles", type: "error" });
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    fetchTrips(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const createTrip = async (value: any) => {
    let placesId = selectedPlaces.map((p) => p.placeId);

    if (dates[0] === "" || dates[1] === "") {
      showToast({ message: "Se debe elegir un rango de fechas del viaje", type: "info" });
      return;
    }

    if (placesId.length === 0) {
      showToast({ message: "Se debe elegir al menos un lugar", type: "info" });
      return;
    }

    try {
      await TripService.createTrip({ name: value.name, description: value.description, price: value.price, startDate: dates[0], endDate: dates[1], placesId });
      showToast({ message: "Viaje agregado exitosamente", type: "success" });
      fetchTrips(currentPage, pageSize);
    } catch (error) {
      showToast({ message: "Error al agregar un nuevo viaje", type: "error" });
    } finally {
      setOpenModal(false);
      setSelectedPlaces([]);
      setDates([]);
    }
  };

  const updateTrip = async (value: any) => {
    let placesId = selectedPlaces.map((p) => p.placeId);

    if (dates[0] === "" || dates[1] === "") {
      showToast({ message: "Se debe elegir un rango de fechas del viaje", type: "info" });
      return;
    }

    if (placesId.length === 0) {
      showToast({ message: "Se debe elegir al menos un lugar", type: "info" });
      return;
    }

    try {
      await TripService.updateTrip(trip.id, { name: value.name, description: value.description, price: value.price, startDate: dates[0], endDate: dates[1], placesId });
      showToast({ message: "Viaje actualizado exitosamente", type: "success" });
      fetchTrips(currentPage, pageSize);
    } catch (error) {
      showToast({ message: "Error al actualizar el viaje", type: "error" });
    } finally {
      setOpenModal(false);
      setSelectedPlaces([]);
      setDates([]);
    }
  };

  const deleteTrip = async (tripId: number) => {
    try {
      await TripService.deleteTrip(tripId);
      fetchTrips(currentPage, pageSize);
      showToast({ message: "Viaje eliminado exitosamente", type: "success" });
    } catch (error) {
      showToast({ message: "Error al eliminar el viaje", type: "error" });
    } finally {
      setOpenDetail(false);
    }
  };

  const renderForm = () => {
    return (
      <Form
        inputs={[
          {
            label: "Nombre",
            type: "text",
            initialValue: { name: trip.name || "" },
          },
          {
            label: "Descripción",
            type: "text",
            initialValue: { description: trip.description || "" },
            multiline: true,
            required: false,
          },
          {
            label: "Precio",
            type: "number",
            initialValue: { price: trip.price || "" },
            max: 9999999,
          },
        ]}
        children={
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
            <Box sx={{ display: "flex", columnGap: 2, alignItems: "center" }}>
              <Range format="YYYY-MM-DD" onChange={(dateStrings) => setDates(dateStrings)} initialDate={dates.length === 2 ? dates : undefined} />
              <Paragraph text={"Rango de fechas"} />
            </Box>
            <Box sx={{ display: "flex", columnGap: 2 }}>
              <SearchBar items={countries.map((c) => ({ value: c.name }))} placeholder="Pais" onSelect={(value) => handlerCountry(value)} />
              {loadingPlaces ? <Loader /> : <SearchBar items={places.map((p) => ({ value: p.name }))} placeholder="Lugares" onSelect={(value) => handlerSelect(value)} />}
            </Box>
            <Box>
              <Paragraph text={"Lugares: "} />
              <Box display={"flex"} flexDirection={"row"} columnGap={1} sx={{ mt: 1 }}>
                {selectedPlaces.map((place) => (
                  <Chip key={place.placeId} label={place.name} onDelete={() => handlerDelete(place.name)} color="default" />
                ))}
              </Box>
            </Box>
          </Box>
        }
        submitText="Guardar"
        onAction={trip.id === -1 ? createTrip : updateTrip}
      />
    );
  };

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

  const resetTrip = () => {
    setTrip(TripEmpty);
  };

  const searchByName = async (name: string) => {
    const query = name ? `name=${encodeURIComponent(name)}` : "";
    fetchTrips(1, pageSize, query);
    setCurrentPage(1);
  };

  const handlerClose = async () => {
    fetchTrips(currentPage, pageSize);
  };

  const renderDetail = () => {
    return (
      <>
        {isLoadingDetail ? (
          <Loader />
        ) : (
          <Card title={trip.name} description={trip.description ? trip.description : "Sin descripción"} other={trip.startDate + " al " + trip.endDate}>
            <Paragraph text={"Precio USD " + trip.price} />
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Paragraph text={"Lugares"} sx={{ fontWeight: "bold" }} />
                <IconButton icon={<Icon type="EXPAND-MORE" />} onClick={() => setExpanded(!expanded)} />
              </Box>
              <Menu
                icon={<Icon type="MORE-VERT" />}
                items={[
                  {
                    id: 1,
                    name: "Editar",
                    onClick: () => {
                      setTrip(trip);
                      setOpenModal(true);
                      setOpenDetail(false);
                      setSelectedPlaces(trip.places.map((p) => ({ name: p.name, placeId: p.id })));
                      setDates([trip.startDate, trip.endDate]);
                    },
                  },
                  {
                    id: 2,
                    name: "Eliminar",
                    onClick: () => showToast({ message: "Eliminar viaje", type: "confirmation", duration: 50000, confirmOptions: { description: "Desea eliminar el viaje ?", confirm: { onClick: () => deleteTrip(trip.id), title: "Eliminar" } } }),
                  },
                ]}
              />
            </Box>
            <Collapse expanded={expanded}>
              <List items={trip.places.map((p: any) => ({ id: 1, primaryText: p.name, secondaryText: p.country.name, value: p }))} />
            </Collapse>
          </Card>
        )}
      </>
    );
  };

  const applyFilter = (params: string) => {
    fetchTrips(1, pageSize, params);
    setCurrentPage(1);
  };

  return (
    <>
      <Heading title="Viajes disponibles" />
      <Filter
        type="trip"
        filter
        searchByName={searchByName}
        apply={applyFilter}
        places={places.map((p) => ({ value: p.name, other: p }))}
        countries={countries.map((c) => ({ value: c.name, other: c }))}
        selectCountry={handlerCountry}
        onCloseModalFilter={() => setPlaces([])}
        onCloseSearch={handlerClose}
      />
      <Box sx={{ display: "flex", alignItems: "center", pb: 2 }}>
        <Tooltip text="Agregar viaje" position="right">
          <Box>
            <IconButton
              onClick={() => {
                resetTrip();
                setOpenModal(true);
              }}
              icon={<Icon type="PLUS" />}
              buttonStyle={{ bgcolor: "primary.main", color: "white", ":hover": { bgcolor: "primary.main", color: "white" } }}
            />
          </Box>
        </Tooltip>
      </Box>
      {isLoading ? (
        <Loader />
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
                      setOpenDetail(true);
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
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedPlaces([]);
          setPlaces([]);
          setDates([]);
        }}
        title="Viaje">
        {renderForm()}
      </Modal>
      <Modal
        title={trip.name}
        open={openModalDetail}
        onClose={() => {
          setOpenDetail(false);
          setExpanded(false);
        }}
        fullWidth>
        {renderDetail()}
      </Modal>
    </>
  );
};
