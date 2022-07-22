import L, { Map } from 'leaflet';
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
          if (l.getPane()?.className?.includes('leaflet-overlay-pane'))
            map.removeLayer(l);
        });
        L.geoJSON(data, {
          style: function () {
            return {
              color: '#777',
              stroke: true,
              weight: 0.5,
            };
          },
        }).addTo(map);
      })
      .catch(console.error);
  }
}
