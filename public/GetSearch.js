
const getSearch = async () => {
    
    var ipAddress = document.getElementById('ipAddress').value;
    console.log(ipAddress);

    const api_url = `/ip/${ipAddress}`;
    const response = await fetch(api_url);
    const json = await response.json();
    console.log(json);
    
    var latitude = json.location.lat;
    var longitude = json.location.lng;

    var myIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [40, 50],
        iconAnchor: [25, 16],
    });


    L.marker([latitude, longitude], { icon: myIcon }).addTo(mymap);
    mymap.setView([latitude, longitude], 13);

    document.getElementById('ip').innerHTML = json.ip;
    document.getElementById('location').innerHTML = json.location.city + ", " + json.location.region + " " + json.location.postalCode;
    document.getElementById('timezone').innerHTML = "UTC " + json.location.timezone;
    document.getElementById('isp').innerHTML = json.isp;

}