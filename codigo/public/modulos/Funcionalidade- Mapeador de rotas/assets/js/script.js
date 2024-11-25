mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hb2FsdmFyZW5nYSIsImEiOiJjbTN1Ynd3cHcwaHk3MnFxMjIzbXNvcXp4In0.gE1wv9eX6hdO_5qs7VZdFw';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
});

function successLocation(position) {
    const { latitude, longitude } = position.coords;
    setupMap([longitude, latitude]);
    carregarPontosDeRecarga();
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
    } catch (error) {
        console.error('Erro ao carregar pontos de recarga:', error);
        alert('Não foi possível carregar os pontos de recarga.');
    }
}

document.getElementById('search-button').addEventListener('click', async () => {
    const searchQuery = document.getElementById('search-bar').value;

    if (!searchQuery) {
        alert('Por favor, insira uma localização.');
        return;
    }

    try {
        // Geocodificação da localização inserida
        const geocodeResponse = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                searchQuery
            )}.json?access_token=${mapboxgl.accessToken}`
        );
        const geocodeData = await geocodeResponse.json();

        if (!geocodeData.features || geocodeData.features.length === 0) {
            alert('Localização não encontrada. Tente novamente.');
            return;
        }

        const [longitude, latitude] = geocodeData.features[0].center;

        const pontosDeRecargaResponse = await fetch('http://localhost:3000/pontosDeRecarga');
        const pontosDeRecarga = await pontosDeRecargaResponse.json();

        const pontosOrdenados = pontosDeRecarga.map(ponto => {
            const distance = calcularDistancia(latitude, longitude, ponto.coordenadas[1], ponto.coordenadas[0]);
            return { ...ponto, distance };
        }).sort((a, b) => a.distance - b.distance);

        const tresPontosMaisProximos = pontosOrdenados.slice(0, 3);

        // Atualizar a sidebar com os três pontos mais próximos
        const listaPontos = document.getElementById('lista-pontos');
        listaPontos.innerHTML = '';

        tresPontosMaisProximos.forEach(ponto => {
            const listItem = document.createElement('li');
            // Corrigido a interpolação da string
            listItem.innerHTML = `
                <img src="assets/images/Icone2.png" class="icon" alt="Ícone de recarga" />
                ${ponto.nome} - ${ponto.endereco} (${ponto.distance.toFixed(2)} km)
            `;
            listItem.onclick = () => {
                map.flyTo({ center: ponto.coordenadas, zoom: 15 });
            };
            listaPontos.appendChild(listItem);
        });

        // Centralizar o mapa na localização inserida
        map.flyTo({ center: [longitude, latitude], zoom: 12 });

    } catch (error) {
        console.error('Erro ao buscar localização ou pontos de recarga:', error);
        alert('Erro ao buscar a localização. Tente novamente.');
    }
});

function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
}
