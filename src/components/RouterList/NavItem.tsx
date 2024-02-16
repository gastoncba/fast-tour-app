import React from "react";

import { ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ItemChildren } from "./RouterList.component";
import { Paragraph } from "../Paragraph/Paragraph.component";
import { styles } from "../../settings/customStyles.setting";

interface Props {
  children: ItemChildren;
  selectedIndex: number;
  handlerIndex: (id: number) => void;
}

export const NavItem: React.FunctionComponent<Props> = (props: Props) => {
  const navigate = useNavigate();

  return (
    <ListItemButton
      selected={props.children.id === props.selectedIndex}
      onClick={() => {
        navigate(props.children.url);
        props.handlerIndex(props.children.id);
      }}
      sx={{ ...styles.navItem }}>
      <ListItemIcon sx={{ my: "auto", minWidth: 36 }}>{props.children.icon}</ListItemIcon>
      <ListItemText primary={<Paragraph text={props.children.title} fontSize={15} className={"setting-item-text"} />} />
    </ListItemButton>
  );
};
