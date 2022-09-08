import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { cyan, lime } from '@mui/material/colors'
import 'leaflet/dist/leaflet.css'

import Map from './components/Map'

import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import SideMenu from './components/SideMenu'

const theme = createTheme({
  palette: {
    primary: cyan,
    secondary: lime,
  },
})

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
])

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
})

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <WagmiConfig client={client}>
        <Map setIsDrawerOpen={setIsDrawerOpen} />
        <SideMenu isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      </WagmiConfig>
    </ThemeProvider>
  )
}

export default App
