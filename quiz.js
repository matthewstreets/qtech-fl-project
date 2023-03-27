(function(){
    // Functions
    function buildQuiz(){
        // variable to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                // variable to store the list of possible answers
                const answers = [];

                // and for each available answer...
                for(let letter in currentQuestion.answers){

                    // ...add an HTML radio button
                    answers.push(
                        `<label>
         <input type="radio" name="question${questionNumber}" value="${letter}">
         <span>${letter} : ${currentQuestion.answers[letter]}</span>
       </label>`
                    );
                }

                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
                );
            }
        );

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');

    }

    function showResults(){

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;
        // Create a list to store the correct answers
        const correctAnswersList = document.createElement("ul");

        // for each question...
        myQuestions.forEach( (currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;


            // if answer is correct
            if(userAnswer === currentQuestion.correctAnswer){
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[questionNumber].style.color = 'red';
            }
            userAnswers[questionNumber] = userAnswer;
            // Display the correct answer as text
            const listItem = document.createElement("li");
            listItem.innerHTML = `Correct Answer: Q${questionNumber + 1}: ${currentQuestion.answers[currentQuestion.correctAnswer]}`;
            correctAnswersList.appendChild(listItem);
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
        resultsContainer.appendChild(correctAnswersList);

        document.querySelectorAll(".correct-answer").forEach((element) => {
            element.style.display = "block";
        });
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if(currentSlide === 0){
            previousButton.style.display = 'none';
        }
        else{
            previousButton.style.display = 'inline-block';
        }
        if(currentSlide === slides.length-1){
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
        else{
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    function showQuizPopup() {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        quizPopup.classList.remove("hidden");
        startQuizButton.classList.add("hidden");
        // Restore previously selected answers
        userAnswers.forEach((answer, questionNumber) => {
            if (answer) {
                const answerContainer = answerContainers[questionNumber];
                const selector = `input[value="${answer}"]`;
                const radioButton = answerContainer.querySelector(selector);
                if (radioButton) {
                    radioButton.checked = true;
                }
            }
        });
    }

    function hideQuizPopup() {
        quizPopup.classList.add("hidden");
        startQuizButton.classList.remove("hidden");
    }

    function clearResults() {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        resultsContainer.innerHTML = "";
        myQuestions.forEach((_, questionNumber) => {
            answerContainers[questionNumber].style.color = "";
        });
        // Reset the userAnswers array
        userAnswers.fill(null);
    }


    // Variables
    // Add a new variable to store the user's answers
    const startQuizButton = document.getElementById("start-quiz");
    const quizPopup = document.getElementById("quiz-popup");
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
        {
            question: "What is the term for the study of how individuals and societies allocate limited resources?",
            answers: {
                a: "Microeconomics",
                b: "Macroeconomics",
                c: "Econometrics",
                d: "Economics"
            },
            correctAnswer: "d"
        },
        {
            question: "Which economic system is characterized by private ownership of the means of production?",
            answers: {
                a: "Socialism",
                b: "Capitalism",
                c: "Communism",
                d: "Mixed Economy"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the economic principle that states that people will choose the option that provides the greatest benefit?",
            answers: {
                a: "Opportunity Cost",
                b: "Marginal Analysis",
                c: "Rational Choice Theory",
                d: "Supply and Demand"
            },
            correctAnswer: "c"
        }
    ];
    let userAnswers = new Array(myQuestions.length).fill(null);

    // Kick things off
    buildQuiz();

    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    // Show the first slide
    showSlide(currentSlide);

    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
    startQuizButton.addEventListener("click", showQuizPopup);
    submitButton.addEventListener("click", () => {
        showResults();
        setTimeout(() => {
            hideQuizPopup();
            clearResults();
        }, 10000);
    });
    quizContainer.addEventListener("change", (event) => {

        if (event.target && event.target.matches("input[type=radio]")) {
            const answerContainers = quizContainer.querySelectorAll('.answers');
            const questionNumber = parseInt(event.target.name.replace("question", ""));
            const answerLabels = answerContainers[questionNumber].querySelectorAll(".answer-label");

            answerLabels.forEach((label) => {
                if (label.contains(event.target)) {
                    label.classList.add("selected-answer");
                } else {
                    label.classList.remove("selected-answer");
                }
            });
        }
    });
})();
