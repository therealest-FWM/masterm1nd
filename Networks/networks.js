var timer10; // Variable to store the timer interval
var totalMilliseconds10 = 0; // Variable to store the total elapsed milliseconds
var totalTimeInSeconds10;
// Add this function to format milliseconds into "MM:SS:SSS" format
function formatTime10(milliseconds) {
  var minutes = Math.floor(milliseconds / (60 * 1000));
  var seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
  var remainingMilliseconds = milliseconds % 1000;

  // Add leading zeros if necessary
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  remainingMilliseconds = remainingMilliseconds < 100 ? (remainingMilliseconds < 10 ? "00" + remainingMilliseconds : "0" + remainingMilliseconds) : remainingMilliseconds;

  return minutes + ":" + seconds + ":" + remainingMilliseconds;
}

function startTimer10() {
  timer10 = setInterval(function () {
    totalMilliseconds10 += 100; // Update every 100 milliseconds (slower)

    var timerDisplay10 = document.querySelector(".top-bar .timer");
    timerDisplay10.textContent = formatTime10(totalMilliseconds10);
  }, 100); // Update the timer every 100 milliseconds
}

window.onload = startTimer10;

function stopTimer10() {
  clearInterval(timer10);
  totalTimeInSeconds10 = totalMilliseconds10 / 1000;

  // Store the total time in localStorage
  localStorage.setItem('totalTimeInSeconds10', totalTimeInSeconds10);
}

function toggleNetwork(networkId) {
    var inputField = document.getElementById(networkId);  
    if (inputField.style.display === "none") {
      inputField.style.display = "block";
    } else {
      inputField.style.display = "none";
    }
  }

// JavaScript function to connect to the network
function connect(networkId) {
  // Get the value of the password input field
  var password = document.getElementById(networkId).value;

  // Check the network ID and validate the password accordingly
  if ((networkId === "network1" || networkId === "network2") && password.length === 88) {
    document.getElementById(networkId).nextElementSibling.textContent = "Connected";
    // Add a delay before redirecting to another HTML file
    setTimeout(function() {
      window.location.href = "./MMTest.html";
    }, 2000); // Adjust the delay time (in milliseconds) as needed
  } else if (networkId === "network3") {
    document.getElementById(networkId).nextElementSibling.textContent = "Connected";
    stopTimer10();
    // Add a delay before redirecting to another HTML file
    setTimeout(function() {

      window.location.href = "text.html";
    }, 2000); // Adjust the delay time (in milliseconds) as needed
  } else {
    document.getElementById(networkId).nextElementSibling.textContent = "Wrong Password";
  }
}
function showHint() {
    var hintBox = document.getElementById('hintBox');
    hintBox.style.right = '10px';
    hintBox.style.display="none";
    if (hintBox.style.display === "none") {
      hintBox.style.display = "block";
    } else {
      hintBox.style.display = "none";
    }    
  }
  function pause() {
    var pauseMenu = document.getElementById("pasue-menu");
    if (pauseMenu.style.display === "none") {
      stopTimer10();
      pauseMenu.style.display = "block";
    } else {
      pauseMenu.style.display = "none";
      startTimer10();
    }
  }
  
  function resume(){
    var y=document.getElementById("Resume");
    var z=document.getElementById("pasue-menu");
    if (y.style.display==="none"){
      z.style.display="block";
      startTimer10();
    } else {
      z.style.display = "none";
      startTimer10();
    }
  }
  

