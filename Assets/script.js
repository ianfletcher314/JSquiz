// this is the section where I create my variables
var startButtonElement = document.getElementById("startButton")
var questionAnswersElement = document.getElementById("questionAnswers")
var questionHeaderElement = document.getElementById("questionHeader")
var timerTextElement = document.getElementById("timerText")
var hiScoresButtonElement = document.getElementById("hiScoresButton")
var intervalID;
var questionIndex = 0;
// this variable sets count 
var count = 60; 
var initals;

// this is the new function to hear if an answer was clicked and if so to call the modifyQuestions function to change the question
function optionClicked(event){
    var currentQuestion = questions[questionIndex];
    console.log(questionIndex)
    var button = event.target
    console.log(button.textContent)
    console.log(currentQuestion.answer)

    // this if statement takes 10 seconds off count if the answer is wrong
    if (currentQuestion.answer != button.textContent){
        count = (count - 10)
    }
    // this is the statement that ends the game 
    if (currentQuestion.end === true){
        // this stops timer and prompts initials
        clearInterval(intervalID)
        // validate the initials are only 3 letters or numbers
        function lengthFunction(){
            initals = prompt('sorry you must put in 3 letters or numbers')
            if (initals.length > 3){
                lengthFunction()
                console.log("length function runs perfectly")
                return
            }
        }
        console.log(initals)
        lengthFunction()
       
        var highscores = []
        if (localStorage.getItem('highscores')){
            highscores = JSON.parse(localStorage.getItem('highscores'))
        }
        highscores.push({
            initals: initals,
            time: count
        })
        localStorage.setItem('highscores', JSON.stringify(highscores))
        // this hides the questions  and brings up the high scores page button
        questionAnswersElement.classList.add("hide")
        questionHeaderElement.classList.add("hide")
        hiScoresButtonElement.classList.remove("hide")
        hiScoresButtonElement.classList.add("bigContainer2")
    }
    questionIndex++;
    modifyQuestions();
}

// this is the modify questions function that is used to change the question you are on to the next question
function modifyQuestions() {
    var currentQuestion = questions[questionIndex];
    questionHeaderElement.textContent = currentQuestion.title;
    document.getElementById("answerA").textContent = currentQuestion.choices[0];
    document.getElementById("answerB").textContent = currentQuestion.choices[1];
    document.getElementById("answerC").textContent = currentQuestion.choices[2];
    document.getElementById("answerD").textContent = currentQuestion.choices[3];
}


// this function is called by the event listener on the start button and it starts timer,hides start button, and shows question board 

function startGame() {
    console.log("the game has started")
    /*this hides the start button and makes the question and answer divs visible */
    startButtonElement.classList.add("hide")
    questionAnswersElement.classList.remove("hide")
    questionHeaderElement.classList.remove("hide")

    /*TIMER SECTION!!!! */
    // these move the timer a little bit off the right margin
    timerTextElement.classList.remove("timerClass")
    timerTextElement.classList.add("countDown")
   
    // this is the timer function
    intervalID = setInterval(function () {
        count -= 1;
        console.log(count)
        // this sets the HTML to reflect the timer's countdown
        timerTextElement.textContent = count;
        // this stops the game once the timer is 
        if (count < 1) {
            clearInterval(intervalID)
            questionAnswersElement.classList.add("hide")
            questionHeaderElement.classList.add("hide")
            hiScoresButtonElement.classList.remove("hide")
            hiScoresButtonElement.classList.add("bigContainer2")
            timerTextElement.textContent = "GAME OVER"
            var intials = prompt('what is your intials?')
            var highscores = []
            if (localStorage.getItem('highscores')){
                highscores = JSON.parse(localStorage.getItem('highscores'))
            }
            highscores.push({
                initals: intials,
                time: count
            })
            localStorage.setItem('highscores', JSON.stringify(highscores))



        }
    }, 1000)

}

/*this is the event listener for the initial start button click. when clicked it calls the "startGame function which starts the timer
and makes the question header and answer elements visible. */
startButtonElement.addEventListener("click", startGame);

//these are the event listeners for the answer buttons. these are not visible until the start button is clicked. when clicked 
// this calls the optionClicked function
document.getElementById("answerA").addEventListener("click", optionClicked);
document.getElementById("answerB").addEventListener("click", optionClicked);
document.getElementById("answerC").addEventListener("click", optionClicked);
document.getElementById("answerD").addEventListener("click", optionClicked);



// list of all questions, choices, and answers for the quiz
var questions = [
    {
        chioces:["Yes","No","Maybe","Duh"],
        answer:"Duh"
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ],
        answer: "all of the above"
    },
    {
        title:
            "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        title:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
        end: true
    }
    
];




























