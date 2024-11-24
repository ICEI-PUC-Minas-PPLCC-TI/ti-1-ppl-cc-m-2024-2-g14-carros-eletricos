document.addEventListener("DOMContentLoaded", async () => {
    try {
      // Carregar o arquivo JSON
      const db = await fetch("db.json").then((response) => response.json());
      const perguntas = db.perguntas;
      const carros = db.carros1;
  
      const quizContainer = document.getElementById("quiz-container");
      const resultContainer = document.getElementById("result-container");
  
      let currentQuestion = 0;
      const userAnswers = [];
  
      // Mostrar a pergunta atual
      function showQuestion() {
        const question = perguntas[currentQuestion];
        quizContainer.innerHTML = `
          <div class="question">
            <h2>${question.pergunta}</h2>
            <div class="options">
              ${question.opcoes
                .map(
                  (opcao) =>
                    `<button onclick="selectAnswer('${opcao.pontos}')">${opcao.texto}</button>`
                )
                .join("")}
            </div>
          </div>
        `;
      }
  
      // Selecionar a resposta e avançar para a próxima pergunta
      window.selectAnswer = (pontos) => {
        userAnswers.push(pontos);
        currentQuestion++;
        if (currentQuestion < perguntas.length) {
          showQuestion();
        } else {
          calculateResult();
        }
      };
  
      // Calcular o resultado final
      function calculateResult() {
        const score = userAnswers.reduce((acc, cur) => {
          acc[cur] = (acc[cur] || 0) + 1;
          return acc;
        }, {});
  
        const topScore = Object.keys(score).reduce((a, b) =>
          score[a] > score[b] ? a : b
        );
  
        const idealCar = carros.find((carro) => carro.id.startsWith(topScore));
  
        quizContainer.style.display = "none";
        resultContainer.style.display = "block";
  
        if (idealCar) {
          resultContainer.innerHTML = `
            <div class="result">
              <h2>Seu Carro Ideal é o ${idealCar.nome}!</h2>
              <p>Preço: ${idealCar.preco}</p>
              <p>Ano: ${idealCar.ano}</p>
              <p>Marca: ${idealCar.marca}</p>
              <p>Tipo: ${idealCar.tipo}</p>
              <img src="${idealCar.imagem}" alt="${idealCar.nome}">
              <a href="${idealCar.link_venda}" target="_blank">
                <button>Saiba Mais</button>
              </a>
              <button class="retry" onclick="restartQuiz()">Tentar Novamente</button>
            </div>
          `;
        } else {
          resultContainer.innerHTML = `
            <div class="result">
              <p>Desculpe, não encontramos um carro para você.</p>
              <button class="retry" onclick="restartQuiz()">Tentar Novamente</button>
            </div>
          `;
        }
      }
  
      // Reiniciar o quiz
      window.restartQuiz = () => {
        currentQuestion = 0;
        userAnswers.length = 0;
        resultContainer.style.display = "none";
        quizContainer.style.display = "block";
        showQuestion();
      };
  
      // Iniciar o quiz
      showQuestion();
    } catch (error) {
      console.error("Erro ao carregar o quiz:", error);
      quizContainer.innerHTML = "<p>Erro ao carregar o quiz. Tente novamente.</p>";
    }
  });
  