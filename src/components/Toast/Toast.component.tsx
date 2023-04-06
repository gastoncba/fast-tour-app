import { notification } from 'antd';
import "antd/dist/reset.css";

interface Props {
  type: 'success' | 'error';
  message: string;
  description?: string;
}

export const Toast: React.FC<Props> = ({ type, message, description }) => {
  notification[type]({
    message,
    description,
    placement: 'top',
  });

  return null;
};
