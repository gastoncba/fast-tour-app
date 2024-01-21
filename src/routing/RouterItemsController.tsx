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
        },
        {
          id: 2,
          title: "Dashboard",
          icon: <Icon type="HOME" className="setting-item-icon" />,
          url: "dashboard",
        },
        {
          id: 3,
          title: "Panel",
          icon: <Icon type="HOME" className="setting-item-icon" />,
          url: "app",
        },
        {
          id: 4,
          title: "Clientes",
          icon: <Icon type="HOME" className="setting-item-icon" />,
          url: "app",
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
        },
      ],
    },
  ];

  return generalItems;
};
