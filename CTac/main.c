#include "functions.h"

int main(int argc, char **argv) {

    int playerMove = -1;
    int aiMove = -1;
    bool over, validInput = false;

    ResetGame(board);
    while (over == false) {
        DrawBoard(board);
        printf("Enter a position to play (0-8): ");
        // ensure valid user inpu
        Step(board, 0, -1);
        //putchar('\n');
        DrawBoard(board);
        //printf("User chose position %d.\n", playerMove);

        aiMove = Minimax(board, 1)[1];
        if (IsLegalMove(board, aiMove)) {
            Step(board, aiMove, 1);
        }
        else {
            printf("AI is stupid. Game is broken. Please contribute and fix on GitHub.\n");
        }
        DrawBoard(board);
        printf("AI chose position %d.\n", aiMove);

        if (IsWinner(board, -1) || IsWinner(board, 1)) {
            over = true;
        }
    }

    return 0;
}