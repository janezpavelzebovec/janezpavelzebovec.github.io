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

var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
});

var esriWorldImagery = L.tileLayer(
  'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
  {
    maxZoom: 22,
    attribution: 'Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }
);

var gursPhoto = L.tileLayer(
  "https://gis.level2.si/geoserver/gwc/service/tms/1.0.0/level2%3ADOF025_latest@EPSG%3A3857@jpeg/{z}/{x}/{y}.jpeg",
  {
    tms: true,
    maxZoom: 20,
    minZoom: 8,
    attribution: "© GURS"
  }
);

var map = L.map('map', {
    center: [46.1, 14.8],
    zoom: 8,
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
    "#ff0000");

var zupnijske_cerkve = createOverpassLayer(`
    [out:json][timeout:60];
    area["ISO3166-1"="SI"]->.a;
    (
      node["amenity"="place_of_worship"]["building"="church"]["church:type"="parish"](area.a);
      way["amenity"="place_of_worship"]["building"="church"]["church:type"="parish"](area.a);
    );
    out center tags;`,
    "#7b1e1e");

var zupnije = createOverpassLayer(`
    [out:json][timeout:60];
    area["ISO3166-1"="SI"]->.a;
    (
      node["parish"](area.a);
      way["parish"](area.a);
    );
    out center tags;`,
    "#0000ff");

var gradovi = createOverpassLayer(`
    [out:json][timeout:60];
    area["ISO3166-1"="SI"]->.a;
    (
      node["historic"="castle"](area.a);
      way["historic"="castle"](area.a);
    );
    out center tags;`,
    "#000000");

// ===== LAYERS CONTROL =====
var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT,
    "OpenTopoMap": openTopoMap,
    "Esri": esriWorldImagery, 
    "GURS ortofoto 25cm": gursPhoto,
};

var overlayMaps = {
    "Slovenske cerkve": cerkve,
    "Slovenske župnijske cerkve": zupnijske_cerkve,
    "Slo. župnije z vsem kar pod njih spada": zupnije,
    "Slovenski gradovi": gradovi,
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
