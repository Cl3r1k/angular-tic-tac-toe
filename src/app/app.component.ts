import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    state: number;
    numPlayers: number;
    playerChoiseXorO: string;
    board: string[] = [];
    secondPlayerTurn: boolean;
    aiPlayer: string;
    huPlayer: string;
    start = true;
    finishedGame = false;
    player1Wins: number;
    player2Wins: number;
    draws: number;
    restartPerformed: boolean;
    msg1: string;
    msg2: string;
    activeLeft: boolean;
    activeRight: boolean;
    finalMessage: string;

    constructor() {
        this.initGame();
    }

    initGame() {
        this.state = 0;
        this.numPlayers = 0;
        this.playerChoiseXorO = '';
        this.aiPlayer = 'X';
        this.huPlayer = 'O';
        this.player1Wins = 0;
        this.player2Wins = 0;
        this.draws = 0;
        this.finalMessage = 'Some text info';

        this.restartGame();

        this.restartPerformed = false;
    }

    choosePlayer(num: number) {
        this.numPlayers = num;
        this.state = 1;
    }

    chooseXorO(letter: string) {
        this.playerChoiseXorO = letter;
        this.state = 2;

        if (this.numPlayers === 1 && this.playerChoiseXorO === 'X') {
            this.msg1 = 'Your turn';
        } else {
            this.msg1 = 'First player turn';
        }

        this.updateMessageBox();

        if (this.numPlayers === 1 && this.playerChoiseXorO === 'O') {
            this.msg2 = 'Computer\'s turn';
            setTimeout(() => { this.aiTurn(); }, 1000);
        }
    }

    back() {
        this.numPlayers = 0;
        this.state = 0;
    }

    reset() {
        this.initGame();
        this.restartPerformed = true;
    }

    restartGame() {
        this.start = true;
        this.secondPlayerTurn = false;
        this.finishedGame = false;

        this.board = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

        this.activeLeft = false;
        this.activeRight = false;

        if (this.numPlayers === 1 && this.playerChoiseXorO === 'X') {
            this.msg1 = 'Your turn';
        } else {
            this.msg1 = 'First player turn';
        }
        this.msg2 = 'Second player turn';

        this.updateMessageBox();

        if (this.numPlayers === 1 && this.playerChoiseXorO === 'O') {
            this.msg1 = 'Your turn';
            this.msg2 = 'Computer\'s turn';
            setTimeout(() => { this.aiTurn(); }, 1000);
        }

        this.restartPerformed = true;

        /* Initial state of the board
          O |   | X
          ---------
          X |   | X
          ---------
            | O | O
        */
        // this.board = ['O', '1', 'X', 'X', '4', 'X', '6', 'O', 'O'];
        // this.start = false;

        /* Initial state of the board
            |   | O
          ---------
            | X | X
          ---------
            | O |
        */
        // this.board = ['0', '1', 'O', '3', 'X', 'X', '6', 'O', '8'];

        /* Initial state of the board
            |   | X
          ---------
            |   | X
          ---------
            | O | O
        */
        // this.board = ['0', '1', 'X', '3', '4', 'X', '6', 'O', 'O'];

        /* Initial state of the board
          0 |   | X
          ---------
          X |   |
          ---------
            | O |
        */
        // this.board = ['O', '1', 'X', 'X', '4', '5', '6', 'O', '8'];    // This one is strange, -> nope, AI just giving up

        /* Initial state of the board
          X | X | O
          ---------
            | O |
          ---------
            | O | X
        */
        // this.board = ['X', 'X', 'O', '3', 'O', '5', '6', 'O', 'X'];
        // this.board = ['X', 'O', '2', '3', 'O', '5', '6', '7', 'X'];
    }

    aiTurn() {
        let result = Object();

        if (this.start) {
            // Perform first random pass
            const rnd = Math.round(Math.random() * (9 - 0) + 0);
            result.index = rnd;
        } else {
            if (this.playerChoiseXorO === 'X') {
                result = this.minimax(this.board, this.huPlayer, 0);
            } else {
                result = this.minimax(this.board, this.aiPlayer, 0);
            }
        }

        this.updateBoard(result.index);
    }

    playerTurn(num: number) {
        if (this.numPlayers === 1) {
            if (this.playerChoiseXorO === 'X' && this.secondPlayerTurn) {
                return;
            }

            if (this.playerChoiseXorO === 'O' && !this.secondPlayerTurn) {
                return;
            }
        }

        if (this.restartPerformed) {
            this.restartPerformed = false;
        }

        this.updateBoard(num);
    }

    updateBoard(num: number) {

        if (!this.finishedGame) {
            if (this.board[num] !== this.aiPlayer && this.board[num] !== this.huPlayer) {
                if (!this.secondPlayerTurn) {
                    if (this.numPlayers === 2) {
                        let tmpChoise: string;
                        if (this.playerChoiseXorO === 'X') {
                            tmpChoise = this.aiPlayer;
                        } else {
                            tmpChoise = this.huPlayer;
                        }

                        this.board[num] = tmpChoise;
                        if (this.winning(this.board, tmpChoise)) {
                            this.finishedGame = true;
                            this.player1Wins++;
                            // alert('First player won!!!');
                            this.finalMessage = 'First player won!!!';
                            setTimeout(() => { this.restartGame(); }, 3000);
                            return;
                        }
                        this.msg2 = 'Second player turn';
                    } else {
                        this.board[num] = this.aiPlayer;
                        if (this.winning(this.board, this.aiPlayer)) {
                            this.finishedGame = true;

                            if (this.playerChoiseXorO !== this.aiPlayer) {
                                // alert('AI won!');
                                this.finalMessage = 'AI won!';
                                this.player2Wins++;
                            } else {
                                // alert('You won the AI!!!');
                                this.finalMessage = 'You won the AI!!!';
                                this.player1Wins++;
                            }

                            setTimeout(() => { this.restartGame(); }, 3000);
                            return;
                        }
                        this.msg2 = 'Computer\'s turn';
                    }
                } else {
                    if (this.numPlayers === 2) {
                        let tmpChoise: string;
                        if (this.playerChoiseXorO === 'X') {
                            tmpChoise = this.huPlayer;
                        } else {
                            tmpChoise = this.aiPlayer;
                        }

                        this.board[num] = tmpChoise;
                        if (this.winning(this.board, tmpChoise)) {
                            this.finishedGame = true;
                            this.player2Wins++;
                            // alert('Second player won!!!');
                            this.finalMessage = 'Second player won!!!';
                            setTimeout(() => { this.restartGame(); }, 3000);
                            return;
                        }
                        this.msg1 = 'First player turn';
                    } else {
                        this.board[num] = this.huPlayer;
                        if (this.winning(this.board, this.huPlayer)) {
                            this.finishedGame = true;
                            this.player2Wins++;

                            if (this.playerChoiseXorO !== this.huPlayer) {
                                // alert('AI won!');
                                this.finalMessage = 'AI won!';
                            } else {
                                // alert('You won the AI!!!');
                                this.finalMessage = 'You won the AI!!!!';
                            }

                            setTimeout(() => { this.restartGame(); }, 3000);
                            return;
                        }
                        this.msg1 = 'Your turn';
                    }
                }

                const tmpBoard = this.emptyIndices(this.board);
                if (tmpBoard.length === 0) {
                    this.finishedGame = true;
                    this.draws++;
                    // alert('it was a draw...');
                    this.finalMessage = 'it was a draw...';
                    setTimeout(() => { this.restartGame(); }, 3000);
                    return;
                }

                this.secondPlayerTurn = !this.secondPlayerTurn;
                this.start = false;
                this.updateMessageBox();

                if (this.numPlayers === 1) {
                    if (this.secondPlayerTurn && this.playerChoiseXorO === 'X' || !this.secondPlayerTurn && this.playerChoiseXorO === 'O') {
                        setTimeout(() => {
                            if (this.restartPerformed) {
                                this.restartPerformed = false;
                            } else {
                                this.aiTurn();
                            }
                        }, 1000);
                    }
                }
            }
        }

    }

    updateMessageBox() {
        if ((this.numPlayers === 1 && this.playerChoiseXorO === 'X') || this.numPlayers === 2) {
            this.activeLeft = !this.secondPlayerTurn;
            this.activeRight = this.secondPlayerTurn;
        } else {
            this.activeLeft = this.secondPlayerTurn;
            this.activeRight = !this.secondPlayerTurn;
        }
    }

    emptyIndices(board) {
        return board.filter(item => item !== 'O' && item !== 'X');
    }

    winning(board: string[], playerID: string): boolean {
        if (board[0] === playerID && board[1] === playerID && board[2] === playerID ||
            board[3] === playerID && board[4] === playerID && board[5] === playerID ||
            board[6] === playerID && board[7] === playerID && board[8] === playerID ||
            board[0] === playerID && board[3] === playerID && board[6] === playerID ||
            board[1] === playerID && board[4] === playerID && board[7] === playerID ||
            board[2] === playerID && board[5] === playerID && board[8] === playerID ||
            board[0] === playerID && board[4] === playerID && board[8] === playerID ||
            board[2] === playerID && board[4] === playerID && board[6] === playerID) {
            return true;
        } else {
            return false;
        }
    }

    minimax(newBoard: string[], player: string, steps: number) {

        const availSpots: number[] = this.emptyIndices(newBoard);

        if (this.winning(newBoard, this.huPlayer)) {
            return { score: -10, steps: steps };
        } else if (this.winning(newBoard, this.aiPlayer)) {
            return { score: 10, steps: steps };
        } else if (availSpots.length === 0) {
            return { score: 0, steps: steps };
        }

        const moves = [];

        for (let i = 0; i < availSpots.length; i++) {

            const move = Object();
            move.index = newBoard[availSpots[i]];
            move.steps = steps;

            // Perform turn for the current player
            newBoard[availSpots[i]] = player;

            move.steps++;

            if (player === this.aiPlayer) {
                const result = this.minimax(newBoard, this.huPlayer, move.steps);
                move.score = result.score;
                move.steps = result.steps;
            } else {
                const result = this.minimax(newBoard, this.aiPlayer, move.steps);
                move.score = result.score;
                move.steps = result.steps;
            }

            // Restore the cell
            newBoard[availSpots[i]] = move.index;

            moves.push(move);
        }

        let bestMove: number;    // Здесь добавить еще одну переменную bestSteps и в цикле тоже ее проверять. (<= и >=)
        let bestSteps = 10000;

        if (player === this.aiPlayer) {
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score >= bestScore) {
                    if (moves[i].steps < bestSteps || moves[i].score > bestScore) {    //  || moves[i].score > bestScore
                        bestSteps = moves[i].steps;
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                }
            }
        } else {
            let bestScore = 10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score <= bestScore) {
                    if (moves[i].steps < bestSteps || moves[i].score < bestScore) {    //  || moves[i].score < bestScore
                        bestSteps = moves[i].steps;
                        bestScore = moves[i].score;
                        bestMove = i;
                    }
                }
            }
        }

        return moves[bestMove];
    }
}
