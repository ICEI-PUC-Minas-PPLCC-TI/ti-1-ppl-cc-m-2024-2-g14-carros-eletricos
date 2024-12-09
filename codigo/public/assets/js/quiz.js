document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz-container");
    const resultContainer = document.getElementById("result-container");
  
    // Perguntas do Quiz
    const perguntas = [
      {
        pergunta: "Qual tipo de carro você prefere?",
        opcoes: ["SUV elétrico", "Hatch elétrico", "Sedan elétrico", "Compacto elétrico"],
        chave: "tipo"
      },
      {
        pergunta: "Qual faixa de preço você considera ideal?",
        opcoes: ["R$ 150.000 - R$ 200.000", "R$ 200.001 - R$ 300.000", "R$ 300.001 - R$ 500.000", "Acima de R$ 500.000"],
        chave: "preco"
      },
      {
        pergunta: "Você prefere modelos mais recentes ou mais antigos?",
        opcoes: ["2020 ou mais antigos", "2021", "2022", "2023 ou mais recentes"],
        chave: "ano"
      }
    ];
  
    let respostas = {};
  
    function carregarPerguntas() {
      quizContainer.innerHTML = ""; // Limpa o conteúdo do quiz
  
      perguntas.forEach((item, index) => {
        const perguntaDiv = document.createElement("div");
        perguntaDiv.classList.add("pergunta");
  
        const titulo = document.createElement("h2");
        titulo.textContent = item.pergunta;
        perguntaDiv.appendChild(titulo);
  
        item.opcoes.forEach(opcao => {
          const label = document.createElement("label");
          const input = document.createElement("input");
          input.type = "radio";
          input.name = `pergunta${index}`;
          input.value = opcao;
          input.onclick = () => salvarResposta(item.chave, opcao);
  
          label.appendChild(input);
          label.appendChild(document.createTextNode(opcao));
          label.style.display = "block";
          label.style.margin = "0.5rem 0";
          perguntaDiv.appendChild(label);
        });
  
        quizContainer.appendChild(perguntaDiv);
      });
  
      const botaoFinalizar = document.createElement("button");
      botaoFinalizar.textContent = "Descobrir Meu Carro Ideal";
      botaoFinalizar.onclick = buscarResultado;
      botaoFinalizar.style.marginTop = "1rem";
      botaoFinalizar.style.padding = "0.7rem 1.5rem";
      botaoFinalizar.style.fontSize = "1rem";
      botaoFinalizar.style.color = "#fff";
      botaoFinalizar.style.backgroundColor = "#4CAF50";
      botaoFinalizar.style.border = "none";
      botaoFinalizar.style.borderRadius = "5px";
      botaoFinalizar.style.cursor = "pointer";
      botaoFinalizar.style.transition = "background-color 0.3s";
      botaoFinalizar.onmouseover = () => (botaoFinalizar.style.backgroundColor = "#45a049");
      botaoFinalizar.onmouseout = () => (botaoFinalizar.style.backgroundColor = "#4CAF50");
  
      quizContainer.appendChild(botaoFinalizar);
    }
  
    function salvarResposta(chave, valor) {
      respostas[chave] = valor;
    }
  
    function buscarResultado() {
      fetch("http://localhost:3000/carros")
        .then(response => response.json())
        .then(carros => {
          // Agora vamos procurar um carro que corresponda pelo menos parcialmente às respostas
          const resultado = carros.filter(carro => {
            return (
              (respostas.tipo ? carro.tipo === respostas.tipo : true) &&
              (respostas.preco ? compararPreco(carro.preco, respostas.preco) : true) &&
              (respostas.ano ? compararAno(carro.ano, respostas.ano) : true)
            );
          });
  
          // Se não houver correspondência, exibe o primeiro carro da lista
          if (resultado.length === 0) {
            exibirResultado(carros[0]);  // Exibe o primeiro carro se não encontrar nenhuma correspondência
          } else {
            exibirResultado(resultado[0]);  // Exibe o primeiro carro correspondente
          }
        })
        .catch(error => console.error("Erro ao buscar dados:", error));
    }
  
    function compararPreco(precoCarro, faixaPreco) {
      const valor = parseInt(precoCarro.replace("R$", "").replace(".", "").trim());
      switch (faixaPreco) {
        case "R$ 150.000 - R$ 200.000":
          return valor >= 150000 && valor <= 200000;
        case "R$ 200.001 - R$ 300.000":
          return valor > 200000 && valor <= 300000;
        case "R$ 300.001 - R$ 500.000":
          return valor > 300000 && valor <= 500000;
        case "Acima de R$ 500.000":
          return valor > 500000;
        default:
          return false;
      }
    }
  
    function compararAno(anoCarro, faixaAno) {
      switch (faixaAno) {
        case "2020 ou mais antigos":
          return anoCarro <= 2020;
        case "2021":
          return anoCarro === 2021;
        case "2022":
          return anoCarro === 2022;
        case "2023 ou mais recentes":
          return anoCarro >= 2023;
        default:
          return false;
      }
    }
  
    function exibirResultado(carro) {
      quizContainer.style.display = "none";
      resultContainer.style.display = "block";
  
      if (carro) {
        resultContainer.innerHTML = `
          <h2>Seu carro ideal é:</h2>
          <img src="${carro.imagem}" alt="${carro.nome}">
          <p><strong>Nome:</strong> ${carro.nome}</p>
          <p><strong>Preço:</strong> ${carro.preco}</p>
          <p><strong>Ano:</strong> ${carro.ano}</p>
          <p><strong>Tipo:</strong> ${carro.tipo}</p>
          <a href="${carro.link_venda}" target="_blank" style="color: #4CAF50; text-decoration: none;">Saiba mais</a>
        `;
      } else {
        resultContainer.innerHTML = `
          <h2>Não encontramos um carro ideal para suas preferências, mas aqui está uma sugestão:</h2>
          <p>Confira o primeiro carro da nossa lista!</p>
        `;
      }
    }
  
    // Inicializa o quiz
    carregarPerguntas();
  });