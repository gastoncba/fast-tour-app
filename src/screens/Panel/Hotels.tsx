import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { Heading, IconButton, Icon, Tooltip, showToast, Paragraph, GridList, Card, Loader, Rate, Form, Modal, SearchBar, Menu, Filter } from "../../components";
import { Pagination } from "../../components/Pagination/Pagination.component";
import { Country, Hotel, Place, PaginatedResponse } from "../../models";
import { CountryService, HotelService, PlaceService } from "../../services";

interface HotelProps {}

const PlaceEmpty: Place = { id: -1, name: "", description: null, img: null, country: { id: -1, name: "", code: "", img: null }, hotels: [] };
const HotelEmpty: Hotel = { id: -1, name: "", description: "", stars: 0 };

export const Hotels: React.FC<HotelProps> = () => {
  const [hotelsData, setHotelsData] = useState<PaginatedResponse<Hotel>>({
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
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [stars, setStars] = useState<number>(3);
  const [loadingPlaces, setLoadingPlaces] = useState<boolean>(false);
  const [selectedPlace, setSelectedPlace] = useState<Place>(PlaceEmpty);
  const [hotel, setHotel] = useState<Hotel>(HotelEmpty);
  const [loadinDetail, setLoadingDetail] = useState<boolean>(false);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchHotels = async (page: number = 1, query?: string) => {
    setLoading(true);
    try {
      const response = await HotelService.getHotelsPaginated(page, 5, query);
      setHotelsData(response);
    } catch (error) {
      showToast({ message: "Error al cargar los hoteles disponibles", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
      fetchHotels(currentPage);
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
      fetchHotels(currentPage);
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
      fetchHotels(currentPage);
    } catch (error) {
      showToast({ message: "Error al intentar eliminar hotel", type: "error" });
    } finally {
      setOpenDetail(false);
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
    fetchHotels(currentPage);
  }, [currentPage]);

  useEffect(() => {
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
    const query = name ? `name=${encodeURIComponent(name)}` : "";
    fetchHotels(1, query);
    setCurrentPage(1);
  };

  const handlerClose = async () => {
    fetchHotels(currentPage);
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
          {hotelsData.items.length > 0 ? (
            <>
              <GridList
                direction="row"
                items={hotelsData.items}
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
              <Pagination
                data={hotelsData}
                onPageChange={handlePageChange}
                loading={loading}
                showQuickJumper={true}
                showTotal={true}
              />
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
