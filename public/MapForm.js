var mymap = L.map('mapid').setView([0,0], 13);

const showIPAddressMap = async (json) => {
    //gets ip address from api.ipify, script in html, stores in json variable on page load
    
    //ip address added to url and url is used to fetch latitude and longitude points
    const ipAddress = json.ip;
    const api_url = `/${ipAddress}`;
    const response = await fetch(api_url);
    const ipJson = await response.json();

    const latitude = ipJson.location.lat;
    const longitude = ipJson.location.lng;
    
    //adds json data to page
    document.getElementById('ipAddress').value = ipAddress;
    document.getElementById('ip').innerHTML = ipAddress;
    document.getElementById('location').innerHTML = ipJson.location.city + ", " + ipJson.location.region + " " + ipJson.location.postalCode;
    document.getElementById('timezone').innerHTML = "UTC " + ipJson.location.timezone;
    document.getElementById('isp').innerHTML = ipJson.isp;

    
    //longitude and latitude points added to the map
    var points = [latitude, longitude];
    
    getMap(points);
    
}


const getSearch = async () => {
    //e.preventDefault();
    var inputValue = document.getElementById('ipAddress').value;
    if(inputValue == "") {
        alert('Please enter an ip address');
    } else {
        const loader = `<div class="loading"><div></div><div></div><div></div><div></div></div>`;
        document.getElementById('ip').innerHTML = loader;
        document.getElementById('location').innerHTML = loader;
        document.getElementById('timezone').innerHTML = loader;
        document.getElementById('isp').innerHTML = loader;

        //var ipAddress = inputValue;
        //var domain = 'https://corporate.comcast.com/'
        
        const api_url = `/${inputValue}`;
        const response = await fetch(api_url);
        const json = await response.json();
       
        const points = [json.location.lat, json.location.lng];
        console.log(points);

        
        setTimeout(function() {
            document.getElementById('ip').innerHTML = json.ip;
            document.getElementById('location').innerHTML = json.location.city + ", " + json.location.region + " " + json.location.postalCode;
            document.getElementById('timezone').innerHTML = "UTC " + json.location.timezone;
            document.getElementById('isp').innerHTML = json.isp;
        }, 1750);

        getMap(points);
    }
}


function getMap(points) {
    
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        //inertia: true,
        //inertiaDeceleration: 3000,
        
        accessToken: 'pk.eyJ1IjoidmEyNzYiLCJhIjoiY2tlaG9tb3F5MTVhbzJybXpkaHRpZXE5dSJ9.h24ofxQNklYPfEHCNFFyTA'
    }).addTo(mymap);

    var myIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [40, 50],
        iconAnchor: [25, 16],
    });

    mymap.setView(points, 13);
    
    L.marker(points, { icon: myIcon }).addTo(mymap);
    
}