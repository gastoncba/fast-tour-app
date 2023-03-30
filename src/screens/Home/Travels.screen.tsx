import React, { useEffect, useState } from "react";
import moment from "moment";

import {
  Card,
  GridList,
  Loader,
  Filter,
  Select,
  Paragraph,
  Input,
  Button,
  Form,
} from "../../components/index";
import { Travel } from "../../models/Travels.model";
import { TravelService } from "../../services";
import { Box } from "@mui/material";

interface Props {}

export const Travels: React.FC<Props> = (props: Props) => {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [option, setOption] = useState<string>("Fechas");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const handleApplyFilter = (startDate: string, endDate: string) => {
    let query = "";

    const startConvert = moment(startDate, "YYYY-MM-DD").format("DD/MM/YYYY");
    const endConvert = moment(endDate, "YYYY-MM-DD").format("DD/MM/YYYY");
    query = `fromDate=${startConvert}&toDate=${endConvert}`;
    setIsLoading(true);
    getTravels(query);
  };

  const onSelect = (value: string) => {
    setOption(value);
  };

  const onClick = () => {
    let query = `min_price=${minPrice}&max_price=${maxPrice}`;

    setIsLoading(true);
    getTravels(query);
  };

  const getTravels = async (query?: string) => {
    try {
      let travels_res = await TravelService.getTravels(query);
      setTravels(travels_res);
    } catch {
      console.log('ERROR || GET_TRAVELS')
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getTravels();
  }, []);

  return (
    <>
      <Paragraph text="Viajes disponibles" type='title'/>
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
            <Paragraph text="Filtrar por: " type="text" />
            <Select
              onSelect={onSelect}
              defaultValue={"Fechas"}
              items={[{ value: "Precios" }, { value: "Fechas" }]}
            />
            <Box>
              {option === "Fechas" ? (
                <Filter onApplyFilter={handleApplyFilter} />
              ) : (
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  columnGap={2}
                  alignItems={"center"}
                >
                  <Input
                    isNumberInput={true}
                    onChange={(value: string) => setMinPrice(value)}
                    placeholder={"minimo"}
                  />
                  <Input
                    isNumberInput={true}
                    onChange={(value: string) => setMaxPrice(value)}
                    placeholder={"maximo"}
                  />
                  <Button text="buscar precios" onClick={onClick} />
                </Box>
              )}
            </Box>
          </Box>
          {
            (travels.length !== 0) ? 
            <GridList
            direction="row"
            items={travels}
            renderItem={(item: Travel, index: number) => (
              <Card
                title={item.name}
                description={`Salida y regreso: ${item.startDate} - ${item.endDate}`}
                other={`Precio: $ ${item.price}`}
                coverImage="https://www.civitatis.com/f/argentina/buenos-aires/guia/cataratas-iguazu.jpg"
              />
            )}
          /> :
          <Box display={'flex'} justifyContent='center'>
            <Paragraph text="No se encontraron viajes" type='title' levelTitle={4}/>
          </Box>
          }
        </>
      )}
    </>
  );
};
