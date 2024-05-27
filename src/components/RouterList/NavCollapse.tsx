import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import { ItemChildren, SubItem } from "./RouterList.component";
import { styles } from "../../settings/customStyles.setting";
import { Paragraph } from "../Paragraph/Paragraph.component";
import { Icon } from "../Icon/Icon.component";

interface Props {
  children: ItemChildren;
  selectedIndex: number;
  subItems: SubItem[];
  handlerIndex: (id: number) => void;
}

export const NavCollapse: React.FC<Props> = ({ children, selectedIndex, handlerIndex, subItems }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(children.subItems ? children.subItems[0].id : -1);

  const navigate = useNavigate();
  const { disabled = false } = children;

  const handleClick = () => {
    setOpen(!open);
    handlerIndex(children.id);
  };

  return (
    <>
      <ListItemButton sx={{ ...styles.navItem }} selected={selectedIndex === children.id} onClick={handleClick} disabled={disabled}>
        <ListItemIcon sx={{ my: "auto", minWidth: 36 }}>
          <Icon type={children.icon} className="setting-item-icon" />
        </ListItemIcon>
        <ListItemText primary={<Paragraph text={children.title} fontSize={15} className={"setting-item-text"} />} />
        {open ? <Icon type="ARROW-DROP-UP" sx={{ mt: "auto", mb: "auto", stroke: 1.5, fontSize: "1rem" }} /> : <Icon type="ARROW-DROP-DOWN" sx={{ mt: "auto", mb: "auto", stroke: 1.5, fontSize: "1rem" }} />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding sx={{ ...styles.navCollapse }}>
          {subItems.map((sub, index) => (
            <ListItemButton
              key={index}
              sx={{ ...styles.navItem }}
              selected={sub.id === selected}
              onClick={() => {
                setSelected(sub.id);
                navigate(children.url, { state: { value: sub.value } });
              }}>
              <ListItemText
                sx={{ px: 3 }}
                primary={
                  <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
                    <Icon type="FIBER-MANUAL" sx={{ fontSize: 7, color: "gray" }} className={"setting-item-icon"} />
                    <Paragraph text={sub.title} className={"setting-item-text"} />
                  </Box>
                }
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};
