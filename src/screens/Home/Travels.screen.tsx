import React from "react";

import { Card, GridList } from "../../components/index";
interface Props {}

export const Travels: React.FC<Props> = (props: Props) => {
    const items = [1,2,3,4,5,6]
  return (
    <>
      <h1>Viajes disponibles</h1>
      <GridList 
        direction="row"
        items={items}
        renderItem={(item:any, index:any) => (
            <Card
                title="Viaje a las cataratas"
                subtitle="viaje para 2 personas"
                image="https://www.civitatis.com/f/argentina/buenos-aires/guia/cataratas-iguazu.jpg"
            />
        )}
      />
    </>
  );
};
