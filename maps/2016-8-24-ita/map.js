var Attr= 'Modified <a href="https://scihub.copernicus.eu/">Copernicus</a>' +
    ' Sentinel data 2016 by ' +
    '<a href="http://sentinelmap.eu">SentinelMap</a>' ;

var lAttr= '© <a href="https://openstreetmap.org/copyright">OSM</a>' +
    ' contributors data by ' +
    '<a href="https://mapzen.com">Mapzen</a>' ;

var pAttr= 'RapidEye image ©2016 <a href="https://www.planet.com" target="_blank">Planet Labs</a>'

var aAttr= 'Copernicus EMS ©2016 European Union <a href="http://emergency.copernicus.eu/mapping/list-of-components/EMSR177" target="_blank">EMSR177</a>'

var sUrl= 'http://tile.sentinelmap.eu/ita/{mm}/{z}/{x}/{y}.jpg' ,
    rUrl= 'http://tile.sentinelmap.eu/ita/{mm}/{z}/{x}/{y}.png' ;

var d24= L.tileLayer(sUrl, {id: 'sentinel.d24', mm: '160824', attribution: Attr}),
    d14= L.tileLayer(sUrl, {id: 'sentinel.d14', mm: '160814', attribution: Attr});

var d25= L.tileLayer(rUrl, {id: 'rapideye.d25', mm: '160825', attribution: pAttr}),
    refAcc= L.tileLayer(rUrl, {id: 'reference.accumoli', mm: 'reference_accumoli', attribution: aAttr}),
    refAma= L.tileLayer(rUrl, {id: 'reference.amatrice', mm: 'reference_amatrice', attribution: aAttr});

var earthquake= L.marker([42.70, 13.24]).bindPopup('Initial quake - magnitude 6.0 Mw; depth 4 km; 2016-08-24 01:36:32(UTC)'),
    accumoli= L.marker([42.694, 13.2505]).bindPopup('Accumoli'),
    amatrice= L.marker([42.629, 13.293]).bindPopup('Amatrice'),
    pescara= L.marker([42.7526, 13.2713]).bindPopup('Pescara del Tronto'),
    arquata= L.marker([42.7727, 13.2951]).bindPopup('Arquata del Tronto');

var Info= L.layerGroup([earthquake, accumoli, amatrice, pescara, arquata]);

var Labels= Tangram.leafletLayer({
    scene: '../../lib/tangram/labels.yaml',
    attribution: lAttr
});

var map= L.map('map', {
    center: [42.7, 13.24],
    zoom: 12,
    maxZoom: 17,
    minZoom: 12,
    layers: [d25, refAcc, refAma, Info],
    zoomControl: false
});

var hash= new L.Hash(map);

var baseLayers= {
    "RapidEye: 2016-08-25": d25,
    "Sentinel-2A: 2016-08-24 10:00:32(UTC)": d24,
    "Sentinel-2A: 2016-08-14 10:00:32(UTC)": d14,
};

var overlayLayers= {
    "Copernicus EMS Reference Map: Accumoli": refAcc,
    "Copernicus EMS Reference Map: Amatrice": refAma,
    "Labels": Labels,
    "Points of Interest": Info,
};

L.control.layers(baseLayers, overlayLayers, {position: 'topleft'}).addTo(map);

L.control.zoom({position: 'topleft'}).addTo(map);
