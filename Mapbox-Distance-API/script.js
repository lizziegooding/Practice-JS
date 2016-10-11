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

// var distanceContainer = document.getElementById('distance');

// GeoJSON object to hold our measurement features
// var geojson = {
//   'type': 'FeatureCollection',
//   'features': []
// };

// Used to draw a line between points
// var linestring = {
//   'type': 'Feature',
//   'geometry': {
//     'type': 'LineString',
//     'coordinates': []
//   }
// };

//Add Driving Directions plugin
map.addControl(new mapboxgl.Directions());

var directions = new mapboxgl.Directions({
  unit: 'metric', // Use the metric system to display distances.
  profile: 'driving', // Set the initial profile to walking.
  container: 'directions', // Specify an element thats not the map container.
  proximity: [-122.6765, 45.5231] // Give search results closer to these coordinates higher priority.
});

var eucLine = {
  'type': 'Feature',
  'geometry': {
    'type': 'LineString',
    'coordinates': [[0,0],[0,0]]
  }
};

map.on('load', function() {
  directions.setOrigin('Portland, Oregon'); // On load, set the origin to 'Toronto, Ontario'.
  directions.setDestination('Beaverton, Oregon'); // On load, set the destination to 'Montreal, Quebec'.
  map.addSource('eucLine',{
    'type': 'geojson',
    'data': eucLine
  });

  map.addLayer({
    'id': 'eucLine',
    'type': 'line',
    'source': 'eucLine',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#888',
      'line-width': 8
    }
  });

});

directions.on('route', function(e) {
  // Logs the current route shown in the interface.
  console.log(e.route);

  //Returns geojson object of origin point
  origin = directions.getOrigin();

  //Returns geojson object of destination point
  destination = directions.getDestination();

  eucLine.geometry.coordinates = [origin.geometry.coordinates, destination.geometry.coordinates];
  map.getSource('eucLine').setData(eucLine);

  //Write distance to DOM
  network = e.route[0].distance;
  networkH1.html('Network Distance: ' + (network / 1000) + ' km');
  euclidean = turf.lineDistance(eucLine);
  euclideanH1.html('Euclidean Distance: ' + euclidean + ' km');
});
