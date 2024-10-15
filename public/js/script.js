
const socket = io();


if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const{latitude,longitude} = position.coords;
        socket.emit("send-location",{latitude,longitude});
    },(error)=>{
        console.error(error);
    },
    {
        enableHighAccuracy:true,
        maximumAge:0,
        timeout:2500,
    }
);
}
   window.onload = function () {
    var map = L.map('map', {
        zoomControl: true ,
        attributionControl: false
    }).setView([0,0], 10);
    
              L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
}
const marker = {};
socket.on("receive-location",(data)=>{
    const{id,latitude,longitude}=data;
    map.setView([latitude,longitude],15);
    if(marker[id]){
        marker[id].setLatLong([latitude,longitude]);
    }
    else{
        marker[id]=L.marker([latitude,longitude]).addTo(map);
    }
})