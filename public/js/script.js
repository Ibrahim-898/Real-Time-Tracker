const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("send-location", { latitude, longitude });
    }, (error) => {
    }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
    });
}

var map = L.map('map', {
    zoomControl: true,
    attributionControl: false
}).setView([0, 0], 12);

L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

const markers = {};

socket.on("receive-location", (data) => {
    for (const id in data) {
        const { latitude, longitude } = data[id];
        if (markers[id]) {
            markers[id].setLatLng([latitude, longitude]);
        } else {
            markers[id] = L.marker([latitude, longitude]).addTo(map).bindPopup(`User: ${id}`).openPopup();
        }
    }
});

socket.on("user disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});
