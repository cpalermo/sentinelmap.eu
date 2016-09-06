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

var d25= L.tileLayer(rUrl, {id: 'rapideye.d25',
			    mm: '160825',
			    maxNativeZoom: 15,
			    maxZoom: 20,
			    minZoom: 12,
			    attribution: pAttr});

var d24= L.tileLayer(sUrl, {id: 'sentinel.d24',
			    mm: '160824',
			    maxNativeZoom: 15,
			    maxZoom: 20,
			    minZoom: 12,
			    attribution: Attr});

var d14= L.tileLayer(sUrl, {id: 'sentinel.d14',
			    mm: '160814',
			    maxNativeZoom: 15,
			    maxZoom: 20,
			    minZoom: 12,
			    attribution: Attr});

var m02= L.tileLayer(rUrl, {id: 'monit.02',
			    mm: 'monit2',
			    maxNativeZoom: 17,
			    maxZoom: 20,
			    minZoom: 14,
			    attribution: aAttr});

var ref= L.tileLayer(rUrl, {id: 'ref.pre',
			    mm: 'reference',
			    maxNativeZoom: 17,
			    maxZoom: 20,
			    minZoom: 14,
			    attribution: aAttr});

var aer= L.tileLayer(rUrl, {id: 'aer.post',
			    mm: 'ALL',
			    maxNativeZoom: 20,
			    maxZoom: 20,
			    minZoom: 17,
			    attribution: aAttr});

var earthquake= L.marker([42.70, 13.24]).bindPopup('Initial quake - magnitude 6.0 Mw; depth 4 km; 2016-08-24 01:36:32(UTC)');

var CAPODACQUA= L.marker([42.73796491, 13.23691295]).bindPopup('Capodacqua'),
    CASALE= L.marker([42.66970995, 13.2860829]).bindPopup('Casale'),
    ILLICA= L.marker([42.70289171, 13.26471722]).bindPopup('Illica'),
    PESCARADELTRONTO= L.marker([42.75093709, 13.27109334]).bindPopup('Pescara del Tronto'),
    SALETTA= L.marker([42.67129962, 13.27234934]).bindPopup('Saletta'),
    ARQUATADEL= L.marker([42.77492965, 13.2946591]).bindPopup('Arquata del Tronto'),
    AMATRICE= L.marker([42.62700757, 13.29142197]).bindPopup('Amatrice'),
    POGGIOVITELLINO= L.marker([42.6511294, 13.26748308]).bindPopup('Poggio Vitellino'),
    CORNILLOVECCHIO= L.marker([42.63692425, 13.28472067]).bindPopup('Cornillo Vecchio'),
    SANLORENZOEFLAVIANO= L.marker([42.66492153, 13.28677634]).bindPopup('San Lorenzo e Flaviano'),
    ROCCHETTA= L.marker([42.65671619, 13.28626227]).bindPopup('Rocchetta'),
    ACCUMOLI= L.marker([42.69486882, 13.24757931]).bindPopup('Accumoli'),
    SANTANGELO= L.marker([42.64945671, 13.30445542]).bindPopup("Sant'Angelo");

var Info= L.layerGroup([CAPODACQUA, CASALE, ILLICA, PESCARADELTRONTO, SALETTA, ARQUATADEL, AMATRICE, POGGIOVITELLINO, CORNILLOVECCHIO, SANLORENZOEFLAVIANO, ROCCHETTA, ACCUMOLI, SANTANGELO]);

var Labels= Tangram.leafletLayer({
    scene: '../../lib/tangram/labels.yaml',
    attribution: lAttr
});

var map= L.map('map', {
    center: [42.7, 13.24],
    zoom: 12,
    maxZoom: 20,
    minZoom: 12,
    layers: [d25, Info],
    zoomControl: false
});

var hash= new L.Hash(map);

var baseLayers= {
    "[zoom:12-15] RapidEye: 2016-08-25": d25,
    "[zoom:12-15] Sentinel-2A: 2016-08-24 10:00:32(UTC)": d24,
    "[zoom:12-15] Sentinel-2A: 2016-08-14 10:00:32(UTC)": d14,
    "[zoom:14-17] Copernicus EMS Monitoring 02 Map": m02,
    "[zoom:14-17] Copernicus EMS Reference Map": ref,
    "[zoom:17-20] Copernicus EMS Aerial Maps": aer,
};

var overlayLayers= {
    "Labels": Labels,
    "Aerial Maps": Info,
};

L.control.layers(baseLayers, overlayLayers, {position: 'topleft'}).addTo(map);

L.control.zoom({position: 'topleft'}).addTo(map);

map.on('zoomend', function() {
    if (map.getZoom() > 14){
        if (map.hasLayer(d14)) {
            map.removeLayer(d14);
	    map.addLayer(ref);
        }
	if (map.hasLayer(d24)) {
            map.removeLayer(d24);
	    map.addLayer(m02);
        }
	if (map.hasLayer(d25)) {
            map.removeLayer(d25);
	    map.addLayer(m02);
        }
    }
    if (map.getZoom() > 17){
        if (map.hasLayer(ref)) {
	    map.removeLayer(ref);
	    map.addLayer(aer);
        }
	if (map.hasLayer(m02)) {
            map.removeLayer(m02);
	    map.addLayer(aer);
        }
    }
    if (map.getZoom() < 14){
        if (map.hasLayer(m02)){
	    map.removeLayer(m02);
	    map.addLayer(d25);
        }
	if (map.hasLayer(ref)){
	    map.removeLayer(ref);
	    map.addLayer(d14);
        }
    }
    if (map.getZoom() < 17){
        if (map.hasLayer(aer)){
	    map.removeLayer(aer);
	    map.addLayer(m02);
        }
    }
});
