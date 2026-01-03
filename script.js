const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect.",
  "JavaScript is fun to learn.",
  "Typing fast is a useful skill.",
  "Stay focused and keep coding."
];

const quoteEl = document.getElementById("quote");
const inputEl = document.getElementById("input");
const startBtn = document.getElementById("startBtn");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

let time = 60;
let timer = null;
let isRunning = false;
let quote = "";
let mistakes = 0;

function startTest() {
  if (isRunning) return;

  isRunning = true;
  inputEl.disabled = false;
  inputEl.value = "";
  inputEl.focus();
  quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteEl.textContent = quote;

  time = 60;
  mistakes = 0;
  timeEl.textContent = time;
  wpmEl.textContent = 0;
  accuracyEl.textContent = 100;

  timer = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time === 0) endTest();
  }, 1000);
}

function endTest() {
  clearInterval(timer);
  isRunning = false;
  inputEl.disabled = true;

  const wordsTyped = inputEl.value.trim().split(/\s+/).length;
  const wpm = Math.round((wordsTyped / 60) * (60 - time));
  const accuracy =
    ((quote.length - mistakes) / quote.length) * 100;

  wpmEl.textContent = isNaN(wpm) ? 0 : wpm;
  accuracyEl.textContent = accuracy.toFixed(1);
  quoteEl.textContent = "Test finished! Click 'Start Test' to try again.";
}

inputEl.addEventListener("input", () => {
  const typed = inputEl.value;
  if (!isRunning) return;

  for (let i = 0; i < typed.length; i++) {
    if (typed[i] !== quote[i]) {
      mistakes++;
    }
  }

  if (typed === quote) {
    endTest();
  }
});

startBtn.addEventListener("click", startTest);


