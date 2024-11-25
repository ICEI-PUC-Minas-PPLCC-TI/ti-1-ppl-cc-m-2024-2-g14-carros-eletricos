document.addEventListener("DOMContentLoaded", () => {
    const rankingContainer = document.getElementById("ranking");

    // Carrega o arquivo db.json
    fetch('http://localhost:3000/Rankings')
        .then((response) => response.json())
        .then((data) => {
            console.log(data); // Log dos dados recebidos

            // Verifique se "data" é um array ou se contém a chave "Rankings"
            if (!data || !Array.isArray(data)) {
                console.error("Dados inválidos ou formato incorreto:", data);
                return;
            }

            // Acessando os carros diretamente se data já for um array
            const carros = data;

            carros.forEach((carro) => {
                // Cria o elemento para cada carro
                const carItem = document.createElement("div");
                carItem.classList.add("car-item");
                carItem.innerHTML = `
                    <span>#${carro.posicao} - ${carro.modelo}</span>
                    <img src="${carro.imagem}" alt="${carro.modelo}" class="car-image" />
                    <div class="car-details">
                        <p><strong>Ano:</strong> ${carro.ano}</p>
                        <p><strong>Tipo:</strong> ${carro.tipo}</p>
                        <p><strong>Preço:</strong> ${carro.preco}</p>
                        <p><strong>Unidades Vendidas:</strong> ${carro.quantidade}</p>
                    </div>
                `;

                // Evento para mostrar os detalhes ao passar o mouse
                carItem.addEventListener("mouseover", () => {
                    const details = carItem.querySelector(".car-details");
                    details.style.display = "block";
                    details.style.opacity = "1"; // Torna visível
                });

                // Evento para esconder os detalhes ao tirar o mouse
                carItem.addEventListener("mouseout", () => {
                    const details = carItem.querySelector(".car-details");
                    details.style.display = "none";
                    details.style.opacity = "0"; // Torna invisível novamente
                });

                // Adiciona o item do carro ao container
                rankingContainer.appendChild(carItem);
            });
        })
        .catch((error) => console.error("Erro ao carregar os dados:", error));  // Exibe erro no console se houver
});
