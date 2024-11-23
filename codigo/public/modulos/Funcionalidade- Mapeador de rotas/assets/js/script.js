mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hb2FsdmFyZW5nYSIsImEiOiJjbTN1Ynd3cHcwaHk3MnFxMjIzbXNvcXp4In0.gE1wv9eX6hdO_5qs7VZdFw';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
});

function successLocation(position) {
    const { latitude, longitude } = position.coords;
    setupMap([longitude, latitude]);
}

function errorLocation() {
    setupMap([-74.006, 40.7128]); // Localização padrão (Nova York)
}

let map;

function setupMap(center) {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: center,
        zoom: 12
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');

    const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/cycling'
    });
    map.addControl(directions, 'top-left');

    carregarPontosDeRecarga();
}

async function carregarPontosDeRecarga() {
    try {
        const response = await fetch('http://localhost:3000/pontosDeRecarga');
        if (!response.ok) throw new Error('Erro ao carregar os dados dos pontos de recarga');

        const pontosDeRecarga = await response.json();
        pontosDeRecarga.forEach(ponto => {
            // Criar elemento personalizado para o marcador
            const el = document.createElement('div');
            el.className = 'custom-marker';
            el.style.backgroundImage = `url('assets/images/Icone.png')`; // Caminho para a imagem do ícone
            el.style.width = '40px'; // Tamanho do ícone
            el.style.height = '40px'; // Tamanho do ícone

            // Criar marcador com o ícone personalizado
            const marker = new mapboxgl.Marker(el)
                .setLngLat(ponto.coordenadas)
                .addTo(map);

            // Criar o conteúdo do popup
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

            const popup = new mapboxgl.Popup({ closeOnClick: true, draggable: true })
                .setHTML(popupContent);

            marker.setPopup(popup);
        });
    } catch (error) {
        console.error('Erro ao carregar pontos de recarga:', error);
        alert('Não foi possível carregar os pontos de recarga.');
    }
}
