const playArea = document.getElementById('play-area');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score');
const finalScoreDisplay = document.getElementById('final-score');
const popup = document.getElementById('result-popup');
const startBtn = document.getElementById('start-btn');

let score = 0;
let timeLeft = 50;
let gameInterval, spotTimeout;

function startGame() {
  // Reset game state
  score = 0;
  timeLeft = 50;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  startBtn.disabled = true;

  // Hide popup and clear play area
  popup.classList.add('hidden');
  playArea.innerHTML = '';

  // Start countdown
  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearTimeout(spotTimeout);
      playArea.innerHTML = '';
      showResult();
    }
  }, 1000);

  // Show first spot
  spawnSpot();
}

function spawnSpot() {
  playArea.innerHTML = '';

  const spot = document.createElement('div');
  spot.classList.add('spot');

  const maxX = playArea.clientWidth - 40;
  const maxY = playArea.clientHeight - 40;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  spot.style.left = `${x}px`;
  spot.style.top = `${y}px`;

  spot.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    clearTimeout(spotTimeout);
    spawnSpot(); // spawn next spot
  });

  playArea.appendChild(spot);

  // Spawn a new spot after 2 seconds if not clicked
  spotTimeout = setTimeout(() => {
    playArea.innerHTML = '';
    spawnSpot();
  }, 2000);
}

function showResult() {
  finalScoreDisplay.textContent = score;
  popup.classList.remove('hidden');
  startBtn.disabled = false;
}

function restartGame() {
  startGame();
}

// Start button
startBtn.addEventListener('click', startGame);
