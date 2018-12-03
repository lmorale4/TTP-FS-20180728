import React from 'react';

import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';

const Navbar = () => (
  <AppBar>
    <Toolbar>
      <NavLink to="/">
        <Button color="secondary">Portfolio</Button>
      </NavLink>
      <NavLink to="/">
        <Button color="secondary">Transactions</Button>
      </NavLink>
    </Toolbar>
  </AppBar>
);

export default Navbar;
