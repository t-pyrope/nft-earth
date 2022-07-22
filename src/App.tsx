import React from 'react';
import MapView from './components/Map';
import 'leaflet/dist/leaflet.css';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <MapView />
    </>
  );
}

export default App;
