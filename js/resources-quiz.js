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
        question: '________ __________ involves the process of distributing resources to different activities in a way that optimises their use both in the short and long run.',
        answers: [
            { text: 'Investment tracking', correct: false},
            { text: 'Budget creation', correct: false},
            { text: 'Expense analysis', correct: false},
            { text: 'Resource allocation', correct: true}
        ]
    },
    {
        question: "Resource allocation is a crucial process for individuals, organisations, and ___________.",
        answers: [
            { text: 'charities', correct: false},
            { text: 'governments', correct: true},
            { text: 'countries', correct: false},
            { text: 'counties', correct: false}
        ]
    },
    {
        question: "Effective resource allocation can help organisations to achieve their financial _____.",
        answers: [
            { text: 'dividends', correct: false},
            { text: 'charges', correct:false},
            { text: 'opportunities', correct: false},
            { text: 'goals', correct: true}
        ]
    }
]