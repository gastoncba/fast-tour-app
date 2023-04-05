import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import {
  Loader,
  Paragraph,
  Toast,
  GridList,
  Card,
  Modal,
  SearchBox,
} from "../../components";
import { Place } from "../../models/Place.model";
import { PlaceService, TravelService } from "../../services";
import { PlaceDetail } from "./Place";
import { TripCard } from "../Home/Trip";

interface Props {}

export const PlacesScreen: React.FC<Props> = () => {
  const [allPlaces, setAllPlaces] = useState<Place[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [contenModal, setContentModal] = useState<any>(null);

  const getPlaces = async () => {
    setIsLoading(true);
    try {
      let places = await PlaceService.getPlaces();
      setAllPlaces(places);
      setPlaces(places);
    } catch {
      Toast({
        type: "error",
        message: "Algo a ocurrido en la busqueda de lugares",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);

  const filterPlaces = (query: string) => {
    const filteredPlaces = allPlaces.filter((place) =>
      place.name.toLowerCase().includes(query.toLowerCase())
    );
    setPlaces(filteredPlaces);
  };

  const handleSearch = (value: string) => {
    if (value) {
      filterPlaces(value);
    } else {
      setPlaces(allPlaces);
    }
  };

  const detailPlace = async (id: string) => {
    try {
      let place = await PlaceService.getTravelsOf(id);
      setOpenModal(true);
      setContentModal(<PlaceDetail place={place} onClick={detailTravel} />);
    } catch {
      Toast({
        type: "error",
        message: "Algo a ocurrido en la busqueda de los viajes",
      });
    }
  };

  const detailTravel = async (id: string) => {
    try {
      let trip = await TravelService.getTravel(id);
      setContentModal(<TripCard trip={trip} />);
    } catch {
      Toast({
        type: "error",
        message: "Algo a ocurrido el la busqueda del viaje",
      });
    }
  };

  return (
    <>
      <Paragraph text="Top de lugares" type="title" levelTitle={1} />
      <Box sx={{ pb: 2, pt: 1 }}>
        <SearchBox
          items={places.map((place) => ({ value: place.name }))}
          onSelect={(value: string) => {
            const placesFilter = allPlaces.filter(
              (place) => place.name === value
            );
            setPlaces(placesFilter);
          }}
          onClear={() => setPlaces(allPlaces)}
          placeholder="Buscar lugar .. "
        />
      </Box>
      {isLoading ? (
        <Loader sx={{ py: 6 }} />
      ) : (
        <>
          {places.length !== 0 ? (
            <GridList
              direction="row"
              items={places}
              renderItem={(item: Place, index: number) => (
                <Card
                  title={item.name}
                  description={``}
                  coverImage="https://www.civitatis.com/f/argentina/buenos-aires/guia/cataratas-iguazu.jpg"
                  onClick={() => detailPlace(item.id)}
                />
              )}
            />
          ) : (
            <Box display={"flex"} justifyContent="center">
              <Paragraph
                text="No se encontraron lugares"
                type="title"
                levelTitle={4}
              />
            </Box>
          )}
        </>
      )}
      <Modal
        open={openModal}
        title="Lugares"
        onClose={() => setOpenModal(false)}
      >
        {contenModal}
      </Modal>
    </>
  );
};
