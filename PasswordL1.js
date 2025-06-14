var livesRemaining = 3;
var timer; // Variable to store the timer interval
var totalMilliseconds = 0; // Variable to store the total elapsed milliseconds
var totalTimeInSeconds;
// Add this function to format milliseconds into "MM:SS:SSS" format
function formatTime(milliseconds) {
  var minutes = Math.floor(milliseconds / (60 * 1000));
  var seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
  var remainingMilliseconds = milliseconds % 1000;

  // Add leading zeros if necessary
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  remainingMilliseconds = remainingMilliseconds < 100 ? (remainingMilliseconds < 10 ? "00" + remainingMilliseconds : "0" + remainingMilliseconds) : remainingMilliseconds;

  return minutes + ":" + seconds + ":" + remainingMilliseconds;
}
function startTimer() {
  timer = setInterval(function () {
    totalMilliseconds += 100; // Update every 100 milliseconds (slower)

    var timerDisplay = document.querySelector(".top-bar .timer");
    timerDisplay.textContent = formatTime(totalMilliseconds);
  }, 100); // Update the timer every 100 milliseconds
}
window.onload = startTimer;
function stopTimer() {
  clearInterval(timer);
  totalTimeInSeconds = totalMilliseconds / 1000;
  
  // Store the total time in localStorage
  localStorage.setItem('totalTimeInSeconds', totalTimeInSeconds);

}

function showHint() {
  document.getElementById('hintBox').style.right = '10px';
  var hintbox = document.getElementById("hintBox");
  hintbox.style.display === "none"
  if (hintbox.style.display === "none") {
    hintbox.style.display = "block";
  } else {
    hintbox.style.display = "none";
  }    
}
function checkPassword() {

  var passwordInput = document.getElementById("passwordInput").value;
  var resultMessage = document.querySelector(".center-box h2");
  var centerbox = document.getElementById("center-box"); 
  var recap = document.getElementById("recap"); 
  if (passwordInput === "1205") {
    stopTimer();
    resultMessage.style.color = "red";
    resultMessage.textContent = "The password is correct";
    setTimeout(function() {
      window.location.href = 'file:///C:/Users/hussa/Desktop/MASTERM1ND/Password/Recap.html';
    }, 1500)
  } else {
    resultMessage.style.color = "red";
    resultMessage.textContent = "The password is incorrect";
    livesRemaining--;

    // Update lives remaining display
    document.querySelector(".top-bar .lives-remaining").textContent = "Lives Remaining: " + livesRemaining;

    // Check if lives are exhausted
    if (livesRemaining === 0) {
      // Handle game over logic here
      window.location.href= 'file:///C:/Users/hussa/Desktop/MASTERM1ND/Password/GameOver.html'
      stopTimer();
    }
  }
}
function Pause(){
      var pause = document.getElementById("pasue-menu");
      pause.style.display === "none"
      if (pause.style.display === "none") {
        pause.style.display = "block";
        stopTimer();
      } else {
        pause.style.display = "none";
        startTimer();
      }
}
function resume(){
  var y=document.getElementById("Resume");
  var z=document.getElementById("pasue-menu");
  if (y.style.display==="none"){
    z.style.display="block";
    startTimer();
  } else {
    z.style.display = "none";
    startTimer();
  }
}
