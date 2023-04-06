import React from 'react';
import { Checkbox } from 'antd';
import "antd/dist/reset.css";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Check: React.FC<Props> = ({ checked, onChange, label, disabled }) => {
  return (
    <Checkbox checked={checked} onChange={(e) => onChange(e.target.checked)} disabled={disabled}>
      {label}
    </Checkbox>
  );
};
