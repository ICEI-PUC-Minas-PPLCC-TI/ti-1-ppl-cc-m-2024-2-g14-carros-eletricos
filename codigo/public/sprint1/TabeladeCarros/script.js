document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const carList = document.getElementById('carList');

    // Função para buscar e exibir os dados do servidor
    async function fetchCarros() {
        try {
            const response = await fetch('http://localhost:3000/carros');
            const carros = await response.json();
            displayCarros(carros);

            // Filtro de busca
            searchInput.addEventListener('input', () => {
                const searchTerm = searchInput.value.toLowerCase();
                const filteredCarros = carros.filter(carro =>
                    carro.nome.toLowerCase().includes(searchTerm) ||
                    carro.marca.toLowerCase().includes(searchTerm)
                );
                displayCarros(filteredCarros);
            });
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
        }
    }

    // Função para exibir os carros em cards
    function displayCarros(carros) {
        carList.innerHTML = '';
        carros.forEach(carro => {
            const card = document.createElement('div');
            card.classList.add('car');

            // Extrai o preço como um número
            const precoStr = carro.preco.replace(/[^\d,]/g, '').replace(',', '.'); // Remove R$ e '.' e troca ',' por '.'
            const preco = parseFloat(precoStr);
            const precoFormatado = !isNaN(preco) ? `R$ ${preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'Preço indisponível';

            card.innerHTML = `
                <img src="${carro.imagem || 'default.jpg'}" alt="${carro.nome}">
                <h2>${carro.nome}</h2>
                <p><strong>Marca:</strong> ${carro.marca}</p>
                <p><strong>Ano:</strong> ${carro.ano}</p>
                <p><strong>Modelo:</strong> ${carro.modelo}</p>
                <p><strong>Tipo:</strong> ${carro.tipo}</p>
                <p class="price"><strong>Preço:</strong> ${precoFormatado}</p>
                <a href="${carro.link_venda}" class="details-button" target="_blank">+</a>
            `;

            carList.appendChild(card);
        });
    }

    // Chama a função para buscar e exibir os dados
    fetchCarros();
});
