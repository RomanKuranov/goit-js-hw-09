const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

const onStartClick = (event) => {
   timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);

    startBtn.toggleAttribute("disabled"); 
}

const onStopClick = (event) => {
clearInterval(timerId);
startBtn.removeAttribute("disabled"); 
}

startBtn.addEventListener("click", onStartClick);
stopBtn.addEventListener("click", onStopClick);












