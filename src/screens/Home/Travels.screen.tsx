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
  Toast,
  Check
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
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);

    if(checked) {
      setIsLoading(true)
      getTravels();
    }
  };

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
    setIsLoading(true);
    getTravels(query);
  };

  const getTravels = async (query?: string) => {
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

  useEffect(() => {
    getTravels();
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
              )}
            </Box>
            <Box>
              <Check label="Obtener todos los viajes" checked={isChecked} onChange={handleCheckboxChange}/>
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
                  other={`Precio: $ ${item.price}`}
                  coverImage="https://www.civitatis.com/f/argentina/buenos-aires/guia/cataratas-iguazu.jpg"
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
    </>
  );
};
