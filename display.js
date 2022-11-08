import Timer from "./timer.js";

var bpmNumber = document.getElementById("bpm-number");

var circles = document.getElementsByClassName("circle");

var minusButton = document.getElementById("minus-bpm");
var plusButton = document.getElementById("add-bpm");

var slider = document.querySelector(".slider");

var playButton = document.getElementById("play-button");

var highSound = new Audio("audio/high.mp3");
var lowSound = new Audio("audio/low.mp3");

var bpm = 100;
var beatsPerMeasure = 4;
var beat = 0;
var isRunning = false;

const metronome = new Timer(playSound, 60000/bpm, {immediate: true});

minusButton.addEventListener("click", function(){
  if (bpm <= 1) return;
  bpm--;
  updateMetronome();

});

plusButton.addEventListener("click", function(){
  if (bpm >= 300) return;
  bpm++;
  updateMetronome();
});

slider.addEventListener("input", function(){
  bpm = slider.value;
  updateMetronome();

});

playButton.addEventListener("click", function(){
  document.body.backgroundColor = "red";
  beat = 0;
  if (!isRunning) {
    metronome.start();
    isRunning = true;
    playButton.innerHTML = "pause_circle";


  } else {
    metronome.stop();
    isRunning = false;
    playButton.innerHTML = "play_circle";

  }
})

function glowCircle() {
  for(var i = 0; i < circles.length; i++) {
    if(i === beat) circles[i].style.backgroundColor = "red";
    else circles[i].style.backgroundColor = "gray";
  }
}


function updateMetronome(){
  bpmNumber.innerText = bpm;
  slider.value = bpm;
  metronome.timeInterval = 60000/bpm;

}

function playSound() {
  if(beat === beatsPerMeasure) beat = 0;
  if(beat === 0){
      glowCircle();
      highSound.play();
      highSound.currentTime = 0;
  } else {
      glowCircle();
      lowSound.play();
      lowSound.currentTime = 0;
  }
  beat++;

}
