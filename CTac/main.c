#include "functions.h"

int main() {

    int currentPlayer = -1;
    bool over = false;

    ResetGame(board);
    DrawBoard(board);
    printf("Win?: %d\n", IsWinner(board, currentPlayer));

    return 0;
}