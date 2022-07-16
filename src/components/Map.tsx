import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

function MapView() {
  const [baseViewCoords, setBaseViewCoords] = useState<LatLngTuple>([
    50.0755, 14.4378,
  ]);

  return (
    <MapContainer center={baseViewCoords} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default MapView;
