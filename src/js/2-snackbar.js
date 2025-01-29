import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);
function onFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const {
    delay: { value: delayValue },
    state: { value: stateValue },
  } = form.elements;
  const shouldResolve = stateValue === 'fulfilled' ? true : false;
  makePromise(delayValue, shouldResolve)
    .then(delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
      iziToast.success({
        icon: '✅',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      console.log(`❌ Rejected promise in ${delay}ms`);
      iziToast.error({
        icon: '❌',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .finally(() => {
      form.reset();
    });
}

function makePromise(delay, shouldResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
