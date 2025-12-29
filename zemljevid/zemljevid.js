function createOverpassLayer(query, color = "#7b1e1e") {
  const layer = L.layerGroup();

  function loadData() {
    layer.clearLayers();

    fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query
    })
      .then(r => r.json())
      .then(data => {
        const geojson = osmtogeojson(data);

        L.geoJSON(geojson, {
          pointToLayer: (feature, latlng) =>
            L.circleMarker(latlng, {
              radius: 5,
              color: color,
              weight: 1,
              fillOpacity: 0.8
            }),
          onEachFeature: (feature, layerMarker) => {
            const props = feature.properties || {};
            const name = props.name || "Brez imena";

            let content = `<b>${name}</b><br><ul>`;
            for (const key in props) {
              if (key === "name" || key === "center") continue;
              content += `<li>${key} = ${props[key]}</li>`;
            }
            content += "</ul>";

            layerMarker.bindPopup(content);
          }
        }).addTo(layer);
      })
      .catch(err => console.error(err));
  }

  // naloži podatke, ko se sloj vključi
  layer.on("add", loadData);

  return layer;
}

//====================================================================================

var osm =L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'});

var CyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var WaymarkedTrails_hiking = L.tileLayer('https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://waymarkedtrails.org">waymarkedtrails.org</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var WaymarkedTrails_cycling = L.tileLayer('https://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://waymarkedtrails.org">waymarkedtrails.org</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var Thunderforest_Transport = L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}{r}.png?apikey={apikey}', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: '<your apikey>',
	maxZoom: 22
});

var Thunderforest_Landscape = L.tileLayer('https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}{r}.png?apikey={apikey}', {
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	apikey: '<your apikey>',
	maxZoom: 22
});

var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
});
var OpenSeaMap = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
});
var OpenRailwayMap = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
var Stadia_StamenTerrainLabels = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain_labels/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});
var Stadia_StamenTerrainLines = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain_lines/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 18,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});
var Stadia_AlidadeSatellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'jpg'
});

var esriWorldImagery = L.tileLayer(
  'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
  {
    maxZoom: 22,
    attribution: '© <a href="https://www.esri.com/">Esri</a>'
  }
);
var esriOcean = L.tileLayer(
  'http://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', 
  {
    attribution: '© <a href="https://www.esri.com/">Esri</a>'
  }
);
var esriTopo = L.tileLayer(
  'http://services.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', 
  {
    attribution: '© <a href="https://www.esri.com/">Esri</a>'
  }
);
var esriStreet = L.tileLayer(
  'http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', 
  {
    attribution: '© <a href="https://www.esri.com/">Esri</a>'
  }
);
var esriNavigation = L.tileLayer(
  'http://services.arcgisonline.com/arcgis/rest/services/Specialty/World_Navigation_Charts/MapServer/tile/{z}/{y}/{x}', 
  {
    attribution: '© <a href="https://www.esri.com/">Esri</a>'
  }
);
var esriNational = L.tileLayer(
  'http://services.arcgisonline.com/arcgis/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', 
  {
    attribution: '© <a href="https://www.esri.com/">Esri</a>'
  }
);

// GURS – ORTOFOTO (TMS, EPSG:3857)
var gursDOF025 = L.tileLayer(
  "https://gis.level2.si/geoserver/gwc/service/tms/1.0.0/level2%3ADOF025_latest@EPSG%3A3857@jpeg/{z}/{x}/{y}.jpeg",
  {
    tms: true,
    maxZoom: 20,
    minZoom: 8,
    attribution: "© GURS"
  }
);

var gursDTS = L.tileLayer.wms(
  "https://ipi.eprostor.gov.si/wms-si-gurs-dts/wms?",
  {
    layers: "DTS",
    format: "image/png",
    transparent: true,
    maxZoom: 19,
    attribution: "© GURS"
  }
);

var gursKN = L.tileLayer.wms(
  "https://ipi.eprostor.gov.si/wms-si-gurs-kn/wms?",
  {
    layers: "KN",
    format: "image/png",
    transparent: true,
    maxZoom: 19,
    attribution: "© GURS"
  }
);
var gursRPE = L.tileLayer.wms(
  "https://ipi.eprostor.gov.si/wms-si-gurs-rpe/wms",
  {
    layers: "RPE",
    format: "image/png",
    transparent: true,
    maxZoom: 19,
    attribution: "© GURS"
  }
);
var gursGJI = L.tileLayer.wms(
  "https://ipi.eprostor.gov.si/wms-si-gurs-kgi/wms",
  {
    layers: "KGI",
    format: "image/png",
    transparent: true,
    maxZoom: 19,
    attribution: "© GURS"
  }
);
/*var gursTopo = L.tileLayer.wms(
  "https://geohub.gov.si/ags/rest/services/TEMELJNE_KARTE/GH_MDP_TOPO_KARTA_SI/MapServer/WMSServer",
  {
    layers: "0",
    format: "image/png",
    transparent: false,
    attribution: "© GURS"
  }
);

// ===== GURS – LIDAR (TMS, EPSG:3857) =====
var gursLidar = L.tileLayer(
  "https://gis.level2.si/geoserver/gwc/service/tms/1.0.0/level2%3ALIDAR_TLA_ZGRADBE@EPSG%3A3857@png/{z}/{x}/{y}.png",
  {
    tms: true,
    minZoom: 8,
    maxZoom: 19,
    attribution: "© GURS"
  }
);

// ===== GURS – TOPOGRAFSKA KARTA (WMS, EPSG:3794 → 3857) =====
var gursTopoWMS = L.tileLayer.wms(
  "https://geohub.gov.si/ags/rest/services/TEMELJNE_KARTE/GH_MDP_TOPO_KARTA_SI/MapServer/WMSServer",
  {
    layers: "0",
    format: "image/png",
    transparent: false,
    attribution: "© GURS"
  }
);

var gursTopo = L.tileLayer.wms(
  "https://geohub.gov.si/ags/rest/services/TEMELJNE_KARTE/GH_MDP_TOPO_KARTA_SI/MapServer/WMSServer",
  {
    layers: "GH_MDP_TOPO_KARTA_SI",
    format: "image/png",
    transparent: false,
    attribution: "© GURS"
  }
);

var gursLidar = L.tileLayer.wms(
  "https://geohub.gov.si/ags/rest/services/TEMELJNE_KARTE/LIDAR_TlaZgradbe_SI/MapServer/WMSServer",
  {
    layers: "0",
    format: "image/png",
    transparent: true,
    attribution: "© GURS"
  }
);*/

// Google Maps

googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
//==============================================================================
var map = L.map('map', {
    center: [46.1, 14.8],
    zoom: 9,
    layers: [osm]   // ⚠️ samo base layer
});

// Moje poizvedbe po oznakah
var cerkve = createOverpassLayer(`
    [out:json][timeout:60];
    area["ISO3166-1"="SI"]->.a;
    (
      node["amenity"="place_of_worship"]["building"="church"](area.a);
      way["amenity"="place_of_worship"]["building"="church"](area.a);
    );
    out center tags;`,
    "#FF66CC");

var zupnijske_cerkve = createOverpassLayer(`
    [out:json][timeout:60];
    area["ISO3166-1"="SI"]->.a;
    (
      node["amenity"="place_of_worship"]["building"="church"]["church:type"="parish"](area.a);
      way["amenity"="place_of_worship"]["building"="church"]["church:type"="parish"](area.a);
    );
    out center tags;`,
    "#9900CC");

var zupnije = createOverpassLayer(`
    [out:json][timeout:60];
    area["ISO3166-1"="SI"]->.a;
    (
      node["parish"](area.a);
      way["parish"](area.a);
    );
    out center tags;`,
    "#CC00CC");

var gradovi = createOverpassLayer(`
    [out:json][timeout:60];
    area["ISO3166-1"="SI"]->.a;
    (
      node["historic"="castle"](area.a);
      way["historic"="castle"](area.a);
    );
    out center tags;`,
    "#000000");

var naducilisca = createOverpassLayer(`
    [out:json][timeout:60];
    area["ISO3166-1"="SI"]->.a;
    (
      node["building"="university"](area.a);
      way["building"="university"](area.a);
    );
    out center tags;`,
    "#3333FF");

// ===== LAYERS CONTROL =====
var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap HOT": osmHOT,
    "CyclOSM": CyclOSM,
    //"Stadia Alidade Satellite": Stadia_AlidadeSatellite,
    "Thunderforest Transport": Thunderforest_Transport,
    "Thunderforest Landscape": Thunderforest_Landscape,
    "OpenTopoMap": openTopoMap,
    "Esri Imagery": esriWorldImagery,
    "Esri Ocean Base": esriOcean,
    "Esri Topo Map": esriTopo,
    "Esri Street Map": esriStreet,
    "Esri Navigation Charts": esriNavigation,
    "GURS ortofoto 25 cm": gursDOF025,
    //"GURS LIDAR senčenje": gursLidar,
    //"GURS topografska karta": gursTopo,
    //"GURS DTS": gursDTS,
    //"Kataster": gursKN,
    //"RPE": gursRPE,
    //"GJI": gursGJI,
    "G***le Streets": googleStreets,
    "G***le Hybrid": googleHybrid,
    "G***le Satellite": googleSat,
    "G***le Terrain": googleTerrain,
};

var overlayMaps = {
    "OpenRailwayMap": OpenRailwayMap,
    "OpenSeaMap": OpenSeaMap,
    "WaymarkedTrails – hiking": WaymarkedTrails_hiking,
    "WaymarkedTrails – cycling": WaymarkedTrails_cycling,
    //"Stadia_StamenTerrainLabels": Stadia_StamenTerrainLabels,
    //"Stadia_StamenTerrainLines": Stadia_StamenTerrainLines,

    "Slo. cerkve": cerkve,
    "Slo. župnijske cerkve": zupnijske_cerkve,
    "Slo. župnije z vsem kar spada pod njih": zupnije,
    "Slo. gradovi": gradovi,
    "Slo. nadučilišča": naducilisca,
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

/*
function loadChurches() {
  churchesLayer.clearLayers();

  const query = `
    [out:json][timeout:60];
    area["ISO3166-1"="SI"]->.a;
    (
      node["amenity"="place_of_worship"]["building"="church"]["church:type"="parish"](area.a);
      way["amenity"="place_of_worship"]["building"="church"]["church:type"="parish"](area.a);
    );
    out center tags;
  `;

  fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query
  })
  .then(r => r.json())
  .then(data => {
    const geojson = osmtogeojson(data);

    L.geoJSON(geojson, {
      pointToLayer: (feature, latlng) =>
        L.circleMarker(latlng, {
          radius: 5,
          color: "#7b1e1e",
          weight: 1,
          fillOpacity: 0.8
        }),
      onEachFeature: (feature, layer) => {
        console.log(feature.properties)
        const props = feature.properties || {};
        // Prikaži ime posebej
        const name = props.name || "Brez imena";
        
        // Naredi seznam vseh ostalih tagov
        let content = `<b>${name}</b><br><ul>`;
        for (const key in props) {
          if (key === "name" || key === "center") continue; // ime že prikazano, center preskoči
          content += `<li>${key} = ${props[key]}</li>`;
        }
        content += "</ul>";
        
        layer.bindPopup(content);
      }
    }).addTo(churchesLayer);
  })
  .catch(err => console.error(err));
}

// reagira na vklop sloja
map.on("overlayadd", e => {
  if (e.layer === churchesLayer) {
    loadChurches();
  }
});
*/
