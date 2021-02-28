/*
1) you load the app and you are looking at a page built with a start button, a timer, and link to high scores list

2) you click the start button and A) the timer starts to count down from 60 with the condition that if it stops at 0 the 
entire game stops and records the score in local storage B) you are prompted with a serries of multiple choice questions and answers 
 (probably a header and 4 buttons with query selectors created in js and appended?? into an empty div in the HTML) 
with the condition that if you answer all of the questions before the timer stops the game stops and your score is recorded in local storage

3) when user select their answer for the first question this answer is set to a variable and compared to a variable containing the
correct answer. if they are equal the next question imediately prompts. if they are not equal 10 secconds come off the clock and 
the new quetion is prompted 

first build a site that works without the time deduction then add the time deduction in

there will be an event listener on the start button and then every function that is triggered by the start button will have event listeners
for each possible answer that all trigger the next function 
*/

/*this is where we set html elements to variables to toggle their display to "none" in the function started by the strtbttn event listener */
var startButtonElement = document.getElementById("startButton")
var questionAnswersElement = document.getElementById("questionAnswers")
var questionHeaderElement = document.getElementById("questionHeader")
var timerTextElement = document.getElementById("timerText")
var hiScoresButtonElement = document.getElementById("hiScoresButton")
var intervalID;
var questionIndex = 0;
// this variable sets count 
var count = 60; 


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
    // this is the statement that ends the game if they get through
    if (currentQuestion.end === true){
        // this stops timer and prompts initials
        clearInterval(intervalID)
        var initials = prompt("Please enter your initials!")
        console.log(initials)
        console.log(count)
        // this adds initials and time to local storage
        localStorage.setItem("Initials",initials)
        localStorage.setItem("Time", count)
        // this hides the questions  and brings up the high scores page button
        questionAnswersElement.classList.add("hide")
        questionHeaderElement.classList.add("hide")
        hiScoresButtonElement.classList.remove("hide")
        hiScoresButtonElement.classList.add("bigContainer2")
        
    }
    questionIndex++;
    modifyQuestions();
}
function modifyQuestions() {
    var currentQuestion = questions[questionIndex];
    questionHeaderElement.textContent = currentQuestion.title;

    //this could be condensed in a for-loop
    // var newOption = document.createElement("button")
    // newOption.textContent = currentQuestion[i]
    // questionHeaderElement.appendChild(newOption)
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
            var initials = prompt("Please enter your initials!")
            localStorage.setItem("Initials",initials)
            localStorage.setItem("Time", count)



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












// list of all questions, choices, and answers
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




























