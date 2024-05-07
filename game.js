// Get the canvas element and its 2D rendering context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Define game variables
let snake = [
    { x: 400, y: 300 },
    { x: 390, y: 300 },
    { x: 380, y: 300 }
];
let food = { x: 200, y: 200 };
let direction = 'right';
let score = 0;
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Draw the game elements
function drawGame() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Update the game state
function updateGame() {
    // Move the snake
    const head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
        case 'up':
            head.y -= 10;
            break;
        case 'down':
            head.y += 10;
            break;
        case 'left':
            head.x -= 10;
            break;
        case 'right':
            head.x += 10;
            break;
    }
    snake.unshift(head);

    // Check for food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        food = { x: Math.floor(Math.random() * 79) * 10, y: Math.floor(Math.random() * 59) * 10 };
    } else {
        snake.pop();
    }

    // Check for collisions
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameOver();
    }
}

// Handle keyboard input
document.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    if (key === 'arrowup' && direction !== 'down') {
        direction = 'up';
    } else if (key === 'arrowdown' && direction !== 'up') {
        direction = 'down';
    } else if (key === 'arrowleft' && direction !== 'right') {
        direction = 'left';
    } else if (key === 'arrowright' && direction !== 'left') {
        direction = 'right';
    }
});

// Game over function
function gameOver() {
    const gameOverMessage = `Game Over! Your score: ${score}`;
    alert(gameOverMessage);

    // Save high score
    const playerName = prompt('Enter your name for the high score list:');
    if (playerName) {
        highScores.push({ name: playerName, score: score });
        highScores.sort((a, b) => b.score - a.score);
        highScores = highScores.slice(0, 10); // Keep only the top 10 scores
        localStorage.setItem('highScores', JSON.stringify(highScores));
        updateHighScoresList();
    }

    location.reload();
}

// Update the high scores list
function updateHighScoresList() {
    const highScoresList = document.getElementById('high-scores-list');
    highScoresList.innerHTML = '';

    highScores.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${entry.name} - ${entry.score}`;
        highScoresList.appendChild(listItem);
    });
}

// Game loop
let lastFrameTime = 0;
const frameDelay = 150; // Adjust this value to control the snake's speed (higher value = slower speed)

function gameLoop(currentTime) {
    const timeSinceLastFrame = currentTime - lastFrameTime;

    if (timeSinceLastFrame >= frameDelay) {
        lastFrameTime = currentTime;
        drawGame();
        updateGame();
    }

    requestAnimationFrame(gameLoop);
}

// Initialize the high scores list
updateHighScoresList();

// Start the game loop
gameLoop();
