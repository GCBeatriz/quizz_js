// Declaração variáveis
const question = document.querySelector("#question"); // questões
const answersBox = document.querySelector("#answers-box"); //alternativas
const quizzContainer = document.querySelector("#quizz-container"); //manipular elementos dentro dele
const scoreContainer = document.querySelector("#score-container"); // manipular elementos do resultado
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas

const questions = [

    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end", //array de objetos
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
  ]

  // Substituição do quizz para a primeira pergunta

  function init() {
    // criar a primeira pergunta
    createQuestion(0);
  }

  // Cria uma pergunta
  function createQuestion(i) {

    // Limpar a questão anterior
    const oldButtons = answersBox.querySelectorAll("button");

    oldButtons.forEach(function(btn) {
      btn.remove();
    });
    // Alterar o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContainer = i + 1;

    // Insere as alternativas
    questions[i].answers.forEach(function(answer, i) {

      // Cria o template do botão do quizz
      const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

      const letterBtn = answerTemplate.querySelector(".btn-letter");
      const answerText = answerTemplate.querySelector(".question-answer");

      letterBtn.textContent = letters[i];
      answerText.textContent = answer['answer'];

      answerTemplate.setAttribute("correct-answer", answer["correct"]);

      // Remover hide e template class
      answerTemplate.classList.remove("hide");
      answerTemplate.classList.remove("answer-template");

      // Inserir a alternativa na tela
      answersBox.appendChild(answerTemplate);

      // Inserir um evernto de click no botão
      answerTemplate.addEventListener("click", function() {
        checkAnswer(this);
      });

    });

    // Incrementar o número da questão
    actualQuestion++; // parametro para a próxima pergunta (avançar)
  }

  // Verificando resposta do usuário
  function checkAnswer(btn) {

    // Selecionar todos os botões
    const buttons = answersBox.querySelectorAll("button");
  
    // Verifica se a resposta está correta e adiciona classes nos botões
    buttons.forEach(function(button) {
      
      if(button.getAttribute("correct-answer") === "true") {

        button.classList.add("correct-answer");

        // Checa se o usuário acertou a pergunta
        if(btn == button) {
          //incremento dos pontos
          points++;
        }

      } else {

        button.classList.add("wrong-answer");
      }

    });

    // Exibir próxima pergunta
    nextQuestion();
  }

  // Exibe a próxima pergunta do quizz
  function nextQuestion() {

    // Timer para usuário ver as respostas
    setTimeout(function() {

      // Verifica se ainda há perguntas
      if(actualQuestion >= questions.length) {
        // Apresenta a msg de sucesso
        showSuccessMessage();
        return;
      }

      createQuestion(actualQuestion)

    }, 700);

  }

  // Exibe a tela final
  function showSuccessMessage() {

    hideOrShowQuizz();

    // trocar dados da tela de sucesso

    // calcular o  score
    const score = ((points / questions.length) * 100).toFixed(2); //toFixed para nao ter numero quebrado muito grande(só ate 2 casas após a vírgula)

    const displayScore = document.querySelector("#display-score span"); //mudar os dados que estõa la do score

    displayScore.textContent = score.toString();

    // Alterar o número de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");

    correctAnswers.textContent = points;

    // Alterar o total de perguntas

    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;

 }

 // Reiniciar Quizz
const restartBtn = document.querySelector("#restart"); //id restart no html

restartBtn.addEventListener("click", function() {

  //zerar o jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz(); // exibiu o quiz e escondeu score
  init();

});

  // mostra ou esconde o score (e quiz)
  function hideOrShowQuizz() {
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
  }
  //Inicialização do Quizz

  init();