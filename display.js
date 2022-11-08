import Timer from "./timer.js";

var bpmNumber = document.getElementById("bpm-number");
var minusButton = document.getElementById("minus-bpm");
var plusButton = document.getElementById("add-bpm");


var slider = document.querySelector(".slider");

var playButton = document.getElementById("play-button");

var bpm = 100;
var beatsPerMeasure = 4;
var beat = 0;
var isRunning = false;

const metronome = new Timer(playClick, 60000/bpm, {immediate: true});

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

function updateMetronome(){
  bpmNumber.innerText = bpm;
  slider.value = bpm;
  metronome.timeInterval = 60000/bpm;
  
}

function playSound() {
  if(beat === beatsPerMeasure) beat = 0;
  if(beat === 0){
    
  } else {
    
  }
  beat++;
}

