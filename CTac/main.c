#include "functions.h"

int main() {

    int currentPlayer = 1;
    ResetGame(board);
    for (int i=0; i<SIZE; i++) {
        Step(board, i, currentPlayer);
        currentPlayer = -currentPlayer;
    }
    DrawBoard(board);
    printf("Win?: %d\n", IsWinner(board, currentPlayer));
    printf("Draw?: %d\n", IsDraw(board));

    return 0;
}