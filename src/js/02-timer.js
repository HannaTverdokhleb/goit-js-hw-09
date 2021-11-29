import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
let startTimer = null;

let selectedDate = '';

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currDate = new Date().getTime();
    selectedDate = selectedDates[0].getTime();
    if (currDate > selectedDate) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      countTime(selectedDate);
    }
  },
};

const delta = flatpickr(dateInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(num) {
  num = num.toString();
  if (num.length < 2) num = '0' + num;
  return num;
}

function countTime(selectedDate) {
  const currentDate = new Date();

  let dateMs = selectedDate - currentDate;

  const dateObj = convertMs(dateMs);

  const dayNode = document.querySelector('.value[data-days]');
  const hoursNode = document.querySelector('.value[data-hours]');
  const minutesNode = document.querySelector('.value[data-minutes]');
  const secondsNode = document.querySelector('.value[data-seconds]');

  if (dateMs > 0) {
    dayNode.innerText = addLeadingZero(dateObj.days);
    hoursNode.innerText = addLeadingZero(dateObj.hours);
    minutesNode.innerText = addLeadingZero(dateObj.minutes);
    secondsNode.innerText = addLeadingZero(dateObj.seconds);
  } else {
    dayNode.innerText = '00';
    hoursNode.innerText = '00';
    minutesNode.innerText = '00';
    secondsNode.innerText = '00';
  }
}

startBtn.addEventListener('click', () => {
  startTimer = setInterval(() => {
    countTime(selectedDate);
  }, 1000);

  if (selectedDate < 0) {
    clearInterval(startTimer);
  }
});
