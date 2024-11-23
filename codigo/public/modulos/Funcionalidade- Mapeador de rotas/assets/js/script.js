mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hb2FsdmFyZW5nYSIsImEiOiJjbTN1Ynd3cHcwaHk3MnFxMjIzbXNvcXp4In0.gE1wv9eX6hdO_5qs7VZdFw';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
});

function successLocation(position) {
    const { latitude, longitude } = position.coords;
    setupMap([longitude, latitude]);
}

function errorLocation() {
   
    setupMap([-74.006, 40.7128]); 
}

function setupMap(center) {
    const map = new mapboxgl.Map({
        container: 'map', // 
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center, //
        zoom: 12 
    });

    // Add navigation controls (zoom in/out, rotate)
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');

    // Add a marker at the center
    new mapboxgl.Marker()
        .setLngLat(center)
        .addTo(map);


    
var directions = new MapboxDirections({
    accessToken: 'pk.eyJ1Ijoiam9hb2FsdmFyZW5nYSIsImEiOiJjbTN1Ynd3cHcwaHk3MnFxMjIzbXNvcXp4In0.gE1wv9eX6hdO_5qs7VZdFw',
    unit: 'metric',
    profile: 'mapbox/cycling'
  });
  

  map.addControl(directions, 'top-left');
}


