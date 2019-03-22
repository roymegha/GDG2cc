
var xmlhttp = new XMLHttpRequest();
var url = "http://api.open-notify.org/iss-now.json";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
            var cord = JSON.parse(this.responseText);
            console.log(cord);
            var tileLayer = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',
            {
                attribution:false// '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            });
            
            var map = L.map('map',
            {
                zoomControl: true,
                layers: [tileLayer],
                maxZoom: 18,
                minZoom: 6
            })
            .setView([cord.iss_position.latitude, cord.iss_position.longitude], -100);
            var marker = L.marker([cord.iss_position.latitude, cord.iss_position.longitude]).bindPopup(`lat:${cord.iss_position.latitude},long:${cord.iss_position.longitude}`).addTo(map);
            
            setTimeout(function () { map.invalidateSize() }, 800);        

    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

// console.log(a.iss_position.latitude);





