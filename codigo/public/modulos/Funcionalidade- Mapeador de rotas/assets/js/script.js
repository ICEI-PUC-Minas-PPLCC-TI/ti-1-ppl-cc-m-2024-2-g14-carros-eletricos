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

async function carregarPontosDeRecarga() {
    try {
        const response = await fetch('http://localhost:3000/pontosDeRecarga');
        if (!response.ok) throw new Error('Erro ao carregar os dados dos pontos de recarga');

        const pontosDeRecarga = await response.json();
        pontosDeRecarga.forEach(ponto => {
            // Criar marcador no mapa
            const marker = new mapboxgl.Marker()
                .setLngLat(ponto.coordenadas)
                .addTo(map);

            // Conteúdo do popup
            const popupContent = `
                <div class="mapboxgl-popup-content">
                    <h3>${ponto.nome}</h3>
                    <p><strong>Endereço:</strong> ${ponto.endereco}</p>
                    <img src="${ponto.imagem}" alt="Imagem do local" style="width:100%; border-radius:8px;">
                    <p><strong>Tipo de Plug:</strong> ${ponto.informacoesAdicionais.tipoDePlug}</p>
                    <p><strong>Potência:</strong> ${ponto.informacoesAdicionais.potencia}</p>
                    <p><strong>Horário de Funcionamento:</strong> ${ponto.informacoesAdicionais.horarioFuncionamento}</p>
                </div>
            `;

            // Adicionar evento ao marcador
            marker.getElement().addEventListener('click', () => {
                if (map.hasControl(popup)) popup.remove(); // Remove popup anterior, se existir
                const popup = new mapboxgl.Popup({ closeOnClick: false, draggable: true })
                    .setLngLat(ponto.coordenadas)
                    .setHTML(popupContent)
                    .addTo(map);
            });
        });
    } catch (error) {
        console.error('Erro:', error);
        alert('Não foi possível carregar os pontos de recarga.');
    }
}



