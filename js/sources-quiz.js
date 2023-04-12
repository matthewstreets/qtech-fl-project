const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const quizContainer = document.getElementById('quiz-container')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const finalScore = document.getElementById('final-score')
const quizLength = document.getElementById('quiz-length')

let score = 0
let shuffledQuestions, currentQuestionIndex 

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++ 
    setNextQuestion()
})

function startQuiz() {
    startButton.classList.add('hide')
    finalScore.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text 
        button.classList.add('btn')
        button.classList.add('btn-primary')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.getElementById('body'))
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target 
    const correct = selectedButton.dataset.correct
    if (correct) {
        score++
    } 
    setStatusClass(document.getElementById('body'), correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        if (button.dataset.correct) {
            button.classList.remove('btn-primary')
            button.classList.add('btn-success')
        } else {
            button.classList.remove('btn-primary')
            button.classList.add('btn-danger')
        }
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        finalScore.classList.remove('hide')
        quizContainer.classList.add('mb-3')
        document.getElementById('score').innerHTML = score;
        document.getElementById('quiz-length').innerHTML = questions.length;
        score = 0;
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'A ____ ____ involves borrowing money from a bank.',
        answers: [
            { text: 'secure bond', correct: false},
            { text: 'bank tab', correct: false},
            { text: 'stock pull', correct: false},
            { text: 'bank loan', correct: true}
        ]
    },
    {
        question: "____________ is not a reliable source of funding but is often used.",
        answers: [
            { text: 'Campaigning', correct: false},
            { text: 'Crowdfunding', correct: true},
            { text: 'Crossfunding', correct: false},
            { text: 'Moneypooling', correct: false}
        ]
    },
    {
        question: "What is the biggest disadvantage of savings as a source of finance?",
        answers: [
            { text: 'Interest has to be paid by the individual.', correct: false},
            { text: 'The money loses its value after it is withdrawn.', correct:false},
            { text: 'Savings can be susceptible to financial crime.', correct: false},
            { text: 'The amount in savings is usually not enough.', correct: true}
        ]
    }
]