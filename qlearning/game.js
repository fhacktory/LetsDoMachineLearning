var _ = require('lodash');

var Game = function(board) {
    this.boardSize = 3;
    this.boardLength = this.boardSize * this.boardSize;
    if (board) {
        this.board = _.clone(board);
    } else {
        this.board = [];
        for (var i = 0; i < this.boardLength; i++) {
            this.board = -1;
        };
    }
    return this;
}

Game.prototype.makeMove = function(move, player) {
    if (!this.isPossibleMove(move))
        throw new Error("You cannot do this move");
    this.board[move] = player;
}

Game.prototype.isPossibleMove = function(move) {
    return this.board[move] == -1;
};

Game.prototype.getFreeMoves = function() {
    var freeMoves = [];
    for (var i = 0; i < this.boardLength; i++) {
        if (this.board[i] == -1)
            freeMoves.push(i);
    };
    return freeMoves;
}

Game.prototype.getWinner = function() {
    var winnerMoves = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horinzontal lines
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical lines
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    function checkWinnerMove(board, winnerMove) {
        if (board[winnerMove[0]] == board[winnerMove[1]] && board[winnerMove[1]] == board[winnerMove[2]])
            return winnerMove[0];
        return -1;
    }
    for (var i = 0; i < winnerMoves.length; i++) {
        var winner = checkWinnerMove(this.board, winnerMoves[i]);
        if (winner != -1)
            return winner;
    };
    return -1;
}

Game.prototype.serialize = function() {
    return _(this.board).map(function(case) {
        return case + 1;
    }).join('');
}

Game.prototype.createFromMove = function(move, player) {
    var newGame = new Game(this.board);
    newGame.makeMove(move, player);
    return newGame;
}

Game.prototype.toString = function() {
    function caseToChar(val) {
        if (val == -1)
            return ' ';
        if (val == 0)
            return 'O';
        if (val == 1)
            return 'X';
    }
    return [
        caseToChar(this.board[0]) + " " + caseToChar(this.board[1]) + " " + caseToChar(this.board[2]),
        caseToChar(this.board[3]) + " " + caseToChar(this.board[4]) + " " + caseToChar(this.board[5]),
        caseToChar(this.board[6]) + " " + caseToChar(this.board[7]) + " " + caseToChar(this.board[8])
    ].join('\n');
}

module.exports = Game;
