// Sandbox for Mapbox-Distance-API

  // Personal access token
mapboxgl.accessToken = 'pk.eyJ1IjoibGl6emllZ29vZGluZyIsImEiOiJjaW92cmc1NHYwMWJsdW9tOHowdTA2cnFsIn0.lFq-Wju99kZ_dR_2TMBYCQ';

var euclidean;
var network;
var networkH1 = $('#output h1:nth-child(1)');
var euclideanH1 = $('#output h1:nth-child(2)');

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

var directions = new mapboxgl.Directions({
  unit: 'metric', // Use the metric system to display distances.
  profile: 'driving', // Set the initial profile to walking.
  container: 'directions', // Specify an element thats not the map container.
  proximity: [-122.6765, 45.5231] // Give search results closer to these coordinates higher priority.
});

map.on('load', function() {
  directions.setOrigin('Portland, Oregon'); // On load, set the origin to "Toronto, Ontario".
  directions.setDestination('Beaverton, Oregon'); // On load, set the destination to "Montreal, Quebec".
});

directions.on('route', function(e) {
  // Logs the current route shown in the interface.
  console.log(e.route);
  network = e.route[0].distance;
  networkH1.append(network + ' meters');
});
