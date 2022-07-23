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
            // TODO: adds more and more grids
            // map.removeLayer(l);
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

export function locateUser(map: Map, api: What3wordsService, words: string) {
  // TODO: add only 1 time, not every time function is invoked
  api
    .convertToCoordinates({ words, format: 'geojson' })
    .then(function (data: any) {
      const bbox = data.features[0].bbox;
      const bounds: LatLngBoundsExpression = [
        [bbox[1], bbox[2]],
        [bbox[3], bbox[0]],
      ];

      const rectangle = L.rectangle(bounds, {
        color: '#ff7800',
        weight: 1,
      }).addTo(map);
    })
    .catch(console.error);
}
