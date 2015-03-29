var DumbPlayer = function(playerId) {
    this.playerId = playerId;
};

DumbPlayer.prototype.getTurn = function(state) {
    return state.getFreeMove();
}

DumbPlayer.prototype.getTurn = function(state) {
    return state.getFreeMove();
}

DumbPlayer.prototype.punish = function(ratio) {
    // console.log('Ha Ha');
}

module.exports = DumbPlayer;
