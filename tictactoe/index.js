var game = require('./game.js');
var ai = require('./simpleai.js');

var G = 0.9;

var scores = [];
var counts = [];
// 1 => the number of game to generate
var start_game = game.newGame();
console.log('start_game = '+start_game);

var states = start_game;

function getMaxProba(probaArray) {
    var probaMax = 0;
    var posMax = [];
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

while (42) {
    var old_states = states;
    var i = Math.random();
    var position = 0;
    if (i <= 0.10) {
        // new random move
        position = game.emptyCase(states);
    } else {
        var possibilitiesArray = game.getAllPossibilities(states);
        var tmpArrray = [];
        for (var i = 0; i < possibilitiesArray.length; i++) {
            if (possibilitiesArray[i].indexOf(scores)) {
                // Calcul proba
                tmpArrray[possibilitiesArray[i]] = scores[i];
            }
        }
        var res = getMaxProba(tmpArrray);
        if (res.positions > 1) {
            // direct access to position
            position = res.positions[0];
        } else if (res.positions.length > 0) {
            position = Math.random() % res.positions.length;            
        } else {
            position = Math.random() % possibilitiesArray.length;
        }
    }
    // Move the player X
    states[position] = 1;
    // Move the player O
    states[ai(game)] = 2;
    var new_states = states;
    var winner = game.checkWin(states);
    // @FlavienP could optimise 4 lines ! Awesome !
    // We have won !
    if (winner == 1) {
        scores[old_states] = 1;
        return ;
    } else if (winner == -1) /* We have lose */ {
        scores[old_states] = -1;
        return ;
    } else if (winner == 0) /* Draw !!! */ {
        scores[old_states] = -0.5;
        return ;
    }
    scores[old_states] += (1 / (1 + counts[old_states])) * (G * scores[new_states] - scores[old_states]);
    counts[old_states]++;
}