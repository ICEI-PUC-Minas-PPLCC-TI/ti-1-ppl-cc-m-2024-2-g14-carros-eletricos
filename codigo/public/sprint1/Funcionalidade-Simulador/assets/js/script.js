document.getElementById("calculate").addEventListener("click", calcularEconomia);

function calcularEconomia() {
    // Obtém os valores dos campos de entrada
    const distanciaAnual = parseFloat(document.getElementById("distance").value); // Distância anual em km

    // Valores para o carro a combustão
    const consumoCombustao = parseFloat(document.getElementById("value").value); // Consumo médio (km/l)
    const precoCombustivel = parseFloat(document.getElementById("price").value); // Preço do combustível (R$/litro)

    // Valores para o carro elétrico
    const consumoEletrico = parseFloat(document.getElementById("consumption").value); // Consumo médio (km/kWh)
    const precoEnergia = parseFloat(document.getElementById("priceE").value); // Preço da energia (R$/kWh)

    // Verifica se todos os campos foram preenchidos corretamente
    if (isNaN(distanciaAnual) || isNaN(consumoCombustao) || isNaN(precoCombustivel) || isNaN(consumoEletrico) || isNaN(precoEnergia)) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // Cálculo do custo total para o carro a combustão
    const litrosUsados = distanciaAnual / consumoCombustao;
    const custoCombustao = litrosUsados * precoCombustivel;

    // Cálculo do custo total para o carro elétrico
    const kWhUsados = distanciaAnual / consumoEletrico;
    const custoEletrico = kWhUsados * precoEnergia;

    // Cálculo da economia anual ao optar pelo carro elétrico
    const economia = custoCombustao - custoEletrico;

    // Exibe os resultados na página
    document.getElementById("total").innerHTML = `
        Custo Anual (Carro a Combustão): R$ ${custoCombustao.toFixed(2)} <br>
        Custo Anual (Carro Elétrico): R$ ${custoEletrico.toFixed(2)} <br>
        Economia Anual ao optar pelo carro elétrico: R$ ${economia.toFixed(2)}
    `;
}
