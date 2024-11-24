let perguntaAtual = 0;

// Função para buscar perguntas do arquivo JSON
function carregarPerguntas() {
    fetch('/perguntas')
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao carregar o arquivo JSON.");
            }
            return response.json();
        })
        .then((perguntas) => {
            renderQuiz(perguntas);
        })
        .catch((error) => {
            console.error("Erro:", error);
        });
}

// Função para renderizar o quiz
function renderQuiz(perguntas) {
    const quizContainer = document.getElementById("quiz-content");

    perguntas.forEach((pergunta, index) => {
        const questionElement = document.createElement("div");
        questionElement.classList.add("question");
        if (index === 0) questionElement.classList.add("active");

        // Adiciona o número da pergunta em uma bolinha
        questionElement.innerHTML = `
          <div class="question-number">${index + 1}</div>
          <h3>${pergunta.pergunta}</h3>
        `;

        // Adiciona as opções
        const optionsContainer = document.createElement("div");
        optionsContainer.classList.add("options");

        pergunta.opcoes.forEach((opcao) => {
            const button = document.createElement("button");
            button.classList.add("option");
            button.textContent = opcao.texto;
            button.onclick = () => {
                console.log(`Você escolheu: ${opcao.texto} (Perfil ${opcao.pontos})`);
                irParaProximaPergunta(perguntas);
            };
            optionsContainer.appendChild(button);
        });

        questionElement.appendChild(optionsContainer);
        quizContainer.appendChild(questionElement);
    });
}

// Função para ir para a próxima pergunta
function irParaProximaPergunta(perguntas) {
    const questions = document.querySelectorAll(".question");
    questions[perguntaAtual].classList.remove("active");

    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        questions[perguntaAtual].classList.add("active");
    } else {
        alert("Quiz finalizado! Obrigado por participar.");
    }
}

// Iniciar o processo de carregamento
carregarPerguntas();
