var IaPlayer = function(playerId) {
    this.playerId = playerId;
};

IaPlayer.prototype.convertBoard = function(state, c) {
	if (state.board[c] == -1) {
		return 0;
	} else if (state.board[c] == 0) {
		return 1;
	} else {
		return 2;
	}
}

IaPlayer.prototype.getTurn = function(state) {

    var a1 = this.convertBoard(state, 0)
        a2 = this.convertBoard(state, 1),
        a3 = this.convertBoard(state, 2),
        b1 = this.convertBoard(state, 3),
        b2 = this.convertBoard(state, 4),
        b3 = this.convertBoard(state, 5),
        c1 = this.convertBoard(state, 6),
        c2 = this.convertBoard(state, 7),
        c3 = this.convertBoard(state, 8);

        if (a1 == 0 && ((a3 == 1 && a2 == 1) || (c3 == 1 && b2 == 1) || (c1 == 1 && b1 == 1))) {
        return (0);
    } else {
        if (a2 == 0 && ((a1 == 1 && a3 == 1) || (c2 == 1 && b2 == 1))) {
            return (1);
        }
        else{
            if (a3 == 0 && ((a1 == 1 && a2 == 1) || (c1 == 1 && b2 == 1) || (c3 == 1 && b3 == 1))) {
                return (2);
            }
            else{
                if (c3 == 0 && ((c1 == 1 && c2 == 1) || (a1 == 1 && b2 == 1) || (a3 == 1 && b3 == 1))) {
                    return (8);
                }
                else{
                    if (c1 == 0 && ((c3 == 1 && c2 == 1) || (a3 == 1 && b2 == 1) || (a1 == 1 && b1 == 1))) {
                        return (6);
                    }
                    else{
                        if (c2 == 0 && ((c3 == 1 && c1 == 1) || (a2 == 1 && b2 == 1))) {
                            return (7);
                        }
                        else{
                            if (b1 == 0 && ((b3 == 1 && b2 == 1) || (a1 == 1 && c1 == 1))) {
                                return (3);
                            }
                            else{
                                if (b3 == 0 && ((a3 == 1 && c3 == 1) || (b2 == 1 && b1 == 1))) {
                                    return (5);
                                }
                                else{
                                    if (b2 == 0 && ((a3 == 1 && c1 == 1) || (c3 == 1 && a1 == 1) || (b3 == 1 && b1 == 1) || (c2 == 1 && a2 == 1))) {
                                        return (4);
                                    }
                                    else{
                                        if (b2 == 0) {
                                            return (4);

                                        }
                                        else{
                                            if (a1 == 0) {
                                                return (0);

                                            }
                                            else{
                                                if (c3 == 0) {
                                                    return (8);

                                                }
                                                else {
                                                    if (c2 == 0) {
                                                        return (7);

                                                    }
                                                    else{
                                                        if (b1 == 0) {
                                                            return (3);

                                                        }                                                     else{
                                                        if (b1 == 0) {
                                                            return (3);

                                                        }
                                                    	else {
                                                    	if (a2 == 0) {
                                                    		return (1);
                                                    	}
                                                     else {
                                                    	if (a3 == 0) {
                                                    		return (2);
                                                    	}
                                                     else {
                                                    	if (b3 == 0) {
                                                    		return (5);
                                                    	}
                                                     else {
                                                    	if (c1 == 0) {
                                                    		return (6);
                                                    	}
                                                    }
                                                }
                                            }
                                        }
                                    }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

}

IaPlayer.prototype.punish = function(ratio) {
    // console.log('Ha Ha');
}

module.exports = IaPlayer;
