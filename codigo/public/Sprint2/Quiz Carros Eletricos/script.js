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
        if (index === 0) questionElement.classList.add("active"); // Mostrar a primeira pergunta

        questionElement.innerHTML = `<h3>${index + 1}. ${pergunta.pergunta}</h3>`;

        const optionsContainer = document.createElement("div");
        optionsContainer.classList.add("options");

        pergunta.opcoes.forEach((opcao, opcaoIndex) => {
            const button = document.createElement("button");
            button.classList.add("circle");
            button.textContent = String.fromCharCode(97 + opcaoIndex); // Letras a, b, c, d
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
