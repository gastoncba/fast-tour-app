import { Item } from "../components/RouterList/RouterList.component";
import { userProvider } from "../providers";

export const useRouterItemsController = () => {
  let generalItems: Item[] = [
    {
      title: "Menu",
      children: [
        {
          id: 1,
          title: "Home",
          icon: "HOME",
          url: "home",
          type: "item",
        },
        {
          id: 2,
          title: "Dashboard",
          icon: "CHART",
          url: "dashboard",
          type: "item",
          disabled: !userProvider.user.isLogged || !userProvider.isAdmin(),
        },
        {
          id: 4,
          title: "Panel",
          icon: "ADMIN-PANEL",
          url: "panel",
          type: "collapse",
          value: "trips",
          disabled: !userProvider.user.isLogged || !userProvider.isAdmin(),
          subItems: [
            {
              id: 6,
              title: "Viajes",
              value: "trip",
            },
            {
              id: 7,
              title: "Lugares",
              value: "place",
            },
            {
              id: 8,
              title: "Paises",
              value: "country",
            },
            {
              id: 9,
              title: "Hoteles",
              value: "hotel",
            },
            {
              id: 10,
              title: "Usuarios",
              value: "user",
            },
            {
              id: 11,
              title: "Ordenes",
              value: "order",
            },
          ],
        },
      ],
    },
    {
      title: "Configuraciones",
      children: [
        {
          id: 5,
          title: "Cuenta",
          icon: "PROFILE",
          url: "profile",
          type: "item",
        },
      ],
    },
  ];

  return generalItems;
};
