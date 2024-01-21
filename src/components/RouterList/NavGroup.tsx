import React from "react";
import { List } from "@mui/material";

import { NavItem } from "./NavItem";
import { Item } from "./RouterList.component";
import { Paragraph } from "../Paragraph/Paragraph.component";
import { styles } from "../../settings/customStyles.setting";

interface Props {
  item: Item;
  selectedIndex: number;
  isCurrent: (path: string) => boolean;
  handlerIndex: (selected: number) => void;
}

export const NavGroup: React.FunctionComponent<Props> = (props: Props) => {
  const handlerIndex = (id: number) => {
    props.handlerIndex(id);
  };

  const ItemChildrens = props.item.children.map((child, index) => {
    return <NavItem children={child} key={index} selectedIndex={props.selectedIndex} handlerIndex={handlerIndex} />;
  });

  return <List subheader={<Paragraph text={props.item.title} fontSize={15} sx={{ display: "block", ...styles.navGroup }} />}>{ItemChildrens}</List>;
};
