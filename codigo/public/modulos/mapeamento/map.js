mapboxgl.accessToken = 'pk.eyJ1Ijoib3NvaGVucmkiLCJhIjoiY20yc29wazh0MW40NDJxb205bGZrazd6YyJ9.cO2A6L7oA4jrZ49vLWN1IA';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-43.9352, -19.9208],
    zoom: 12
});

let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

async function carregarPontosDeRecarga() {
    try {
        const response = await fetch('http://localhost:3000/pontosDeRecarga');
        if (!response.ok) throw new Error('Erro ao carregar os dados dos pontos de recarga');

        const pontosDeRecarga = await response.json();
        pontosDeRecarga.forEach(ponto => {
            const marker = new mapboxgl.Marker()
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
                    <p><strong>Favoritado:</strong> <span id="favoritado-${ponto.id}">${favoritos.includes(ponto.id) ? 'Sim' : 'Não'}</span></p>
                    <button class="favoritar-button" id="favoritar-button-${ponto.id}">
                        <i id="favorito-icon-${ponto.id}" class="${favoritos.includes(ponto.id) ? 'fas' : 'far'} fa-heart" style="font-size: 24px;"></i>
                    </button>
                </div>
            `;

            marker.getElement().addEventListener('click', () => {
                const popup = new mapboxgl.Popup({ closeOnClick: false, draggable: true })
                    .setLngLat(ponto.coordenadas)
                    .setHTML(popupContent)
                    .addTo(map);

                const favoritarButton = document.getElementById(`favoritar-button-${ponto.id}`);
                favoritarButton.onclick = () => {
                    const isFavorito = favoritos.includes(ponto.id);
                    if (isFavorito) {
                        favoritos = favoritos.filter(id => id !== ponto.id);
                    } else {
                        favoritos.push(ponto.id);
                    }
                    document.getElementById(`favoritado-${ponto.id}`).innerText = favoritos.includes(ponto.id) ? 'Sim' : 'Não';
                    document.getElementById(`favorito-icon-${ponto.id}`).className = favoritos.includes(ponto.id) ? 'fas fa-heart' : 'far fa-heart';

                    localStorage.setItem('favoritos', JSON.stringify(favoritos));
                };
            });
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}
carregarPontosDeRecarga();