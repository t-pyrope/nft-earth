import React from 'react';
import { createTheme, ThemeProvider, Toolbar } from '@mui/material';
import { green, lime } from '@mui/material/colors';
import 'leaflet/dist/leaflet.css';

import MapView from './components/Map';
import Header from './components/Header';

const theme = createTheme({
  palette: {
    primary: green,
    secondary: lime,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Toolbar />
      <MapView />
    </ThemeProvider>
  );
}

export default App;
