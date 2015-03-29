var _ = require('lodash');

// Create a new game with a new board or generate one
var Game = function(board) {
    this.boardSize = 3;
    this.boardLength = this.boardSize * this.boardSize;
    if (board) {
        this.board = _.clone(board);
    } else {
        this.board = [];
        for (var i = 0; i < this.boardLength; i++) {
            this.board[i] = -1;
        };
    }
    return this;
}

// Apply the move to the board
Game.prototype.makeMove = function(move, player) {
    if (!this.isPossibleMove(move))
        throw new Error("You cannot do this move");
    if (player !== 0 && player !== 1)
        throw new Error("Wrong player");
    this.board[move] = player;
    return this;
}

Game.prototype.isPossibleMove = function(move) {
    return this.board[move] == -1;
};

// Return all the free moves, the moves are the indexes of the case to set
Game.prototype.getFreeMoves = function() {
    var freeMoves = [];
    for (var i = 0; i < this.boardLength; i++) {
        if (this.board[i] == -1)
            freeMoves.push(i);
    };
    return freeMoves;
}

Game.prototype.getFreeMove = function() {
    var free = this.getFreeMoves();
    if (free.length > 0) {
        return free[Math.floor(Math.random() * free.length)];        
    }
    return -1;
}

var winnerMoves = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horinzontal lines
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical lines
    [0, 4, 8], [2, 4, 6] // Diagonals
];
function checkWinnerMove(board, winnerMove) { // If the 3 cases are the same, return the players who won, else return -1
    if (board[winnerMove[0]] == board[winnerMove[1]] && board[winnerMove[1]] == board[winnerMove[2]])
        return winnerMove[0];
    return -1;
}

Game.prototype.isFinished = function() {
    for (var i = 0; i < winnerMoves.length; i++) {
        var winner = checkWinnerMove(this.board, winnerMoves[i]);
        if (winner != -1)
            return true;
    };
    return false;
}

// Return -1 for a tie, 0 if the player 0 won and 1 if the player 1 won
Game.prototype.getWinner = function() {
    for (var i = 0; i < winnerMoves.length; i++) {
        var winner = checkWinnerMove(this.board, winnerMoves[i]);
        if (winner != -1)
            return winner;
    };
    return -1;
}

// Game to string for internal purposes
Game.prototype.serialize = function() {
    return _(this.board).map(function(caseVal) {
        return caseVal + 1;
    }).join('');
}

// Create a new game and apply the move to it
Game.prototype.createFromMove = function(move, player) {
    var newGame = new Game(this.board);
    newGame.makeMove(move, player);
    return newGame;
}

// For debuging purposes
Game.prototype.toString = function() {
    function caseToChar(val) {
        if (val == -1)
            return '   ';
        if (val == 0)
            return ' O ';
        if (val == 1)
            return ' X ';
    }
    return [
        caseToChar(this.board[0]) + "|" + caseToChar(this.board[1]) + "|" + caseToChar(this.board[2]),
        "-----------",
        caseToChar(this.board[3]) + "|" + caseToChar(this.board[4]) + "|" + caseToChar(this.board[5]),
        "-----------",
        caseToChar(this.board[6]) + "|" + caseToChar(this.board[7]) + "|" + caseToChar(this.board[8])
    ].join('\n');
}

module.exports = Game;
