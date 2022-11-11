#include <stdio.h>
#include <stdbool.h>

// board
#define SIZE 9
int board[SIZE];

// resert game state
void ResetGame(int board[]) {
    for (int i=0; i<SIZE; i++) {
        board[i] = 0;
    }
}

// draw the board
void DrawBoard(int board[]) {
    for (int i=0; i<3; i++) {
        printf("%d %d %d\n", board[i*3],board[i*3+1], board[i*3+2]);
    }
}

// is illegal move?
bool IsLegalMove(int board[], int pos) {
    bool isLegal = false;

    // checks if position is in bounds/already taken
    if (pos >= 0 && pos < SIZE) {
        if (board[pos] == 0) {
            isLegal = true;
        }
    }

    return isLegal;
}

// make a move
void Step(int board[], int pos, int player) {
    if (IsLegalMove(board, pos)) {
        board[pos] = player;
    }

    else {
        printf("Player %d's move at position %d is not legal.\n", player, pos);
    }

}

// check for win
bool IsWinner(int board[], int player) {
    for (int i=0; i < 3; i++) {
        // horizontal
        if (player == board[i*3] == board[i*3+1] == board[i*3+2]) {
            return true;
        }
        // vertical
        if (player == board[i] == board[i+3] == board[i+6]) {
            return true;
        }

        // negative slope diagonal
        if (player == board[0] == board[4] == board[8]) {
            return true;
        }

        // positive slope diagonal
        if (player == board[2] == board[4] == board[6]) {
            return true;
        }
    }

    return false;
}

bool IsDraw(int board[]) {
    for (int i=0; i<SIZE; i++) {
        if (board[i] == 0) {
            return false;
        }
    }

    return true;
}

// is terminating node?: 
// win or draw in game state
bool IsTerminatingNode(int board[]) {
    return IsWinner(board, -1) || IsWinner(board, 1) || IsDraw(board);
}

// evaluation function:
// AI wins --> 100 pts, AI loses --> -100 pts, otherwise --> 0 pts
int Evaluate(int board[]) {
    if (IsWinner(board, 1)) {
        // AI won
        return 100;
    }
    else if (IsWinner(board, -1)) {
        // AI lost
        return -100;
    }

    return 0;
}

// minimax implementation
// INITIAL CALL: Minimax(board, 1). AI is maximizing player.
int Minimax(int board[], int maximizingPlayer) {
    // terminal node
    if (IsTerminatingNode(board)) {
        return Evaluate(board); // return score of game state
    }

    if (maximizingPlayer) {
        int maxValue, value = -1000;
        for (int p=0; p<SIZE; p++) {
            if (IsLegalMove(board, p)) {
                Step(board, p, maximizingPlayer);
                value = Minimax(board, -maximizingPlayer);
                board[p] = 0; // undo the move
                if (value > maxValue) {
                    maxValue = value;
                }
            }
        }
        return maxValue;
    }

    else {
        int minValue, value = 1000;
        for (int p=0; p<SIZE; p++) {
            if (IsLegalMove(board, p)) {
                Step(board, p, maximizingPlayer);
                value = Minimax(board, -maximizingPlayer);
                board[p] = 0; // undo the move
                if (value < minValue) {
                    minValue = value;
                }
            }
        }
        return minValue;
    }
}