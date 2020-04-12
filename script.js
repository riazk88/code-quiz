const start = document.getElementById("start");

const quiz = document.getElementById("quiz");

const question = document.getElementById("question");

const qImg = document.getElementById("qImg");

const choiceA = document.getElementById("A");

const choiceB = document.getElementById("B");

const choiceC = document.getElementById("C");

const choiceD = document.getElementById("D");

const counter = document.getElementById("counter");

const timeGauge = document.getElementById("timeGauge");

const progress = document.getElementById("progress");

const scoreDiv = document.getElementById("scoreContainer");

// create questions
let questions = [
    {
        question: "Commonly used data types do not include?",
        choiceA: "strings", 
        choiceB: "booleans", 
        choiceC: "alerts", 
        choiceD: "numbers", 
        correct: "B"
    },
    {
        question: "Arrays in javascript can be used to store?",
        choiceA: "numbers and strings",
        choiceB: "other arrays",
        choiceC: "booleans",
        choiceD: "all of the above",
        correct: "D"
    },
    {
        question: "The condition in an if/else statement is enclosed with?",
        choiceA: "quotes", 
        choiceB: "curly brackets", 
        choiceC: "parenthesis", 
        choiceD: "square brackets", 
        correct: "C"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is?",
        choiceA: "javascript", 
        choiceB: "terminal/bash", 
        choiceC: "for loops", 
        choiceD: "console.log", 
        correct: "C"
    },
    {
        question: "What must string values be enclosed in when being assigned to variables?",
        choiceA: "commas", 
        choiceB: "curly brackets",
        choiceC: "quotes",
        choiceD: "parenthesis", 
        correct: "B"
    }
]

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "inline-block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

