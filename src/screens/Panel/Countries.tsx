import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { Heading, Tooltip, Divider, IconButton, Icon, Loader, GridList, Paragraph, Card, showToast, Modal, Form, Menu } from "../../components";
import { Country } from "../../models";
import { CountryService } from "../../services";

interface CountriesProps {}

export const Countries: React.FC<CountriesProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [form, setForm] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);

  const getCountries = async () => {
    setLoading(true);
    try {
      let cts = await CountryService.getCountries();
      setCountries(cts);
    } catch (error) {
      showToast("error", "Error al consultar los paises");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const createCountry = async (value: any) => {
    try {
      await CountryService.createCountry({ name: value.name, code: value.code });
      showToast("success", "País creado exitosamente");
      getCountries();
    } catch (error) {
      showToast("error", "Error al agregar país");
    } finally {
      setOpen(false);
    }
  };

  const updateCountry = async (value: any) => {
    try {
      await CountryService.updateCountry(value.id, { name: value.name, code: value.code });
      showToast("success", "País actualizado exitosamente");
      getCountries();
    } catch (error) {
      showToast("error", "Error al actualizar país");
    } finally {
      setOpen(false);
    }
  };

  const deleteCountry = async (countryId: number) => {
    try {
      await CountryService.deleteCountry(countryId);
      getCountries();
      showToast("success", "País eliminado exitosamente");
    } catch (error) {
      showToast("error", "Error al intentar eliminar país");
    }
  };

  const buildForm = (item: any, action: any) => {
    setOpen(true);
    setForm(
      <Form
        fields={[
          {
            label: "Nombre",
            type: "text",
            initialValue: { name: item.name || "" },
          },
          {
            label: "Código",
            type: "text",
            initialValue: { code: item.code || "" },
          },
        ]}
        onAction={(values: any) => action({ ...item, ...values })}
      />
    );
  };

  return (
    <>
      <Heading title="Paises disponibles" />
      <Box sx={{ py: 2 }}>
        <Divider />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", pb: 2 }}>
        <Tooltip text="Agregar país" position="right">
          <Box>
            <IconButton onClick={() => buildForm({}, createCountry)} icon={<Icon type="PLUS" />} buttonStyle={{ bgcolor: "primary.main", color: "white", ":hover": { bgcolor: "primary.main", color: "white" } }} />
          </Box>
        </Tooltip>
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <>
          {countries.length > 0 ? (
            <GridList
              items={countries}
              renderItem={(item: Country) => (
                <Card title={item.name} key={item.id}>
                  <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Paragraph text={item.code} color="GrayText" />
                    <Menu
                      icon={<Icon type="MORE-VERT" />}
                      items={[
                        {
                          id: 1,
                          name: "Editar",
                          onClick: () => buildForm(item, updateCountry),
                        },
                        {
                          id: 2,
                          name: "Eliminar",
                          onClick: () => showToast("confirmation", "Eliminar País", { onConfirm: () => deleteCountry(item.id), description: "Desea eliminar este país" }),
                        },
                      ]}
                    />
                  </Box>
                </Card>
              )}
            />
          ) : (
            <Paragraph text="No hay paises disponibles" variant="h5" align="center" />
          )}
        </>
      )}
      <Modal title="País" open={open} onClose={() => setOpen(false)}>
        {form}
      </Modal>
    </>
  );
};
