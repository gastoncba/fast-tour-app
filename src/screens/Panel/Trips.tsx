import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { Collapse, List, Chip, Heading, GridList, Card, Paragraph, showToast, Loader, Icon, Form, Modal, Tooltip, Range, SearchBar, Menu, Filter } from "../../components";
import { Country, Place, Trip } from "../../models";
import { CountryService, PlaceService, TripService } from "../../services";
import { IconButton } from "../../components/IconButton/IconButton.component";

interface TripProps {}

export const Trips: React.FC<TripProps> = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingPlaces, setLoadingPlaces] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedPlaces, setSelectedPlaces] = useState<{ name: string; placeId: number }[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [trip, setTrip] = useState<Trip>({ id: -1, name: "", description: null, img: null, price: 0, startDate: "", endDate: "", places: [] });
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);
  const [openModalDetail, setOpenDetail] = useState<boolean>(false);

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
      showToast("error", "Error al cargar los lugares");
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

  const getTrips = async (params?: string) => {
    setIsLoading(true);
    try {
      let trips = await TripService.getTrips(params);
      setTrips(trips);
    } catch {
      showToast("error", "Error al cargar los viajes disponibles");
    } finally {
      setIsLoading(false);
    }
  };

  const getCountries = async () => {
    try {
      let ct = await CountryService.getCountries();
      setCountries(ct);
    } catch (error) {
      showToast("error", "Error al cargar los paises disponibles");
    }
  };

  useEffect(() => {
    getTrips();
    getCountries();
  }, []);

  const createTrip = async (value: any) => {
    try {
      let placesId = selectedPlaces.map((p) => p.placeId);
      await TripService.createTrip({ name: value.name, description: value.description, price: value.price, startDate: dates[0], endDate: dates[1], placesId });
      showToast("success", "Viaje agregado exitosamente");
      getTrips();
    } catch (error) {
      showToast("error", "Error al agregar un nuevo viaje");
    } finally {
      setOpenModal(false);
      setSelectedPlaces([]);
      setDates([]);
    }
  };

  const updateTrip = async (value: any) => {
    try {
      let placesId = selectedPlaces.map((p) => p.placeId);
      await TripService.updateTrip(trip.id, { name: value.name, description: value.description, price: value.price, startDate: dates[0], endDate: dates[1], placesId });
      showToast("success", "Viaje actualizado exitosamente");
      getTrips();
    } catch (error) {
      showToast("error", "Error al actualizar el viaje");
    } finally {
      setOpenModal(false);
      setSelectedPlaces([]);
      setDates([]);
    }
  };

  const deleteTrip = async (tripId: number) => {
    try {
      await TripService.deleteTrip(tripId);
      await getTrips();
      showToast("success", "Viaje eliminado exitosamente");
    } catch (error) {
      showToast("error", "Error al eliminar el viaje");
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
            notRequired: true,
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
      showToast("error", "Error al cargar la información del viaje");
    }
  };

  const resetTrip = () => {
    setTrip({ id: -1, name: "", description: null, img: null, price: 0, startDate: "", endDate: "", places: [] });
  };

  const searchByName = (name: string) => {
    const params = name ? `name=${encodeURIComponent(name)}` : "";
    getTrips(params);
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
                    onClick: () => showToast("confirmation", "Eliminar viaje", { onConfirm: () => deleteTrip(trip.id), description: "Desea eliminar el viaje ?" }),
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
    getTrips(params);
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
        onCloseFilter={() => setPlaces([])}
        onCloseSearch={async () => await getTrips()}
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
                    setOpenDetail(true);
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
