// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate = null;
const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();
    if (currentDate > selectedDates[0].getTime()) {
      refs.startBtn.disabled = true;
      window.alert('Please choose a date in the future');
      return;
    }
    userSelectedDate = selectedDates[0].getTime();
    refs.startBtn.disabled = false;
  },
};

flatpickr(refs.datetimePicker, options);
refs.startBtn.addEventListener('click', startViceVersaTime);
function startViceVersaTime() {
  const intervalId = setInterval(() => {
    refs.startBtn.disabled = true;
    refs.datetimePicker.disabled = true;
    const currentTime = Date.now();
    const deltaTime = userSelectedDate - currentTime;
    if (deltaTime < 0) {
      clearInterval(intervalId);
      refs.startBtn.disabled = false;
      refs.datetimePicker.disabled = false;
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    refs.timerDays.textContent = addLeadingZero(days);
    refs.timerHours.textContent = addLeadingZero(hours);
    refs.timerMinutes.textContent = addLeadingZero(minutes);
    refs.timerSeconds.textContent = addLeadingZero(seconds);
  }, 1000);
}

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
