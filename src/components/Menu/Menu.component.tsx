import React, { useState } from "react";
import { Menu as MenuMUI, MenuItem } from "@mui/material";

import { Button } from "../Button/Button.component";
import { IconButton } from "../IconButton/IconButton.component";
import { menuStyles } from "./styles"

interface Props {
  items: { id: number; name: string; value?: any; onClick?: any }[];
  text?: string;
  icon?: JSX.Element;
}

export const Menu: React.FunctionComponent<Props> = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {props.text ? (
        <Button onClick={handleClick} title={props.text} />
      ) : (
        <IconButton icon={props.icon} onClick={handleClick} />
      )}

      <MenuMUI anchorEl={anchorEl} open={open} onClose={handleClose} sx={{".MuiMenu-paper" : menuStyles }}>
        {props.items.map((item) => {
          return (
            <MenuItem
              onClick={() => {
                item.onClick && item.onClick();
                handleClose();
              }}
              key={item.id}
            >
              {item.name}
            </MenuItem>
          );
        })}
      </MenuMUI>
    </>
  );
};
