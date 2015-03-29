var fs = require('fs');
var _ = require('lodash');

function getMaxProba(probaObject) {
    var probaMax = -Infinity;
    var posMax = [];
    _.each(probaObject, function(value, index) {
        if (value > probaMax) {
            posMax = [index];
            probaMax = value;
        } else if (value == probaMax) {
            posMax.push(index);
        }
    })
    return {moves: posMax, max: probaMax};
}

var QPlayer = function(playerId, G) {
    this.scores = {};
    this.counts = {};
    this.playerId = playerId;
    this.lastStateSerialization = null;
    this.turns = 0;
    this.G = G || 0.9;
};

QPlayer.prototype.getProbaFromKey = function(key) {
    return this.scores[key] || 0;
}

QPlayer.prototype.getTurn = function(state) {
    var i = Math.random();
    var move;
    if (i <= 0.1) {
        move = state.getFreeMove();
    } else {
        var freeMoves = state.getFreeMoves();
        var movesProbas = [];
        _.each(freeMoves, function(move) {
            movesProbas[move] = this.getProbaFromKey(state.createFromMove(move, this.playerId).serialize());
        }.bind(this));
        var resultProbas = getMaxProba(movesProbas);
        if (resultProbas.moves.length == 1) {
            move = resultProbas.moves[0];
        } else {
            move = resultProbas.moves[Math.floor(Math.random() * resultProbas.moves.length)];
        }
    }
    var newState = state.createFromMove(move, this.playerId);
    var newStateSerialization = newState.serialize();
    if (newState.getWinner() == this.playerId)
        this.scores[newStateSerialization] = 1;
    var serialization = state.serialize();
    this.counts[serialization] = this.counts[serialization] ? this.counts[serialization] + 1 : 1;
    this.scores[serialization] = (this.scores[serialization] || 0) + (1 / this.counts[serialization]) * (this.G * (this.scores[newStateSerialization] || 0) - (this.scores[serialization] || 0));
    this.lastStateSerialization = newStateSerialization;
    this.turns++;
    return move;
}

QPlayer.prototype.punish = function(ratio) {
    this.scores[this.lastStateSerialization] = ratio;
    return this;
}

QPlayer.prototype.saveToFile = function(filepath) {
    fs.writeFileSync(filepath, JSON.stringify({
        scores: this.scores,
        counts: this.counts,
        turns: this.turns,
        G: this.G
    }));
    return this;
}

QPlayer.prototype.loadFromFile = function(filepath) {
    if (!fs.existsSync(filepath)) {
        return this;
    }
    var data = fs.readFileSync(filepath);
    var trainedData;
    try {
        trainedData = JSON.parse(data);
    } catch (e) {
        console.error("Impossible to get training file", e);
        process.exit(1);
    }
    this.scores = trainedData.scores;
    this.counts = trainedData.counts;
    this.turns = trainedData.turns;
    this.G = trainedData.G;
    return this;
}

module.exports = QPlayer;
