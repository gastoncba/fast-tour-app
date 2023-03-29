import React, { useEffect, useState } from "react";
import moment from "moment";

import { Card, GridList, Loader, Filter } from "../../components/index";
import { Travel } from "../../models/Travels.model";
import { TravelService } from "../../services";

interface Props {}

export const Travels: React.FC<Props> = (props: Props) => {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleApplyFilter = (startDate: string, endDate: string) => {
    const startConvert = moment(startDate, "YYYY-MM-DD").format("DD/MM/YYYY");
    const endConvert = moment(endDate, "YYYY-MM-DD").format("DD/MM/YYYY");
    let range = `fromDate=${startConvert}&toDate=${endConvert}`
    getTravels(range)
  };

  const getTravels = async (range?:string) => {
    let travels_res = await TravelService.getTravels(range);
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
        <Loader sx={{py:6}}/>
      ) : (
        <>
          <Filter onApplyFilter={handleApplyFilter} sx={{ py: 2 }} />
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
