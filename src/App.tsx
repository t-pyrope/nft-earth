import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { cyan, lime } from "@mui/material/colors";
import "leaflet/dist/leaflet.css";

import Map from "./components/Map";

// moralis & wagmi
import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Login from "./components/Login";
import Moralis from 'moralis';

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

const theme = createTheme({
  palette: {
    primary: cyan,
    secondary: lime,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <WagmiConfig client={client}>
        <Login />
        <Map />
      </WagmiConfig>
    </ThemeProvider>
  );
}

export default App;
