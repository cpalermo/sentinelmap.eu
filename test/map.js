var Attr = 'Modified <a href="https://scihub.copernicus.eu/">Copernicus</a>' +
    ' Sentinel data 2016 by ' +
    '<a href="http://sentinelmap.eu">SentinelMap</a>' ;

var lAttr = '© <a href="https://openstreetmap.org/copyright">OSM</a>' +
    ' contributors data by ' +
    '<a href="https://mapzen.com">Mapzen</a>' ;

var sUrl = 'http://tile.sentinelmap.eu/16/{mm}/{z}/{x}/{y}.jpg' ;

var aug16 = L.tileLayer( sUrl , {id: 'sentinel.aug16', mm: '8', attribution: Attr}),
    jul16 = L.tileLayer( sUrl , {id: 'sentinel.jul16', mm: '7', attribution: Attr}),
    jun16 = L.tileLayer( sUrl , {id: 'sentinel.jun16', mm: '6', attribution: Attr}),
    may16 = L.tileLayer( sUrl , {id: 'sentinel.may16', mm: '5', attribution: Attr}),
    apr16 = L.tileLayer( sUrl , {id: 'sentinel.apr16', mm: '4', attribution: Attr});

var Labels = Tangram.leafletLayer({
    scene: './scene.yaml',
    attribution: lAttr
});

var map = L.map('map' , {
    center: [ 47.04, 8.44],
    zoom: 7,
    maxZoom: 14,
    minZoom: 7,
    layers: [aug16, Labels],
    zoomControl: false
});

var hash = new L.Hash(map);

var baseLayers = {
    "AUGUST 2016": aug16,
    "JULY 2016": jul16,
    "JUNE 2016": jun16,
    "MAY 2016 (partial)": may16,
    "APRIL 2016 (partial)": apr16
};

var overlayLayers = {
    "Labels": Labels
};

L.control.layers(baseLayers, overlayLayers, {position: 'topleft'}).addTo(map);

L.control.zoom({position: 'topleft'}).addTo(map);
