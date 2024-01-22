import React from "react";
import { List as ListMUI, ListItem, ListItemAvatar, ListItemText, ListItemButton } from "@mui/material";

import { Divider } from "../Divider/Divider.component";

interface Item {
  primaryText: string;
  secondaryText?: string;
  icon?: JSX.Element;
  value: any;
  id: number;
}

interface Props {
  items: Item[];
  divider?: boolean;
  button?: boolean;
  onClick?: (item: Item) => void;
}

export const List: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <ListMUI>
        {props.items.map((item, index) => {
          return (
            <React.Fragment key={item.id}>
              {props.button ? (
                <ListItemButton onClick={() => props.onClick && props.onClick(item)}>
                  {item.icon && <ListItemAvatar>{item.icon}</ListItemAvatar>}
                  <ListItemText primary={item.primaryText} secondary={item.secondaryText} primaryTypographyProps={{ component: "div" }} secondaryTypographyProps={{ component: "div", style: { whiteSpace: "pre-line" } }} />
                </ListItemButton>
              ) : (
                <ListItem>
                  {item.icon && <ListItemAvatar>{item.icon}</ListItemAvatar>}
                  <ListItemText primary={item.primaryText} secondary={item.secondaryText} primaryTypographyProps={{ component: "div" }} secondaryTypographyProps={{ component: "div", style: { whiteSpace: "pre-line" } }} />
                </ListItem>
              )}
              {props.divider && index !== props.items.length - 1 && <Divider variant="middle" />}
            </React.Fragment>
          );
        })}
      </ListMUI>
    </>
  );
};