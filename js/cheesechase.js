const game = document.getElementById('game');
const mouse = document.getElementById('mouse');
const cheese = document.getElementById('cheese');
const trap = document.getElementById('trap');
const scoreDisplay = document.getElementById('score');

let score = 0;

// Set initial positions
mouse.style.top = '140px';
mouse.style.left = '140px';

function randomPosition() {
    return Math.floor(Math.random() * 15) * 20; // 20px grid
}

function placeElement(element) {
    element.style.top = `${randomPosition()}px`;
    element.style.left = `${randomPosition()}px`;
}

// Place cheese and trap
placeElement(cheese);
placeElement(trap);

// Utility function to parse position values
function getNumericPosition(element, axis) {
    return parseInt(element.style[axis], 10);
}

// Move mouse with arrow keys
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const currentTop = getNumericPosition(mouse, 'top');
    const currentLeft = getNumericPosition(mouse, 'left');

    if (key === 'ArrowUp' && currentTop > 0) mouse.style.top = `${currentTop - 20}px`;
    if (key === 'ArrowDown' && currentTop < 280) mouse.style.top = `${currentTop + 20}px`;
    if (key === 'ArrowLeft' && currentLeft > 0) mouse.style.left = `${currentLeft - 20}px`;
    if (key === 'ArrowRight' && currentLeft < 280) mouse.style.left = `${currentLeft + 20}px`;

    // Check for collision with cheese
    if (
        getNumericPosition(mouse, 'top') === getNumericPosition(cheese, 'top') &&
        getNumericPosition(mouse, 'left') === getNumericPosition(cheese, 'left')
    ) {
        score += 10;
        scoreDisplay.textContent = score;
        placeElement(cheese);
    }

    // Check for collision with trap
    if (
        getNumericPosition(mouse, 'top') === getNumericPosition(trap, 'top') &&
        getNumericPosition(mouse, 'left') === getNumericPosition(trap, 'left')
    ) {
        alert('Game Over! Your score: ' + score);
        score = 0;
        scoreDisplay.textContent = score;
        placeElement(trap);
    }
});
