
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
        timeout:2500

    }
);
}