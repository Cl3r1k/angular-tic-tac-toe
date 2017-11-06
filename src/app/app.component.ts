import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    state: number;
    numPlayers: number;
    playerXorO: number;
    grid: number[] = [];
    secondPlayerTurn: boolean;

    constructor() {
        this.initGame();
    }

    initGame() {
        this.state = 2;
        this.numPlayers = 0;
        this.playerXorO = 0;
        this.grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.secondPlayerTurn = false;
    }

    choosePlayer(num: number) {
        this.numPlayers = num;
        this.state = 1;
    }

    chooseXorO(num: number) {
        this.playerXorO = num;
        this.state = 2;
    }

    back() {
        this.numPlayers = 0;
        this.state = 0;
    }

    reset() {
        this.initGame();
    }

    updateGrid(num: number) {

        if (this.grid[num] === 0) {
            if (!this.secondPlayerTurn) {
                this.grid[num] = 1;
            } else {
                this.grid[num] = 2;
            }

            this.secondPlayerTurn = !this.secondPlayerTurn;
        }

    }
}
