import React from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Dialog, DialogActions, DialogContent, DialogTitle, SxProps, Theme, Breakpoint } from "@mui/material";

import { Button, ButtonI } from "../Button/Button.component";
import { IconButton } from "../IconButton/IconButton.component";
import { Icon } from "../Icon/Icon.component";

export interface Props {
  open: boolean;
  title: string;
  onClose: (params?: any) => any;
  buttons?: ButtonI[];
  contentStyle?: SxProps<Theme>;
  modalStyle?: SxProps<Theme>;
  children: React.ReactNode;
  fullWidth?: boolean;
  maxWidth?: Breakpoint | false;
}

export const Modal: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <Dialog onClose={props.onClose} open={props.open} sx={{ ...props.modalStyle }} fullWidth={props.fullWidth} maxWidth={props.maxWidth || "sm"}>
      <DialogTitle sx={{ px: 2, pb: 0, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        {props.title}
        <IconButton icon={<Icon type="CLOSE" />} onClick={props.onClose} />
      </DialogTitle>
      <PerfectScrollbar>
        <DialogContent sx={{ p: 2, ...props.contentStyle }}>{props.children}</DialogContent>
        <DialogActions sx={{ px: 2, pt: 0 }}>
          {props.buttons?.map(({ title, onClick, style, variant, startIcon }, index) => (
            <Button key={index} variant={variant} style={style} title={title} onClick={onClick} startIcon={startIcon} />
          ))}
        </DialogActions>
      </PerfectScrollbar>
    </Dialog>
  );
};
