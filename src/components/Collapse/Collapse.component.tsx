import React from 'react';
import { Collapse as MUICollapse } from '@mui/material';

interface PropsCollapse {
  expanded: boolean;
  children: React.ReactNode;
  timeout?: 'auto' | number
}

export const Collapse: React.FC<PropsCollapse> = ({ expanded, children, timeout = 'auto'}) => {

  return (
    <MUICollapse in={expanded} timeout={timeout} unmountOnExit>
      {children}
    </MUICollapse>
  );
};
