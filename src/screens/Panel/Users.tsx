import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { Pagination, Avatar, Button, GridList, Heading, Icon, List, Loader, Menu, Modal, Paragraph, Wrapper, showToast } from "../../components";
import { Order, User } from "../../models";
import { userProvider } from "../../providers";
import { styles } from "../../settings/customStyles.setting";
import { themeMaterial } from "../../settings/materialTheme.setting";
import { PAGINATION } from "../../settings/const.setting";
import { UserService } from "../../services/private/User.service";

const { success, primary, error } = themeMaterial.palette;

interface UserProps {}

export const Users: React.FC<UserProps> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchTotalUsers = async () => {
    try {
      const users = await userProvider.getUsers();
      const total = users.length;
      setTotalPages(Math.ceil(total / PAGINATION));
    } catch (error) {
      console.error("Error al obtener el total de usuarios", error);
    }
  };

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const users = await userProvider.getUsers();
      setUsers(users);
      setIsLoading(false);
    } catch (error) {
      showToast({ message: "Error al cargar los usuarios", type: "error" });
    }
  };

  useEffect(() => {
    fetchTotalUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [page]);

  return (
    <>
      <Heading title="Usuarios" />
      <Wrapper sx={{ my: 2, p: 4 }}>
        {isLoading ? <Loader /> : <GridList md={4} lg={3} xl={2} items={users} renderItem={(item: User) => <UserCard user={item} />} />}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination page={page} count={totalPages} changePage={(value) => setPage(value)} showFirstButton showLastButton color="primary" />
        </Box>
      </Wrapper>
    </>
  );
};

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const getOrders = async () => {
    try {
      const orders = await UserService.getOrders(user.id);
      setOrders(orders);
    } catch (error) {
      showToast({ message: "Error al cargar las ordenes de " + user.firstName, type: "error" });
    }
  };
  return (
    <>
      <Box sx={{ ...styles.cardStyles, background: "rgb(248 250 252)", ":hover": { border: `1px solid ${primary.main}`, boxShadow: "rgba(32, 40, 45, 0.08) 0px 2px 14px 0px" }, transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, mb: 3, alignItems: "start" }}>
          <Avatar size={70} />
          <Menu
            items={[
              { id: 1, name: "Eliminar" },
              {
                id: 2,
                name: "Ordenes",
                onClick: () => {
                  setShowModal(true);
                  getOrders();
                },
              },
            ]}
            icon={<Icon type="MORE-VERT" />}
          />
        </Box>
        <Box sx={{ my: 1 }}>
          <Paragraph text={user.firstName + "\n" + user.lastName} fontWeight={"bold"} />
          <Paragraph text={user.email} color="GrayText" fontSize={14} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", columnGap: 2, mt: 2, mb: 1 }}>
          <Button
            title="Mensaje"
            onClick={() => {}}
            startIcon={<Icon type="MESSAGE" />}
            style={{ width: "100%", background: "rgb(248 250 252)", color: success.main, border: `1px solid ${success.main}`, ":hover": { background: "rgb(248 250 252)" } }}
          />
          <Button title="Bloquear" onClick={() => {}} startIcon={<Icon type="BLOCK" />} style={{ width: "100%", background: "rgb(248 250 252)", color: error.main, border: `1px solid ${error.main}`, ":hover": { background: "rgb(248 250 252)" } }} />
        </Box>
      </Box>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Ordenes" fullWidth>
        {orders.length > 0 ? <List items={orders.map((o) => ({ id: o.id, value: o, primaryText: o.trip.name, secondaryText: (o.trip.description || "") + "\nEstado: " + o.state.name }))} /> : <Paragraph text={user.firstName + " no tiene ordenes"} />}
      </Modal>
    </>
  );
};
