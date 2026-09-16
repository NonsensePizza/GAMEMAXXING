const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
const scoreText = document.getElementById("score");

const box = 20;

let snake = [
    { x: 200, y: 200 }
];

let food;

let direction = "RIGHT";

let canChangeDirection = true;

let gameRunning = false;
let score = 0;


// ==========================
// CREATE FOOD
// ==========================

function createFood() {

    let newFood;
    let onSnake;

    do {

        newFood = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };

        onSnake = snake.some(function (segment) {

            return (
                segment.x === newFood.x &&
                segment.y === newFood.y
            );

        });

    } while (onSnake);

    return newFood;
}


food = createFood();


// ==========================
// START GAME
// ==========================

function startGame() {

    gameRunning = true;

    startButton.style.display = "none";

    gameLoop();
}


// ==========================
// RESTART GAME
// ==========================

function restartGame() {

    snake = [
        { x: 200, y: 200 }
    ];

    direction = "RIGHT";

    canChangeDirection = true;

    score = 0;

    scoreText.textContent = score;

    food = createFood();

    gameRunning = true;

    restartButton.style.display = "none";

    gameLoop();
}


// ==========================
// CHANGE DIRECTION
// ==========================

function changeDirection(event) {

    // Only allow one direction change
    // between each snake movement

    if (!canChangeDirection) {

        return;

    }


    if (
        event.key === "ArrowUp" &&
        direction !== "DOWN"
    ) {

        direction = "UP";

        canChangeDirection = false;

    }


    if (
        event.key === "ArrowDown" &&
        direction !== "UP"
    ) {

        direction = "DOWN";

        canChangeDirection = false;

    }


    if (
        event.key === "ArrowLeft" &&
        direction !== "RIGHT"
    ) {

        direction = "LEFT";

        canChangeDirection = false;

    }


    if (
        event.key === "ArrowRight" &&
        direction !== "LEFT"
    ) {

        direction = "RIGHT";

        canChangeDirection = false;

    }

}


// ==========================
// GAME LOOP
// ==========================

function gameLoop() {

    if (!gameRunning) {

        return;

    }

    drawGame();

    moveSnake();

    setTimeout(gameLoop, 100);
}


// ==========================
// DRAW GAME
// ==========================

function drawGame() {

    ctx.fillStyle = "#111";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Draw snake

    ctx.fillStyle = "#22c55e";

    for (let i = 0; i < snake.length; i++) {

        ctx.fillRect(
            snake[i].x,
            snake[i].y,
            box,
            box
        );

    }


    // Draw food

    ctx.fillStyle = "#ef4444";

    ctx.fillRect(
        food.x,
        food.y,
        box,
        box
    );

}


// ==========================
// MOVE SNAKE
// ==========================

function moveSnake() {

    let head = {

        x: snake[0].x,

        y: snake[0].y

    };


    // Move head

    if (direction === "RIGHT") {

        head.x += box;

    }

    if (direction === "LEFT") {

        head.x -= box;

    }

    if (direction === "UP") {

        head.y -= box;

    }

    if (direction === "DOWN") {

        head.y += box;

    }


    // ==========================
    // SCREEN WRAP
    // ==========================

    if (head.x < 0) {

        head.x = canvas.width - box;

    }

    if (head.x >= canvas.width) {

        head.x = 0;

    }

    if (head.y < 0) {

        head.y = canvas.height - box;

    }

    if (head.y >= canvas.height) {

        head.y = 0;

    }


    // ==========================
    // CHECK FOOD
    // ==========================

    if (
        head.x === food.x &&
        head.y === food.y
    ) {

        score++;

        scoreText.textContent = score;

        food = createFood();

    } else {

        snake.pop();

    }


    // Add new head

    snake.unshift(head);


    // ==========================
    // SELF COLLISION
    // ==========================

    for (let i = 1; i < snake.length; i++) {

        if (
            head.x === snake[i].x &&
            head.y === snake[i].y
        ) {

            gameOver();

            return;

        }

    }


    // Allow another direction change
    // now that the snake has actually moved

    canChangeDirection = true;
}


// ==========================
// GAME OVER
// ==========================

function gameOver() {

    gameRunning = false;

    alert("Game Over! Your score was " + score);

    restartButton.style.display = "inline-block";
}


// ==========================
// BUTTONS + KEYBOARD
// ==========================

startButton.addEventListener("click", startGame);

restartButton.addEventListener("click", restartGame);

document.addEventListener("keydown", changeDirection);