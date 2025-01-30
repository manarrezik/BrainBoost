const questions = [
    { 
      question: "La balise utilisée pour les images en HTML est la balise ...?", 
      options: ["IMG", "VIDEO", "PICTURE"], 
      answer: "IMG",
      
    },
    { 
      question: "Pour appliquer une couleur en CSS, on utilise la propriété ...?", 
      options: ["BACKGROUND", "COLOR", "FONT"], 
      answer: "COLOR",
      
    },
    { 
      question: "En JavaScript, une variable déclarée avec 'let' est appelée une ...?", 
      options: ["CONST", "VARIABLE", "FUNCTION"], 
      answer: "VARIABLE",
      
    },
    { 
      question: "L'élément HTML qui contient le titre de la page est la balise ...?", 
      options: ["TITLE", "HEADER", "BODY"], 
      answer: "TITLE",
      
    },
    { 
      question: "La balise utilisée pour créer une liste non ordonnée en HTML est ...?", 
      options: ["UL", "OL", "LI"], 
      answer: "UL",
     
    },
    { 
      question: "En CSS, pour modifier la couleur de fond d'une page, on utilise la propriété ...?", 
      options: ["BACKGROUND-COLOR", "COLOR", "BACKGROUND"], 
      answer: "BACKGROUND-COLOR",
     
    },
    { 
      question: "La fonction JavaScript utilisée pour afficher une alerte est ...?", 
      options: ["ALERT", "PROMPT", "CONFIRM"], 
      answer: "ALERT",
      
    },
    { 
      question: "En JavaScript, les objets sont des collections de paires ...?", 
      options: ["CLÉ-VALUE", "KEY-VALUE", "OBJECT-VALUE"], 
      answer: "CLÉ-VALUE",
    
    },
    { 
      question: "Dans CSS, pour centrer un élément en utilisant Flexbox, on utilise la propriété ...?", 
      options: ["JUSTIFY-CONTENT", "ALIGN-CENTER", "CENTER"], 
      answer: "JUSTIFY-CONTENT",
    }
  ];
  let currentQuestionIndex = 0;
let countdown = 9;
let totalTime = countdown;
let timerInterval;

const canvas = document.getElementById('timerCanvas');
const ctx = canvas.getContext('2d');
const textElement = document.getElementById('timerText');
const feedback = document.getElementById("feedback");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = '';

    feedback.textContent = "";

    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(li);
    });

    resetTimer();
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.answer) {
        feedback.textContent = "Correct! 🎉";
    } else if (selectedOption === "") { // Check if time ran out
        feedback.textContent = "Time is over :)";
    } else {
        feedback.textContent = "Incorrect! 😕";
    }

    clearInterval(timerInterval);

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        setTimeout(loadQuestion, 2000);
    } else {
        setTimeout(() => alert("Quiz Finished! 🎉"), 2000);
    }
}

function drawCircle(progress) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background circle
    ctx.beginPath();
    ctx.arc(75, 75, 70, 0, 2 * Math.PI);
    ctx.fillStyle = '#C4D9FF';
    ctx.fill();

    // Progress arc
    ctx.beginPath();
    ctx.moveTo(75, 75);
    ctx.arc(75, 75, 70, -Math.PI / 2, -Math.PI / 2 + (2 * Math.PI * progress));
    ctx.fillStyle = '#577BC1';
    ctx.fill();

    textElement.textContent = countdown;
}

function resetTimer() {
    clearInterval(timerInterval);
    countdown = totalTime;
    updateTimer();
}

function updateTimer() {
    drawCircle(countdown / totalTime);

    if (countdown > 0) {
        countdown--;
        timerInterval = setTimeout(updateTimer, 1000);
    } else {
        checkAnswer(""); // Call checkAnswer with empty string when time is up
    }
}

loadQuestion();
