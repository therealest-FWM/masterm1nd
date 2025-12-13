var livesRemaining = 3;
var timer;
var totalMilliseconds = 0;
var totalTimeInSeconds;

function formatTime(milliseconds) {
  var minutes = Math.floor(milliseconds / (60 * 1000));
  var seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
  var remainingMilliseconds = milliseconds % 1000;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  remainingMilliseconds =
    remainingMilliseconds < 100
      ? remainingMilliseconds < 10
        ? "00" + remainingMilliseconds
        : "0" + remainingMilliseconds
      : remainingMilliseconds;

  return minutes + ":" + seconds + ":" + remainingMilliseconds;
}

function startTimer() {
  timer = setInterval(function () {
    totalMilliseconds += 100;
    var timerDisplay = document.querySelector(".top-bar .timer");
    timerDisplay.textContent = formatTime(totalMilliseconds);
  }, 100);
}

window.onload = startTimer;

function stopTimer() {
  clearInterval(timer);
  totalTimeInSeconds = totalMilliseconds / 1000;
  localStorage.setItem("totalTimeInSeconds", totalTimeInSeconds);
}

function showHint() {
  var hintbox = document.getElementById("hintBox");
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
    setTimeout(function () {
      window.location.href = "RecapPassL1.html";
    }, 1500);
  } else {
    resultMessage.style.color = "red";
    resultMessage.textContent = "The password is incorrect";
    livesRemaining--;

    document.querySelector(".top-bar .lives-remaining").textContent =
      "Lives Remaining: " + livesRemaining;

    if (livesRemaining === 0) {
      stopTimer();
      window.location.href = "GameOverPassL1.html";
    }
  }
}

function Pause() {
  var pause = document.getElementById("pasue-menu");
  if (pause.style.display === "none") {
    pause.style.display = "block";
    stopTimer();
  } else {
    pause.style.display = "none";
    startTimer();
  }
}

function resume() {
  var y = document.getElementById("Resume");
  var z = document.getElementById("pasue-menu");
  if (y.style.display === "none") {
    z.style.display = "block";
    startTimer();
  } else {
    z.style.display = "none";
    startTimer();
  }
}

function quitToMainMenu() {
  window.location.href = "MainMenu.html";
}

// ✅ NEW: Trigger confirm on ENTER key
document.addEventListener("DOMContentLoaded", function () {
  var passwordInput = document.getElementById("passwordInput");

  passwordInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      checkPassword();
    }
  });
});