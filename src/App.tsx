import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { cyan, lime } from "@mui/material/colors";
import "leaflet/dist/leaflet.css";

import Map from "./components/Map";

import { createClient, configureChains, defaultChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
// @ts-ignore
import Login from './components/Login.jsx';

const theme = createTheme({
  palette: {
    primary: cyan,
    secondary: lime,
  },
});

const { provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <WagmiConfig client={client}>
        <Login />
        {/*<Map />*/}
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default App;
