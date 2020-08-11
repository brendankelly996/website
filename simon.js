
const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keydown(function(){
    if(!started){
    $("#level-title").html("Level " + level); 
    nextSequence();
    started = true;
    }
});

$(".btn").click(function(){

    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();}, 1000)
        }
    } else{
    wrongAnswer();
    startOver();
 }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").html("Level " + level); 
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);

}


function animatePress(currentColor){
let chosenBtn = document.querySelector("#" + currentColor);
chosenBtn.classList.add("pressed");
setTimeout(function(){
    chosenBtn.classList.remove("pressed");}, 100)}

function playSound (name){
        let audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
}

function wrongAnswer(){
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key To Restart");
  }
  
  function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
  }