function retry(){
  var retryBut = document.getElementById("retry");
  window.location.href = 'file:///C:/Users/hussa/Desktop/MASTERM1ND/Password/PasswordL1.html';
}

function cont(){
  var continueBut = document.getElementById("continue");
  window.location.href = 'file:///C:/Users/hussa/Desktop/MASTERM1ND/Password2/PasswordL2.html';
}

window.onload = function() {
  var y = document.getElementById("timeTaken");
  var z = document.getElementById("score");
  var totalTimeInSeconds = localStorage.getItem('totalTimeInSeconds');

  if (y) {
      y.textContent = "Time taken: " + totalTimeInSeconds;
  }

  if (z && totalTimeInSeconds > 1 && totalTimeInSeconds < 20) {
      z.textContent = "Score: ★★★";
  }
  if (z && totalTimeInSeconds > 20 && totalTimeInSeconds < 30) {
    z.textContent = "Score: ★★☆";
  }
  if (z && totalTimeInSeconds > 30 && totalTimeInSeconds < 45) {
    z.textContent = "Score: ★☆☆";
  }
};
