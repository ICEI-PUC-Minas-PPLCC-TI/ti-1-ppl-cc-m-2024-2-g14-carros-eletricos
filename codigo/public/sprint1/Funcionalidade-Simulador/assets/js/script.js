
function calculate() {
    
    const distancia = parseFloat(document.getElementById("distance").value);
    const consumoC = parseFloat(document.getElementById("value").value);
    const precoC = parseFloat(document.getElementById("price").value);
    const consumoE = parseFloat(document.getElementById("consumption").value);
    const precoE = parseFloat(document.getElementById("priceE").value);

    
    if (isNaN(distancia) || isNaN(consumoC) || isNaN(precoC) || isNaN(consumoE) || isNaN(precoE)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    
    const custoCombustao = (distancia / consumoC) * precoC;
    const custoEletrico = (distancia / consumoE) * precoE;

    
    const economia = custoCombustao - custoEletrico;

    
    document.getElementById("total").innerText = `R$ ${economia.toFixed(2)}`;

  
    saveData(distancia, consumoC, precoC, consumoE, precoE, custoCombustao, custoEletrico, economia);
}


function saveData(distancia, consumoC, precoC, consumoE, precoE, custoC, custoE, economia) {
    const data = {
        distancia,
        consumoC,
        precoC,
        consumoE,
        precoE,
        custoC,
        custoE,
        economia
    };
    
    
    let savedData = JSON.parse(localStorage.getItem("economiaDados")) || [];
    savedData.push(data);
    localStorage.setItem("economiaDados", JSON.stringify(savedData));
}


function loadData() {
    // Recupera os dados do Local Storage
    const savedData = JSON.parse(localStorage.getItem("economiaDados")) || [];
    const resultsDiv = document.getElementById("savedResults");
    resultsDiv.innerHTML = ""; // Limpa resultados anteriores

    if (savedData.length === 0) {
        resultsDiv.innerHTML = "<p>Nenhum dado salvo.</p>";
        return;
    }

    savedData.forEach((data, index) => {
        resultsDiv.innerHTML += `
            <div>
                <h4>Registro ${index + 1}</h4>
                <p>Distância: ${data.distancia} km</p>
                <p>Consumo Combustão: ${data.consumoC} km/l</p>
                <p>Preço Combustível: R$ ${data.precoC}</p>
                <p>Consumo Elétrico: ${data.consumoE} km/kWh</p>
                <p>Preço Energia: R$ ${data.precoE}</p>
                <p>Custo Anual (Carro a Combustão): R$ ${data.custoC.toFixed(2)}</p>
                <p>Custo Anual (Carro Elétrico): R$ ${data.custoE.toFixed(2)}</p>
                <p>Economia: R$ ${data.economia.toFixed(2)}</p>
            </div>
        `;
    });
}


document.getElementById("calculate").addEventListener("click", calculate);


document.addEventListener("DOMContentLoaded", loadData);
