import React from 'react';
import MapView from './components/Map';
import 'leaflet/dist/leaflet.css';
import Header from './components/Header';
import { createTheme, ThemeProvider } from '@mui/material';
import { lime } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    secondary: lime,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <MapView />
    </ThemeProvider>
  );
}

export default App;
