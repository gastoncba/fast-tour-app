import React from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

import { Paragraph } from '../Paragraph/Paragraph.component';


interface NavbarProps {
  title: string;
  onMenuClick: () => void;
  iconsList: {
    icon: JSX.Element,
    onClick?: () => void
  }[]
}

export const Navbar: React.FC<NavbarProps> = ({ title, onMenuClick, iconsList }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Paragraph  text={title} type='title' levelTitle={3}  color='gray'/>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
            {
                iconsList.map(item => (
                    <IconButton color="inherit" aria-label="account" onClick={item.onClick}>
                        {item.icon}
                    </IconButton>
                ))
            }
        </Box>
      </Toolbar>
    </AppBar>
  );
};