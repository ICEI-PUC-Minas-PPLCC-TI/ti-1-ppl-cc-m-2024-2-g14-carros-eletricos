document.addEventListener("DOMContentLoaded", () => {
    const rankingContainer = document.getElementById("ranking");

    fetch("dados.json")
        .then((response) => response.json())
        .then((carros) => {
            carros.forEach((carro) => {
                const carItem = document.createElement("div");
                carItem.classList.add("car-item");
                carItem.innerHTML = `
                    <span>#${carro.posicao} - ${carro.modelo}</span>
                    <img src="${carro.imagem}" alt="${carro.modelo}" class="car-image" />
                    <div class="car-details">
                        <p><strong>Ano:</strong> ${carro.ano}</p>
                        <p><strong>Tipo:</strong> ${carro.tipo}</p>
                        <p><strong>Preço:</strong> ${carro.preco}</p>
                        <p><strong>Quantidade Vendida:</strong> ${carro.quantidade}</p>
                    </div>
                `;

                // Adiciona evento de mouseover para mostrar detalhes
                carItem.addEventListener("mouseover", () => {
                    const details = carItem.querySelector(".car-details");
                    details.style.display = "block";
                });

                // Adiciona evento de mouseout para esconder detalhes
                carItem.addEventListener("mouseout", () => {
                    const details = carItem.querySelector(".car-details");
                    details.style.display = "none";
                });

                rankingContainer.appendChild(carItem);
            });
        })
        .catch((error) => console.error("Erro ao carregar os dados:", error));
});
