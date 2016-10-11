// Sandbox for Mapbox Distance API

  // Personal access token
mapboxgl.accessToken = 'pk.eyJ1IjoibGl6emllZ29vZGluZyIsImEiOiJjaW92cmc1NHYwMWJsdW9tOHowdTA2cnFsIn0.lFq-Wju99kZ_dR_2TMBYCQ';

var euclidean;
var network;
var displayNetwork = $('#output h1:nth-child(1)');
var displayEuclidean = $('#output h1:nth-child(2)');

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
  profile: 'driving', // Set the initial profile to driving.
  container: 'directions', // Specify an element thats not the map container.
  proximity: [-122.6765, 45.5231] // Give search results closer to these coordinates higher priority.
});

//Declare euclidean line
var eucLine = {
  'type': 'Feature',
  'geometry': {
    'type': 'LineString',
    'coordinates': [[0,0],[0,0]]
  }
};

map.on('load', function() {
  // On load, set the origin to 'Portland, Oregon'
  directions.setOrigin('Portland, Oregon');
  // Set the destination to 'Beaverton, Oregon'
  directions.setDestination('Beaverton, Oregon');

  //Add Euclidean line source
  map.addSource('eucLine',{
    'type': 'geojson',
    'data': eucLine
  });

  //Add Euclidean line layer
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

//When the route event occurs
directions.on('route', function(e) {
  //Return geojson object of origin point
  origin = directions.getOrigin();
  //Return geojson object of destination point
  destination = directions.getDestination();

  //Set eucLine coordinates to route coordinates
  eucLine.geometry.coordinates = [origin.geometry.coordinates, destination.geometry.coordinates];
  //Update map with new data
  map.getSource('eucLine').setData(eucLine);

  //Write network distance to DOM
  network = e.route[0].distance;
  displayNetwork.text('Network Distance: ' + (network / 1000) + ' km');

  //Write euclidean distance to DOM
  euclidean = turf.lineDistance(eucLine);
  displayEuclidean.text('Euclidean Distance: ' + euclidean + ' km');
});
