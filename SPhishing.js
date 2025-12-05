var livesRemaining = 1;
var timer4; // Variable to store the timer interval
var totalMilliseconds4 = 0; // Variable to store the total elapsed milliseconds
var totalTimeInSeconds4;
// Add this function to format milliseconds into "MM:SS:SSS" format
function formatTime4(milliseconds) {
  var minutes = Math.floor(milliseconds / (60 * 1000));
  var seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
  var remainingMilliseconds = milliseconds % 1000;

  // Add leading zeros if necessary
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  remainingMilliseconds = remainingMilliseconds < 100 ? (remainingMilliseconds < 10 ? "00" + remainingMilliseconds : "0" + remainingMilliseconds) : remainingMilliseconds;

  return minutes + ":" + seconds + ":" + remainingMilliseconds;
}

function startTimer4() {
  timer4 = setInterval(function () {
    totalMilliseconds4 += 100; // Update every 100 milliseconds (slower)

    var timerDisplay4 = document.querySelector(".top-bar .timer");
    timerDisplay4.textContent = formatTime4(totalMilliseconds4);
  }, 100); // Update the timer every 100 milliseconds
}

window.onload = startTimer4;

function stopTimer4() {
  clearInterval(timer4);
  totalTimeInSeconds4 = totalMilliseconds4 / 1000;

  // Store the total time in localStorage
  localStorage.setItem('totalTimeInSeconds4', totalTimeInSeconds4);
}
function showHint() {
    document.getElementById('hintBox').style.right = '10px';
    var y = document.getElementById("hintBox");
    if (y.style.display === "none") {
      y.style.display = "block";
    } else {
      y.style.display = "none";
    }    
  }
  function Pause(){
    var x = document.getElementById("pasue-menu");
    if (x.style.display === "none") {
      x.style.display = "block";
      stopTimer4();
    } else {
      x.style.display = "none";
      startTimer4();
    }
}
function resume(){
  var x = document.getElementById("Resume");
  var y= document.getElementById("pasue-menu");
  if (y.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none";
    startTimer4();
  } 
}
function confirm(){
  var z= document.getElementById("real");
  var x= document.getElementById("fake");
  var disappearingText=document.getElementById("disText");
  var resultMessage = document.querySelector(".center-box h3");
  if (z.checked){
    stopTimer4();
    setTimeout(function() {
      window.location.href = 'RecapSPhishing.html';
    }, 1000)
  }
  else {
    disappearingText.style.display = "block";
    disappearingText.style.color="red";
    setTimeout(function() {
      disappearingText.style.display = "none";
  }, 1000);
  livesRemaining--;
  document.querySelector(".top-bar .lives-remaining").textContent = "Lives Remaining: " + livesRemaining;
  if (livesRemaining==0){
    stopTimer4();
    setTimeout(function() {
      window.location.href = 'GameOverSPhishing.html';
    }, 1000)
  }
  }

}
  /*****************************
 *  QUIT BUTTON
 *****************************/
function quitToMainMenu() {
  window.location.href ="MainMenu.html";
}


