// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");

const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ],
    },
    {
        question: "What is the largerst ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ],
    },
    {
        question: "What is the chemical symbol for silver?",
        answers: [
            { text: "Ag", correct: true },
            { text: "Au", correct: false },
            { text: "Fe", correct: false },
            { text: "Cu", correct: false }
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ],
    },
    {
        question: "What is the largest mammal in the world?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Giraffe", correct: false },
            { text: "Hippopotamus", correct: false }
        ],
    }
]

// Quiz State vars
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event Listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    
    showQuestion();

}

function showQuestion() {
    
    answersDisabled = false;
    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";

    questionText.textContent = currentQuestion.question;
    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);

    });
}

function selectAnswer(event) {
    if (answersDisabled) return;

    answersDisabled = true;
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if(button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if(isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }
    
    setTimeout(() => {
        currentQuestionIndex++;
        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);

}

function showResult() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    
    finalScoreSpan.textContent = score;
    const percentage = (score / quizQuestions.length) * 100;

    if(percentage === 100) {
        resultMessage.textContent = "Excellent! You got all the answers correct!";
    } else if(percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if(percentage >= 60) {
        resultMessage.textContent = "Not bad! Keep learning!";
    } else if(percentage >= 40) {
        resultMessage.textContent = "You can do better! Keep trying!";
    } else {
        resultMessage.textContent = "Keep practicing! You'll get better!";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");

    startQuiz();
}
