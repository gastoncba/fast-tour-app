import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { Heading, Tooltip, IconButton, Icon, showToast, Form, SearchBar, Paragraph, Modal, Loader, GridList, Card, Menu, Filter } from "../../components";
import { Country, Place } from "../../models";
import { CountryService, PlaceService } from "../../services";

interface PlacesProps {}

export const Places: React.FC<PlacesProps> = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>({ id: -1, name: "", img: null, code: "" });
  const [place, setPlace] = useState<Place>({ id: -1, name: "", description: null, img: null, country: { id: -1, name: "", img: null, code: "" }, hotels: [] });
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(true);
  const [openDetail, setOpenDetail] = useState<boolean>(false);

  const getPlaces = async (params?: string) => {
    setLoading(true);
    try {
      let pls = await PlaceService.getPlaces(params);
      setPlaces(pls);
    } catch (error) {
      showToast("error", "Error al cargar los destinos disponibles");
    } finally {
      setLoading(false);
    }
  };

  const getCountries = async () => {
    try {
      let cts = await CountryService.getCountries();
      setCountries(cts);
    } catch (error) {
      showToast("error", "Error al cargar los paises disponibles");
    }
  };

  const getPlace = async (placeId: number) => {
    setLoadingDetail(true);
    try {
      let place = await PlaceService.getPlace(placeId);
      setPlace(place);
    } catch (error) {
      showToast("error", "Error al cargar los datos del destino");
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    getPlaces();
    getCountries();
  }, []);

  const createPlace = async (value: any) => {
    try {
      await PlaceService.createPlace({ ...value, countryId: selectedCountry.id });
      getPlaces();
    } catch (error) {
      showToast("error", "Error al agregar nuevo destino");
    } finally {
      setOpen(false);
    }
  };

  const updatePlace = async (value: any) => {
    try {
      await PlaceService.updatePlace(place.id, { ...value, countryId: selectedCountry.id });
      getPlaces();
    } catch (error) {
      showToast("error", "Error al actualizar el destino");
    } finally {
      setOpen(false);
    }
  };

  const deletePlace = async (placeId: number) => {
    try {
      await PlaceService.deletePlace(placeId);
      getPlaces();
      showToast("success", "Destino eliminado con exito");
    } catch (error) {
      showToast("error", "Error al intentar eliminar destino");
    } finally {
      setOpenDetail(false);
    }
  };

  const handlerSelected = (value: string) => {
    const country = countries.find((c) => c.name === value);

    country ? setSelectedCountry(country) : setSelectedCountry({ id: -1, name: "", code: "", img: null });
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
            notRequired: true,
            multiline: true,
          },
        ]}
        onAction={place.id === -1 ? createPlace : updatePlace}>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
          <SearchBar items={countries.map((c) => ({ value: c.name }))} placeholder="País" onSelect={(value) => handlerSelected(value)} />
          <Paragraph text={selectedCountry.name} />
        </Box>
      </Form>
    );
  };

  const resetPlace = () => {
    setPlace({ id: -1, name: "", description: null, img: null, country: { id: -1, name: "", img: null, code: "" }, hotels: [] });
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
                    { id: 2, name: "Eliminar", onClick: () => showToast("confirmation", "Eliminar destino", { onConfirm: () => deletePlace(place.id), description: "Desea eliminar destino ?" }) },
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
    const params = name ? `?name=${encodeURIComponent(name)}` : "";
    getPlaces(params);
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
          setSelectedCountry({ id: -1, name: "", img: null, code: "" });
        }}
        title="Destino">
        {renderForm()}
      </Modal>
      <Modal open={openDetail} onClose={() => setOpenDetail(false)} title={place.name} fullWidth>
        {renderDetail()}
      </Modal>
    </>
  );
};
