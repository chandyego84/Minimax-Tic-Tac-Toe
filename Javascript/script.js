// constants and variables
const SIZE = 9
let boardState = []
let isOver = false
let currentPlayer = -1 // -1 for real player, 1 for AI
const cells = document.querySelectorAll('[data-cell]')

// add event listeners
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', HandleClick))

PlayGame()

// reset board (game) state
function ResetGame() {
    for (let i=0; i<SIZE; i++) {
        boardState[i] = 0
    }
}

function PlayGame() {
    ResetGame()
}

// handle click
function HandleClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell'))

    if (currentPlayer == -1) {
        // handle click if human player's turn only
        if (IsValidClick(clickedCellIndex)) {
            clickedCell.textContent = currentPlayer // human player's move is placed
            boardState[clickedCellIndex] = currentPlayer
            IsWinner(currentPlayer)
            // AI turn's
            currentPlayer = -currentPlayer // switch players
            
        }    
    }

    return // if not valid, return nothing
}

// is click valid?
function IsValidClick(cellIndex) {
    if (boardState[cellIndex] != 0) {
        return false;
    }

    return true;
}

// place player mark on cell
function HandleCellPlayed(clickedCell, clickedCellIndex) {
    boardState[clickedCellIndex] = currentPlayer
    clickedCell.textContent = currentPlayer
}

// check for win
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
function Evaluate() {
    if (IsWinner(1)) {
        return 100
    }
    else if (IsWinner(-1)) {
        return -100
    }

    return 0
}

// minimax
// AI is maximizing player
// INITIAL CALL: Minimax(1)
function Minimax(player) {

}
