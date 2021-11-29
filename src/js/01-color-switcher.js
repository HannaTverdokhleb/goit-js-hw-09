import { debounce, throttle } from 'lodash';
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let changeBg = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener(
  'click',
  throttle(event => {
    clearInterval(changeBg);
    changeBg = setInterval(() => {
      startBtn.disabled = true;
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }, 1000),
);

stopBtn.addEventListener('click', () => {
  startBtn.disabled = false;
  clearInterval(changeBg);
});
