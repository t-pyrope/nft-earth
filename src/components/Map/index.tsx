import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import what3words from '@what3words/api';
import { What3wordsService } from '@what3words/api/dist/service';

import { drawGrid } from '../../helpers/map';
import { Box, Button } from '@mui/material';

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
    navigator.geolocation?.getCurrentPosition(
      (position) => {
        map.flyTo([position.coords.latitude, position.coords.longitude]);
      },
      (e) => console.error(e),
      { enableHighAccuracy: true },
    );
  }, [mapChanged]);

  return null;
}

function MapView() {
  const [mapChanged, setMapChanged] = useState<number>();
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chosenSquares, setChosenSquares] = useState<Array<string>>([]);
  const baseViewCoords: LatLngTuple = [50.0755, 14.4378];

  const api = what3words();
  api.setApiKey(process.env.REACT_APP_API_KEY ?? '');

  const startTracking = () => {
    setMapChanged(Math.random());
    if (!isTracking) setIsTracking(true);
  };

  const finishTracking = () => setIsTracking(false);

  const addSquare = () => {
    setMapChanged(Math.random());
    setIsLoading(true);

    navigator.geolocation?.getCurrentPosition(
      (position) => {
        api
          .convertTo3wa({
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          })
          .then(function (response) {
            if (!chosenSquares.includes(response.words)) {
              setChosenSquares((prev) => [...prev, response.words]);
            }
            setIsLoading(false);
          })
          .catch((err) => console.error(err));
      },
      (e) => console.error(e),
      { enableHighAccuracy: true },
    );
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
      {isTracking ? (
        <Box
          sx={{
            position: 'absolute',
            bottom: '30px',
            right: '20px',
            zIndex: 401,
            fontWeight: 600,
          }}>
          <Button
            onClick={addSquare}
            disabled={isLoading}
            color="secondary"
            variant="contained"
            sx={{ fontWeight: 600 }}>
            {isLoading ? 'Loading' : 'Add square'}
          </Button>
          <Button
            onClick={finishTracking}
            color="error"
            variant="contained"
            sx={{ marginLeft: '1rem', fontWeight: 600 }}>
            Finish
          </Button>
        </Box>
      ) : (
        <Button
          onClick={startTracking}
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
      )}
    </>
  );
}

export default MapView;
