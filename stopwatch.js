let startTime, updatedTime, difference, running = false;
let laps = [];

const display = document.getElementById("display");
const lapList = document.getElementById("lapList");

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);

function startTimer() 
{
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        running = true;
        updateTimer();
    }
}

function updateTimer() 
{
    if (running) {
        updatedTime = new Date().getTime();
        difference = updatedTime - startTime;

        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        display.innerHTML = (hours < 10 ? "0" : "") + hours + ":" +
                            (minutes < 10 ? "0" : "") + minutes + ":" +
                            (seconds < 10 ? "0" : "") + seconds;

        setTimeout(updateTimer, 1000);
    }
}

function pauseTimer() 
{
    running = false;
}

function resetTimer() 
{
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    lapList.innerHTML = "";
    laps = [];
}

function recordLap() 
{
    if (running) {
        const lapTime = display.innerHTML;
        laps.push(lapTime);
        lapList.innerHTML += `<div>Lap ${laps.length}: ${lapTime}</div>`;
    }
}
