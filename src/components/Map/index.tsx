import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import what3words from '@what3words/api';
import { What3wordsService } from '@what3words/api/dist/service';

import { drawGrid } from '../../helpers/map';

function Grid({ api }: { api: What3wordsService }) {
  const map = useMap();

  useEffect(() => {
    map.whenReady(() => drawGrid(map, api));
    map.on('move', () => drawGrid(map, api));
  }, [map]);
  return null;
}

function MapView() {
  const [baseViewCoords, setBaseViewCoords] = useState<LatLngTuple>([
    50.0755, 14.4378,
  ]);
  const api = what3words();
  api.setApiKey(process.env.REACT_APP_API_KEY ?? '');
  // const data = api
  //   .convertToCoordinates({ words: 'daring.lion.race' })
  //   .then((value) => {
  //     console.log(value);
  //     return value;
  //   });

  return (
    <MapContainer
      center={baseViewCoords}
      zoom={19}
      scrollWheelZoom={false}
      maxZoom={21}
      minZoom={19}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxNativeZoom={19}
        maxZoom={21}
        minZoom={19}
      />
      <Grid api={api} />
    </MapContainer>
  );
}

export default MapView;
