import React, { useEffect, useState } from "react";
import { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import what3words from "@what3words/api";
import { What3wordsService } from "@what3words/api/dist/service";

import { GREEN } from "../constants";
import { drawChosenSquares, drawGrid } from "../helpers";
import AddressBox from "./AddressBox";
import { Box, Button } from "@mui/material";

function Grid({
  api,
  setMoveEnd,
  setLineOpacity,
}: {
  api: What3wordsService;
  setMoveEnd: React.Dispatch<React.SetStateAction<number>>;
  setLineOpacity: React.Dispatch<React.SetStateAction<number>>;
}) {
  const map = useMap();

  useEffect(() => {
    map.whenReady(() => drawGrid(map, api));
    map.on("moveend", () => {
      setMoveEnd(Math.random());
      drawGrid(map, api);
    });
    map.on("movestart", () => {
      setLineOpacity(0);
    });
  }, [map, api]);

  return null;
}

function ChosenSquares({
  api,
  chosenSquares,
  isTracking,
  words,
}: {
  chosenSquares: string[];
  api: What3wordsService;
  isTracking: boolean;
  words: string;
}) {
  const map = useMap();

  useEffect(() => {
    if (chosenSquares.length) {
      if (isTracking) {
        drawChosenSquares(map, api, chosenSquares, isTracking);
      } else {
        drawChosenSquares(map, api, [words], isTracking);
      }
    }
  }, [chosenSquares, api, map]);

  return null;
}

function Map() {
  const [hasAccessToLocation, setHasAccessToLocation] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [chosenSquares, setChosenSquares] = useState<Array<string>>([]);
  const [words, setWords] = useState("");
  const [initialCoords, setInitialCoords] = useState<LatLngTuple>();
  const [moveEnd, setMoveEnd] = useState(0);

  const [lineRight, setLineRight] = useState(0);
  const [lineBottom, setLineBottom] = useState(0);
  const [lineOpacity, setLineOpacity] = useState(1);

  const api = what3words();
  api.setApiKey(import.meta.env.VITE_API_KEY ?? "");

  useEffect(() => {
    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        setHasAccessToLocation(true);
        const {
          coords: { latitude, longitude },
        } = position;
        if (
          !initialCoords ||
          (initialCoords[0] !== latitude && initialCoords[1] !== longitude)
        ) {
          console.log("position changed");
          setInitialCoords([latitude, longitude]);
          api
            .convertTo3wa({
              coordinates: {
                lat: latitude,
                lng: longitude,
              },
            })
            .then((res) => {
              console.log("api.convertTo3wa");
              setWords(res.words);
              if (!chosenSquares.includes(res.words)) {
                setChosenSquares([...chosenSquares, res.words]);
              }
            })
            .catch((err) => {
              setHasAccessToLocation(false);
              console.error(err);
            });
        }
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, [initialCoords, chosenSquares]);

  useEffect(() => {
    if (isClaiming) return;
    const el = document.getElementsByClassName(words + GREEN.slice(1))[0];

    // bug here
    if (el) {
      const rect = el.getBoundingClientRect();
      setLineRight(rect.left - 50);
      setLineBottom(rect.bottom - 60);
      setLineOpacity(1);
    }
  }, [moveEnd, chosenSquares, isClaiming]);

  const startTracking = () => {
    setIsClaiming(true);
  };

  const finishTracking = () => {
    setIsClaiming(false);
  };

  if (!hasAccessToLocation || !initialCoords)
    return <div style={{ margin: "2rem" }}>Loading...</div>;

  return (
    <>
      <MapContainer
        center={initialCoords}
        zoom={19}
        scrollWheelZoom={false}
        maxZoom={21}
        minZoom={18}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxNativeZoom={19}
          maxZoom={21}
          minZoom={18}
        />
        <Grid
          api={api}
          setMoveEnd={setMoveEnd}
          setLineOpacity={setLineOpacity}
        />
        <ChosenSquares
          chosenSquares={chosenSquares}
          api={api}
          isTracking={isClaiming}
          words={words}
        />
      </MapContainer>
      {!isClaiming && (
        <div
          className="line-text"
          style={{
            top: lineBottom + 15 + "px",
            left: lineRight + 50 + "px",
            opacity: lineOpacity,
          }}
        >
          You are here
        </div>
      )}
      <AddressBox
        words={words}
        lineRight={lineRight}
        lineBottom={lineBottom}
        lineOpacity={lineOpacity}
      />
      <div
        style={{
          position: "absolute",
          bottom: "80px",
          left: "50px",
          right: "50px",

          fontSize: "13px",
          padding: "5px",
          background: "#fff",
          zIndex: 401,
        }}
      >
        {chosenSquares.join(" ")}
      </div>
      <Box
        sx={{
          position: "absolute",
          bottom: "30px",
          right: "50px",
          left: "50px",
          zIndex: 401,
        }}
      >
        {isClaiming ? (
          <Button
            onClick={finishTracking}
            color="error"
            variant="contained"
            size="large"
          >
            Claim land
          </Button>
        ) : (
          <Button onClick={startTracking} color="primary" variant="contained">
            Claim tile
          </Button>
        )}
      </Box>
    </>
  );
}

export default Map;
