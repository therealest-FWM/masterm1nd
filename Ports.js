var livesRemaining=2;
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

function checkPassword() {
    var passwordInput = document.getElementById("passwordInput").value;
    var correctPassword = "duckl1ng";
    var resultText = document.getElementById("passwordResult");
    var status = document.getElementById("status");
    var loc = document.getElementById("loc");
    var icon = document.getElementById("icon");

    if (passwordInput === correctPassword) {
        // Password is correct
        resultText.textContent = "Key-Code Valid. Access granted!";
        resultText.style.color = "green";
        status.textContent = "FILE STATUS:";
        loc.textContent = "UNLOCKED";
        loc.style.color = "green"; // Change text color to green
        icon.textContent = "🔓"; // Change lock icon to open lock
        setTimeout(function() {
          window.location.href = 'PortsRecap.html';
        }, 1500)
        
    } else {
        // Password is incorrect
        resultText.textContent = "Key-Code Invalid. Access denied!";
        resultText.style.color = "red";
        livesRemaining--;
        document.querySelector(".top-bar .lives-remaining").textContent = "Lives Remaining: " + livesRemaining;
        if (livesRemaining==0){
          setTimeout(function() {
            window.location.href = 'PortsGameOver.html';
          }, 1500)
        }
    }
}



function accessScreen() {
    window.open("https://zozodbz.itch.io/masterm1nd-level-4-unsecured-ports", "_blank");
}

