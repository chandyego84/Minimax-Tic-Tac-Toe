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

// is terminating node?

// evaluation function

// minimax algo