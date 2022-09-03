import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { cyan, lime } from "@mui/material/colors";
import "leaflet/dist/leaflet.css";

import Map from "./components/Map";

import { MoralisProvider } from 'react-moralis';
// @ts-ignore
import Login from './components/Login.jsx';

const theme = createTheme({
  palette: {
    primary: cyan,
    secondary: lime,
  },
});

function App() {
  const serverurl = import.meta.env.VITE_SERVER_URL;
  const appid     = import.meta.env.VITE_APP_ID;
  return (
    <MoralisProvider serverUrl={serverurl} appId={appid}>
      <ThemeProvider theme={theme}>
        {serverurl}
        <Login />
        {/*<Map />*/}
      </ThemeProvider>
    </MoralisProvider>
  );
}

export default App;