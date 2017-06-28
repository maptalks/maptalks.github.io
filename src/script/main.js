$(function() {
  getVersion();
  initMap();
});

function getVersion() {
    $.get('https://raw.githubusercontent.com/maptalks/maptalks.js/master/package.json', function(result){
       $('.secondary-text').text('version: ' + result.version);
    }, 'json');
}

var map;
var bearing = -14.2;

function initMap() {
  var features = topojson.feature(world, world.objects.land);
  var polygons = features.features.map(function (f) {
    var geo = maptalks.GeoJSON.toGeometry(f);
    geo.setId(null);
    geo.config('antiMeridian', 'split');
    geo.setSymbol({
      lineColor : 'rgba(255, 255, 255, 1)',
      lineWidth : 1
    });
    return geo;
  });
  map = new maptalks.Map('map', {
    center:  [-2.7903012612708142, 60.976349249268345],
    zoom: 3,
    pitch: 60,
    bearing: bearing,
    draggable: false,
    scrollWheelZoom: false,
    geometryEvents:false,
    hitDetect:false,
    zoomable: false,
    layers: [
      new maptalks.VectorLayer('v', polygons, { opacity : 0.3 }),
      new maptalks.VectorLayer('m', [
          new maptalks.MultiPoint([[37.6178, 55.7517], [28.9744, 41.0128], [116.391212, 39.893409]/*[12.5, 41.9], [7.4458, 46.95]*//*, [116.391212, 39.893409]*/])
        ])
    ]
  });

  rotate();
}

var rotation = 8;
var duration = 4000;
var rotationPerFrame = 8 / (duration / 16);
var step = 0;
var d = 1;
function rotate() {
    if (Math.abs(step * rotationPerFrame) >= rotation) {
        d *= -1;
    }
    step += d;
    map.setBearing(bearing + step * rotationPerFrame);
    requestAnimationFrame(rotate);
}
