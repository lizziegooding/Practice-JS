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

map.on('load', function() {
  directions.setOrigin('Portland, Oregon'); // On load, set the origin to 'Toronto, Ontario'.
  directions.setDestination('Beaverton, Oregon'); // On load, set the destination to 'Montreal, Quebec'.

  // Add geojson data
  // map.addSource('geojson', {
  //   'type': 'geojson',
  //   'data': geojson
  // });

    // Add styles to the map
//   map.addLayer({
//     id: 'measure-points',
//     type: 'circle',
//     source: 'geojson',
//     paint: {
//       'circle-radius': 5,
//       'circle-color': '#000'
//     },
//     filter: ['in', '$type', 'Point']
//   });
//   map.addLayer({
//     id: 'measure-lines',
//     type: 'line',
//     source: 'geojson',
//     layout: {
//       'line-cap': 'round',
//       'line-join': 'round'
//     },
//     paint: {
//       'line-color': '#000',
//       'line-width': 2.5
//     },
//     filter: ['in', '$type', 'LineString']
//   });
// // });
//
//   map.on('click', function(e) {
//     var features = map.queryRenderedFeatures(e.point, { layers: ['measure-points'] });
//
//     // Remove the linestring from the group
//     // So we can redraw it based on the points collection
//     if (geojson.features.length > 1) geojson.features.pop();
//
//     // Clear the Distance container to populate it with a new value
//     distanceContainer.innerHTML = '';
//
//     // If a feature was clicked, remove it from the map
//     if (features.length) {
//       var id = features[0].properties.id;
//       geojson.features = geojson.features.filter(function(point) {
//         return point.properties.id !== id;
//       });
//     } else {
//       var point = {
//         'type': 'Feature',
//         'geometry': {
//           'type': 'Point',
//           'coordinates': [
//             e.lngLat.lng,
//             e.lngLat.lat
//           ]
//         },
//         'properties': {
//           'id': String(new Date().getTime())
//         }
//       };
//
//       geojson.features.push(point);
//     }
//
//     if (geojson.features.length > 1) {
//       linestring.geometry.coordinates = geojson.features.map(function(point) {
//         return point.geometry.coordinates;
//       });
//
//       geojson.features.push(linestring);
//
//         // Populate the distanceContainer with total distance
//       var value = document.createElement('pre');
//       value.textContent = 'Total distance: ' + turf.lineDistance(linestring).toLocaleString() + 'km';
//       distanceContainer.appendChild(value);
//     }
//
//     map.getSource('geojson').setData(geojson);
//   });
});

directions.on('route', function(e) {
  // Logs the current route shown in the interface.
  console.log(e.route);

  //Returns geojson object of origin point
  origin = directions.getOrigin();

  //Returns geojson object of destination point
  var destination = directions.getDestination();

  var eucLine = {
    'type': 'Feature',
    'geometry': {
      'type': 'LineString',
      'coordinates': [
        origin.geometry.coordinates,
        destination.geometry.coordinates
      ]
    }
  };
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

  //Write distance to DOM
  network = e.route[0].distance;
  networkH1.append(network + ' meters');
  euclidean = turf.lineDistance(eucLine);
  euclideanH1.append(euclidean + ' meters');
});
