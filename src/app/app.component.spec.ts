import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create the app', async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    it('should render title in a h1 tag', async(() => {
        // Arrange

        // Act
        const compiled = fixture.debugElement.nativeElement;

        // Assert
        expect(compiled.querySelector('h1').textContent).toContain('Tic Tac Toe');
    }));

    it(`should have initial params`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component.start).toEqual(true);
        expect(component.finishedGame).toEqual(false);
    }));

    describe('#initGame', () => {
        it(`should init game with initial params`, async(() => {
            // Arrange

            // Act
            component.initGame();

            // Assert
            expect(component.state).toEqual(0);
            expect(component.numPlayers).toEqual(0);
            expect(component.playerChoiseXorO).toEqual('');
            expect(component.aiPlayer).toEqual('X');
            expect(component.huPlayer).toEqual('O');
            expect(component.player1Wins).toEqual(0);
            expect(component.player2Wins).toEqual(0);
            expect(component.draws).toEqual(0);
            expect(component.finalMessage).toEqual('Some text info');
            expect(component.restartPerformed).toEqual(false);
        }));
    });

    describe('#choosePlayer', () => {
        it(`should change state according to choise(1)`, async(() => {
            // Arrange

            // Act
            component.choosePlayer(1);

            // Assert
            expect(component.state).toEqual(1);
            expect(component.numPlayers).toEqual(1);
        }));
    });

    describe('#chooseXorO', () => {
        it(`should change state according to choise(X)`, async(() => {
            // Arrange

            // Act
            component.chooseXorO('X');

            // Assert
            expect(component.state).toEqual(2);
            expect(component.playerChoiseXorO).toEqual('X');
        }));
    });

    describe('#back', () => {
        it(`should change state to initial`, async(() => {
            // Arrange

            // Act
            component.back();

            // Assert
            expect(component.state).toEqual(0);
            expect(component.numPlayers).toEqual(0);
        }));
    });

    describe('#reset', () => {
        it(`should reset all states to initial, and set 'restartPerformed' to true`, async(() => {
            // Arrange

            // Act
            component.reset();

            // Assert
            expect(component.state).toEqual(0);
            expect(component.numPlayers).toEqual(0);
            expect(component.playerChoiseXorO).toEqual('');
            expect(component.aiPlayer).toEqual('X');
            expect(component.huPlayer).toEqual('O');
            expect(component.player1Wins).toEqual(0);
            expect(component.player2Wins).toEqual(0);
            expect(component.draws).toEqual(0);
            expect(component.finalMessage).toEqual('Some text info');
            expect(component.restartPerformed).toEqual(true);
        }));
    });

    describe('#restartGame', () => {
        it(`should restart current game`, async(() => {
            // Arrange

            // Act
            component.restartGame();

            // Assert
            expect(component.start).toEqual(true);
            expect(component.secondPlayerTurn).toEqual(false);
            expect(component.finishedGame).toEqual(false);
            expect(component.board).toEqual(['0', '1', '2', '3', '4', '5', '6', '7', '8']);
            expect(component.activeLeft).toEqual(false);
            expect(component.activeRight).toEqual(true);
            expect(component.restartPerformed).toEqual(true);
        }));
    });

    describe('#aiTurn', () => {
        it(`should change board state (place X in cell 4)`, async(() => {
            // Arrange
            component.initGame();
            component.state = 2;
            component.numPlayers = 1;
            component.playerChoiseXorO = 'O';
            component.start = false;
            component.board = ['O', '1', 'X', 'X', '4', 'X', '6', 'O', 'O'];

            // Act
            component.aiTurn();

            // Assert
            expect(component.board).toEqual(['O', '1', 'X', 'X', 'X', 'X', '6', 'O', 'O']);
        }));
    });

    describe('#playerTurn', () => {
        it(`should change board state (place O in cell 4)`, async(() => {
            // Arrange
            component.initGame();
            component.state = 2;
            component.numPlayers = 1;
            component.playerChoiseXorO = 'O';
            component.secondPlayerTurn = true;
            component.board = ['O', '1', 'X', 'X', '4', 'X', '6', 'O', 'O'];

            // Act
            component.playerTurn(4);

            // Assert
            expect(component.board).toEqual(['O', '1', 'X', 'X', 'O', 'X', '6', 'O', 'O']);
        }));
    });

    describe('#updateBoard', () => {
        it(`should change board state (place X in cell 4)`, async(() => {
            // Arrange
            component.initGame();
            component.state = 2;
            component.numPlayers = 1;
            component.playerChoiseXorO = 'O';
            component.board = ['O', '1', 'X', 'X', '4', 'X', '6', 'O', 'O'];

            // Act
            component.updateBoard(4);

            // Assert
            expect(component.board).toEqual(['O', '1', 'X', 'X', 'X', 'X', '6', 'O', 'O']);
        }));
    });

    describe('#updateMessageBox', () => {
        it(`should change 'activeLeft' to '!secondPlayerTurn'`, async(() => {
            // Arrange
            component.initGame();
            component.state = 2;
            component.numPlayers = 1;
            component.playerChoiseXorO = 'X';
            component.secondPlayerTurn = true;

            // Act
            component.updateMessageBox();

            // Assert
            expect(component.activeLeft).toEqual(!component.secondPlayerTurn);
        }));
    });

    describe('#emptyIndices', () => {
        it(`should return array of empty indices`, async(() => {
            // Arrange
            component.board = ['O', '1', 'X', 'X', '4', 'X', '6', 'O', 'O'];

            // Act
            const tmpIndices = component.emptyIndices(component.board);

            // Assert
            expect(tmpIndices).toEqual(['1', '4', '6']);
        }));
    });

    describe('#winning', () => {
        it(`should return false for 'X' on the board`, async(() => {
            // Arrange
            component.board = ['O', '1', 'X', 'X', '4', 'X', '6', 'O', 'O'];

            // Act
            const win = component.winning(component.board, 'X');

            // Assert
            expect(win).toEqual(false);
        }));

        it(`should return true for 'X' on the board (X placed in cell 4)`, async(() => {
            // Arrange
            component.board = ['O', '1', 'X', 'X', 'X', 'X', '6', 'O', 'O'];

            // Act
            const win = component.winning(component.board, 'X');

            // Assert
            expect(win).toEqual(true);
        }));

        it(`should return true for 'O' on the board (O placed in cell 4)`, async(() => {
            // Arrange
            component.board = ['O', '1', 'X', 'X', 'O', 'X', '6', 'O', 'O'];

            // Act
            const win = component.winning(component.board, 'O');

            // Assert
            expect(win).toEqual(true);
        }));
    });

    describe('#minimax', () => {
        it(`should return 'result.index' equal to 4`, async(() => {
            // Arrange
            component.board = ['O', '1', 'X', 'X', '4', 'X', '6', 'O', 'O'];

            // Act
            const result = component.minimax(component.board, 'X', 0);

            // Assert
            expect(result.index).toEqual('4');
        }));
    });

    describe('#ca203_TicTacToeMinimaxAlgorithm', () => {
        it(`should return '000020000' with passed data '1 8 7'`, async(() => {
            // Arrange
            const testCase = '1 8 7';

            // Act
            const result = component.ca203_TicTacToeMinimaxAlgorithm(testCase);

            // Assert
            expect(result).toEqual('000020000');
        }));

        it(`should return '101000100' with passed data '7 1 5 3 4 8'`, async(() => {
            // Arrange
            const testCase = '7 1 5 3 4 8';

            // Act
            const result = component.ca203_TicTacToeMinimaxAlgorithm(testCase);

            // Assert
            expect(result).toEqual('101000100');
        }));

        it(`should return '000021202' with passed data '7 2 1 3'`, async(() => {
            // Arrange
            const testCase = '7 2 1 3';

            // Act
            const result = component.ca203_TicTacToeMinimaxAlgorithm(testCase);

            // Assert
            expect(result).toEqual('000021202');
        }));
    });
});
