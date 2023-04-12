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
        question: 'The four key factors of production are land, labour, capital, and ________________.',
        answers: [
            { text: 'technology', correct: false},
            { text: 'investment', correct: false},
            { text: 'raw materials', correct: false},
            { text: 'entrepreneurship', correct: true}
        ]
    },
    {
        question: "____ and ______ are the two key factors of production that would be most important for farming.",
        answers: [
            { text: 'labour, capital', correct: false},
            { text: 'land, labour', correct: true},
            { text: 'capital, entrepreneurship', correct: false},
            { text: 'land, capital', correct: false}
        ]
    },
    {
        question: "Micro consumption takes a look at consumption...",
        answers: [
            { text: 'on a wider scale internationally', correct: false},
            { text: 'by the government as they spend money on goods and services', correct:false},
            { text: 'and saving for individual households within an economy', correct: false},
            { text: 'for individual households within an economy', correct: true}
        ]
    }
]