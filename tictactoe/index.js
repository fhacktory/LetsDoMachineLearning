var synaptic = require('synaptic');
var _ = require('lodash');

var ai = require('./simpleai.js');
var game = require('./game.js');
var network = require('./network.js');

var trainingSetLength = 2000,
    testingSetLength = 1000;

function showGame(game) {
    var cases = {
        0: ' ',
        1: 'x',
        2: 'o'
    }
    console.log(cases[game[0]], '|', cases[game[1]], '|', cases[game[2]]);
    console.log(' -  -  -');
    console.log(cases[game[3]], '|', cases[game[4]], '|', cases[game[5]]);
    console.log(' -  -  -');
    console.log(cases[game[6]], '|', cases[game[7]], '|', cases[game[8]]);
}

var trainingSet = game.generateGames(trainingSetLength);
var testingSet = game.generateGames(testingSetLength);
console.log("Generated %d training games and %d testing games", trainingSet.length, testingSet.length);

var perceptron = new synaptic.Architect.Perceptron(18, 15, 9);

function rawGame(game) {
    var raw = new Array(18 + 1).join('0').split('').map(Number);
    for (var i = 0; i < game.length; i++) {
        if (game[i] == 1) {
            raw[i] = 1;
        } else if (game[i] == 2) {
            raw[i + 9] = 1;
        };
    };
    return raw;
}

function generateData(set) {
    return _.map(set, function(game) {
        var data = {
            input: rawGame(game),
            output: [0,0,0,0,0,0,0,0,0]
        };
        data.output[ai(game)] = 1;
        return data;
    });
}
var trainingData = generateData(trainingSet);
var testingData = generateData(testingSet);

network.train(perceptron, trainingData, 0.1);

network.test(perceptron, testingData);
