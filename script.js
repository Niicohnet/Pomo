const sessionSelect = document.getElementById('sessionLength');
const breakSelect = document.getElementById('breakLength');
const breakLabel = document.getElementById('breakLabel');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const darkModeToggle = document.getElementById('darkModeToggle');

let timer;
let isPaused = false;
let isBreak = false;
let remainingTime = 0;

// Show/hide break options based on session length
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

// Start the timer
function startTimer(duration, onEnd) {
  clearInterval(timer);
  let time = duration * 60;
  remainingTime = time;
  updateDisplay(remainingTime);

  timer = setInterval(() => {
    if (!isPaused) {
      remainingTime--;
      updateDisplay(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timer);
        if (onEnd) onEnd();
      }
    }
  }, 1000);
}

// Update the timer display
function updateDisplay(time) {
  const m = String(Math.floor(time / 60)).padStart(2, '0');
  const s = String(time % 60).padStart(2, '0');
  timerDisplay.textContent = `${m}:${s}`;
}

// Start button handler
startBtn.addEventListener('click', () => {
  const sessionMinutes = parseInt(sessionSelect.value);
  const breakMinutes = breakSelect.classList.contains('hidden') ? 5 : parseInt(breakSelect.value);

  isPaused = false;
  isBreak = false;
  pauseBtn.textContent = '⏸ Pause';

  startTimer(sessionMinutes, () => {
    isBreak = true;
    alert('Break time!');
    startTimer(breakMinutes);
  });
});

// Pause/Resume button handler
pauseBtn.addEventListener('click', () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? '▶️ Resume' : '⏸ Pause';
});

// Stop button handler
stopBtn.addEventListener('click', () => {
  clearInterval(timer);
  isPaused = false;
  pauseBtn.textContent = '⏸ Pause';

  const sessionMinutes = parseInt(sessionSelect.value);
  remainingTime = sessionMinutes * 60;
  updateDisplay(remainingTime);
});

// Reset button handler
resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  isPaused = false;
  isBreak = false;
  pauseBtn.textContent = '⏸ Pause';
  timerDisplay.textContent = '00:00';
});

// Dark mode toggle
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  darkModeToggle.textContent = document.body.classList.contains('dark')
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';
});
