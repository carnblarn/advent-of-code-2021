import { getRawInput } from './helpers';

const [numbersInput, ...boardsInput] = getRawInput('day4').split('\n\n');
const numbers = numbersInput.split(',');

class Board {
    board: string[][];
    hasWon = false;

    constructor(board: string) {
        // the filtering is done because the input has single digits padded with a left space
        this.board = board
            .split('\n')
            .map((item) => item.split(' ').filter((item) => item !== ''));
    }

    markSquare(num: string) {
        this.board.forEach((row, i) => {
            row.forEach((item, j) => {
                if (item === num) {
                    this.board[i][j] = 'X';
                }
            });
        });
    }

    isWinningBoard() {
        // finding a winning row
        for (let i = 0; i < this.board.length; i++) {
            const row = this.board[i];
            let isWinningRow = true;
            for (let j = 0; j < row.length; j++) {
                const marked = row[j] === 'X';
                isWinningRow = marked && isWinningRow;
            }
            if (isWinningRow) {
                return true;
            }
        }

        // finding a winning column
        for (let i = 0; i < this.board.length; i++) {
            let isWinningColumn = true;
            for (let j = 0; j < this.board.length; j++) {
                const marked = this.board[j][i] === 'X';
                isWinningColumn = marked && isWinningColumn;
            }
            if (isWinningColumn) {
                return true;
            }
        }
    }

    // find the sum of all unmarked numbers
    getBoardScore() {
        let sum = 0;

        for (let i = 0; i < this.board.length; i++) {
            const row = this.board[i];
            for (let j = 0; j < row.length; j++) {
                if (row[j] !== 'X') {
                    sum += parseInt(row[j]);
                }
            }
        }
        return sum;
    }

    markBoardAsWon() {
        this.hasWon = true;
    }
}

const boards = boardsInput.map((boardStr) => new Board(boardStr));

let hasFoundBoard = false;
let numRemainingBoards = boards.length;

numbers.forEach((num) => {
    boards.forEach((board) => {
        board.markSquare(num);
        const isWinningBoard = board.isWinningBoard();
        if (isWinningBoard && !hasFoundBoard) {
            // part 1

            console.log('Part 1:', board.getBoardScore() * parseInt(num));
            hasFoundBoard = true;
        }

        if (isWinningBoard && !board.hasWon) {
            console.log(numRemainingBoards);

            if (numRemainingBoards === 1) {
                // part 2
                console.log('Part 2:', board.getBoardScore() * parseInt(num));
            }

            board.markBoardAsWon();
            numRemainingBoards -= 1;
        }
    });
});
