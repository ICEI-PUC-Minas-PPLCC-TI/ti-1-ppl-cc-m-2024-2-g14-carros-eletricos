document.addEventListener("DOMContentLoaded", () => {
    const quizContainer = document.getElementById("quiz-container");
    const resultContainer = document.getElementById("result-container");
    const submitBtn = document.getElementById("submit-btn");
  
    // Perguntas do Quiz
    const perguntas = [
      {
        pergunta: "Qual é a sua prioridade ao escolher um carro?",
        opcoes: [
          { texto: "Economia de combustível", pontos: "tesla" },
          { texto: "Desempenho e luxo", pontos: "audi" },
          { texto: "Simplicidade e praticidade", pontos: "fiat" },
          { texto: "Sustentabilidade", pontos: "nissan" }
        ]
      },
      {
        pergunta: "Como você usará o carro no dia a dia?",
        opcoes: [
          { texto: "Viagens longas e conforto", pontos: "audi" },
          { texto: "Trajetos curtos na cidade", pontos: "fiat" },
          { texto: "Trajetos urbanos e economia", pontos: "nissan" },
          { texto: "Equilíbrio entre luxo e tecnologia", pontos: "tesla" }
        ]
      },
      {
        pergunta: "Qual é o tipo de design que você prefere?",
        opcoes: [
          { texto: "Modernidade e inovação", pontos: "tesla" },
          { texto: "Elegância e robustez", pontos: "audi" },
          { texto: "Compacto e funcional", pontos: "fiat" },
          { texto: "Simples e ecológico", pontos: "nissan" }
        ]
      },
      {
        pergunta: "Quanto espaço você precisa no carro?",
        opcoes: [
          { texto: "Muito espaço para família e bagagem", pontos: "audi" },
          { texto: "Espaço médio, suficiente para dois passageiros", pontos: "fiat" },
          { texto: "Espaço básico, mais para trajetos curtos", pontos: "nissan" },
          { texto: "Espaço moderado com conforto extra", pontos: "tesla" }
        ]
      },
      {
        pergunta: "O que mais te atrai em um carro elétrico?",
        opcoes: [
          { texto: "Alta tecnologia e inovação", pontos: "tesla" },
          { texto: "Luxo e desempenho", pontos: "audi" },
          { texto: "Custo-benefício", pontos: "nissan" },
          { texto: "Mobilidade urbana compacta", pontos: "fiat" }
        ]
      }
    ];
  
    // Carros disponíveis
    const carros = {
      tesla: {
        nome: "Tesla Model 3",
        preco: "R$ 280.000",
        imagem: "imgs/Tesla Model3333.jpg",
        descricao: "Um sedã elétrico de alto desempenho e tecnologia avançada.",
        link: "https://www.tesla.com/model3"
      },
      audi: {
        nome: "Audi e-tron",
        preco: "R$ 500.000",
        imagem: "imgs/Audi e-tron.jpg",
        descricao: "SUV elétrico premium, ideal para luxo e conforto.",
        link: "https://www.audi.com.br"
      },
      fiat: {
        nome: "Fiat 500e",
        preco: "R$ 180.000",
        imagem: "imgs/Fiat 500e.jpg",
        descricao: "Compacto elétrico, perfeito para trajetos urbanos.",
        link: "https://500e.fiat.com.br"
      },
      nissan: {
        nome: "Nissan Leaf",
        preco: "R$ 190.000",
        imagem: "imgs/NissanLeaf.jpg",
        descricao: "Um hatch elétrico focado em sustentabilidade e economia.",
        link: "https://www.nissan.com"
      }
    };
  
    // Renderizar as perguntas no HTML
    perguntas.forEach((pergunta, index) => {
      const questionEl = document.createElement("div");
      questionEl.classList.add("quiz-question");
  
      questionEl.innerHTML = `
        <h3>${index + 1}. ${pergunta.pergunta}</h3>
        ${pergunta.opcoes
          .map(
            (opcao) => `
            <label>
              <input type="radio" name="question${index}" value="${opcao.pontos}">
              ${opcao.texto}
            </label>
          `
          )
          .join("")}
      `;
  
      quizContainer.appendChild(questionEl);
    });
  
    // Evento de clique para calcular resultado
    submitBtn.addEventListener("click", () => {
      const respostas = document.querySelectorAll("input[type='radio']:checked");
  
      if (respostas.length !== perguntas.length) {
        alert("Por favor, responda todas as perguntas!");
        return;
      }
  
      const pontos = {};
      respostas.forEach((resposta) => {
        pontos[resposta.value] = (pontos[resposta.value] || 0) + 1;
      });
  
      const vencedor = Object.keys(pontos).reduce((a, b) =>
        pontos[a] > pontos[b] ? a : b
      );
  
      const carro = carros[vencedor];
      mostrarResultado(carro);
    });
  
    // Mostrar resultado
    function mostrarResultado(carro) {
      resultContainer.style.display = "block";
      resultContainer.innerHTML = `
        <h2>Seu Carro Ideal é: ${carro.nome}</h2>
        <img src="${carro.imagem}" alt="${carro.nome}">
        <p><strong>Preço:</strong> ${carro.preco}</p>
        <p>${carro.descricao}</p>
        <a href="${carro.link}" target="_blank">Saiba mais</a>
      `;
    }
  });
  