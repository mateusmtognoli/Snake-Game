// script.js
const gameArea = document.getElementById('gameArea');
const scorePanel = document.getElementById('scorePanel');
const gameWidth = gameArea.clientWidth;
const gameHeight = gameArea.clientHeight;
const snakeSize = 20;
let snake = [{x: 160, y: 200}, {x: 140, y: 200}];
let food = {x: 100, y: 100};
let direction = 'RIGHT';
let score = 0;
let gameSpeed = 200;

function drawGame() {
    gameArea.innerHTML = '';

    // Draw food
    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x}px`;
    foodElement.style.top = `${food.y}px`;
    foodElement.classList.add('food');
    gameArea.appendChild(foodElement);

    // Draw snake
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${segment.x}px`;
        snakeElement.style.top = `${segment.y}px`;
        snakeElement.classList.add('snake');
        gameArea.appendChild(snakeElement);
    });
}

function moveSnake() {
    const head = {...snake[0]};
    switch (direction) {
        case 'RIGHT': head.x += snakeSize; break;
        case 'LEFT': head.x -= snakeSize; break;
        case 'UP': head.y -= snakeSize; break;
        case 'DOWN': head.y += snakeSize; break;
    }

    // Check for collisions with the game boundaries or itself
    if (head.x < 0 || head.x >= gameWidth || head.y < 0 || head.y >= gameHeight || snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        alert('Game over! Your score: ' + score);
        document.location.reload();
        return;
    }

    // Check for food collision
    if (head.x === food.x && head.y === food.y) {
        score += 1;  // Aqui foi alterado de 10 para 1
        scorePanel.textContent = 'Score: ' + score;
        placeFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);
    drawGame();
}

// A função placeFood e o restante do código permanecem inalterados.


function placeFood() {
    food.x = Math.floor(Math.random() * (gameWidth / snakeSize)) * snakeSize;
    food.y = Math.floor(Math.random() * (gameHeight / snakeSize)) * snakeSize;
    if (snake.some(seg => seg.x === food.x && seg.y === food.y)) {
        placeFood();
    }
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowRight': if (direction !== 'LEFT') direction = 'RIGHT'; break;
        case 'ArrowLeft': if (direction !== 'RIGHT') direction = 'LEFT'; break;
        case 'ArrowUp': if (direction !== 'DOWN') direction = 'UP'; break;
        case 'ArrowDown': if (direction !== 'UP') direction = 'DOWN'; break;
    }
}

document.addEventListener('keydown', changeDirection);
placeFood();
drawGame();
setInterval(moveSnake, gameSpeed);
