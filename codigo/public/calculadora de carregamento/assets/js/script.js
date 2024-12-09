document.addEventListener("DOMContentLoaded", function () {
    let chart;
  
    async function calculate() {
      const potencia = parseFloat(document.querySelector('[data-campo="potencia"]').textContent);
      const bateria = parseFloat(document.querySelector('[data-campo="bateria"]').textContent);
  
      if (potencia > 0 && bateria > 0) {
        const porcentagens = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        const tempoCarregamento = [];
  
        for (let porcentagem of porcentagens) {
          const cargaNecessaria = (bateria * porcentagem) / 100;
          const tempoMin = (cargaNecessaria / potencia) * 60;
          tempoCarregamento.push(tempoMin.toFixed(2));
        }
  
        renderChart({
          labels: porcentagens.map((p) => `${p}%`),
          tempoCarregamento,
        });
  
        saveData({
          potencia,
          bateria,
          porcentagens,
          tempoCarregamento,
        });
  
        document.getElementById("resultado").innerHTML = `
          <p>Gráfico atualizado com base na potência de ${potencia} kW e bateria de ${bateria} kWh.</p>
        `;
      } else {
        document.getElementById("resultado").innerHTML = `
          <p>Por favor, insira valores válidos para potência e bateria.</p>
        `;
      }
    }
  
    function renderChart(data) {
      const ctx = document.getElementById('graficoCarregamento').getContext('2d');
  
      if (chart) {
        chart.destroy();
      }
  
      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Tempo de Carregamento (minutos)',
              data: data.tempoCarregamento,
              backgroundColor: 'rgba(0, 250, 154, 0.2)',
              borderColor: 'rgba(0, 250, 154, 1)',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.raw} minutos`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Porcentagem de Bateria',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Tempo de Carregamento (min)',
              },
            },
          },
        },
      });
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
          resultItem.textContent = `Resultado ${index + 1}: Potência ${data.potencia} kW, Bateria ${data.bateria} kWh.`;
  
          const viewButton = document.createElement("button");
          viewButton.textContent = "Visualizar no Gráfico";
          viewButton.addEventListener("click", () => {
            renderChart({
              labels: data.porcentagens.map((p) => `${p}%`),
              tempoCarregamento: data.tempoCarregamento,
            });
          });
  
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Excluir";
          deleteButton.addEventListener("click", () => deleteData(data.id));
  
          resultItem.appendChild(viewButton);
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