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

var QPlayer = function(playerId) {
    this.scores = {};
    this.counts = {};
    this.playerId = playerId;
    this.lastStateSerialization = null;
    this.G = 0.9;
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
        this.scores[newState.serialize()] = 1;
    var serialization = state.serialize();
    this.lastStateSerialization = serialization;
    this.counts[serialization]++;
    this.scores[serialization] += (1 / this.counts[serialization]) * (this.G * this.scores[newStateSerialization] - this.scores[serialization]);
    return move;
}

QPlayer.prototype.punish = function(ratio) {
    this.scores[this.lastStateSerialization] = ratio;
}

module.exports = QPlayer;
