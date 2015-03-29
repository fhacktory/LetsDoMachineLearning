var _ = require('lodash');
var Game = require('./game.js');
var QPlayer = require('./qplayer.js');
var IaPlayer = require('./iaplayer.js');

var game = null;
var turn = 0;

var TrainerFront = function(mode, scoree) {
    if (mode == 0) {
        var player1 = new QPlayer(0, 0.9).loadFromString(scoree);
        var player2 = new IaPlayer(1);
        //var player2 = new QPlayer(1, 0.9).loadFromString(scoree);
        //var player2 = new IaPlayer(1);
    }
    this.players = [player1, player2];
    this.players = _.shuffle(this.players);
    game = new Game();
    this.play();
    turn = 0;
}

TrainerFront.prototype.train = function(options, callback) {
    var iterations = options.iterations || 1000;
    var loggerIterations = options.loggerIterations || iterations / 20;

    var results = [0, 0, 0]; // Player1Win, Player2Win, Tie

    console.log("  total  |   won    |  lost    |  draws | % won  | % draws | % fail")

    var trainingSet = function trainAll(iteration, callback) {
        for (var i = 0; i < loggerIterations && i < iterations; i++) {
            var game = this.runGame();
            var winnerId = game.getWinner();
            if (winnerId !== -1) {
                this.players[1 - winnerId].punish(-1);
                results[winnerId]++;
            } else {
                this.players[0].punish(-0.5);
                this.players[1].punish(-0.5);
                results[2]++;
            }
        };
        logCurrentState((iteration) * loggerIterations + i, results);
        if ((iteration + 1) * loggerIterations >= iterations)
            return callback();
        setTimeout(trainingSet.bind(this, iteration + 1, callback));
    }.bind(this);

    var startTime = new Date();

    trainingSet(0, function() {
        callback({
            results: results,
            elapsedTime: new Date() - startTime
        });
    });
}

function i2s(int, length) {
    return String("        " + int).slice(-length);
}

function logCurrentState(i, results) {
    var percentWon = (results[0] / (i - 1) * 100).toPrecision(4);
    var percentDraws = (results[2] / (i - 1) * 100).toPrecision(4);
    var percentFail = (results[1] / (i - 1) * 100).toPrecision(4);
    console.log(i2s(i, 8) + " | " + i2s(results[0], 8) + " | " + i2s(results[1], 8) + " | " + i2s(results[2], 6) + " | " + percentWon + "% | " + percentDraws + " % | " + percentFail + " %");
}

TrainerFront.prototype.play = function (x, y) {
    var results = [0, 0, 0]; // Player1Win, Player2Win, Tie
    if (!game.isFinished()) {
        if (x == -1) {
            var player = this.players[turn % 2];
            var move = player.getTurn(game);
            game.makeMove(move, player.playerId);
            turn++;
            return {"turn": turn, "player": player.playerId, "x":(move % 3) + 1, "y": Math.floor(move / 3) + 1};
        }
    } else {
        var winnerId = game.getWinner();
            if (winnerId !== -1) {
                this.players[1 - winnerId].punish(-1);
                results[winnerId]++;
            } else {
                results[2]++;
            }
    }
    return ;
}

TrainerFront.prototype.runGame = function(turn) {
    return game;
}

module.exports = TrainerFront;
