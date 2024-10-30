document.addEventListener("DOMContentLoaded", function() {
    function calculate() {
        const distance = parseFloat(document.getElementById("distance").value);
        const fuelConsumption = parseFloat(document.getElementById("value").value);
        const fuelPrice = parseFloat(document.getElementById("price").value);
        const electricConsumption = parseFloat(document.getElementById("consumption").value);
        const electricPrice = parseFloat(document.getElementById("priceE").value);

        if (isNaN(distance) || isNaN(fuelConsumption) || isNaN(fuelPrice) || isNaN(electricConsumption) || isNaN(electricPrice)) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        const fuelCost = (distance / fuelConsumption) * fuelPrice;
        const electricCost = (distance / electricConsumption) * electricPrice;
        const savings = fuelCost - electricCost;

        document.getElementById("total").textContent = `Se economiza R$ ${savings.toFixed(2)} por ano ao comprar um carro elétrico`;

        saveData({ distance, fuelCost, electricCost, savings });
    }

    async function saveData(data) {
        try {
            const response = await fetch("http://localhost:3000/cadastroCalculo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error("Erro ao salvar os dados.");
            console.log("Dados salvos com sucesso.");
            loadData(); // Carregar os dados após salvar
        } catch (error) {
            console.error("Erro ao salvar os dados:", error);
        }
    }

    async function loadData() {
        const resultsDiv = document.getElementById("resultsDiv");
        resultsDiv.innerHTML = ""; // Limpa resultados antigos

        try {
            const response = await fetch("http://localhost:3000/cadastroCalculo");
            if (!response.ok) throw new Error("Erro ao carregar os dados.");

            const savedData = await response.json();
            savedData.forEach((data, index) => {
                const resultItem = document.createElement("div");
                resultItem.textContent = `Resultado ${index + 1}: Economia de R$ ${data.savings.toFixed(2)}`;

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Excluir";
                deleteButton.addEventListener("click", () => deleteData(data.id));

                resultItem.appendChild(deleteButton);
                resultsDiv.appendChild(resultItem);
            });
        } catch (error) {
            console.error("Erro ao carregar os dados:", error);
            resultsDiv.innerHTML = "<p>Erro ao carregar os dados. Verifique se o servidor está rodando.</p>";
        }
    }

    async function deleteData(id) {
        try {
            await fetch(`http://localhost:3000/cadastroCalculo/${id}`, {
                method: "DELETE"
            });
            loadData(); // Atualiza a lista de resultados
        } catch (error) {
            console.error("Erro ao excluir os dados:", error);
        }
    }

    document.getElementById("calculate").addEventListener("click", calculate);
    document.getElementById("loadData").addEventListener("click", loadData);
});
