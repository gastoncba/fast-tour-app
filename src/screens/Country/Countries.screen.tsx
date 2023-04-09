import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { Card, GridList, Loader, Modal, Paragraph, Toast } from "../../components";
import { CountryDetail } from "./Country";
import { Country } from "../../models/Country.model";
import { CountryService } from "../../services";

interface Props {}

export const CountriesScreen: React.FC<Props> = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [contenModal, setContentModal] = useState<any>(null);

  const getCountries = async () => {
    try {
      setIsLoading(true);
      let countries = await CountryService.getCountries();
      setCountries(countries);
    } catch {
      Toast({
        type: "error",
        message: "Algo a ocurrido en la busqueda de paises",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const detailCountry = async (id: string) => {
    try {
      let country = await CountryService.getPlacesOf(id);
      setOpenModal(true)
      setContentModal(<CountryDetail country={country} />);
    } catch (error) {
      Toast({
        type: "error",
        message: "Algo ha ocurrido en la busqueda de los lugares"
      })
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
                  coverImage={item.img}
                  onClick={() => detailCountry(item.id)}
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
          <Modal 
            
            open={openModal}
            title=""
            onClose={() => setOpenModal(false)}
          >
            {contenModal}
          </Modal>
        </>
      )}
    </>
  );
};
