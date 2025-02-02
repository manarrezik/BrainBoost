const questions = [
  
    {
      question: "Which HTML tag is used to create a hyperlink?",
      options: ["<a>", "<link>", "<url>"],
      answer: "<a>"
    },
    {
      question: "Which CSS property is used to change the font size of text?",
      options: ["font-size", "text-size", "font"],
      answer: "font-size"
    },
    {
      question: "In JavaScript, how do you access an HTML element by its ID?",
      options: ["getElementById()", "querySelector()", "getElement()"],
      answer: "getElementById()"
    },
    {
      question: "What is the difference between 'block' and 'inline' elements in CSS?",
      options: [
        "Block elements take up the full available width, while inline elements only take up the width they need.",
        "Block elements are used for text, while inline elements are used for images.",
        "There is no difference between block and inline elements."
      ],
      answer:
        "Block elements take up the full available width, while inline elements only take up the width they need."
    },
    {
      question: "What is the primary role of the SQL language?",
      options: [
        "Interact with databases",
        "Create dynamic user interfaces",
        "Style web pages"
      ],
      answer: "Interact with databases"
    },
    {
      question: "What is the DOM in JavaScript?",
      options: [
        "A representation of the structure of an HTML document",
        "A programming language for web applications",
        "A library of functions for manipulating CSS"
      ],
      answer: "A representation of the structure of an HTML document"
    },
    {
      question: "What is the difference between '==' and '===' in JavaScript?",
      options: [
        "'==' compares only the value, while '===' compares the value and the type.",
        "'==' compares the value and the type, while '===' compares only the value.",
        "There is no difference between '==' and '==='."
      ],
      answer:
        "'==' compares only the value, while '===' compares the value and the type."
    },
    {
      question: "Which HTTP method is typically used to retrieve data from a server?",
      options: ["GET", "POST", "PUT"],
      answer: "GET"
    },
    {
      question: "What does API stand for?",
      options: [
        "Application Programming Interface",
        "Advanced Program Instructions",
        "Application Process Integration"
      ],
      answer: "Application Programming Interface"
    },
    {
      question: "What is the purpose of a JavaScript framework like React or Angular?",
      options: [
        "To simplify the development of complex user interfaces",
        "To write server-side code",
        "To style web pages"
      ],
      answer: "To simplify the development of complex user interfaces"
    },
    {
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "High-Tech Modern Language",
        "Hyperlink and Text Management Language"
      ],
      answer: "HyperText Markup Language"
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Creative Style Solutions",
        "Computerized Styling System"
      ],
      answer: "Cascading Style Sheets"
    },
    {
      question: "What is the purpose of JavaScript?",
      options: [
        "To add interactivity and dynamic behavior to web pages",
        "To structure the content of a web page",
        "To style the visual presentation of a web page"
      ],
      answer: "To add interactivity and dynamic behavior to web pages"
    },
    {
      question: "Which tag is used to define the structure of an HTML table?",
      options: ["<table>", "<div>", "<span>"],
      answer: "<table>"
    },
    {
      question: "Which CSS property controls the spacing between lines of text?",
      options: ["line-height", "letter-spacing", "word-spacing"],
      answer: "line-height"
    },
    {
      question: "How do you declare a constant variable in JavaScript?",
      options: ["const", "let", "var"],
      answer: "const"
    },
    {
      question: "What is the purpose of a 'for' loop in JavaScript?",
      options: [
        "To repeat a block of code a specific number of times",
        "To execute a block of code only if a condition is true",
        "To define a function"
      ],
      answer: "To repeat a block of code a specific number of times"
    },
    {
      question: "Which browser developer tool allows you to inspect the HTML and CSS of a web page?",
      options: ["Elements panel", "Console panel", "Network panel"],
      answer: "Elements panel"
    },
    {
      question: "What is a 'responsive' web design?",
      options: [
        "A design that adapts to different screen sizes and devices",
        "A design that uses only HTML and CSS",
        "A design that loads very quickly"
      ],
      answer: "A design that adapts to different screen sizes and devices"
    },
    {
      question: "What is the purpose of a version control system like Git?",
      options: [
        "To track changes to code and collaborate with others",
        "To deploy web applications to a server",
        "To test web applications"
      ],
      answer: "To track changes to code and collaborate with others"
    },
    {
      question: "What is the difference between client-side and server-side scripting?",
      options: [
        "Client-side scripting runs in the user's browser, while server-side scripting runs on a server.",
        "Client-side scripting is used for styling web pages, while server-side scripting is used for database interactions.",
        "There is no difference between client-side and server-side scripting."
      ],
      answer: "Client-side scripting runs in the user's browser, while server-side scripting runs on a server."
    }
  
  
];

let currentQuestionIndex = 0;
let countdown = 9;
let totalTime = countdown;
let timerInterval;
let score = 0; 

const canvas = document.getElementById('timerCanvas');
const ctx = canvas.getContext('2d');
const textElement = document.getElementById('timerText');
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById('score-display'); 



function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = '';

    feedback.textContent = "";

    currentQuestion.options.forEach(option => {
        const li = document.createElement("li");
        li.textContent = option;
        li.onclick = () => checkAnswer(option, li);
        optionsContainer.appendChild(li);
    });

    resetTimer();
}

function checkAnswer(selectedOption, selectedElement) {
    const currentQuestion = questions[currentQuestionIndex];
    let correctElement;

    document.querySelectorAll("#options li").forEach(li => {
        if (li.textContent === currentQuestion.answer) {
            correctElement = li;
        }
    });


    if (selectedOption === currentQuestion.answer) {
        feedback.textContent = "Correct! :))))";
        score++; 
    } else if (selectedOption === "") {
        feedback.textContent = "Time is over :)";
    } else {
        feedback.textContent = "Incorrect! :((((";
        if (selectedElement) {
            selectedElement.style.color = "red";
        }
    }

    if (correctElement) {
        correctElement.style.color = "green";
    }
    clearInterval(timerInterval);

    currentQuestionIndex++;

    updateScoreDisplay(); 
    if (currentQuestionIndex < questions.length) {
        setTimeout(loadQuestion, 2000);
    } else {
        setTimeout(() => {
            alert(`Quiz Finished! Your score is ${score} out of ${questions.length}`);
        }, 2000);
    }
}

function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${score} / ${questions.length}`; 
}

function drawCircle(progress) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(75, 75, 70, 0, 2 * Math.PI);
    ctx.fillStyle = '#C4D9FF';
    ctx.fill();

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
        checkAnswer(""); 
    }
}

loadQuestion();