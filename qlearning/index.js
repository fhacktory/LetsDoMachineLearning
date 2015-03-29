var _ = require('lodash');
var Game = require('./game.js');
var QPlayer = require('./qplayer.js');
var DumbPlayer = require('./dumbplayer.js');
var Trainer = require('./trainer.js');
var IaPlayer = require('./iaplayer.js');
var tmppp = require('./trainerfront.js');

var iterations = 1000000;

var qplayer = new QPlayer(0, 0.9).loadFromFile("trained.qp");
// var iaplayer = new DumbPlayer(1);
var iaplayer = new IaPlayer(1);
// var iaplayer = new QPlayer(1, 0.9);

process.on('SIGINT', function() {
    qplayer.saveToFile("trained.qp");
    console.log('Saved to file, exiting...');
    process.exit(0);
});

var trainer = new Trainer(qplayer, iaplayer);
var results = trainer.train({
    iterations: iterations,
    loggerIterations: 10000
}, function(results) {
    console.log("Total turns:", qplayer.turns);
    qplayer.saveToFile("trained.qp");
    console.log('Saved to file');
    console.log('Finished in :', results.elapsedTime);
});

