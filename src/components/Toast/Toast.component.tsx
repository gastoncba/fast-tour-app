import { notification } from 'antd';

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
