# A Snake game built with Prompt Engineering
I used AI Prompt Engineering to help me build this game.

---

## See the game [here](https://snake-game-built-by-prompt-engineer.netlify.app/)

```prompt
based on our previous interactions, can you further improve this webpage to include an introduction blurb to indicate this game was created with AI Prompt Engineering and to maintain a list of high scores?
```

# Output: 

Sure, I can modify the code to include an introduction blurb and maintain a list of high scores. Here's the updated code with these changes:

**HTML:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game (AI-Powered)</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="game-container">
        <h1>Snake Game (Created with AI Prompt Engineering)</h1>
        <p id="intro">This snake game was created using AI prompt engineering techniques to demonstrate the capabilities of modern AI systems in building interactive applications.</p>
        <canvas id="game-canvas"></canvas>
        <div id="score-container">Score: <span id="score">0</span></div>
        <div id="high-scores-container">
            <h2>High Scores</h2>
            <ol id="high-scores-list"></ol>
        </div>
    </div>
    <script src="game.js"></script>
</body>
</html>
```

**CSS (styles.css):**

```css
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #333;
    font-family: Arial, sans-serif;
    color: #fff;
}

#game-container {
    text-align: center;
    max-width: 800px;
    padding: 20px;
}

#intro {
    margin-bottom: 20px;
}

#game-canvas {
    border: 1px solid #fff;
    background-color: #000;
}

#score-container {
    margin-top: 10px;
    font-size: 18px;
}

#high-scores-container {
    margin-top: 20px;
    text-align: left;
}

#high-scores-list {
    list-style-type: decimal;
    padding-left: 20px;
}
```

**JavaScript (game.js):**

```javascript
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
```

Here's what has been added or modified:

**HTML:**
- Added an `h1` heading with the game title and a mention of "AI Prompt Engineering".
- Added a `p` element with an `id="intro"` to display an introduction blurb about the game being created using AI prompt engineering.
- Added a new `div` with `id="high-scores-container"` to display the list of high scores.
- Inside the high scores container, added an `h2` heading and an ordered list (`ol`) with `id="high-scores-list"` to display the high scores.

**CSS:**
- Added styles for the introduction blurb, high scores container, and high scores list.

**JavaScript:**
- Initialized an empty `highScores` array or retrieved the existing high scores from `localStorage` if available.
- Added a `gameOver` function that handles the game over condition and prompts the player to enter their name for the high score list.
- Inside the `gameOver` function, the player's score is added to the `highScores` array, the array is sorted in descending order based on the scores, and only the top 10 scores are kept.
- The `highScores` array is then saved to `localStorage` for persistence across

