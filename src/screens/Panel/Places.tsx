import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { Heading, Tooltip, IconButton, Icon, showToast, Form, SearchBar, Paragraph, Modal, Loader, GridList, Card, Menu, Filter, Pagination } from "../../components";
import { Country, Place } from "../../models";
import { CountryService, PlaceService } from "../../services";
import { PAGINATION } from "../../settings/const.setting";

const CountryEmpty: Country = { id: -1, name: "", img: null, code: "" };
const PlaceEmpty: Place = { id: -1, name: "", description: null, img: null, country: { id: -1, name: "", img: null, code: "" }, hotels: [] };

interface PlacesProps {}

export const Places: React.FC<PlacesProps> = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>(CountryEmpty);
  const [place, setPlace] = useState<Place>(PlaceEmpty);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(true);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalPlaces, setTotalPlaces] = useState<number>(0);

  const fetchTotalPlaces = async () => {
    try {
      const places = await PlaceService.getPlaces();
      const total = places.length;
      setTotalPages(Math.ceil(total / PAGINATION));
      setTotalPlaces(places.length);
    } catch (error) {
      console.error("Error al obtener el total de destinos", error);
    }
  };

  const getPlaces = async (params?: string) => {
    setLoading(true);
    try {
      const skip = (page - 1) * PAGINATION;
      let pls = await PlaceService.getPlaces(`${params || ""}&take=${PAGINATION}&skip=${skip}`);
      setPlaces(pls);

      if (params) setTotalPages(Math.ceil(pls.length / PAGINATION));
    } catch (error) {
      showToast({ message: "Error al cargar los destinos disponibles", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const getCountries = async () => {
    try {
      let cts = await CountryService.getCountries();
      setCountries(cts);
    } catch (error) {
      showToast({ message: "Error al cargar los paises disponibles", type: "error" });
    }
  };

  const getPlace = async (placeId: number) => {
    setLoadingDetail(true);
    try {
      let place = await PlaceService.getPlace(placeId);
      setPlace(place);
    } catch (error) {
      showToast({ message: "Error al cargar los datos del destino", type: "error" });
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    getPlaces();
  }, [page]);

  useEffect(() => {
    fetchTotalPlaces();
    getCountries();
  }, []);

  const createPlace = async (value: any) => {
    if (selectedCountry.id === -1) {
      showToast({ message: "Se debe elegir un país donde este el destino", type: "info" });
      return;
    }
    try {
      await PlaceService.createPlace({ ...value, countryId: selectedCountry.id });
      showToast({ message: "Destino creado con exito", type: "info" });
      setTotalPlaces((prev) => prev + 1);
      setTotalPages(Math.ceil((totalPlaces + 1) / PAGINATION));
      getPlaces();
    } catch (error) {
      showToast({ message: "Error al agregar nuevo destino", type: "error" });
    } finally {
      setOpen(false);
    }
  };

  const updatePlace = async (value: any) => {
    if (selectedCountry.id === -1) {
      showToast({ message: "Se debe elegir un país donde este el destino", type: "info" });
      return;
    }
    try {
      await PlaceService.updatePlace(place.id, { ...value, countryId: selectedCountry.id });
      showToast({ message: "Destino actualizado con exito", type: "success" });
      getPlaces();
    } catch (error) {
      showToast({ message: "Error al actualizar el destino", type: "error" });
    } finally {
      setOpen(false);
    }
  };

  const deletePlace = async (placeId: number) => {
    try {
      await PlaceService.deletePlace(placeId);
      showToast({ message: "Destino eliminado con exito", type: "success" });
      setTotalPlaces((prev) => prev - 1);
      setTotalPages(Math.ceil((totalPlaces - 1) / PAGINATION));
      getPlaces();
    } catch (error) {
      showToast({ message: "Error al intentar eliminar destino", type: "error" });
    } finally {
      setOpenDetail(false);
      setPage(1);
    }
  };

  const handlerSelected = (value: string) => {
    const country = countries.find((c) => c.name === value);

    country ? setSelectedCountry(country) : resetSelectedCountry();
  };

  const renderForm = () => {
    return (
      <Form
        inputs={[
          {
            label: "Nombre",
            type: "text",
            initialValue: { name: place.name || "" },
          },
          {
            label: "Descripcion",
            type: "text",
            initialValue: { description: place.description || "" },
            required: false,
            multiline: true,
          },
        ]}
        onAction={place.id === -1 ? createPlace : updatePlace}>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
          <SearchBar items={countries.map((c) => ({ value: c.name }))} placeholder="País" onSelect={(value) => handlerSelected(value)} />
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
            <Paragraph text={selectedCountry.name} />
            {selectedCountry.id !== -1 && <IconButton icon={<Icon type="CLOSE" sx={{ fontSize: "large" }} />} onClick={() => resetSelectedCountry()} />}
          </Box>
        </Box>
      </Form>
    );
  };

  const resetPlace = () => {
    setPlace(PlaceEmpty);
  };

  const renderDetail = () => {
    return (
      <>
        {loadingDetail ? (
          <Loader />
        ) : (
          <Card title={place.name}>
            <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
              <Paragraph text={place.description || "Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final"} />
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", columnGap: 1 }}>
                  <Paragraph text={"País:"} color="GrayText" />
                  <Paragraph text={place.country.name} />
                </Box>
                <Menu
                  icon={<Icon type="MORE-VERT" />}
                  items={[
                    {
                      id: 1,
                      name: "Editar",
                      onClick: () => {
                        setSelectedCountry(place.country);
                        setOpen(true);
                        setOpenDetail(false);
                      },
                    },
                    {
                      id: 2,
                      name: "Eliminar",
                      onClick: () => showToast({ message: "Eliminar destino", type: "confirmation", duration: 50000, confirmOptions: { description: "Desea eliminar destino ?", confirm: { onClick: () => deletePlace(place.id), title: "Eliminar" } } }),
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

  const searchByName = (name: string) => {
    const params = name ? `name=${encodeURIComponent(name)}` : "";
    getPlaces(params);
  };

  const resetSelectedCountry = () => {
    setSelectedCountry(CountryEmpty);
  };

  return (
    <>
      <Heading title="Destinos disponibles" />
      <Filter type="place" searchByName={searchByName} apply={() => {}} onCloseSearch={async () => await getPlaces()} />
      <Box sx={{ display: "flex", alignItems: "center", pb: 2 }}>
        <Tooltip text="Agregar destino" position="right">
          <Box>
            <IconButton
              onClick={() => {
                resetPlace();
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
          {places.length > 0 ? (
            <GridList
              items={places}
              renderItem={(item: Place) => (
                <Card
                  title={item.name}
                  key={item.id}
                  description={item.description || "Sin descripción"}
                  onClickArea={() => {
                    setOpenDetail(true);
                    getPlace(item.id);
                  }}
                />
              )}
            />
          ) : (
            <Paragraph text="No se encontraron destinos destinos" variant="h5" align="center" />
          )}
        </>
      )}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          resetSelectedCountry();
        }}
        title="Destino">
        {renderForm()}
      </Modal>
      <Modal open={openDetail} onClose={() => setOpenDetail(false)} title={place.name} fullWidth>
        {renderDetail()}
      </Modal>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination page={page} count={totalPages} changePage={(value) => setPage(value)} showFirstButton showLastButton color="primary" />
      </Box>
    </>
  );
};
