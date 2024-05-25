import { useEffect, useState } from "react";

import { Heading, Modal, Table, Wrapper, showToast } from "../../components";
import { Order, OrderState } from "../../models";
import { OrderServices } from "../../services";
import { IRow } from "../../components/Table/Table.component";
import { OrderCard, OrderEmpty } from "../Profile/Profile.screen";
import { ButtonI } from "../../components/Button/Button.component";
import { styles } from "../../settings/customStyles.setting";

const { green, blueberry, red } = styles.color;

interface OrdersProps {}

export const Orders: React.FC<OrdersProps> = () => {
  const [rows, setRows] = useState<IRow[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [order, setOrder] = useState<Order>(OrderEmpty);

  const buildRows = (orders: Order[]) => {
    setRows(
      orders.map((o) => ({
        id: o.id,
        onClick: () => {
          setShowModal(true);
          setOrder(o);
        },
        items: [
          { value: o.id },
          { value: o.trip.name },
          { value: o.trip.startDate + " hasta el " + o.trip.endDate },
          { value: o.purchaseDate },
          { value: o.state.name, styles: { fontWeight: "bold", color: o.state.id === OrderState.CANCELED ? red : o.state.id === OrderState.COMPLETED ? green : blueberry } },
        ],
      }))
    );
  };

  const renderOrder = () => {
    return <OrderCard order={order} />;
  };

  const getOrders = async () => {
    try {
      const orders = await OrderServices.getOrders();
      buildRows(orders);
    } catch (error) {
      showToast({ message: "Error al cargar los ordenes", type: "error" });
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const nextState = async (orderId: number, nextState: string, name: string) => {
    try {
      await OrderServices.nextState(orderId, nextState);
      showToast({ message: "La orden a pasado a estado " + name + " exitosamente", type: "success" });
      getOrders();
    } catch (error) {
      showToast({ message: "Error al pasar al estado " + name, type: "error" });
    } finally {
      setShowModal(false);
    }
  };

  const buildButtons = (): ButtonI[] => {
    const cancel = () => {
      return showToast({
        message: "Cancelar orden",
        type: "confirmation",
        confirmOptions: { description: "Seguro que desea cancelar la orden?", confirm: { title: "Cancelar", onClick: () => nextState(order.id, "cancel", "cancelada") }, cancel: { title: "volver" } },
      });
    };
    switch (order.state.id) {
      case "PENDING":
        return [
          { title: "Confirmar", onClick: () => nextState(order.id, "confirm", "confirmada") },
          { title: "Cancelar", onClick: () => cancel() },
        ];
      case "CONFIRMED":
        return [
          { title: "Pasar a pagada", onClick: () => nextState(order.id, "pay", "pagada") },
          { title: "Cancelar", onClick: () => cancel() },
        ];
      case "PAID":
        return [
          { title: "Completar", onClick: () => nextState(order.id, "complete", "completada") },
          { title: "Cancelar", onClick: () => cancel() },
        ];
      default:
        return [];
    }
  };

  return (
    <>
      <Heading title="Ordenes" />
      <Wrapper sx={{ p: 2, my: 2 }}>
        <Table columns={[{ title: "#Orden" }, { title: "Viaje" }, { title: "Rango de fechas" }, { title: "Fecha de compra" }, { title: "Estado" }]} rows={rows} />
      </Wrapper>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Orden" fullWidth buttons={buildButtons()}>
        {renderOrder()}
      </Modal>
    </>
  );
};
