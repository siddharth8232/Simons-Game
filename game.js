var gamePattern=[];
var userClickedPattern=[];
var buttonColor= ["red", "blue", "green", "yellow"];
var level=0;
function playAudio(key){
    var audio = {};
        audio[key] = new Audio();
        audio[key].src = "sounds/"+key+".mp3"
        audio[key].play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}
function nextSequence(){
    $("h1").text("Level "+level);
    var rN= Math.floor(Math.random()*4);
    var randomChosenColour= buttonColor[rN];
    gamePattern.push(randomChosenColour);
    playAudio(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(50).fadeIn(50);
    console.log(gamePattern);    
}
$(".btn").click(function(){
    animatePress(this.id);
    playAudio(this.id);
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(level);
  });
  $(document).keypress(nextSequence);
  function checkAnswer(currentLevel){
    if (JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern)){
        userClickedPattern=[];
        console.log("Success");
        level++;
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
    else if (currentLevel === (userClickedPattern.length-1) && JSON.stringify(gamePattern) != JSON.stringify(userClickedPattern)){
        playAudio("wrong");
        $("h1").text("Wrong, Press A key to retart");
        console.log("wrong");
        userClickedPattern=[];
        gamePattern=[];
        level=0;
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
    }
  }