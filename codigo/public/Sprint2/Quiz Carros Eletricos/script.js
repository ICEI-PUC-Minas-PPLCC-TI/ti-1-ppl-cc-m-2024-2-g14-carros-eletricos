// Função para buscar perguntas do arquivo JSON
function carregarPerguntas() {
    // Fazendo a requisição para o arquivo JSON
    fetch('./db/perguntas.json')
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao carregar o arquivo JSON.");
        }
        return response.json();
      })
      .then(perguntas => {
        renderQuiz(perguntas);
      })
      .catch(error => {
        console.error("Erro:", error);
      });
  }
  
  // Função para renderizar o quiz
  function renderQuiz(perguntas) {
    const quizContainer = document.getElementById("quiz-content");
  
    perguntas.forEach((pergunta) => {
      const questionElement = document.createElement("div");
      questionElement.classList.add("question");
      questionElement.innerHTML = `<h3>${pergunta.pergunta}</h3>`;
  
      pergunta.opcoes.forEach((opcao) => {
        const button = document.createElement("button");
        button.textContent = opcao.texto;
        button.onclick = () => {
          console.log(`Você escolheu: ${opcao.texto} (Perfil ${opcao.pontos})`);
          // Lógica adicional pode ser implementada aqui
        };
        questionElement.appendChild(button);
      });
  
      quizContainer.appendChild(questionElement);
    });
  }
  
  // Iniciar o processo de carregamento
  carregarPerguntas();
  