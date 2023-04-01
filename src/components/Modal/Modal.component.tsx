import { useEffect } from "react";
import { Modal as AntModal } from "antd";

interface CustomModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ open, title, onClose, children }: CustomModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  return (
    <AntModal open={open} title={title} onCancel={onClose} footer={null}>
      {children}
    </AntModal>
  );
};
