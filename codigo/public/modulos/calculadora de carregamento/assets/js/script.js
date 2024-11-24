document.addEventListener("DOMContentLoaded", function () {
  function calculate() {
      const potencia = parseFloat(document.querySelector('[data-campo="potencia"]').textContent);
      const bateria = parseFloat(document.querySelector('[data-campo="bateria"]').textContent);
      const porcentagem = parseFloat(document.querySelector('[data-campo="porcentagem"]').textContent);

      if (potencia > 0 && bateria > 0 && porcentagem > 0 && porcentagem <= 100) {
          const cargaNecessaria = (bateria * porcentagem) / 100;
          const tempoCarregamentoHoras = cargaNecessaria / potencia;
          const tempoCarregamentoMinutos = tempoCarregamentoHoras * 60;

          const resultado = {
              potencia,
              bateria,
              porcentagem,
              tempoCarregamentoHoras: tempoCarregamentoHoras.toFixed(2),
              tempoCarregamentoMinutos: tempoCarregamentoMinutos.toFixed(2),
          };

          document.getElementById("resultado").innerHTML = 
              `Tempo estimado de carregamento: <span>${resultado.tempoCarregamentoHoras}</span> horas 
              (<span>${resultado.tempoCarregamentoMinutos}</span> minutos)`;

          saveData(resultado);
      } else {
          document.getElementById("resultado").innerHTML = 
              `Por favor, insira valores válidos (números positivos, porcentagem até 100).`;
      }
  }

  async function saveData(data) {
      try {
          const response = await fetch("http://localhost:3000/resultados", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
          });

          if (!response.ok) throw new Error("Erro ao salvar os dados.");
          console.log("Dados salvos com sucesso.");
          loadData();
      } catch (error) {
          console.error("Erro ao salvar os dados:", error);
      }
  }

  async function loadData() {
      const resultsDiv = document.getElementById("resultsDiv");
      resultsDiv.innerHTML = "";

      try {
          const response = await fetch("http://localhost:3000/resultados");
          if (!response.ok) throw new Error("Erro ao carregar os dados.");

          const savedData = await response.json();
          savedData.forEach((data, index) => {
              const resultItem = document.createElement("div");
              resultItem.textContent = `Resultado ${index + 1}: Tempo estimado de carregamento: ${data.tempoCarregamentoHoras} horas (${data.tempoCarregamentoMinutos} minutos)`;

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
          await fetch(`http://localhost:3000/resultados/${id}`, {
              method: "DELETE",
          });
          loadData();
      } catch (error) {
          console.error("Erro ao excluir os dados:", error);
      }
  }

  document.getElementById("calcular").addEventListener("click", calculate);
  document.getElementById("loadData").addEventListener("click", loadData);
});