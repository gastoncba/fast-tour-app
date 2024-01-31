import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { Heading, Divider, IconButton, Icon, Tooltip, showToast, Paragraph, GridList, Card, Loader, Rate, Form, Modal, SearchBar, Menu } from "../../components";
import { Country, Hotel, Place } from "../../models";
import { CountryService, HotelService, PlaceService } from "../../services";

interface HotelProps {}

export const Hotels: React.FC<HotelProps> = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [stars, setStars] = useState<number>(0);
  const [loadingPlaces, setLoadingPlaces] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<Place>({ id: -1, name: "", description: null, img: null, country: { id: -1, name: "", code: "", img: null }, hotels: [] });
  const [loadinDetail, setLoadingDetail] = useState<boolean>(false);
  const [hotel, setHotel] = useState<Hotel>({ id: -1, name: "", description: null, stars: 0 });
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const getHotels = async () => {
    setLoading(true);
    try {
      let hotels = await HotelService.getHotels();
      setHotels(hotels);
    } catch (error) {
      showToast("error", "Error al cargar los hoteles disponibles");
    } finally {
      setLoading(false);
    }
  };

  const getHotel = async (hotelId: number) => {
    setLoadingDetail(true);
    try {
      let hotel = await HotelService.getHotel(hotelId);
      setHotel(hotel);
    } catch (error) {
      showToast("error", "Error al cargar los datos del hotel");
    } finally {
      setLoadingDetail(false);
    }
  };

  const getPlaces = async (params?: string) => {
    setLoadingPlaces(true);
    try {
      let places = await PlaceService.getPlaces(params);
      setPlaces(places);
    } catch (error) {
      showToast("error", "Error al cargar los destinos");
    } finally {
      setLoadingPlaces(false);
    }
  };

  const createHotel = async () => {
    try {
    } catch (error) {}
  };

  const getCountries = async () => {
    try {
      let ct = await CountryService.getCountries();
      setCountries(ct);
    } catch (error) {
      showToast("error", "Error al cargar los viajes disponibles");
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

  const findPlace = (value: string) => {
    const place = places.find((p) => p.name === value);

    place ? setSelectedPlace(place) : resetSelectedPlace();
  };

  const resetSelectedPlace = () => {
    setSelectedPlace({ id: -1, name: "", description: null, img: null, country: { id: -1, name: "", code: "", img: null }, hotels: [] });
  };

  useEffect(() => {
    getHotels();
    getCountries();
  }, []);

  const renderForm = () => {
    return (
      <Form
        fields={[
          {
            label: "Nombre",
            type: "text",
            initialValue: { name: "" },
          },
          {
            label: "Descripción",
            type: "text",
            initialValue: { description: "" },
            multiline: true,
            notRequired: true,
          },
        ]}
        onAction={createHotel}>
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
          <Box>
            <Paragraph text={"Estrellas: "} />
            <Rate value={stars} onChange={(value) => setStars(value)} />
          </Box>
          <Box sx={{ display: "flex", columnGap: 2 }}>
            <SearchBar items={countries.map((c) => ({ value: c.name }))} placeholder="Pais" onSelect={(value) => handlerCountry(value)} />
            {loadingPlaces ? <Loader /> : <SearchBar items={places.map((p) => ({ value: p.name }))} placeholder="Lugares" onSelect={(value) => findPlace(value)} />}
          </Box>
          <Box sx={{ display: "flex", columnGap: 2 }}>
            <Paragraph text={"Ubicación: "} color="GrayText" />
            <Paragraph text={selectedPlace.name} />
          </Box>
        </Box>
      </Form>
    );
  };

  const renderDetail = () => {
    return (
      <>
        {loadinDetail ? (
          <Loader />
        ) : (
          <Card title={hotel.name} description={hotel.description || "Sin descripción"}>
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1, py: 1 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Paragraph text={"Ubicación: "} color="GrayText" />
                <Paragraph text={hotel.place?.name + ", " + hotel.place?.country.name} />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Paragraph text={"Estrellas: "} />
                  <Rate value={hotel.stars} readonly />
                </Box>
                <Menu
                  icon={<Icon type="MORE-VERT" />}
                  items={[
                    {
                      id: 1,
                      name: "Editar",
                    },
                    {
                      id: 2,
                      name: "Eliminar",
                    },
                  ]}
                />
              </Box>
            </Box>
          </Card>
        )}
      </>
    );
  };

  return (
    <>
      <Heading title="Hoteles disponibles" />
      <Box sx={{ py: 2 }}>
        <Divider />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", pb: 2 }}>
        <Tooltip text="Agregar hotel" position="right">
          <Box>
            <IconButton
              onClick={() => {
                resetSelectedPlace();
                setOpen(true);
              }}
              icon={<Icon type="PLUS" />}
              buttonStyle={{ bgcolor: "primary.main", color: "white", ":hover": { bgcolor: "primary.main", color: "white" } }}
            />
          </Box>
        </Tooltip>
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <>
          {hotels.length > 0 ? (
            <GridList
              direction="row"
              items={hotels}
              renderItem={(item: Hotel) => (
                <Card
                  title={item.name}
                  onClickArea={() => {
                    setOpenDetail(true);
                    getHotel(item.id);
                  }}>
                  <Paragraph text={"Estrellas"} color="GrayText" />
                  <Rate value={item.stars} readonly />
                </Card>
              )}
            />
          ) : (
            <Paragraph text="No se encontraron hoteles" variant="h5" align="center" />
          )}
        </>
      )}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          resetSelectedPlace();
        }}
        title="Hotel">
        {renderForm()}
      </Modal>
      <Modal title={hotel.name} open={openDetail} onClose={() => setOpenDetail(false)} fullWidth>
        {renderDetail()}
      </Modal>
    </>
  );
};
