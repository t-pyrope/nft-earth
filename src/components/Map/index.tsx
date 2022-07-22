import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import what3words from '@what3words/api';
import { What3wordsService } from '@what3words/api/dist/service';

import { drawGrid } from '../../helpers/map';
import { Button } from '@mui/material';

function Grid({ api }: { api: What3wordsService }) {
  const map = useMap();

  useEffect(() => {
    map.whenReady(() => drawGrid(map, api));
    map.on('move', () => drawGrid(map, api));
  }, [map]);
  return null;
}

function FlyMapTo({ mapChanged }: { mapChanged: number | undefined }) {
  const map = useMap();

  useEffect(() => {
    if (!mapChanged) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          map.flyTo([position.coords.latitude, position.coords.longitude]);
        },
        (e) => console.error(e),
        { enableHighAccuracy: true },
      );
    } else {
      console.log('no');
    }
  }, [mapChanged]);

  return null;
}

function MapView() {
  const [mapChanged, setMapChanged] = useState<number>();
  const baseViewCoords: LatLngTuple = [50.0755, 14.4378];

  const api = what3words();
  api.setApiKey(process.env.REACT_APP_API_KEY ?? '');
  // const data = api
  //   .convertToCoordinates({ words: 'daring.lion.race' })
  //   .then((value) => {
  //     console.log(value);
  //     return value;
  //   });

  const onClick = () => {
    setMapChanged(Math.random());
  };

  return (
    <>
      <MapContainer
        center={baseViewCoords}
        zoom={19}
        scrollWheelZoom={false}
        maxZoom={21}
        minZoom={18}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxNativeZoom={19}
          maxZoom={21}
          minZoom={18}
        />
        <Grid api={api} />
        <FlyMapTo mapChanged={mapChanged} />
      </MapContainer>
      <Button
        onClick={onClick}
        color="secondary"
        variant="contained"
        sx={{
          position: 'absolute',
          bottom: '30px',
          right: '20px',
          zIndex: 401,
          fontWeight: 600,
        }}>
        Start tracking
      </Button>
    </>
  );
}

export default MapView;
