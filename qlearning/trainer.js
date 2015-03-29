var Game = require('./game.js');

var Trainer = function(player1, player2) {
    this.players = [player1, player2];
}

Trainer.prototype.train = function(options) {
    var iterations = options.iterations || 1000;

    var results = [0, 0, 0]; // Player1Win, Player2Win, Tie

    var startTime = new Date();
    for (var i = 0; i < iterations; i++) {
        var game = this.runGame();
        var winnerId = game.getWinner();
        if (winnerId != -1) {
            this.players[1 - winnerId].punish(-1);
            results[winnerId]++;
        } else {
            this.players[0].punish(-0.5);
            this.players[1].punish(-0.5);
            results[2]++;
        }
    };

    return {
        results: results,
        elapsedTime: new Date() - startTime
    };
}

Trainer.prototype.runGame = function() {
    var game = new Game();
    var turn = 0;
    while (!game.isFinished()) {
        var player = this.players[turn % 2];
        game.makeMove(player.getTurn(game), player.playerId);
        turn++;
    }
    return game;
}

module.exports = Trainer;
