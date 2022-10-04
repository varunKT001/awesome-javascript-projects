const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');

const month = document.querySelector('.month');
const day = document.querySelector('.day');
const year = document.querySelector('.year');

function setDate() {
  const now = new Date();
  const mm = now.getMonth();
  const dd = now.getDate();
  const yyyy = now.getFullYear();
  const secs = now.getSeconds();
  const mins = now.getMinutes();
  const hrs = now.getHours();
  const monthName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  if (hrs > 12) {
    hours.innerHTML = hrs - 12;
  } else {
    hours.innerHTML = hrs;
  }

  if (secs < 10) {
    seconds.innerHTML = '0' + secs;
  } else {
    seconds.innerHTML = secs;
  }

  if (mins < 10) {
    minutes.innerHTML = '0' + mins;
  } else {
    minutes.innerHTML = mins;
  }

  month.innerHTML = monthName[mm];
  day.innerHTML = dd;
  year.innerHTML = yyyy;
}

setInterval(setDate, 1000);
