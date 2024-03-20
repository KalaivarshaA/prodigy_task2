let timer;
let startTime;
let lapTimes = [];
let running = false;

function startStopwatch() {
  if (!running) {
    startTime = new Date().getTime();
    timer = setInterval(updateStopwatch, 10);
    running = true;
  }
}

function pauseStopwatch() {
  clearInterval(timer);
  running = false;
}

function resetStopwatch() {
  clearInterval(timer);
  running = false;
  document.getElementById('stopwatch').innerText = '00:00:00';
  lapTimes = [];
  updateLapTimes();
}

function updateStopwatch() {
  let currentTime = new Date().getTime();
  let elapsedTime = currentTime - startTime;
  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((elapsedTime % 1000) / 10);
  document.getElementById('stopwatch').innerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function recordLap() {
  if (running) {
    let currentTime = new Date().getTime();
    let elapsedTime = currentTime - startTime;
    lapTimes.push(elapsedTime);
    updateLapTimes();
  }
}

function updateLapTimes() {
  let lapList = document.getElementById('lap-times');
  lapList.innerHTML = '';
  lapTimes.forEach((lap, index) => {
    let lapTime = new Date(lap);
    let listItem = document.createElement('li');
    listItem.innerText = `Lap ${index + 1}: ${formatTime(lapTime.getMinutes())}:${formatTime(lapTime.getSeconds())}.${formatTime(lapTime.getMilliseconds())}`;
    lapList.appendChild(listItem);
  });
}
