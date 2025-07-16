const sessionSelect = document.getElementById('sessionLength');
const breakSelect = document.getElementById('breakLength');
const breakLabel = document.getElementById('breakLabel');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const darkModeToggle = document.getElementById('darkModeToggle');

let timer, isBreak = false;

sessionSelect.addEventListener('change', () => {
  const sessionTime = parseInt(sessionSelect.value);
  if (sessionTime >= 50) {
    breakSelect.classList.remove('hidden');
    breakLabel.classList.remove('hidden');
  } else {
    breakSelect.classList.add('hidden');
    breakLabel.classList.add('hidden');
  }
});

function startTimer(duration, onEnd) {
  clearInterval(timer);
  let time = duration * 60;
  updateDisplay(time);

  timer = setInterval(() => {
    time--;
    updateDisplay(time);
    if (time <= 0) {
      clearInterval(timer);
      if (onEnd) onEnd();
    }
  }, 1000);
}

function updateDisplay(time) {
  const m = String(Math.floor(time / 60)).padStart(2, '0');
  const s = String(time % 60).padStart(2, '0');
  timerDisplay.textContent = `${m}:${s}`;
}

startBtn.addEventListener('click', () => {
  const sessionMinutes = parseInt(sessionSelect.value);
  const breakMinutes = breakSelect.classList.contains('hidden') ? 5 : parseInt(breakSelect.value);

  isBreak = false;
  startTimer(sessionMinutes, () => {
    isBreak = true;
    alert('Break time!');
    startTimer(breakMinutes);
  });
});

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  darkModeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
});
