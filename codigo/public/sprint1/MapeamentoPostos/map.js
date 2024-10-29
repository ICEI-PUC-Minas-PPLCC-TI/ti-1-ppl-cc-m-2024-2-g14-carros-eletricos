mapboxgl.accessToken = 'pk.eyJ1Ijoib3NvaGVucmkiLCJhIjoiY20yc29wazh0MW40NDJxb205bGZrazd6YyJ9.cO2A6L7oA4jrZ49vLWN1IA';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-43.9352, -19.9208],
    zoom: 12
});

let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];