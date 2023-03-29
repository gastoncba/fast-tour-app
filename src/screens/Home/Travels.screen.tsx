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
  Button
} from "../../components/index";
import { Travel } from "../../models/Travels.model";
import { TravelService } from "../../services";
import { Box } from "@mui/material";

interface Props {}


export const Travels: React.FC<Props> = (props: Props) => {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [option, setOption] = useState<string>('Fechas')

  const handleApplyFilter = (startDate: string, endDate: string) => {

    let query = "";

    const startConvert = moment(startDate, "YYYY-MM-DD").format("DD/MM/YYYY");
    const endConvert = moment(endDate, "YYYY-MM-DD").format("DD/MM/YYYY");
    query = `?fromDate=${startConvert}&toDate=${endConvert}`;
    setIsLoading(true);
    getTravels(query);

  };

  const onSelect = (value: string) => {
    setOption(value)
  }

  const onChangeInput = (value: string) => {
    console.log('value: ', value)
  }

  const handleButtonClick = (inputValue: string) => {
    console.log('Input value:', inputValue);
  };

  const getTravels = async (query?: string) => {
    let travels_res = await TravelService.getTravels(query);
    setTravels(travels_res);
    setIsLoading(false);
  };

  useEffect(() => {
    getTravels();
  }, []);

  return (
    <>
      <h1>Viajes Disponibles</h1>
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
              items={[{ value: 'Precios' }, { value: 'Fechas' }]}
            />
            <Box>
              {
                (option === "Fechas") ? 
                <Filter onApplyFilter={handleApplyFilter} /> : 
                <Box display={'flex'} flexDirection={'row'} columnGap={2} alignItems={'center'}>
                  <Input isNumberInput={true} onChange={onChangeInput} placeholder={'minimo'}/>
                  <Input isNumberInput={true} onChange={onChangeInput} placeholder={'maximo'}/>
                  <Button text="buscar precios" onClick={handleButtonClick}/>
                </Box>
              }
            </Box>
          </Box>
          <GridList
            direction="row"
            items={travels}
            renderItem={(item: Travel, index: number) => (
              <Card
                title={item.name}
                description={`${item.startDate} - ${item.endDate}`}
                coverImage="https://www.civitatis.com/f/argentina/buenos-aires/guia/cataratas-iguazu.jpg"
              />
            )}
          />
        </>
      )}
    </>
  );
};
