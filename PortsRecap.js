function retry() {
    var retryBut = document.getElementById("retry");
    window.location.href = 'Ports.html'
}
function cont() {
    var continueBut = document.getElementById("continue");
    window.location.href = 'endCS.html'
}
window.onload = function () {
    var y = document.getElementById("timeTaken2");
    var z = document.getElementById("score");
    var totalTimeInSecondsPorts = localStorage.getItem('totalTimeInSecondsPorts');

    if (totalTimeInSecondsPorts !== null) {
        totalTimeInSecondsPorts = parseFloat(totalTimeInSecondsPorts);
        if (y) {
            y.textContent = "Time taken: " + totalTimeInSecondsPorts.toFixed(1) + " seconds";
        }

        if (z) {
            if (totalTimeInSecondsPorts <= 50) {
                z.textContent = "Score: ★★★";
            } else if (totalTimeInSecondsPorts <= 80) {
                z.textContent = "Score: ★★☆";
            } else {
                z.textContent = "Score: ★☆☆";
            }
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
    window.location.href = "LevelSelect.html";
}



