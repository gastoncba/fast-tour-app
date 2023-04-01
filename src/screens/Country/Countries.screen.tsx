import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { Card, GridList, Loader, Paragraph, Toast } from "../../components";
import { Country } from "../../models/Country.model";
import { CountryService } from "../../services";

interface Props {}

export const CountriesScreen: React.FC<Props> = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCountries = async () => {
    setIsLoading(true);
    let countries = await CountryService.getCountries();
    setCountries(countries);
    try {
    } catch {
      Toast({
        type: "error",
        message: "Algo a ocurrido en la busqueda de paises",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <>
      <Paragraph text="Top de paises" type="title" />
      {isLoading ? (
        <Loader sx={{ py: 6 }} />
      ) : (
        <>
          {countries.length !== 0 ? (
            <GridList
              direction="row"
              items={countries}
              renderItem={(item: Country, index: number) => (
                <Card
                  title={item.name}
                  description={``}
                  coverImage="https://www.civitatis.com/f/argentina/buenos-aires/guia/cataratas-iguazu.jpg"
                  onClick={() => {}}
                />
              )}
            />
          ) : (
            <Box display={"flex"} justifyContent="center">
              <Paragraph
                text="No se encontraron Paises"
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
