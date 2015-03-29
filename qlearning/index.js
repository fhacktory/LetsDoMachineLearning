var _ = require('lodash');
var Game = require('./game.js');
var QPlayer = require('./qplayer.js');
var DumbPlayer = require('./dumbplayer.js');
var Trainer = require('./trainer.js');
var IaPlayer = require('./iaplayer.js');
var iterations = 10000;

var qplayer = new QPlayer(0, 0.9).loadFromFile("trained.qp");
// var dumbplayer = new DumbPlayer(1);
var Iaplayer = new IaPlayer(1);

process.on('SIGINT', function() {
    qplayer.saveToFile("trained.qp");
    console.log('Saved to file, exiting...');
    process.exit(0);
});

var trainer = new Trainer(qplayer, Iaplayer);
var results = trainer.train({iterations: iterations}, function(results) {
    console.log("Total turns:", qplayer.turns);
    qplayer.saveToFile("trained.qp");
    console.log('Saved to file');
});

