import { Box, Grid } from "@mui/material";

import { Avatar, Button, Divider, Form, List, Modal, Paragraph, Wrapper, showToast } from "../../components";
import { userProvider } from "../../providers";
import { useEffect, useState } from "react";
import { Order, OrderState } from "../../models";
import { TripEmpty } from "../Panel/Trips";
import { styles } from "../../settings/customStyles.setting";

const { cardStyles, color } = styles;
const { green, red, blueberry } = color;

interface ProfileProps {}

export const OrderEmpty: Order = {
  id: 0,
  purchaseDate: "",
  numberPeople: 0,
  user: null,
  placesVisited: [],
  firstName: null,
  lastName: null,
  email: null,
  trip: TripEmpty,
  total: 0,
  state: { id: OrderState.PENDING, name: "" },
};

export const ProfileScreen: React.FC<ProfileProps> = () => {
  const [form, setForm] = useState<JSX.Element | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [order, setOrder] = useState<Order>(OrderEmpty);
  const [showOrder, setShowOrder] = useState<boolean>(false);

  const renderOrder = () => {
    return <OrderCard order={order} />;
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orders = await userProvider.getOrders();
        setOrders(orders);
      } catch (error) {
        showToast({ message: "Error al cargar las ordenes del usuario", type: "error" });
      }
    };

    getOrders();
  }, []);

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
            <Box sx={cardStyles}>
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
            <Box sx={cardStyles}>
              <Box>
                <Paragraph text={"Ordenes"} variant="h6" />
                <Divider />
              </Box>
              <List
                button
                divider
                onClick={(item) => {
                  setOrder(item.value);
                  setShowOrder(true);
                }}
                items={orders.map((o, index) => ({ id: index, primaryText: o.trip.name, secondaryText: o.trip.description || undefined, value: o }))}
              />
            </Box>
          </Grid>
        </Grid>
      </Wrapper>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Datos de Perfil">
        {form}
      </Modal>
      <Modal open={showOrder} onClose={() => setShowOrder(false)} title="Orden" fullWidth>
        {renderOrder()}
      </Modal>
    </>
  );
};

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: 2 }}>
      <Box>
        <Paragraph text={"Detalle del viaje"} color="primary" variant="h5" />
        <Box sx={{ display: "flex", columnGap: 0.5 }}>
          <Paragraph text={"Nombre:"} fontWeight={"bold"} />
          <Paragraph text={order.trip.name} />
        </Box>
        <Box sx={{ display: "flex", columnGap: 0.5 }}>
          <Paragraph text={"Descripción:"} fontWeight={"bold"} />
          <Paragraph text={order.trip.description || ""} />
        </Box>
        <Box sx={{ display: "flex", columnGap: 0.5 }}>
          <Paragraph text={"Total:"} fontWeight={"bold"} />
          <Paragraph text={order.total + " USD"} />
        </Box>
        <Box sx={{ display: "flex", columnGap: 0.5 }}>
          <Paragraph text={"Estado:"} fontWeight={"bold"} />
          <Paragraph text={order.state.name} fontWeight={"bold"} sx={{ color: order.state.id === OrderState.CANCELED ? red : order.state.id === OrderState.COMPLETED ? green : blueberry }} />
        </Box>
      </Box>
      <Box>
        <Paragraph text={"Datos del contacto"} color="primary" variant="h5" />
        <Box sx={{ display: "flex", columnGap: 0.5 }}>
          <Paragraph text={"Nombre: "} fontWeight={"bold"} />
          <Paragraph text={userProvider.user.firstName} />
        </Box>
        <Box sx={{ display: "flex", columnGap: 0.5 }}>
          <Paragraph text={"Apellido: "} fontWeight={"bold"} />
          <Paragraph text={userProvider.user.lastName} />
        </Box>
        <Box sx={{ display: "flex", columnGap: 0.5 }}>
          <Paragraph text={"Email: "} fontWeight={"bold"} />
          <Paragraph text={userProvider.user.email} />
        </Box>
      </Box>
    </Box>
  );
};
