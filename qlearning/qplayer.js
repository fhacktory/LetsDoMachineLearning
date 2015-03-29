var fs = require('fs');
var _ = require('lodash');


var QPlayer = function(playerId, G) {
    this.scores = new Float32Array(20000);
    this.counts = new Float32Array(20000);
    this.playerId = playerId;
    this.lastStateSerialization = null;
    this.turns = 0;
    this.learningActivated = true;
    this.G = G || 0.9;
};

QPlayer.prototype.getProba = function(freeMoves, state) {
    var probaExtreme = this.playerId === 0 ? -Infinity : Infinity;
    var posExtreme = [];
    for (var i = freeMoves.length - 1; i >= 0; i--) {
        var proba = this.getProbaFromKey(state.createFromMove(freeMoves[i], this.playerId).serialize());
        if ((this.playerId === 0) ? (proba > probaExtreme) : (proba < probaExtreme)) {
            probaExtreme = proba;
            posExtreme = [freeMoves[i]];
        } else if (proba === probaExtreme) {
            posExtreme.push(freeMoves[i]);
        }
    };
    return posExtreme;
}

QPlayer.prototype.getProbaFromKey = function(key) {
    return this.scores[key] || 0;
}

QPlayer.prototype.setLearningState = function(learningState) {
    this.learningActivated = learningState;
    return this;
}

QPlayer.prototype.getTurn = function(state) {
    var i = Math.random();
    var move;
    if (i <= 0.1 && this.learningActivated) {
        move = state.getFreeMove();
    } else {
        var freeMoves = state.getFreeMoves();
        var resultProbas = this.getProba(freeMoves, state);
        if (resultProbas.length === 1) {
            move = resultProbas[0];
        } else {
            move = resultProbas[Math.floor(Math.random() * resultProbas.length)];
        }
    }
    if (this.learningActivated) {
        var newState = state.createFromMove(move, this.playerId);
        var newStateSerialization = newState.serialize();
        if (newState.getWinner() === this.playerId) {
            this.scores[newStateSerialization] = 1;
        }
        var serialization = state.serialize();
        this.counts[serialization] = this.counts[serialization] ? this.counts[serialization] + 1 : 1;
        this.scores[serialization] = (this.scores[serialization] || 0) + (1 / (1 + this.counts[serialization])) * (this.G * (this.scores[newStateSerialization] || 0) - (this.scores[serialization] || 0));
        this.lastStateSerialization = newStateSerialization;
        this.turns++;
    }
    return move;
}

QPlayer.prototype.punish = function(ratio) {
    if (this.learningActivated) {
        this.scores[this.lastStateSerialization] = ratio;
    }
    return this;
}

QPlayer.prototype.saveToFile = function(filepath) {
    if (!fs) {
        return this;
    }
    fs.writeFileSync(filepath, JSON.stringify({
        scores: Array.prototype.slice.call(this.scores),
        counts: Array.prototype.slice.call(this.counts),
        turns: this.turns,
        G: this.G
    }));
    return this;
}

QPlayer.prototype.loadFromFile = function(filepath) {
    if (!fs || !fs.existsSync(filepath)) {
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
    this.scores = new Float32Array(trainedData.scores);
    this.counts = new Float32Array(trainedData.counts);
    this.turns = trainedData.turns;
    this.G = trainedData.G;
    return this;
}

module.exports = QPlayer;
