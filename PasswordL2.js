var livesRemaining2 = 5;
var timer2; // Variable to store the timer interval for PasswordL2
var totalMilliseconds2 = 0; // Variable to store the total elapsed milliseconds for PasswordL2
var totalTimeInSeconds2;

// Add this function to format milliseconds into "MM:SS:SSS" format
function formatTime2(milliseconds) {
  var minutes = Math.floor(milliseconds / (60 * 1000));
  var seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
  var remainingMilliseconds = milliseconds % 1000;

  // Add leading zeros if necessary
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  remainingMilliseconds = remainingMilliseconds < 100 ? (remainingMilliseconds < 10 ? "00" + remainingMilliseconds : "0" + remainingMilliseconds) : remainingMilliseconds;

  return minutes + ":" + seconds + ":" + remainingMilliseconds;
}

function startTimer2() {
  timer2 = setInterval(function () {
    totalMilliseconds2 += 100; // Update every 100 milliseconds (slower)

    var timerDisplay2 = document.querySelector(".top-bar .timer");
    timerDisplay2.textContent = formatTime2(totalMilliseconds2);
  }, 100); // Update the timer every 100 milliseconds
}

window.onload = startTimer2;

function stopTimer2() {
  clearInterval(timer2);
  totalTimeInSeconds2 = totalMilliseconds2 / 1000;

  // Store the total time in localStorage
  localStorage.setItem('totalTimeInSeconds2', totalTimeInSeconds2);
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
    var hintBox = document.getElementById("hintBox");
    if (passwordInput === "Jan3rd2005") {
      stopTimer2();
      resultMessage.style.color = "red";
      resultMessage.textContent = "The password is correct";
      setTimeout(function() {
        window.location.href = 'RecapPassL2.html';
      }, 1500)
    } else {
      resultMessage.style.color = "red";
      resultMessage.textContent = "The password is incorrect";
      livesRemaining2--;

      // Update lives remaining display
      document.querySelector(".top-bar .lives-remaining").textContent = "Lives Remaining: " + livesRemaining2;
      if (livesRemaining2===2){
        hintBox.textContent="Remember that it follows the m/d/y and maybe it is capitalized"
      }
      // Check if lives are exhausted
      if (livesRemaining2 === 0) {
        // Handle game over logic here
        window.location.href= 'GameOverPassL2.html'
        stopTimer2();
      }
    }
  }
  function Pause(){
    var pause = document.getElementById("pasue-menu");
    pause.style.display === "none"
    if (pause.style.display === "none") {
      pause.style.display = "block";
      stopTimer2();
    } else {
      pause.style.display = "none";
      startTimer2();
    }
}
  function resume(){
    var y=document.getElementById("Resume");
    var z=document.getElementById("pasue-menu");
    if (y.style.display==="none"){
      z.style.display="block";
      startTimer2();
    } else {
      z.style.display = "none";
      startTimer2();
    }
  }
/*****************************
 *  QUIT BUTTON
 *****************************/
function quitToMainMenu() {
  window.location.href ="MainMenu.html";
}
