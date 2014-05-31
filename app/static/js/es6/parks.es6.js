/* jshint unused:false */
/* jshint camelcase:false */

'use strict';

(function(){
  $(document).ready(init);

  function init(){
    $('#get-parks').on('click', getParksData);
  }

  function getParksData() {
    var url = 'http://data.nashville.gov/resource/74d7-b74t.json?';
    $.getJSON(url, findClosestParks);
  }

  function findClosestParks(data) {
    var parks;
    if(window.loc.lat) {
      parks = [];
      $.each(data, function(i, entry) {
        var dist = window.getDistance(window.loc.lat, window.loc.lng, entry.mapped_location.latitude, entry.mapped_location.longitude);
        if(dist <= 2) { // distance variable set by user should go here
          parks.push(entry);
        }
      });
    } else {
      parks = data;
    }
    addParksDataToMap(parks);
  }

  function addParksDataToMap(data) {
    $.each(data, function(i, entry) {
      window.addMarker(entry.mapped_location.latitude, entry.mapped_location.longitude, entry.mapped_location.park_name);
    });
  }
})();