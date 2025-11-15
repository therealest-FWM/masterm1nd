function retry(){
    var retryBut = document.getElementById("retry");
    window.location.href= 'Ports.html'
    }
    function cont(){
    var continueBut = document.getElementById("continue");
    window.location.href= 'endCS.html'
    }
    window.onload = function() {
        var y = document.getElementById("timeTaken2");
        var z = document.getElementById("score");
        var totalTimeInSeconds2 = localStorage.getItem('totalTimeInSeconds2');
        if (totalTimeInSeconds2 !== null) {
            totalTimeInSeconds2 = Number(totalTimeInSeconds2);
            if (y) {
                y.textContent = "Time taken: " + totalTimeInSeconds2 + " seconds";
            }

            if (z && totalTimeInSeconds2 > 1 && totalTimeInSeconds2 < 20) {
                z.textContent = "Score: ★★★";
            }
            if (z && totalTimeInSeconds2 >= 20 && totalTimeInSeconds2 < 30) {
                z.textContent = "Score: ★★☆";
            }
            if (z && totalTimeInSeconds2 >= 30 && totalTimeInSeconds2 < 45) {
                z.textContent = "Score: ★☆☆";
            }
        } else {
            if (y) {
                y.textContent = "Time taken: Not available";
            }
        }
    };
/*****************************
 *  QUIT BUTTON
 *****************************/
function quitToMainMenu() {
  window.location.href ="MainMenu.html";
}
    

