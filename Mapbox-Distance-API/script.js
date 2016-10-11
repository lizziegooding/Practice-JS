// Sandbox for Mapbox-Distance-API

  // Personal access token
mapboxgl.accessToken = 'pk.eyJ1IjoibGl6emllZ29vZGluZyIsImEiOiJjaW92cmc1NHYwMWJsdW9tOHowdTA2cnFsIn0.lFq-Wju99kZ_dR_2TMBYCQ';

//Add a new Mapbox GL Map object
var map = new mapboxgl.Map({
  // Place inside #map div
  container: 'map',
  // Use streets basemap
  style: 'mapbox://styles/mapbox/streets-v9',
  // Center on Portland, OR
  center: [-122.6765, 45.5231],
  //Zoom 10 to see full city
  zoom: 10
});

//Add Driving Directions plugin
map.addControl(new mapboxgl.Directions());
