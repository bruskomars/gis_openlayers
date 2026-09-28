var mapView = new ol.View({
  center: ol.proj.fromLonLat([121.019333, 14.516589]),
  zoom: 9,
});

var map = new ol.Map({
  target: "map",
  view: mapView,
});

var noneTile = new ol.layer.Tile({
  title: "None",
  type: "base",
  visible: false,
});

var osmTile = new ol.layer.Tile({
  title: "Open Street Map",
  type: "base",
  visible: true,
  source: new ol.source.OSM(),
});

// map.addLayer(osmTile);

var baseGroup = new ol.layer.Group({
  title: "Base Maps",
  fold: true,
  layers: [osmTile, noneTile],
});

map.addLayer(baseGroup);

var phAdmin = new ol.layer.Tile({
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

// map.addLayer(phAdmin);

var phRoad = new ol.layer.Tile({
  title: "PH Roads",
  visible: true,
  source: new ol.source.TileWMS({
    url: "http://localhost:8080/geoserver/mapsapp/wms",
    params: {
      LAYERS: "mapsapp:roads",
      TILED: true,
    },
    serverType: "geoserver",
  }),
});

// map.addLayer(phRoad);

var overlayGroup = new ol.layer.Group({
  title: "Overlays",
  fold: true,
  layers: [phAdmin, phRoad],
});

map.addLayer(overlayGroup);

var layerSwitcher = new LayerSwitcher({
  tipLabel: "Layers", // tooltip
});
map.addControl(layerSwitcher);
map.updateSize();

var mousePosition = new ol.control.MousePosition({
  className: "mousePosition",
  projection: "EPSG:4326",
  coordinateFormat: function (coordinates) {
    return ol.coordinate.format(coordinates, "{y}, {x}", 6);
  },
});

map.addControl(mousePosition);

var scaleControl = new ol.control.ScaleLine({
  units: "metric", // options: 'degrees', 'imperial', 'us', 'nautical', 'metric'
  bar: true, // show as a bar instead of line
  steps: 4, // number of segments in the bar
  text: true, // show text labels
  minWidth: 100, // minimum width in pixels
});

map.addControl(scaleControl);

map.once("rendercomplete", function () {
  const scaleLine = document.querySelector(".ol-scale-line");
  console.log(scaleLine.innerHTML); // should now have text like "200 km"
});
// function toggleLayer(e) {
//   var lyrname = e.target.value;
//   var checkedStatus = e.target.checked;
//   var lyrlist = map.getLayers();

//   lyrlist.forEach((e) => {
//     if (lyrname == e.get("title")) {
//       e.setVisible(checkedStatus);
//     }
//   });
// }
