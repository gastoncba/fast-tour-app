import { Box, Grid } from "@mui/material";

import { Avatar, Button, Divider, Form, List, Modal, Paragraph, Wrapper, showToast } from "../../components";
import { userProvider } from "../../providers";
import { useEffect, useState } from "react";
import { Order } from "../../models";

interface ProfileProps {}

export const ProfileScreen: React.FC<ProfileProps> = () => {
  const [form, setForm] = useState<JSX.Element | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orders = await userProvider.getOrders();
        setOrders(orders)
      } catch (error) {
        showToast({ message: "Error al cargar las ordenes del usuario", type: "error" })
      }
    }

    getOrders();
  }, [])

  const buildForm = () => {
    setShowModal(true);
    setForm(
      <Form
        inputs={[
          {
            type: "text",
            label: "Nombre",
            initialValue: { firstName: userProvider.user.firstName },
          },
          {
            type: "text",
            label: "Apellido",
            initialValue: { lastName: userProvider.user.lastName },
          },
          {
            type: "email",
            label: "Email",
            initialValue: { email: userProvider.user.email },
          },
        ]}
        onAction={update}
      />
    );
  };

  const update = async (values: any) => {
    try {
      await userProvider.update(values);
      showToast({ message: "Los datos se actualizaron exitosamente", type: "success" });
    } catch (error) {
      showToast({ message: "Error al intentar actualizar los datos", type: "error" });
    } finally {
      setShowModal(false);
    }
  };

  return (
    <>
      <Wrapper sx={{ p: 2 }}>
        <Box>
          <Paragraph text={"Perfil"} variant="h5" />
          <Divider />
        </Box>
        <Grid container sx={{ my: 2 }} columnSpacing={2} rowSpacing={2}>
          <Grid item xs={12} lg={4}>
            <Box sx={stylesContainer}>
              <Box sx={{ display: "flex", columnGap: 2, py: 2 }}>
                <Avatar size={70} />
                <Box>
                  <Paragraph text={userProvider.user.firstName + " " + userProvider.user.lastName} fontWeight={"bold"} />
                  <Paragraph text={userProvider.user.email} color="GrayText" />
                  <Paragraph text={userProvider.getRolName()} color="primary" fontWeight={"bold"} />
                </Box>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                <Button title="Editar" onClick={() => buildForm()} size="small" style={{ mt: 1 }} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={8}>
            <Box sx={stylesContainer}>
              <Box>
                <Paragraph text={"Ordenes"} variant="h6" />
                <Divider />
              </Box>
              <List button divider items={orders.map((o, index)=> ({ id: index, primaryText: o.trip.name, secondaryText: o.trip.description || undefined, value: o }))} />
            </Box>
          </Grid>
        </Grid>
      </Wrapper>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Datos de Perfil">
        {form}
      </Modal>
    </>
  );
};

const stylesContainer = { border: "1px solid rgb(227, 232, 239)", borderRadius: "4px", px: 2, py: 1, ":hover": { boxShadow: "rgba(32, 40, 45, 0.08) 0px 2px 14px 0px" }, transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms" };
