var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Adding tile layer to the map
var streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

var baseMaps = {
  Streets: streets,
  Light: light,
  Dark: dark
};

// Creating map object
var myMap = L.map("map", {
  center: [45.5051, -122.6750],
  zoom: 11,
  layers: streets
});


var url = "https://opendata.arcgis.com/datasets/d69fc89625ad4c5faf1bcab9b9c655d7_131.geojson"
// Grab data with d3

var markers = L.markerClusterGroup();
// Grab the data with d3
d3.json(url, function (response) {
  console.log(response);
  // Create a new marker cluster group

  markers.addLayer(L.geoJson(response, {
    pointToLayer: function (feature, latlng) {
              return L.marker(latlng, {icon: greenIcon});
      },
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`<h1>${feature.properties.property_name}</h1><h2>Historic Name: ${feature.properties.HISTNAME}<br>${feature.properties.ADDRESS}</h2><h2>Built in ${feature.properties.YEARBUILT}</h2>`);
    }
  }));

  myMap.locate({setView: true, maxZoom: 16});
  myMap.addLayer(markers);

  L.control.layers(baseMaps).addTo(myMap);
});

