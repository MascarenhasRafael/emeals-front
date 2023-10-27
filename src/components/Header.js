import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href='/'>
            <img src='https://emeals.com/img/style-guide/branding/emeals-logo-v3.svg' alt='logo' />
          </a>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
