var _ = require('lodash');
var Game = require('./game.js');
var QPlayer = require('./qplayer.js');
var DumbPlayer = require('./dumbplayer.js');
var Trainer = require('./trainer.js');

var G = 0.9;

var qplayer = new QPlayer(0);
var dumbplayer = new DumbPlayer(1);

var trainer = new Trainer(qplayer, dumbplayer);
var results = trainer.train({iterations: 40000});

console.log("Results:", results);
