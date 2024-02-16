import React from "react";
import { List } from "@mui/material";

import { NavItem } from "./NavItem";
import { Item } from "./RouterList.component";
import { Paragraph } from "../Paragraph/Paragraph.component";
import { styles } from "../../settings/customStyles.setting";
import { NavCollapse } from "./NavCollapse";
import { Divider } from "../Divider/Divider.component";

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
    switch (child.type) {
      case "item":
        return <NavItem children={child} key={index} selectedIndex={props.selectedIndex} handlerIndex={handlerIndex} />;
      case "collapse":
        return <NavCollapse children={child} key={index} selectedIndex={props.selectedIndex} handlerIndex={handlerIndex} subItems={child.subItems || []} />;
    }
  });

  return (
    <>
      <List subheader={<Paragraph text={props.item.title} fontSize={15} sx={{ display: "block", ...styles.navGroup }} />}>{ItemChildrens}</List>
      <Divider />
    </>
  );
};
