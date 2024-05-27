import React from "react";

import { ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ItemChildren } from "./RouterList.component";
import { Paragraph } from "../Paragraph/Paragraph.component";
import { styles } from "../../settings/customStyles.setting";
import { Icon } from "../Icon/Icon.component";

interface Props {
  children: ItemChildren;
  selectedIndex: number;
  handlerIndex: (id: number) => void;
}

export const NavItem: React.FunctionComponent<Props> = (props: Props) => {
  const navigate = useNavigate();
  const { disabled = false } = props.children

  return (
    <ListItemButton
      selected={props.children.id === props.selectedIndex}
      onClick={() => {
        navigate(props.children.url);
        props.handlerIndex(props.children.id);
      }}
      disabled={disabled}
      sx={{ ...styles.navItem }}>
      <ListItemIcon sx={{ my: "auto", minWidth: 36 }}>
        <Icon type={props.children.icon} className="setting-item-icon" />
      </ListItemIcon>
      <ListItemText primary={<Paragraph text={props.children.title} fontSize={15} className={"setting-item-text"} />} />
    </ListItemButton>
  );
};
