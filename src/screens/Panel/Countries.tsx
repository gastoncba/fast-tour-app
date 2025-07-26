import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { Heading, Tooltip, IconButton, Icon, Loader, GridList, Paragraph, Card, showToast, Modal, Form, Menu, Filter } from "../../components";
import { Pagination } from "../../components/Pagination/Pagination.component";
import { Country, PaginatedResponse } from "../../models";
import { CountryService } from "../../services";

interface CountriesProps {}

export const Countries: React.FC<CountriesProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [countriesData, setCountriesData] = useState<PaginatedResponse<Country>>({
    page: 1,
    items: [],
    count: 0,
    totalItems: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [form, setForm] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const fetchCountries = async (page: number = 1, limit: number = 10, query?: string) => {
    setLoading(true);
    try {
      const response = await CountryService.getCountriesPaginated(page, limit, query);
      setCountriesData(response);
    } catch (error) {
      showToast({ message: "Error al consultar los paises", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  useEffect(() => {
    fetchCountries(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const createCountry = async (value: any) => {
    try {
      await CountryService.createCountry({ name: value.name, code: value.code });
      showToast({ message: "País creado exitosamente", type: "success" });
      fetchCountries(currentPage, pageSize);
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
      fetchCountries(currentPage, pageSize);
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
      fetchCountries(currentPage, pageSize);
    } catch (error) {
      showToast({ message: "Error al intentar eliminar país", type: "error" });
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
    const query = name ? `name=${encodeURIComponent(name)}` : "";
    fetchCountries(1, pageSize, query);
    setCurrentPage(1);
  };

  const handlerClose = async () => {
    fetchCountries(currentPage, pageSize);
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
          {countriesData.items.length > 0 ? (
            <>
              <GridList
                items={countriesData.items}
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
              <Pagination
                data={countriesData}
                onPageChange={handlePageChange}
                loading={loading}
                showSizeChanger={true}
                showQuickJumper={true}
                showTotal={true}
              />
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
