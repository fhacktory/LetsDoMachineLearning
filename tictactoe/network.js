var synaptic = require('synaptic');
var _ = require('lodash');

var Trainer = synaptic.Trainer;

module.exports.train = function(network, set, rate) {
  var length = set.length;

  console.log('layers:');
  console.log('  input:', network.layers.input.size, 'neurons.');
  console.log('  hidden:', network.layers.hidden[0].size, 'neurons.');
  console.log('  output:', network.layers.output.size, 'neurons.');
  console.log('learning rate:', rate, '\n');
  console.log('training with', length, 'inputs ...');

  var trainer = new Trainer(network);

  var trainingOutput = trainer.train(set, {
    rate: rate,
    iterations: 20000,
    error: .005,
    shuffle: true,
    log: 1000,
    cost: Trainer.cost.CROSS_ENTROPY
  });

  console.log("Done in %d ms", trainingOutput.time, trainingOutput);
};

module.exports.test = function(network, set) {
  var object,
      prediction,
      result,
      length = set.length,
      success = 0,
      count = 0;

  // test on random inputs
  console.log('testing on', length, 'inputs ...');
  while(set.length) {
    object = set.pop();

    prediction = network
      .activate(object.input)
      .map(function(bit) {
        return bit > 0.5 ? 1 : 0;
      });

    // convert to char codes
    if(_.isEqual(prediction, object.output))
      success++;

    if(count % Math.round(length / 10) === 0) {
      console.log(prediction, object.output);
      console.log('progress:', Math.round(100 * (count / length)), '%');
    }

    count++;
  }

  console.log('... done', '\n');
  console.log('success rate:', (100 * (success / length)), '%');
};
