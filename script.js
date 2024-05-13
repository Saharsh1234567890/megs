let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const resultElement = document.getElementById('result');
const restartButton = document.getElementById('restart-btn');

// Load questions from JSON file
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        window.questions = data; // Define questions variable in global scope
        loadQuestion(currentQuestion); // Start loading questions after data is fetched
    })
    .catch(error => console.error('Error loading questions:', error));

function loadQuestion(questionIndex) {
    const questionData = questions[questionIndex];
    questionElement.innerText = questionData.question;
    optionsElement.innerHTML = '';
    questionData.options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.innerText = option;
        optionElement.addEventListener('click', () => checkAnswer(option, questionData.answer));
        optionsElement.appendChild(optionElement);
    });
}

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion(currentQuestion);
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    resultElement.innerText = `You scored ${score} out of ${questions.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    resultContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    loadQuestion(currentQuestion);
}

nextButton.addEventListener('click', () => loadQuestion(currentQuestion));
restartButton.addEventListener('click', restartQuiz);
