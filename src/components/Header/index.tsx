import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h4" sx={{ fontWeight: 500 }} component="h1">
          NFT E(AR)RTH & STABLECOIN
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
