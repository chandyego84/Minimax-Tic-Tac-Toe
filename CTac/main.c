#include "functions.h"

int main(int argc, char **argv) {

    int playerMove = -1;
    int aiMove = -1;
    int round = 0;
    bool over, validInput = false;

    ResetGame(board);
    while (!over) {
        printf("---ROUND %d---\n", round + 1);
        DrawBoard(board);
        printf("Enter a position to play (0-8): ");
        // ensure valid user input
        while (!validInput) {
            scanf("%d", &playerMove);
            if (IsLegalMove(board, playerMove)) {
                validInput = true;
                Step(board, playerMove, -1);
            }
            else {
                printf("Please enter a valid position to play: ");
            }
        }
        validInput = false;
        putchar('\n');
        DrawBoard(board);
        printf("User chose position %d.\n", playerMove);

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
            printf("GAME OVER!\n");
        }
        putchar('\n');
    }

    return 0;
}