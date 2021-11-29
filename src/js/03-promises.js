import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  let delay = document.querySelector('input[name="delay"]').value;
  let step = document.querySelector('input[name="step"]').value;
  let amount = document.querySelector('input[name="amount"]').value;
  for (let i = 0; i < amount; i++) {
    let currDelay = parseInt(delay) + step * i;
    let currPosition = parseInt(i + 1);
    createPromise(currPosition, currDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
