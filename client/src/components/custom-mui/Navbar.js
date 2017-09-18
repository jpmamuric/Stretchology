import React  from 'react';
import AppBar from 'material-ui/AppBar';

const Navbar = ({ title, onLeftIconButtonTouchTap }) => {
  return (
    <AppBar
     title={title}
     onLeftIconButtonTouchTap={onLeftIconButtonTouchTap}
    />
  )
}

export default Navbar;
