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
    },
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
    },
    {
        question: '_________ is the branch of knowledge concerned with the production, consumption and transfer of wealth.',
        answers: [
            { text: 'economics', correct: true},
            { text: 'philosophy', correct: false},
            { text: 'theology', correct: false},
            { text: 'astronomy', correct: false}
        ]
    },
    {
        question: "The _______________ affects every aspect of our daily lives, including our finances, job security, and the economy's overall health",
        answers: [
            { text: 'political economy', correct: false},
            { text: 'financial system', correct: true},
            { text: 'banking sector', correct: false},
            { text: 'parliamentary government', correct: false}
        ]
    },
    {
        question: "_____________________ are organisations such as banks, insurance, companies, and investment firms that provide financial services and products to individuals and businesses.",
        answers: [
            { text: 'Global forums', correct: false},
            { text: 'Financial instruments', correct:false},
            { text: 'Financial markets', correct: false},
            { text: 'Financial institutions', correct: true}
        ]
    },
    {
        question: "What is the financial system responsible for?",
        answers: [
            { text: 'Directing savings to their most productive use', correct: false},
            { text: 'Mobilising capital for investment', correct:false},
            { text: 'Allocating risk', correct: false},
            { text: 'All of the above', correct: true}
        ]
    },
    {
        question: "Which of the following is not a component of the financial system?",
        answers: [
            { text: 'Financial systems', correct: false},
            { text: 'Financial markets', correct:false},
            { text: 'Insurance companies', correct: false},
            { text: 'Real estate agencies', correct: true}
        ]
    },
    {
        question: "What is the main responsibility of the central bank in the financial system?",
        answers: [
            { text: 'Providing loans to banks during financial crises', correct: false},
            { text: 'Regulating financial institutions', correct:false},
            { text: 'Setting monetary policy', correct: false},
            { text: 'All of the above', correct: true}
        ]
    },
    {
        question: "What is the role of banks in the financial system?",
        answers: [
            { text: 'Accepting customer deposits and lending to borrowers', correct: false},
            { text: 'Mobilising savings', correct:false},
            { text: 'Allocating capital to the most productive use', correct: false},
            { text: 'All of the above', correct: true}
        ]
    },
    {
        question: "Why is it important for individuals to understand the financial system?",
        answers: [
            { text: 'To make informed decisions about personal finances', correct: false},
            { text: 'To understand the broader economic landscape', correct:false},
            { text: 'To promote economic stability', correct: false},
            { text: 'All of the above', correct: true}
        ]
    },
    {
        question: "What are financial instruments?",
        answers: [
            { text: 'Places where financial instruments are traded', correct: false},
            { text: 'Products representing claims on assets or future income streams', correct:true},
            { text: 'Organisations that provide financial services', correct: false},
            { text: 'None of the above', correct: false}
        ]
    },
    {
        question: "Which financial institution plays a critical role in the financial system by accepting customer deposits and lending to borrowers?",
        answers: [
            { text: 'Insurance companies', correct: false},
            { text: 'Investment firms', correct:false},
            { text: 'Banks', correct:true},
            { text: 'None of the above', correct: false}
        ]
    },
    {
        question: "Why is investment important?",
        answers: [
            { text: 'To save money', correct: false},
            { text: 'To help small businesses grow', correct:false},
            { text: 'It puts your money to work and it is possible to build wealth', correct: true},
            { text: 'To avoid over spending', correct: false}
        ]
    },
    {
        question: "What are stocks?",
        answers: [
            { text: 'They offer you a way to invest in a wide range of bonds in one package.', correct: false},
            { text: 'They are issued by governments and corporations when they want to raise money.', correct:false},
            { text: 'They are units of equity ownership in a corporation.', correct: false},
            { text: 'It is a security that signifies the ownership of a proportion of the issuing company.', correct: true}
        ]
    },
    {
        question: "Which of the following is true?",
        answers: [
            { text: 'Investing in stocks is the safest way to invest', correct: false},
            { text: 'Bonds have the lowest potential investment return in the long run', correct:true},
            { text: 'Investing is the same as saving.', correct: false},
            { text: 'Returns on bonds are affected by inflation.', correct: false}
        ]
    },
    {
        question: "What is an index fund?",
        answers: [
            { text: 'It is a portfolio of stocks that is designed to reflect the composition and performance of a financial market index.', correct:true},
            { text: 'It spreads your money across a variety of investments depending on the risk level and financial goals you set.', correct:false},
            { text: 'It invests in high quality, short-term debt securities and pays dividends that generally reflect short-term interest rates.', correct: false},
            { text: 'It is a savings account that holds a fixed amount of money for a fixed period of time.', correct:false}
        ]
    },
    {
        question: "Which of the following is not a risk associated with investing in ETFs?",
        answers: [
            { text: 'The lack of liquidity hinders transactions.', correct: false},
            { text: 'Single industry focused ETFs limit diversification.', correct:false},
            { text: 'They are not flexible.', correct: true},
            { text: 'Actively managed ETFs incur higher costs.', correct: false}
        ]
    },
    {
        question: "Which of the following is false?",
        answers: [
            { text: 'Index fund performance is good in the short run.', correct: true},
            { text: 'Both index funds and stocks are vulnerable to fluctuations in the market.', correct:false},
            { text: 'Index funds lack flexibility.', correct: false},
            { text: 'ETFs offer lower average costs.', correct: false}
        ]
    },
    {
        question: "What is one way to save money?",
        answers: [
            { text: 'To start a business', correct: false},
            { text: 'To buy into trends', correct:false},
            { text: 'To eat out every meal', correct: false},
            { text: 'To budget', correct: true}
        ]
    },
    {
        question: "What is the cost of living crisis?",
        answers: [
            { text: 'When everything is expensive', correct: false},
            { text: 'When your wages are not rising', correct:false},
            { text: 'When the cost of everyday items is rising faster than wages', correct: true},
            { text: 'When the cost of goods is decreasing', correct: false}
        ]
    }
]