import { Rate as RateAntd } from "antd";
import "antd/dist/reset.css";

interface RateProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
}

export const Rate: React.FC<RateProps> = ({ value, onChange, readonly = false }) => {
  return <RateAntd onChange={onChange} value={value} disabled={readonly} allowHalf />;
};
