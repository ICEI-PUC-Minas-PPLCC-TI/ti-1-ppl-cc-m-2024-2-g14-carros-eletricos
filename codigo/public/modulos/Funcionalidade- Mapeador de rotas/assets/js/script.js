mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hb2FsdmFyZW5nYSIsImEiOiJjbTN1Ynd3cHcwaHk3MnFxMjIzbXNvcXp4In0.gE1wv9eX6hdO_5qs7VZdFw';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
});

function successLocation(position) {
    const { latitude, longitude } = position.coords;
    setupMap([longitude, latitude]);
    carregarPontosDeRecarga(latitude, longitude);
}

function errorLocation() {
    setupMap([-74.006, 40.7128]);
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
}

async function carregarPontosDeRecarga() {
    try {
        const response = await fetch('http://localhost:3000/pontosDeRecarga');
        if (!response.ok) throw new Error('Erro ao carregar os dados dos pontos de recarga');

        const pontosDeRecarga = await response.json();

        // Mostrar todos os pontos no mapa
        pontosDeRecarga.forEach(ponto => {
            const el = document.createElement('div');
            el.className = 'custom-marker';
            el.style.backgroundImage = `url('assets/images/Icone.png')`; 
            el.style.width = '40px'; 
            el.style.height = '40px';

            const marker = new mapboxgl.Marker(el)
                .setLngLat(ponto.coordenadas)
                .addTo(map);

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

        // Selecionar três pontos aleatórios
        const pontosAleatorios = [];
        while (pontosAleatorios.length < 3) {
            const indexAleatorio = Math.floor(Math.random() * pontosDeRecarga.length);
            if (!pontosAleatorios.includes(pontosDeRecarga[indexAleatorio])) {
                pontosAleatorios.push(pontosDeRecarga[indexAleatorio]);
            }
        }

        // Exibir três pontos aleatórios na tabela
        const listaPontos = document.getElementById('lista-pontos');
        listaPontos.innerHTML = '';

        pontosAleatorios.forEach(ponto => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${ponto.nome} - ${ponto.endereco}`;
            listItem.onclick = () => {
                map.flyTo({ center: ponto.coordenadas, zoom: 15 });
            };
            listaPontos.appendChild(listItem);
        });

    } catch (error) {
        console.error('Erro ao carregar pontos de recarga:', error);
        alert('Não foi possível carregar os pontos de recarga.');
    }
}
