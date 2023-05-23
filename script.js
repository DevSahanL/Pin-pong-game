// Constants
const paddleUser = document.getElementById('paddle-user');
const paddleAI = document.getElementById('paddle-ai');
const ball = document.getElementById('ball');

const gameContainer = document.getElementById('game-container');
const containerWidth = gameContainer.offsetWidth;
const containerHeight = gameContainer.offsetHeight;

const paddleHeight = paddleUser.offsetHeight;
const paddleTopMax = containerHeight - paddleHeight;

const ballWidth = ball.offsetWidth;
const ballHeight = ball.offsetHeight;
const ballTopMax = containerHeight - ballHeight;
const ballLeftMax = containerWidth - ballWidth;

// Variables
let paddleUserTop = 120;
let paddleAITop = 120;
let ballTop = 145;
let ballLeft = 195;

let ballTopSpeed = -2;
let ballLeftSpeed = 2;

// Update the user's paddle position
function updateUserPaddle() {
  paddleUser.style.top = paddleUserTop + 'px';
}

// Update the AI's paddle position
function updateAIPaddle() {
  paddleAI.style.top = paddleAITop + 'px';
}

// Update the ball's position
function updateBall() {
  ball.style.top = ballTop + 'px';
  ball.style.left = ballLeft + 'px';
}

// Move the user's paddle up
function moveUserPaddleUp() {
  if (paddleUserTop > 0) {
    paddleUserTop -= 10;
    updateUserPaddle();
  }
}

// Move the user's paddle down
function moveUserPaddleDown() {
  if (paddleUserTop < paddleTopMax) {
    paddleUserTop += 10;
    updateUserPaddle();
  }
}

// Move the AI's paddle
function moveAIPaddle() {
  // Simple AI movement - follows the ball's vertical position
  if (paddleAITop + (paddleHeight / 2) < ballTop + (ballHeight / 2)) {
    paddleAITop += 2;
  } else {
    paddleAITop -= 2;
  }

  // Limit the AI's paddle movement within the container
  if (paddleAITop < 0) {
    paddleAITop =     0;
}
if (paddleAITop > paddleTopMax) {
  paddleAITop = paddleTopMax;
}

updateAIPaddle();
}

// Move the ball
function moveBall() {
ballTop += ballTopSpeed;
ballLeft += ballLeftSpeed;

// Check collision with top and bottom walls
if (ballTop <= 0 || ballTop >= ballTopMax) {
  ballTopSpeed *= -1;
}

// Check collision with user's paddle
if (
  ballLeft <= 20 &&
  ballTop + ballHeight >= paddleUserTop &&
  ballTop <= paddleUserTop + paddleHeight
) {
  ballLeftSpeed *= -1;
}

// Check collision with AI's paddle
if (
  ballLeft >= containerWidth - 20 - ballWidth &&
  ballTop + ballHeight >= paddleAITop &&
  ballTop <= paddleAITop + paddleHeight
) {
  ballLeftSpeed *= -1;
}

// Check collision with side walls (scoring)
if (ballLeft <= 0) {
  // User scores a point
  resetBall();
  ballLeftSpeed = 2;
}
if (ballLeft >= ballLeftMax) {
  // AI scores a point
  resetBall();
  ballLeftSpeed = -2;
}

updateBall();
}

// Reset the ball position and direction
function resetBall() {
ballTop = Math.floor(containerHeight / 2 - ballHeight / 2);
ballLeft = Math.floor(containerWidth / 2 - ballWidth / 2);
ballTopSpeed = Math.random() > 0.5 ? 2 : -2;
}

// Event listeners for user paddle movement
document.addEventListener('keydown', function (event) {
if (event.code === 'ArrowUp') {
  moveUserPaddleUp();
} else if (event.code === 'ArrowDown') {
  moveUserPaddleDown();
}
});

// Game loop
function gameLoop() {
moveBall();
moveAIPaddle();
requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

