import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import {
  Loader,
  Paragraph,
  Toast,
  GridList,
  Card,
  Modal,
} from "../../components";
import { Place } from "../../models/Place.model";
import { PlaceService, TravelService } from "../../services";
import { PlaceDetail } from "./Place";
import { TripCard } from "../Home/Trip";

interface Props {}

export const PlacesScreen: React.FC<Props> = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [contenModal, setContentModal] = useState<any>(null);

  const getPlaces = async () => {
    setIsLoading(true);
    try {
      let places = await PlaceService.getPlaces();
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
