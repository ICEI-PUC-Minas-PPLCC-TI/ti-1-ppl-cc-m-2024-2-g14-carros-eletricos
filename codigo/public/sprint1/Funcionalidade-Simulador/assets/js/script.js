document.addEventListener("DOMContentLoaded", function() {
    function calculate() {
        const distance = parseFloat(document.getElementById("distance").value);
        const fuelConsumption = parseFloat(document.getElementById("value").value);
        const fuelPrice = parseFloat(document.getElementById("price").value);
        const electricConsumption = parseFloat(document.getElementById("consumption").value);
        const electricPrice = parseFloat(document.getElementById("priceE").value);

        console.log("Distância:", distance);
        console.log("Consumo Combustível:", fuelConsumption);
        console.log("Preço Combustível:", fuelPrice);
        console.log("Consumo Elétrico:", electricConsumption);
        console.log("Preço Energia:", electricPrice);

        if (isNaN(distance) || isNaN(fuelConsumption) || isNaN(fuelPrice) || isNaN(electricConsumption) || isNaN(electricPrice)) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        const fuelCost = (distance / fuelConsumption) * fuelPrice;
        const electricCost = (distance / electricConsumption) * electricPrice;
        const savings = (fuelCost - electricCost);

        console.log("Custo Combustível:", fuelCost);
        console.log("Custo Elétrico:", electricCost);
        console.log("Economia:", savings);

        document.getElementById("total").textContent = `Se economiza R$ ${savings.toFixed(2)} por ano ao comprar um carro elétrico`;

        saveData({ distance, fuelCost, electricCost, savings });
    }

    function saveData(data) {
        let savedData = JSON.parse(localStorage.getItem("savedResults")) || [];
        savedData.push(data);
        localStorage.setItem("savedResults", JSON.stringify(savedData));
    }

    function loadData() {
        const resultsDiv = document.getElementById("resultsDiv");
        if (!resultsDiv) {
            console.error("Elemento resultsDiv não encontrado.");
            return;
        }

        const savedData = JSON.parse(localStorage.getItem("savedResults")) || [];
        resultsDiv.innerHTML = "";

        savedData.forEach((data, index) => {
            const resultItem = document.createElement("div");
            resultItem.textContent = `Resultado ${index + 1}: Economia de R$ ${data.savings.toFixed(2)}`;

            
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Excluir";
            deleteButton.addEventListener("click", () => deleteData(index));

            resultItem.appendChild(deleteButton);
            resultsDiv.appendChild(resultItem);
        });
    }

    function deleteData(index) {
        let savedData = JSON.parse(localStorage.getItem("savedResults")) || [];
       
        savedData.splice(index, 1);
        localStorage.setItem("savedResults", JSON.stringify(savedData));
        loadData();
    }

    document.getElementById("calculate").addEventListener("click", calculate);
    document.getElementById("loadData").addEventListener("click", loadData);
});
