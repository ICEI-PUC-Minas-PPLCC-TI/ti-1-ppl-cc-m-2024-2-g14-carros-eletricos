document.getElementById("calcular").addEventListener("click", function () {
    const potencia = parseFloat(document.querySelector('[data-campo="potencia"]').textContent);
    const bateria = parseFloat(document.querySelector('[data-campo="bateria"]').textContent);
    const porcentagem = parseFloat(document.querySelector('[data-campo="porcentagem"]').textContent);
  
    if (potencia > 0 && bateria > 0 && porcentagem > 0 && porcentagem <= 100) {
      const cargaNecessaria = (bateria * porcentagem) / 100;
      const tempoCarregamentoHoras = cargaNecessaria / potencia;
      const tempoCarregamentoMinutos = tempoCarregamentoHoras * 60;
  
      document.getElementById("resultado").innerHTML = 
        `Tempo estimado de carregamento: <span>${tempoCarregamentoHoras.toFixed(2)}</span> horas 
        (<span>${tempoCarregamentoMinutos.toFixed(2)}</span> minutos)`;
    } else {
      document.getElementById("resultado").innerHTML = 
        `Por favor, insira valores válidos (números positivos, porcentagem até 100).`;
    }
  });