import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { Heading, Tooltip, IconButton, Icon, Loader, GridList, Paragraph, Card, showToast, Modal, Form, Menu, Filter, Pagination } from "../../components";
import { Country } from "../../models";
import { CountryService } from "../../services";
import { PAGINATION } from "../../settings/const.setting";

interface CountriesProps {}

export const Countries: React.FC<CountriesProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [form, setForm] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCountries, setTotalCountries] = useState<number>(0);
  const [showPagination, setShowPagination] = useState<boolean>(false);

  const fetchTotalCountries = async () => {
    try {
      const countries = await CountryService.getCountries();
      const total = countries.length;
      setTotalPages(Math.ceil(total / PAGINATION));
      setTotalCountries(countries.length);
    } catch (error) {
      console.error("Error al obtener el total de países", error);
    }
  };

  const getCountries = async (params?: string) => {
    setLoading(true);
    setShowPagination(!params);
    try {
      const skip = (page - 1) * PAGINATION;
      let cts = await CountryService.getCountries(params ? params : `take=${PAGINATION}&skip=${skip}`);
      setCountries(cts);
    } catch (error) {
      showToast({ message: "Error al consultar los paises", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalCountries();
  }, []);

  useEffect(() => {
    getCountries();
  }, [page]);

  const createCountry = async (value: any) => {
    try {
      await CountryService.createCountry({ name: value.name, code: value.code });
      showToast({ message: "País creado exitosamente", type: "success" });
      setTotalCountries((prev) => prev + 1);
      setTotalPages(Math.ceil((totalCountries + 1) / PAGINATION));
      getCountries();
    } catch (error) {
      showToast({ message: "Error al agregar país", type: "error" });
    } finally {
      setOpen(false);
    }
  };

  const updateCountry = async (value: any) => {
    try {
      await CountryService.updateCountry(value.id, { name: value.name, code: value.code });
      showToast({ message: "País actualizado exitosamente", type: "success" });
      getCountries();
    } catch (error) {
      showToast({ message: "Error al actualizar país", type: "error" });
    } finally {
      setOpen(false);
    }
  };

  const deleteCountry = async (countryId: number) => {
    try {
      await CountryService.deleteCountry(countryId);
      showToast({ message: "País eliminado exitosamente", type: "success" });
      setTotalCountries((prev) => prev - 1);
      setTotalPages(Math.ceil((totalCountries - 1) / PAGINATION));
      getCountries();
    } catch (error) {
      showToast({ message: "Error al intentar eliminar país", type: "error" });
    } finally {
      setPage(1);
    }
  };

  const buildForm = (item: any, action: any) => {
    setOpen(true);
    setForm(
      <Form
        inputs={[
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

  const searchByName = async (name: string) => {
    const params = name ? `name=${encodeURIComponent(name)}` : "";
    if (!params) await fetchTotalCountries();
    getCountries(params);
  };

  const handlerClose = async () => {
    await fetchTotalCountries();
    await getCountries();
  };

  return (
    <>
      <Heading title="Paises disponibles" />
      <Filter searchByName={searchByName} type="country" apply={() => {}} onCloseSearch={handlerClose} />
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
            <>
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
                            onClick: () =>
                              showToast({ message: "Eliminar país", type: "confirmation", duration: 50000, confirmOptions: { description: "Desea eliminar este país ?", confirm: { title: "Eliminar", onClick: () => deleteCountry(item.id) } } }),
                          },
                        ]}
                      />
                    </Box>
                  </Card>
                )}
              />
              {showPagination && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Pagination page={page} count={totalPages} changePage={(value) => setPage(value)} showFirstButton showLastButton color="primary" />
                </Box>
              )}
            </>
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
