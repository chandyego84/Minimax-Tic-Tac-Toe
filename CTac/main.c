#include "functions.h"

int main() {

    int currentPlayer = 1;
    ResetGame(board);
    Step(board, 3, currentPlayer);
    Step(board, 4, currentPlayer);
    Step(board, 5, currentPlayer);
    DrawBoard(board);
    printf("Win?: %d\n", IsWinner(board, currentPlayer));

    return 0;
}