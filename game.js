// Get the canvas element and its 2D rendering context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 400;

// Define game variables
let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 }
];
let food = { x: 100, y: 100 };
let direction = 'right';
let score = 0;

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
        food = { x: Math.floor(Math.random() * 39) * 10, y: Math.floor(Math.random() * 39) * 10 };
    } else {
        snake.pop();
    }

    // Check for collisions
    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        alert(`Game Over! Your score: ${score}`);
        location.reload();
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

// Game loop
function gameLoop() {
    drawGame();
    updateGame();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
