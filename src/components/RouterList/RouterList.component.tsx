import React, { useState, useEffect } from "react";
import { Box, SxProps, Theme } from "@mui/material";

import { NavGroup } from "./NavGroup";

export type ItemChildren = {
  id: number;
  title: string;
  url: string;
  icon: JSX.Element;
  value?: any;
  type: "item" | "collapse";
  subItems?: SubItem[];
};

export type SubItem = {
  id: number,
  title: string,
  value?: any
}

export type Item = {
  title: string;
  children: ItemChildren[];
};

interface Props {
  itemsMenu: Item[];
  sx?: SxProps<Theme>;
  isCurrent: (path: string) => boolean;
}

export const RouterList: React.FunctionComponent<Props> = (props: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(1);

  const handlerIndex = (id: number) => {
    setSelectedIndex(id);
  };

  useEffect(() => {
    setSelectedIndex(1);
    for (const item of props.itemsMenu) {
      for (const children of item.children) {
        if (props.isCurrent(children.url)) {
          setSelectedIndex(children.id);
          break;
        }
      }
    }
  }, []);

  return (
    <>
      <Box sx={{ ...props.sx }}>
        {props.itemsMenu.map((itemMenu, index) => {
          return <NavGroup item={itemMenu} key={index} isCurrent={props.isCurrent} selectedIndex={selectedIndex} handlerIndex={handlerIndex} />;
        })}
      </Box>
    </>
  );
};
