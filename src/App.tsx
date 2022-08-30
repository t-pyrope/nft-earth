import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { cyan, lime } from "@mui/material/colors";
import "leaflet/dist/leaflet.css";

import Map from "./components/Map";

const theme = createTheme({
  palette: {
    primary: cyan,
    secondary: lime,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Map />
    </ThemeProvider>
  );
}

export default App;
