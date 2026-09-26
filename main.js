var mapView = new ol.View({
  center: ol.proj.fromLonLat([121.019333, 14.516589]),
  zoom: 9,
});

var map = new ol.Map({
  target: "map",
  view: mapView,
});

var osmTile = new ol.layer.Tile({
  title: "Open Street Map",
  visible: true,
  source: new ol.source.OSM(),
});

map.addLayer(osmTile);

var phTile = new ol.layer.Tile({
  title: "Philippines Admin",
  visible: true,
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/mapsapp/wms",
    params: {
      LAYERS: "mapsapp:admin",
      TILED: true,
    },
    serverType: "geoserver",
  }),
});

map.addLayer(phTile);
