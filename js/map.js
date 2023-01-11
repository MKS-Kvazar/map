const style = {
    "version": 8,
    "sources": {
        "osm": {
            "type": "raster",
            "tiles": ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
            "tileSize": 256,
            "attribution": "&copy; OpenStreetMap Contributors",
            "maxzoom": 19
        }
    },
    "layers": [
        {
            "id": "osm",
            "type": "raster",
            "source": "osm" // This must match the source key above
        }
    ]
};

// Initialise the map
const map = new maplibregl.Map({
    container: 'map',
    style: style,
    center: [30.5, 50.5],
    zoom: 18,
    pitch: 60,
    antialias: true // create the gl context with MSAA antialiasing, so custom layers are antialiased
});

function context_menu(e) {
    console.log('A contextmenu event occurred.');
    var new_gps = e.lngLat.toString();
    var one = new_gps.indexOf('(');
    one = one + 1;
    var two = new_gps.indexOf(')');
    two = two - one;
    var point = new_gps.substr(one, two);
    const newDiv = document.createElement("div");
    let newFlag = document.createElement("p");
    let newCircle = document.createElement("p");
    let showCoordinates = document.createElement("p");

    const newContent_1 = document.createTextNode("new flag");
    const newContent_2 = document.createTextNode("new circle");
    const newContent_3 = document.createTextNode("show coordinates");

    newFlag.appendChild(newContent_1);
    newCircle.appendChild(newContent_2);
    showCoordinates.appendChild(newContent_3);
    //_______________________________________
    newFlag.onmouseover = function (event) {
        this.style.backgroundColor = "grey";
    };
    newCircle.onmouseover = function (event) {
        this.style.backgroundColor = "grey";
    };
    showCoordinates.onmouseover = function (event) {
        this.style.backgroundColor = "grey";
    };
    //_____________________________________
    newFlag.onmouseout = function (event) {
        this.style.backgroundColor = null;
    };
    newCircle.onmouseout = function (event) {
        this.style.backgroundColor = null;
    };
    showCoordinates.onmouseout = function (event) {
        this.style.backgroundColor = null;
    };
    //____________________________________
    newFlag.onclick = function (event) {
        new_flag(point);
    };
    newCircle.onclick = function (event) {
        new_circle(point);
    };
    showCoordinates.onclick = function (event) {
        alert(point);
    };

    newDiv.appendChild(newFlag);
    newDiv.appendChild(newCircle);
    newDiv.appendChild(showCoordinates);
    var popup = new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setDOMContent(newDiv)
        .addTo(map);
}

map.on('contextmenu', context_menu);