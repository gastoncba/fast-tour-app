import React from "react";
import { Toaster as ToasterHot, IconTheme, Renderable, toast, ToastPosition } from "react-hot-toast";
import { Box } from "@mui/material";

import { Paragraph } from "../Paragraph/Paragraph.component";
import { Button } from "../Button/Button.component";
import { themeMaterial } from "../../settings/materialTheme.setting";

interface CustomToasterProps {
  position?: ToastPosition;
}

export const Toaster: React.FC<CustomToasterProps> = ({ position = "top-center" }) => {
  return <ToasterHot position={position} reverseOrder={false} />;
};

export default Toaster;

type ToastType = "success" | "error" | "info" | "loading" | "confirmation";

interface ToastI {
  message: string;
  type: ToastType;
  position?: ToastPosition;
  duration?: number;
  style?: React.CSSProperties;
  icon?: Renderable;
  iconTheme?: IconTheme;
  className?: string;
  confirmOptions?: {
    description?: string;
    confirm: { onClick: (params?: any) => any; title?: string; style?: any };
    cancel?: { onClick?: (params?: any) => any; title?: string; style?: any };
  };
}

const { success, error } = themeMaterial.palette;

export const showToast = (input: ToastI) => {
  const { type, message, position, duration, style, icon, iconTheme, className, confirmOptions } = input;
  switch (type) {
    case "success":
      toast[type](message, { position, duration, style, icon, iconTheme, className });
      break;
    case "error":
      toast[type](message, { position, duration, style, icon, iconTheme, className });
      break;
    case "loading":
      toast[type](message, { position, duration, style, icon, iconTheme, className });
      break;
    case "info":
      toast(message, { position, duration, style, icon, iconTheme, className });
      break;
    case "confirmation":
      toast(
        () => (
          <>
            {confirmOptions && (
              <Box sx={{ width: 250, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                <Paragraph text={message} align="center" fontSize={15} fontWeight={"bold"} />
                <Paragraph text={confirmOptions.description || ""} align="center" />
                <Box sx={{ display: "flex", columnGap: 2, justifyContent: "center", py: 2 }}>
                  <Button
                    style={{ bgcolor: success.main, ":hover": { bgcolor: success.main } }}
                    title={confirmOptions.confirm.title || "Confirmar"}
                    onClick={() => {
                      confirmOptions.confirm.onClick();
                      toast.dismiss();
                    }}
                  />
                  <Button
                    style={{ bgcolor: error.main, ":hover": { bgcolor: error.main } }}
                    title={confirmOptions.cancel?.title || "cancelar"}
                    onClick={() => {
                      if (confirmOptions.cancel?.onClick) {
                        confirmOptions.cancel?.onClick();
                      }
                      toast.dismiss();
                    }}
                  />
                </Box>
              </Box>
            )}
          </>
        ),
        { duration }
      );
      break;
    default:
      break;
  }
};
