var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var level = 0;

function nextSequence() {
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
}
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  animatePress(userChosenColor);
  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
});
function playSound(name) {
  var buttonSound = new Audio("/sounds/" + name + ".mp3");
  buttonSound.play();
}
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed"), 1000;
  });
}

$(document).keypress(function () {
  nextSequence();
});
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // console.log("Success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    console.log("Wrong");
    var wrong = new Audio("/sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
      $("#level-title").text("Game - Click any key start over");
    }, 700);
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
