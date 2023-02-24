import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    inputEl : document.getElementById('datetime-picker'),
    buttonEl : document.querySelector('[data-start]'),
    days : document.querySelector('[data-days]'),
    hours : document.querySelector('[data-hours]'),
    minutes : document.querySelector('[data-minutes]'),
    seconds : document.querySelector('[data-seconds]'),
}
let selectDate ='';

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectDate = selectedDates[0];
        if(selectedDates[0] <= Date.now()) {
            refs.buttonEl.disabled = true;
            Notiflix.Notify.failure("Please choose a date in the future");
        }
        else {
            refs.buttonEl.disabled = false;
            Notiflix.Notify.success("Timer ready to start");
        }
      console.log(selectedDates[0]);
    },
  };

const calendar = flatpickr('input', options);

const onStartClick = (event) => {
    refs.buttonEl.disabled = true;

    let intervalId = setInterval(() =>{
       const currentTime = Date.now();
       const startTime = selectDate;
       const deltaTime = startTime - currentTime;
       const timerTime = convertMs(deltaTime);
        if(deltaTime < 1000) {
            clearInterval(intervalId);
            refs.buttonEl.disabled = false;
            Notiflix.Notify.info("Time is over");
        }
       updateTimer(timerTime);
    }, 1000);
}

refs.buttonEl.addEventListener("click", onStartClick)

function updateTimer ({ days, hours, minutes, seconds }) {
refs.days.textContent = `${days}`;
refs.hours.textContent = `${hours}`;
refs.minutes.textContent = `${minutes}`;
refs.seconds.textContent = `${seconds}`;

}

function addLeadingZero(value) {
    return String(value).padStart(2, 0);
  };

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}