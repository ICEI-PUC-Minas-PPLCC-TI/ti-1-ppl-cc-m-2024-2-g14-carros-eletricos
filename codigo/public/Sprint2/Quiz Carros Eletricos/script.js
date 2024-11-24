// script.js
document.addEventListener("DOMContentLoaded", async () => {
    const quizContainer = document.getElementById("quiz");
    const resultContainer = document.getElementById("result-container");
    const submitBtn = document.getElementById("submit-btn");
  
    // Carrega o arquivo JSON
    const db = await fetch("db.json").then((res) => res.json());
  
    // Renderiza as perguntas
    db.perguntas.forEach((pergunta, index) => {
      const questionElement = document.createElement("div");
      questionElement.classList.add("question");
      questionElement.innerHTML = `
        <h3>${index + 1}. ${pergunta.pergunta}</h3>
        ${pergunta.opcoes
          .map(
            (opcao, i) => `
            <label>
              <input type="radio" name="question${index}" value="${opcao.pontos}">
              ${opcao.texto}
            </label>
          `
          )
          .join("")}
      `;
      quizContainer.appendChild(questionElement);
    });
  
    // Calcula o resultado
    submitBtn.addEventListener("click", () => {
      const respostas = document.querySelectorAll("input[type=radio]:checked");
      const pontos = {};
  
      respostas.forEach((resposta) => {
        pontos[resposta.value] = (pontos[resposta.value] || 0) + 1;
      });
  
      const maiorPonto = Object.keys(pontos).reduce((a, b) =>
        pontos[a] > pontos[b] ? a : b
      );
  
      const carro = db.carros.find((c) => c.tipo.toLowerCase().includes(maiorPonto));
      mostrarResultado(carro);
    });
  
    function mostrarResultado(carro) {
      if (carro) {
        resultContainer.style.display = "block";
        resultContainer.innerHTML = `
          <h2>Seu Carro Elétrico Ideal é:</h2>
          <img src="${carro.imagem}" alt="${carro.nome}" style="max-width: 100%;">
          <p><strong>Nome:</strong> ${carro.nome}</p>
          <p><strong>Preço:</strong> ${carro.preco}</p>
          <p><strong>Link para compra:</strong> <a href="${carro.link_venda}" target="_blank">Clique aqui</a></p>
        `;
      }
    }
  });
  try {
    const db = await fetch("db.json").then((res) => {
      if (!res.ok) throw new Error("Erro ao carregar o JSON");
      return res.json();
    });
  
    console.log("JSON carregado com sucesso:", db);
  
    // Código para exibir as perguntas
  } catch (error) {
    console.error("Erro ao carregar o arquivo:", error);
    document.getElementById("quiz").innerHTML = "<p>Erro ao carregar as perguntas. Tente novamente.</p>";
  }