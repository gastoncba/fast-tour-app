import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import { Divider, Heading, GridList, Card, Paragraph, showToast, Loader, Icon, Form, Modal, Tooltip, Range } from "../../components";
import { Trip } from "../../models";
import { TripService } from "../../services";
import { IconButton } from "../../components/IconButton/IconButton.component";

interface TripProps {}

export const Trips: React.FC<TripProps> = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [form, setForm] = useState<any>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getTrips = async () => {
    setIsLoading(true);
    try {
      let trips = await TripService.getTrips();
      setTrips(trips);
    } catch {
      showToast("error", "Error al cargar los viajes disponibles");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTrips();
  }, []);

  const buildForm = () => {
    setOpenModal(true);
    setForm(
      <Form
        fields={[
          {
            label: "Nombre",
            type: "text",
            initialValue: { name: "" },
          },
          {
            label: "Descripción",
            type: "text",
            initialValue: { description: "" },
            multiline: true,
          },
          {
            label: "Precio",
            type: "number",
            initialValue: { price: "" },
          },
        ]}
        children={
          <Box sx={{ display: "flex", columnGap: 2, alignItems: "center" }}>
            <Range format="YYYY-MM-DD" onChange={(dateStrings) => console.log("rango => ", dateStrings)} />
            <Paragraph text={"Rango de fechas"} />
          </Box>
        }
        submitText="Guardar"
        onAction={() => new Promise<void>(async (resolve, reject) => {})}
      />
    );
  };

  return (
    <>
      <Heading title="Viajes disponibles" />
      <Box sx={{ py: 2 }}>
        <Divider />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", pb: 2 }}>
        <Tooltip text="Agregar viaje" position="right">
          <Box>
            <IconButton onClick={() => buildForm()} icon={<Icon type="PLUS" />} buttonStyle={{ bgcolor: "primary.main", color: "white", ":hover": { bgcolor: "primary.main", color: "white" } }} />
          </Box>
        </Tooltip>
      </Box>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {trips.length > 0 ? (
            <GridList
              direction="row"
              items={trips}
              renderItem={(item: Trip) => (
                <Card
                  title={item.name}
                  description={`Salida y Regreso: ${item.startDate} - ${item.endDate}`}
                  other={`Precio: USD ${item.price}`}
                  coverImage={item.img}
                  onClickArea={() => {
                    // setModalTitle(item.name);
                    // setOpen(true);
                    // getTrip(item.id);
                  }}
                />
              )}
            />
          ) : (
            <Paragraph text="No se encontraron viajes" variant="h5" align="center" />
          )}
          <Modal open={openModal} onClose={() => setOpenModal(false)} title="Viaje">
            {form}
          </Modal>
        </>
      )}
    </>
  );
};
