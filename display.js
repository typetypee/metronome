import Timer from "./timer.js";

var bpmNumber = document.getElementById("bpm-number");

var tempoCircles = document.getElementById("tempo-circles");
var circles = document.getElementsByClassName("circle");

var beatNumber = document.getElementById("beats-in-measure");
var minusBeat = document.getElementById("minus-beat");
var plusBeat = document.getElementById("plus-beat");

var minusButton = document.getElementById("minus-bpm");
var plusButton = document.getElementById("add-bpm");

var slider = document.querySelector(".slider");

var playButton = document.getElementById("play-button");

var highSound = new Audio("audio/high.mp3");
var lowSound = new Audio("audio/low.mp3");

var notes = {
  "quarter": document.getElementById("quarter"),
  "eighth": document.getElementById("eighth")
}

var bpm = 100;
var beatsPerMeasure = 4;
var beat = 0;
var isRunning = false;

const metronome = new Timer(playSound, 60000/bpm, {immediate: true});

minusBeat.addEventListener("click", function(){
  if(beatsPerMeasure === 1) return;
  beat = 0;
  beatsPerMeasure--;
  removeCircle();
  updateMetronome();
})

plusBeat.addEventListener("click", function(){
  beat = 0;
  beatsPerMeasure++;
  addCircle();
  updateMetronome();
})


function removeCircle() {
  tempoCircles.removeChild(circles[circles.length - 1]);
}
function addCircle() {
  var newCircle = document.createElement("div");
  newCircle.className = "circle";
  circles = document.getElementsByClassName("circle");
  tempoCircles.appendChild(newCircle);

}
function glowCircle() {
  for(var i = 0; i < circles.length; i++) {
    if(i === beat) circles[i].style.backgroundColor = "red";
    else circles[i].style.backgroundColor = "gray";
  }
}

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

function selectNote(selection) {
  var listOfNotes = Object.keys(notes);
  for(var i = 0; i < listOfNotes.length; i++) {

  }

}

notes.quarter.addEventListener("click", function(){

})

function updateMetronome(){
  beatNumber.innerText = beatsPerMeasure;
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
