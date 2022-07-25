import L, { LatLngBoundsExpression, Map } from 'leaflet';
import { What3wordsService } from '@what3words/api/dist/service';

export function drawGrid(map: Map, api: What3wordsService) {
  const zoom = map.getZoom();
  const loadFeatures = zoom > 17;

  if (loadFeatures) {
    // Zoom level is high enough
    const ne = map.getBounds().getNorthEast();
    const sw = map.getBounds().getSouthWest();

    // Call the what3words Grid API to obtain the grid squares within the current visble bounding box
    api
      .gridSection({
        boundingBox: {
          southwest: {
            lat: sw.lat,
            lng: sw.lng,
          },
          northeast: {
            lat: ne.lat,
            lng: ne.lng,
          },
        },
        format: 'geojson',
      })
      .then(function (data: any) {
        // If the grid layer is already present, remove it as it will need to be replaced by the new grid section
        map.eachLayer((l) => {
          if (l.getPane()?.className?.includes('leaflet-overlay-pane')) {
            map.removeLayer(l);
          }
        });

        L.geoJSON(data, {
          style: function () {
            return {
              color: '#8d8d8d',
              stroke: true,
              weight: 0.5,
            };
          },
        }).addTo(map);
      })
      .catch(console.error);
  }
}

function addSquare(
  api: What3wordsService,
  words: string,
  color: string,
  map: Map,
  pane: string,
) {
  api
    .convertToCoordinates({ words, format: 'geojson' })
    .then(function (data: any) {
      const bbox = data.features[0].bbox;
      const bounds: LatLngBoundsExpression = [
        [bbox[1], bbox[2]],
        [bbox[3], bbox[0]],
      ];

      L.rectangle(bounds, {
        color,
        weight: 1,
        pane,
      }).addTo(map);
    })
    .catch(console.error);
}

export function locateUser(map: Map, api: What3wordsService, words: string) {
  map.eachLayer((l) => {
    if (!l.getPane('loc')) {
      map.createPane('loc');
      const locPane = map.getPane('loc');
      if (locPane) locPane.style.zIndex = '450';
    }
    if (l instanceof L.Rectangle) {
      map.removeLayer(l);
    }
  });
  const locPane = map.getPane('loc');
  if (locPane)
    addSquare(api, words, '#C62828', map, locPane as unknown as string);
}

export function drawChosenSquares(
  map: Map,
  api: What3wordsService,
  chosenSquares: string[],
) {
  map.eachLayer((l) => {
    if (!l.getPane('chosen')) {
      map.createPane('chosen');
      const chosenPane = map.getPane('chosen');
      if (chosenPane) chosenPane.style.zIndex = '475';
    }
  });
  const chosenPane = map.getPane('chosen');
  if (chosenPane)
    chosenSquares.map((words) => {
      addSquare(api, words, '#388E3C', map, chosenPane as unknown as string);
    });
}

export function unlocateUser(map: Map) {
  map.eachLayer((l) => {
    if (l instanceof L.Rectangle) {
      map.removeLayer(l);
    }
  });
}
