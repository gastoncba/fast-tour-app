import { Item } from "../components/RouterList/RouterList.component";
import { Icon } from "../components";

export const RouterItemsController = () => {
  let generalItems: Item[] = [
    {
      title: "Menu",
      children: [
        {
          id: 1,
          title: "Home",
          icon: <Icon type="HOME" className="setting-item-icon" />,
          url: "home",
          type: "item"
        },
        {
          id: 2,
          title: "Dashboard",
          icon: <Icon type="CHART" className="setting-item-icon" />,
          url: "dashboard",
          type: "item"
        },
        {
          id: 4,
          title: "Panel",
          icon: <Icon type="ADMIN-PANEL" className="setting-item-icon" />,
          url: "panel",
          type: "collapse",
          value: "trips",
          subItems: [
            {
              id: 6,
              title: "Viajes",
              value: "trip"
            },
            {
              id: 7,
              title: "Lugares",
              value: "place"
            },
            {
              id: 8,
              title: "Paises",
              value: "country"
            },
            {
              id: 9,
              title: "Hoteles",
              value: "hotel"
            }
          ]
        },
      ],
    },
    {
      title: "Configuraciones",
      children: [
        {
          id: 5,
          title: "Cuenta",
          icon: <Icon type="PROFILE" className="setting-item-icon" />,
          url: "profile",
          type: "item"
        },
      ],
    },
  ];

  return generalItems;
};
