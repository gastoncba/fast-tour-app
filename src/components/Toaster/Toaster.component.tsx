import React from "react";
import { Toaster as ToasterHot, toast, ToastOptions, ToastPosition } from "react-hot-toast";
import { Box } from "@mui/material";

import { Paragraph } from "../Paragraph/Paragraph.component";
import { Button } from "../Button/Button.component";

interface CustomToasterProps {
  position?: ToastPosition;
}

export const Toaster: React.FC<CustomToasterProps> = ({ position = "top-center" }) => {
  return (
    <ToasterHot position={position} reverseOrder={false} />
  );
};

export default Toaster;

export const showToast = (type: "success" | "error" | "info" | "confirmation", message: string, extra?: { options?: ToastOptions, onConfirm?: () => void, description?: string}) => {
  switch (type) {
    case "success":
      toast[type](message, { ...extra?.options });
      break;
    case "error":
      toast[type](message, { ...extra?.options });
      break;
    case "info":
      toast(message, { ...extra?.options });
      break;
    case "confirmation": 
      toast(() => (
        <Box>
          <Paragraph text={message} align="center" fontSize={15} fontWeight={"bold"} />
          <Paragraph text={extra?.description || ""} align="center"/>
          <Box sx={{ display: "flex", columnGap: 2, justifyContent: "center", py: 2 }}>
            <Button title="confirmar" onClick={() => {
              extra?.onConfirm && extra.onConfirm()
              toast.dismiss()
            }} />
            <Button title="cancelar" onClick={() => toast.dismiss()} variant="outlined" />
          </Box>
        </Box>
      ));
      break;
    default:
      break;
  }
};
