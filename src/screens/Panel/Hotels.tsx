import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { Heading, IconButton, Icon, Tooltip, showToast, Paragraph, GridList, Card, Loader, Rate, Form, Modal, SearchBar, Menu, Filter, Pagination } from "../../components";
import { Country, Hotel, Place } from "../../models";
import { CountryService, HotelService, PlaceService } from "../../services";
import { PAGINATION } from "../../settings/const.setting";

interface HotelProps {}

const PlaceEmpty: Place = { id: -1, name: "", description: null, img: null, country: { id: -1, name: "", code: "", img: null }, hotels: [] };
const HotelEmpty: Hotel = { id: -1, name: "", description: "", stars: 0 };

export const Hotels: React.FC<HotelProps> = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [stars, setStars] = useState<number>(3);
  const [loadingPlaces, setLoadingPlaces] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<Place>(PlaceEmpty);
  const [hotel, setHotel] = useState<Hotel>(HotelEmpty);
  const [loadinDetail, setLoadingDetail] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalHotels, setTotalHotels] = useState<number>(0);
  const [showPagination, setShowPagination] = useState<boolean>(false);

  const fetchTotalHotels = async () => {
    try {
      const hotels = await HotelService.getHotels();
      const total = hotels.length;
      setTotalPages(Math.ceil(total / PAGINATION));
      setTotalHotels(hotels.length);
    } catch (error) {
      console.error("Error al obtener el total de hoteles", error);
    }
  };

  const getHotels = async (params?: string) => {
    setLoading(true);
    setShowPagination(!params);
    try {
      const skip = (page - 1) * PAGINATION;
      let hotels = await HotelService.getHotels(params ? params : `take=${PAGINATION}&skip=${skip}`);
      setHotels(hotels);
    } catch (error) {
      showToast({ message: "Error al cargar los hoteles disponibles", type: "error" });
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
      showToast({ message: "Error al cargar los datos del hotel", type: "error" });
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
      showToast({ message: "Error al cargar los destinos", type: "error" });
    } finally {
      setLoadingPlaces(false);
    }
  };

  const createHotel = async (value: any) => {
    if (stars === 0) {
      showToast({ message: "El hotel debe tener al menos una estrella", type: "info" });
      return;
    }

    if (selectedPlace.id === -1) {
      showToast({ message: "Se debe elegir un lugar en donde se encuentra el hotel", type: "info" });
      return;
    }

    try {
      await HotelService.createHotel({ ...value, placeId: selectedPlace.id, stars });
      showToast({ message: "Hotel creado exitosamente", type: "success" });
      setTotalHotels((prev) => prev + 1);
      setTotalPages(Math.ceil((totalHotels + 1) / PAGINATION));
      getHotels();
    } catch (error) {
      showToast({ message: "Error al crear nuevo hotel", type: "error" });
    } finally {
      setOpen(false);
    }
  };

  const updateHotel = async (value: any) => {
    if (stars === 0) {
      showToast({ message: "El hotel debe tener al menos una estrella", type: "info" });
      return;
    }

    if (selectedPlace.id === -1) {
      showToast({ message: "Se debe elegir un lugar en donde se encuentra el hotel", type: "info" });
      return;
    }

    try {
      await HotelService.updateHotel(hotel.id, { ...value, placeId: selectedPlace.id, stars });
      showToast({ message: "Hotel actualizado exitosamente", type: "success" });
      getHotels();
    } catch (error) {
      showToast({ message: "Error al actualizar hotel", type: "error" });
    } finally {
      setOpen(false);
    }
  };

  const deleteHotel = async (hotelId: number) => {
    try {
      await HotelService.deleteHotel(hotelId);
      showToast({ message: "Hotel eliminado exitosamente", type: "success" });
      setTotalHotels((prev) => prev - 1);
      setTotalPages(Math.ceil((totalHotels - 1) / PAGINATION));
      getHotels();
    } catch (error) {
      showToast({ message: "Error al intentar eliminar hotel", type: "error" });
    } finally {
      setOpenDetail(false);
      setPage(1);
    }
  };

  const getCountries = async () => {
    try {
      let ct = await CountryService.getCountries();
      setCountries(ct);
    } catch (error) {
      showToast({ message: "Error al cargar los viajes disponibles", type: "error" });
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
    setSelectedPlace(PlaceEmpty);
  };

  useEffect(() => {
    getHotels();
  }, [page]);

  useEffect(() => {
    fetchTotalHotels();
    getCountries();
  }, []);

  const renderForm = () => {
    return (
      <Form
        inputs={[
          {
            label: "Nombre",
            type: "text",
            initialValue: { name: hotel.name || "" },
          },
          {
            label: "Descripción",
            type: "text",
            initialValue: { description: hotel.description || "" },
            multiline: true,
            required: false,
          },
        ]}
        onAction={hotel.id === -1 ? createHotel : updateHotel}>
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
          <Box>
            <Paragraph text={"Estrellas: "} />
            <Rate value={stars} onChange={(value) => setStars(value)} />
          </Box>
          <Box sx={{ display: "flex", columnGap: 2 }}>
            <SearchBar items={countries.map((c) => ({ value: c.name }))} placeholder="Pais" onSelect={(value) => handlerCountry(value)} />
            {loadingPlaces ? <Loader /> : <SearchBar items={places.map((p) => ({ value: p.name }))} placeholder="Lugares" onSelect={(value) => findPlace(value)} />}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
            <Paragraph text={"Ubicación: "} color="GrayText" />
            <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
              <Paragraph text={selectedPlace.name} />
              {selectedPlace.id !== -1 && <IconButton icon={<Icon type="CLOSE" sx={{ fontSize: "large" }} />} onClick={() => resetSelectedPlace()} />}
            </Box>
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
                      onClick: () => {
                        setHotel(hotel);
                        setOpen(true);
                        setOpenDetail(false);
                        //@ts-ignore
                        setSelectedPlace(hotel.place);
                        setStars(hotel.stars);
                      },
                    },
                    {
                      id: 2,
                      name: "Eliminar",
                      onClick: () => showToast({ message: "Eliminar hotel", type: "confirmation", duration: 50000, confirmOptions: { description: "Desea eliminar hotel ?", confirm: { title: "Eliminar", onClick: () => deleteHotel(hotel.id) } } }),
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

  const resetHotel = () => {
    setHotel(HotelEmpty);
  };

  const searchByName = async (name: string) => {
    const params = name ? `name=${encodeURIComponent(name)}` : "";
    if (!params) await fetchTotalHotels();
    await getHotels(params);
  };

  const handlerClose = async () => {
    await fetchTotalHotels();
    await getHotels();
  };

  return (
    <>
      <Heading title="Hoteles disponibles" />
      <Filter type="hotel" searchByName={searchByName} apply={() => {}} onCloseSearch={() => handlerClose()} />
      <Box sx={{ display: "flex", alignItems: "center", pb: 2 }}>
        <Tooltip text="Agregar hotel" position="right">
          <Box>
            <IconButton
              onClick={() => {
                resetHotel();
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
            <>
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
              {showPagination && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Pagination page={page} count={totalPages} changePage={(value) => setPage(value)} showFirstButton showLastButton color="primary" />
                </Box>
              )}
            </>
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
          setStars(3);
        }}
        title="Hotel">
        {renderForm()}
      </Modal>
      <Modal
        title={hotel.name}
        open={openDetail}
        onClose={() => {
          setOpenDetail(false);
          resetSelectedPlace();
          setStars(3);
        }}
        fullWidth>
        {renderDetail()}
      </Modal>
    </>
  );
};
