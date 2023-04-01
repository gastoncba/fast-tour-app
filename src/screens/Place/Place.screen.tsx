import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { Loader, Paragraph, Toast, GridList, Card } from "../../components";
import { Place } from "../../models/Place.model";
import { PlaceService } from "../../services";

interface Props {}

export const PlaceScreen: React.FC<Props> = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPlaces = async () => {
    setIsLoading(true);
    try {
      let places = await PlaceService.getPlaces();
      console.log(places)
      setPlaces(places);
    } catch {
      Toast({
        type: "error",
        message: "Algo a ocurrido en la busqueda de lugares",
      });
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPlaces()
  }, [])

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
                  onClick={() => console.log("item: ", item.id)}
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
    </>
  );
};
