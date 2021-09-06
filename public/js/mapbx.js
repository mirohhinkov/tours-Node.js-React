import './mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoibWlyb2hoaW5rb3YiLCJhIjoiY2tvYWU3YW9rMm9hbzJwbHlqMGQ5cDVpMiJ9.ca02W3_W71D3KKuL1SVmEA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
});
