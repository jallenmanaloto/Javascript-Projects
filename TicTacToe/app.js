const cellElements = document.querySelectorAll('[data-cell]');
const xClass = 'x';
const circleClass = 'circle';

//Setting the combinations for winning the game
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
]

const board = document.getElementById('board');
const winningMessageBanner = document.querySelector('.winning-message');
const winningMessageText = document.querySelector('[data-winning-message]');
const rematchButton = document.getElementById('rematchButton');
let circleTurn;

//initializing the game
startGame();

//Making rematchButton work
rematchButton.addEventListener('click', startGame);

//Setting the game parameters
//Setting X's first turn
function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        cell.removeEventListener('click', cellClick);
        cell.addEventListener('click', cellClick, {once: true})
    });
    boardHoverClass();
    winningMessageBanner.classList.remove('active');
}
    
   
//Passed on to function startGame()
function cellClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? circleClass : xClass;
    
    //Render Markings
    renderMarks(cell, currentClass);

    //Check for the winning mark
    if (checkWinner(currentClass)) {
       endGame(false);
    } else if (isDraw()) {
        endGame(true);
    }else {

    //Switch Turns
    switchTurns();

    //Setting the hover effect of the board
    //Applied after switchTurns() to reference which current marker plays (X or O)
    boardHoverClass();
    }
}

 //Check for a Draw
function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = 'It is a Draw!';
    } else {
        winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageBanner.classList.add('active');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) ||
        cell.classList.contains(circleClass);
    })
}

//Passing this function everytime a cell is clicked
//Will render markings based on the currentClass
function renderMarks(cell, currentClass) {
    cell.classList.add(currentClass);
}

function switchTurns() {
    circleTurn = !circleTurn;
}

//Setting hover effect to be passed on Function startGame()
//Removing class for opposing marker and appending class of whose marker's turn
function boardHoverClass () {
    board.classList.remove(circleClass);
    board.classList.remove(xClass);
    if (circleTurn) {
        board.classList.add(circleClass);
    } else {
        board.classList.add(xClass);
    }
}

function checkWinner(currentClass) {
    return winCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}