import React, { useEffect, useState } from "react";
import moment from "moment";
import { Box } from "@mui/material";
import { useLocation } from 'react-router-dom'

import {
  Card,
  GridList,
  Loader,
  Filter,
  Select,
  Paragraph,
  Input,
  Button,
  Toast,
  Modal
} from "../../components/index";
import { Travel } from "../../models/Travels.model";
import { TravelService } from "../../services";
import { TripCard } from "./Trip";
import { Place } from "../../models/Place.model";

interface Props {}

export const Travels: React.FC<Props> = (props: Props) => {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [option, setOption] = useState<string>("Fechas");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [trip, setTrip] = useState<any>(null);

  const location = useLocation()

  const handleClick = () => {
    getTravels()
  };

  const handleApplyFilter = (startDate: string, endDate: string) => {
    let query = "";

    const startConvert = moment(startDate, "YYYY-MM-DD").format("DD/MM/YYYY");
    const endConvert = moment(endDate, "YYYY-MM-DD").format("DD/MM/YYYY");
    query = `fromDate=${startConvert}&toDate=${endConvert}`;
    getTravels(query);
  };

  const onSelect = (value: string) => {
    setOption(value);
  };

  const handlerPriceFilter = () => {
    let max_price = parseInt(maxPrice);
    let min_price = parseInt(minPrice);

    if (max_price <= min_price) {
      Toast({
        type: "error",
        message: "El precio maximo no debe ser menor que el minimo",
      });
      return;
    }
    if (!minPrice || !maxPrice) {
      Toast({
        type: "error",
        message: "Complete todos los campos para buscar",
      });
      return;
    }

    let query = `min_price=${minPrice}&max_price=${maxPrice}`;
    setMinPrice("");
    setMaxPrice("");
    getTravels(query);
  };

  const getTravels = async (query?: string) => {
    setIsLoading(true)
    try {
      let travels_res = await TravelService.getTravels(query);
      setTravels(travels_res);
    } catch {
      Toast({
        type: "error",
        message: "Algo a ocurrido en la busqueda de viajes",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const detail = async (id: string) => {
    try {
      let travel = await TravelService.getTravel(id)
      setTrip(travel)
      setOpenModal(true)
    } catch {
      Toast({
        type: "error",
        message: `Algo a ocurrido al buscar el viaje`,
      });
    }
  }

  const getConditionElement = (): JSX.Element => {
    switch(option) {
      case "Fechas": 
        return <Filter onApplyFilter={handleApplyFilter} />
      case "Precios": 
        return <Box
        display={"flex"}
        flexDirection={"row"}
        columnGap={2}
        alignItems={"center"}
      >
        <Input
          isNumberInput={true}
          onInputChange={(value: string) => setMinPrice(value)}
          placeholder={"minimo"}
        />
        <Input
          isNumberInput={true}
          onInputChange={(value: string) => setMaxPrice(value)}
          placeholder={"maximo"}
        />
        <Button text="buscar precios" onClick={handlerPriceFilter} />
      </Box>
      default: 
        return <></>
    }
  } 

  useEffect(() => {
    let query = "";
    if(location.state) {
      const place = location.state as Place
      query = `placeId=${place.id}`
    } 
    getTravels(query)
  }, []);

  return (
    <>
      <Paragraph text="Viajes disponibles" type="title" />
      {isLoading ? (
        <Loader sx={{ py: 6 }} />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              columnGap: 2,
              pb: 4,
              pt: 1,
              alignItems: "center",
            }}
          >
            <Paragraph text="Buscar por: " type="text" />
            <Select
              onSelect={onSelect}
              defaultValue={option}
              items={[{ value: "Precios" }, { value: "Fechas" }]}
            />
            <Box>
              {getConditionElement()}
            </Box>
            <Box>
              <Button text="Obtener todos los viajes" onClick={handleClick}/>
            </Box>
          </Box>
          {travels.length !== 0 ? (
            <GridList
              direction="row"
              items={travels}
              renderItem={(item: Travel, index: number) => (
                <Card
                  title={item.name}
                  description={`Salida y regreso: ${item.startDate} - ${item.endDate}`}
                  other={`Precio: USD ${item.price}`}
                  coverImage={item.img}
                  onClick={() => detail(item.id)}
                />
              )}
            />
          ) : (
            <Box display={"flex"} justifyContent="center">
              <Paragraph
                text="No se encontraron viajes"
                type="title"
                levelTitle={4}
              />
            </Box>
          )}
        </>
      )}
      <Modal open={openModal} onClose={() => setOpenModal(false)} title="Viaje">
        <TripCard trip={trip}/>
      </Modal>
    </>
  );
};
