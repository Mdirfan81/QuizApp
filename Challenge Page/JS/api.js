// url = "https://api.howzdat.in:1234/fetchques?standard=10&category=Science&topicName=Our Environment,Management of natural Resources&tier=2";
// params  ={method:'Post'}
//  fetch(url,params)
// .then(res => res.json())
// .then((data) => {
//     var newstr = data.replace("][", ",");

// var objStr = newstr;
//  var Apidata = JSON.parse(objStr);
//  console.log(Apidata)

//     // console.log("api1")
// })

// if(apiData != "")
// {
//     console.log("the IF conditions is here");
//     apiData2();
// }
// console.log("After calling API");
//--------------------------------------------------------------------------------------

const questionNumber = document.querySelector(".questionNumber");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answerIndicatorContainer = document.querySelector(".answer-indicator");

const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".main-quiz");
const resultBox = document.querySelector(".result_box");

let questionCounter = 0;
let currentQuestion;
let availableQuestion = [];
let TotalQuestion;
let availableOption = [];
let attempt = 0;
let timeValue = 30;
let counterLine;
let correctAnswerCount = 0;
let wrongAnswer = 0;
let optionLen;
let totalQuestion;

async function setAvailabeQuestion() {
  url = "../que.json";

  const response = await fetch("../que.json");
  const data = await response.json();

  for (i = 0; i <= data.length; i++) {
    availableQuestion.push(data[i]);
  }
  //   console.log(availableQuestion);

  getNewQuestion();
}
// Timer---------------------------------
var timeLeft = 30;
var elem = document.getElementById("some_div");
var timerId = setInterval(countdown, 1000);

function countdown() {
  if (timeLeft == -1) {
    clearTimeout(timerId);
    doSomething();
  } else {
    elem.innerHTML = timeLeft + " seconds remaining";
    timeLeft--;
  }
}

function doSomething() {
  console.log("Hi");
}
// -----------Timer End --------------------

function getNewQuestion() {
  questionNumber.innerHTML =
    "Question " +
    (questionCounter + 1) +
    " of " +
    (availableQuestion.length - 1);
  totalQuestion = availableQuestion.length;

  // console.log("75",availableQuestion[questionCounter].correct_answer);
  currentQuestion = availableQuestion[questionCounter].question;
  questionText.innerHTML = currentQuestion;

  optionLen = availableQuestion[questionCounter].option;

  // console.log("Questin Couter of the option", questionCounter);
  // console.log("Length of the option", optionLen);

  correctAnswer = availableQuestion[questionCounter].correct_answer;
  // console.log("85 : ",correctAnswer);
  //   for (i = 0; i < optionLen.length; i++) {
  //     availableOption.push(optionLen[i]);
  //   }

  //   console.log("this is avaible OPtion", availableOption);
  let animationDelay = 0.15;
  // optionContainer.empty();
  $(".option-container").empty();
  for (i = 0; i < optionLen.length; i++) {
    const option = document.createElement("div");
    option.innerHTML = optionLen[i];
    //availableQuestion[questionCounter].option[i];
    option.style.animationDelay = animationDelay + "s";
    animationDelay = animationDelay + 0.15;
    option.id = i;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }

  answersIndicator(totalQuestion);

  questionCounter++;
}

function getResult(element) {
  //  console.log(element.innerHTML);
  const id = element.innerHTML;
  //  console.log("Correct Answer ",correctAnswer);
  if (id === correctAnswer) {
    //  console.log("Correct Answers");
    element.classList.add("correct");
  

    updateAnswerIndicator("correct");
    correctAnswerCount++;
    // console.log("Correct Answer is :",correctAnswerCount);
  } else {
    //  console.log("Wrong Answer");
    element.classList.add("wrong");
    
    updateAnswerIndicator("wrong");
    wrongAnswer++;
    // console.log(wrongAnswer);

    const optLen = optionContainer.children.length;
    for (let i = 0; i < optLen; i++) {
      //  console.log("line 127: ",optionContainer.children[i].innerHTML, correctAnswer)
      if (optionContainer.children[i].innerHTML === correctAnswer) {
        optionContainer.children[i].classList.add("correct");
      }
    }
  }
  console.log("Your Score is: ",correctAnswerCount,wrongAnswer);
  attempt ++;
  unclickableOptions();
}

function unclickableOptions() {
  const optLength = optionContainer.children.length;
  // console.log ("line 141 ", optLength);
  for (let i = 0; i < optLength; i++) {
    optionContainer.children[i].classList.add("already_answered");
  }
}

function answersIndicator(totalQues) {
  // answerIndicatorContainer.innerHTML = "";
  // const totalQuestin = availableQuestion.length;
  // console.log("line 149 ",totalQues);
  // $('.answer-indicator').empty();
  // for (let i = 0; i < 9; i++) {
    const indicator = document.createElement("div");
    answerIndicatorContainer.appendChild(indicator);
  // }
}

function updateAnswerIndicator(markType) {
  console.log("167 : ", markType);

  answerIndicatorContainer.children[questionCounter - 1].classList.add(
    markType
  );
}

function Next() {
  if (questionCounter === availableQuestion.length - 1) {
    console.log("Quiz Over");
    quizOver();
  } else {
    getNewQuestion();
  }
}



// $(function() {
//     var progressbar = $( "#progressbar-1" );
//     $( "#progressbar-1" ).progressbar({
//        value: 30,
//        max:300
//     });
//     function progress() {
//        var val = progressbar.progressbar( "value" ) || 0;
//        progressbar.progressbar( "value", val + 1 );
//        if ( val < 99 ) {
//           setTimeout( progress, 100 );
//        }
//     }
//     setTimeout( progress, 3000 );
//  });

//  $(document).ready(function(){
//     $("#user1").Attr("value", "timeLeft");
//   });
function quizOver(){

// resultBox.classList.remove('hide');
quizResult();
}

function quizResult(){
  
  
    const scoreText = resultBox.querySelector(".score_text");
    
    if (userScore > 5){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ correctAnswerCount +'</p> out of <p>'+ 9 +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 3){ // if user scored more than 1
        let scoreTag = '<span>and nice 😎, You got <p>'+ correctAnswerCount +'</p> out of <p>'+ 9 +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ correctAnswerCount +'</p> out of <p>'+ 9 +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }

}

function goToHome(){

}
window.onload = function () {
  // answersIndicator(totalQuestion);
  setAvailabeQuestion();
};

//-------------Line 55--------
//  const questionIndex =
//     availableQuestion;
//[Math.floor(Math.random() * availableQuestion.length)];
//   console.log("Questin Index", questionIndex);
//   currentQuestion = questionIndex;
// console.log(availableQuestion[questionCounter].question);
// console.log(availableQuestion[questionCounter].option);
// line 81-----------
//getting the position of 'questinIndex from the avaibaleQuestion Array
//   const index1 = availableQuestion.indexOf(questionIndex);
//remove the shown question from the array
//   console.log(index1);
//   availableQuestion.splice(index1,1);
//   console.log(availableQuestion);
// questionCounter++;
$('#introButton').on('click',function(){
  $('.start-quiz').hide();
  $('.main_contain').show();

})

// $('#introButton').on('click',function(){
//   $('.start-quiz').hide();
//   $('.main_contain').show();

// })

timerX =0;
timerIs = setInterval(timerX, 1000);
console.log("Line 288: ",timerX)
