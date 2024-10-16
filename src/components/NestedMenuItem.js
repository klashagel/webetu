import React, { useState } from 'react';
import { MenuItem, Menu } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const NestedMenuItem = ({ label, children, parentMenuOpen, onClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
    if (onClick) {
      onClick(event);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isSubMenuOpen = Boolean(anchorEl) && parentMenuOpen;

  return (
    <>
      <MenuItem onClick={handleClick}>
        {label}
        <ArrowRightIcon style={{ marginLeft: 'auto' }} />
      </MenuItem>
      <Menu
        anchorEl={anchorEl}
        open={isSubMenuOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {children}
      </Menu>
    </>
  );
};

export default NestedMenuItem;