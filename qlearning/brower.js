var _ = require('lodash');
var Game = require('./game.js');
var QPlayer = require('./qplayer.js');
var DumbPlayer = require('./dumbplayer.js');
var Trainer = require('./trainer.js');
var IaPlayer = require('./iaplayer.js');
window.TrainerFront = require('./trainerfront.js');

var iterations = 1000000;


window.start = function () {
    var qplayer = new QPlayer(0, 0.9);
    var dumbplayer = new DumbPlayer(1);
    // var Iaplayer = new IaPlayer(1);

    var trainer = new Trainer(qplayer, Iaplayer);
    var results = trainer.train({
        iterations: iterations,
        loggerIterations: 10000
    }, function(results) {
        console.log("Total turns:", qplayer.turns);
        console.log('Finished in :', results.elapsedTime);
    });
}

