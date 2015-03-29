var Game = require('./game.js');
var ai = require('./simpleai.js');
var _ = require('lodash');

var G = 0.9;

var scores = {};
var counts = [];
// 1 => the number of game to generate
var states = new Game(); 

function getMaxProba(probaObject) {
    var probaMax = 0;
    var posMax = [];
    var probaArray = _.values(probaObject);
    console.log('PROBA ARRAY = ' + probaArray);
    for (var i = 0; i < probaArray.length; i++) {
        if (probaArray[i] > probaMax) {
            posMax = [];
            probaMax = probaArray[i];
            posMax.push(i);
        } else if (probaArray[i] == probaMax) {
            posMax.push(i);
        }
    }
    return {'positions': posMax, 'max': probaMax}; 
}

function getProbaFromKey(scores, key) {
    if (scores[key] != undefined) {
        return scores[key];
    }
    return 0;
}

while (42) {
    var old_states = states;
    var i = Math.floor(Math.random() * states.board.length);
    var position = 0;
    if (i <= 0.10) {
        // new random move
        position = states.getFreeMove();
        console.log('position random = ' + position);
    } else {
        var moveArray = states.getFreeMoves();
        console.log("Free moves : Position = " +moveArray);
        var tmpArray = {};
        for (var i = 0; i < moveArray.length; i++) {
            tmpStates = states.createFromMove(moveArray[i], 1);
            var key = tmpStates.serialize();
            tmpArray[key] = getProbaFromKey(scores, key);
        }
        var res = getMaxProba(tmpArray);
        console.log("RES VALUE = " + res.positions);
        if (res.positions == 1) {
            // direct access to position
            position = res.positions[0];
        } else if (res.positions.length > 1) {
            position = Math.floor(Math.random() * res.positions.length);
        } else {
            position = Math.floor(Math.random() * moveArray.length);
        }
    }
    console.log("Player X : Position = " +position);
    console.log("Player X : Board Game = \n" +states.toString());
    // Move the player X
    states.makeMove(position, 1);
    console.log("Player X : Board Game = \n" +states.toString());
    var positionAi = states.getFreeMove();
    if (positionAi != -1) {
        console.log("Player O : Position = " +positionAi);
        console.log("Player O : Board Game = \n" +states.toString());
        // Move the player O
        states.makeMove(positionAi, 0);
        console.log("Player O : Board Game = \n" +states.toString());
    }
    
    var new_states = states;
    // @FlavienP could optimise 4 lines ! Awesome !
    // After three times 42 will become false - @FlavienP
    if (states.isFinished()) {
        var winner = states.getWinner();
        // We have won !
        console.log("WInner value : " ,winner);
        if (winner == 1) {
            scores.array[old_states] = 1;
            return ;
        } else if (winner == 0) /* We have lose */ {
            scores[old_states] = -1;
            return ;
        } else if (winner == -1) /* Draw !!! */ {
            scores[old_states] = -0.5;
            return ;
        }
    }
    scores[old_states] += (1 / (1 + counts[old_states])) * (G * scores[new_states] - scores[old_states]);
    counts[old_states]++;
}