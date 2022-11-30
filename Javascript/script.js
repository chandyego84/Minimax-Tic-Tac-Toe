// constants and variables
const SIZE = 9
let boardState = []
let isOver = false
let currentPlayer = -1 // -1 for real player, 1 for AI

const cells = document.querySelectorAll('[data-cell]')
const stateText = document.getElementById('print')
const rstButton = document.getElementById('rst')
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', HandlePlayerClick))
rstButton.addEventListener('click', PlayGame)

// STARTING THE GAME
PlayGame()

// FUNCTIONS
// reset board (game) state
function ResetGame() {
    // reset board state
    for (let i=0; i<SIZE; i++) {
        boardState[i] = 0
    }
    isOver = false
    currentPlayer = -1
    stateText.textContent = "" 
    for (let cellIndex=0; cellIndex<SIZE; cellIndex++) {
        cells[cellIndex].textContent = ''
    }
}

function PlayGame() {
    ResetGame()
}

// handle player click to make a move on board
function HandlePlayerClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell'))

    // handle click if human player's turn only
    if (currentPlayer == -1 && !isOver) {
        if (IsValidMove(clickedCellIndex)) {
            // human player's move
            boardState[clickedCellIndex] = currentPlayer
            clickedCell.textContent = currentPlayer
            // AI's turn
            currentPlayer = -currentPlayer
            scoreAndPos = Minimax(1)
            bestScore = scoreAndPos[0]
            bestMoveIndex = scoreAndPos[1]
            if (IsValidMove(bestMoveIndex)) {
                boardState[bestMoveIndex] = currentPlayer
                cells[bestMoveIndex].textContent = currentPlayer
            }
            currentPlayer = -currentPlayer // switch back to human player
            if (IsTerminatingNode()) {
                HandleIsOver()
            }
        }      
    }
    
    return // if not valid, return nothing
}

// Game is over
function HandleIsOver() {
    if (IsWinner(-1)) {
        // human won
        stateText.textContent = "Human won!" 
        return
    }
    else if (IsWinner(1)) {
        // AI won
        stateText.textContent = "AI won!" 
        return
    }
    // Draw
    stateText.textContent = "Draw!" 
    return
}


// place player mark on cell
function HandleCellPlayed(clickedCell, clickedCellIndex) {
    boardState[clickedCellIndex] = currentPlayer
    clickedCell.textContent = currentPlayer
}

// is player choice a legal move?
function IsValidMove(cellIndex) {
    if (boardState[cellIndex] != 0) {
        return false;
    }

    return true;
}

// check for win
// PARAMETERS:
    // board is an array and represents a board state
    // player is -1 for human or 1 for AI
function IsWinner(player) {
    for (let i=0; i<3; i++) {
        // horizontal
        if (boardState.slice(i*3, i*3+3).every((pos) => {
            return pos == player})) {
                return true
            }

        // vertical
        if ([boardState[i], boardState[i+3], boardState[i+6]].every((pos) => {
            return pos == player})) {
            return true
        }

        // positive slope diagonal
        if ([boardState[0], boardState[4], boardState[8]].every((pos) => {
            return pos == player})) {
                return true
            }

        //negative slope diagonal
        if ([boardState[2], boardState[4], boardState[6]].every((pos) => {
            return pos == player})) {
                return true
            }
    }

    return false
}

// is draw
// PARAMETERS:
    // board is an array and represents a board state
function IsDraw() {
    return boardState.every((pos) => {
        return pos != 0
    })
}

// is end node
function IsTerminatingNode() {
    return IsWinner(-1) || IsWinner(1) || IsDraw()
}

// evaluation function
// AI wins ==> 100 pts, AI loses ==> -100 pts, otherwise ==> 0 pts
// PARAMETERS:
    // board: board represents board state
function Evaluate() {
    if (IsWinner(1)) {
        // AI won
        return 100
    }
    else if (IsWinner(-1)) {
        // AI lost
        return -100
    }

    return 0
}

// minimax
// AI is maximizing player
// INITIAL CALL: Minimax(1)
function Minimax(maximizingPlayer) {
    // terminal node; return heuristic value
    if (IsTerminatingNode()) {
        return [Evaluate(), -1] // evaluation score and position board (-1 bc this does not return the pos)
    }
    
    // maximizing player (AI)
    if (maximizingPlayer == 1) {
        let maxValue = -Infinity
        let pos = 0
        for (let p=0; p<SIZE; p++) {
            if (IsValidMove(p)) {
                // make the move
                boardState[p] = 1
                let value = Minimax(-1)[0]
                // undo the move
                boardState[p] = 0
                // check if evaluated value is greater than current value
                if (value > maxValue) {
                    maxValue = value
                    pos = p
                }
            }
        }
        return [maxValue, pos]
    }

    // minimizing player (human)
    else {
        let minValue = Infinity
        let pos = 0
        for (let p=0; p<SIZE; p++) {
            if (IsValidMove(p)) {
                // make the move
                boardState[p] = -1
                // recurse
                let value = Minimax(1)[0]
                // undo the move
                boardState[p] = 0
                // check if evaluated value is less than current value
                if (value < minValue) {
                    minValue = value
                    pos = p
                }
            }
        }
        return [minValue, pos]
    }
}
