// ===== OSNOVNI SETUP =====

// View (center, zoom)
const view = new ol.View({
    center: ol.proj.fromLonLat([14.8, 46.1]),
    zoom: 9
});

// Base layers
const osmLayer = new ol.layer.Tile({
    title: 'OpenStreetMap',
    visible: true,
    source: new ol.source.OSM()
});

const osmHOTLayer = new ol.layer.Tile({
    title: 'OSM HOT',
    visible: false,
    source: new ol.source.XYZ({
        url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
    })
});

// GURS Ortofoto 2024 (WMS)
const gursOrtofoto2024 = new ol.layer.Tile({
    title: 'GURS Ortofoto 2024',
    visible: false,
    opacity: 0.8,
    source: new ol.source.TileWMS({
        url: 'https://gis.level2.si/geoserver/level2/wms',
        params: {
            'LAYERS': 'level2:DOF025_2024',
            'TILED': true
        },
        serverType: 'geoserver'
    })
});

// GURS LIDAR
const gursLidar = new ol.layer.Tile({
    title: 'GURS LIDAR',
    visible: false,
    opacity: 0.6,
    source: new ol.source.XYZ({
        url: 'https://gis.level2.si/geoserver/gwc/service/tms/1.0.0/level2%3AHillshade@EPSG%3A3857@jpeg/{z}/{x}/{-y}.jpeg',
        tilePixelRatio: 1
    })
});

// Thunderforest (s tvojim API ključem)
const thunderforestTransport = new ol.layer.Tile({
    title: 'Thunderforest Transport',
    visible: false,
    source: new ol.source.XYZ({
        url: 'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=bf4be265791c4465964813ef6735e9fa'
    })
});

// ===== OVERPASS LAYER (kompleksnejše) =====
function createOverpassLayer(query, color, title) {
    const vectorSource = new ol.source.Vector();
    
    const vectorLayer = new ol.layer.Vector({
        title: title,
        visible: false,
        source: vectorSource,
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({ color: color }),
                stroke: new ol.style.Stroke({ color: '#fff', width: 1 })
            })
        })
    });
    
    // Ko se layer aktivira, naloži podatke
    vectorLayer.on('change:visible', function() {
        if (this.getVisible() && vectorSource.getFeatures().length === 0) {
            fetch('https://overpass-api.de/api/interpreter', {
                method: 'POST',
                body: query
            })
            .then(r => r.json())
            .then(data => {
                const geojson = osmtogeojson(data);
                const features = new ol.format.GeoJSON().readFeatures(geojson, {
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                });
                vectorSource.addFeatures(features);
            })
            .catch(err => console.error(err));
        }
    });
    
    return vectorLayer;
}

const cerkvice = createOverpassLayer(`
    [out:json][timeout:60];
    area["ISO3166-1"="SI"]->.a;
    (
      node["amenity"="place_of_worship"]["building"="church"](area.a);
      way["amenity"="place_of_worship"]["building"="church"](area.a);
    );
    out center tags;`,
    'rgba(255, 102, 204, 0.8)',
    'Slo. cerkve'
);

// ===== MAP =====
const map = new ol.Map({
    target: 'map',
    view: view,
    layers: [
        osmLayer,
        osmHOTLayer,
        gursOrtofoto2024,
        gursLidar,
        thunderforestTransport,
        cerkvice
    ]
});

// ===== CUSTOM LAYER CONTROL Z OPACITY =====
const layerControl = document.createElement('div');
layerControl.className = 'ol-control-layers';
layerControl.innerHTML = '<h4>Sloji</h4><div id="layer-list"></div>';
document.body.appendChild(layerControl);

const layerList = document.getElementById('layer-list');

map.getLayers().forEach(layer => {
    if (!layer.get('title')) return;
    
    const layerDiv = document.createElement('div');
    layerDiv.className = 'layer-item';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = layer.getVisible();
    checkbox.id = 'layer-' + layer.get('title');
    
    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = layer.get('title');
    
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.className = 'opacity-slider';
    slider.min = 0;
    slider.max = 100;
    slider.value = layer.getOpacity() * 100;
    
    const valueSpan = document.createElement('span');
    valueSpan.textContent = Math.round(layer.getOpacity() * 100) + '%';
    
    // Events
    checkbox.addEventListener('change', () => {
        layer.setVisible(checkbox.checked);
    });
    
    slider.addEventListener('input', () => {
        const opacity = slider.value / 100;
        layer.setOpacity(opacity);
        valueSpan.textContent = slider.value + '%';
    });
    
    layerDiv.appendChild(checkbox);
    layerDiv.appendChild(label);
    layerDiv.appendChild(document.createElement('br'));
    layerDiv.appendChild(slider);
    layerDiv.appendChild(valueSpan);
    
    layerList.appendChild(layerDiv);
});

// ===== POPUP ZA OVERPASS =====
const popup = new ol.Overlay({
    element: document.createElement('div'),
    positioning: 'bottom-center',
    stopEvent: false
});
popup.getElement().className = 'ol-popup';
map.addOverlay(popup);

map.on('click', function(evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, f => f);
    if (feature) {
        const props = feature.getProperties();
        let html = `<strong>${props.name || 'Brez imena'}</strong><br><ul>`;
        for (let key in props) {
            if (key === 'geometry' || key === 'name') continue;
            html += `<li>${key}: ${props[key]}</li>`;
        }
        html += '</ul>';
        popup.getElement().innerHTML = html;
        popup.setPosition(evt.coordinate);
    } else {
        popup.setPosition(undefined);
    }
});
