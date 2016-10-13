// Sandbox for Mapbox Directions API call with AJAX
var directionsURL = 'https://api.mapbox.com/directions/v5/mapbox/cycling/-122.42,37.78;-77.03,38.91?access_token=pk.eyJ1IjoibGl6emllZ29vZGluZyIsImEiOiJjaW92cmc1NHYwMWJsdW9tOHowdTA2cnFsIn0.lFq-Wju99kZ_dR_2TMBYCQ';

$.getJSON(directionsURL)
.done(function(data){
  console.log('Success');
  console.log(data);
})
.fail(function(){
  console.log('Error');
})
.always(function(){
  console.log('Complete');
});
