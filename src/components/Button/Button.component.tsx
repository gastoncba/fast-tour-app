import React, { CSSProperties } from 'react';
import { Button as AntdButton } from 'antd';

interface Props {
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  text: string;
  color?: string;
  style?: CSSProperties 
  onClick: (values:any) => void;
}

export const Button: React.FC<Props> = ({ type, text, color, onClick, style }) => {


    const handleClick = (value: any) => {
        onClick(value)
    }
  return (
    <AntdButton type={type || 'primary'} style={{ backgroundColor: color, ...style}} onClick={handleClick}>
      {text}
    </AntdButton>
  );
};