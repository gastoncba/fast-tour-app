import React from 'react';
import { Chip as MUIChip } from '@mui/material';

interface ChipProps {
    label: string;
    color?: "primary" | "default" | "secondary" | "error" | "info" | "success" | "warning";
    variant?: 'filled' | 'outlined';
    onDelete?: () => void;
    avatar?: JSX.Element;
    icon?: JSX.Element,
    deleteIcon?: JSX.Element 
    onClick?: () => void;
  }

  export const Chip: React.FC<ChipProps> = ({
    label,
    color = 'primary',
    variant,
    onDelete,
    avatar,
    icon,
    deleteIcon,
    onClick
  }) => {
    return (
      <MUIChip
        label={label}
        color={color}
        variant={variant}
        onDelete={onDelete}
        avatar={avatar}
        icon={icon}
        deleteIcon={deleteIcon}
        onClick={onClick}
      />
    );
  };

  