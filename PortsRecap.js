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
        var totalTimeInSeconds2 = localStorage.getItem('totalTimeInSeconds2');
        if (totalTimeInSeconds2 !== null) {
            y.textContent = "Time taken: " + totalTimeInSeconds2;
        } else {
            y.textContent = "Time taken: Not available";
        }
    };
    
