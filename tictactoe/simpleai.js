// VARIABLES

// 0 is an empty case
// 1 is the opponent
// 2 is its own move

var getMove = function (table) {

    var a1 = table[0],
        a2 = table[1],
        a3 = table[2],
        b1 = table[3],
        b2 = table[4],
        b3 = table[5],
        c1 = table[6],
        c2 = table[7],
        c3 = table[8];

    if (a1 == 0 && ((a3 == 1 && a2 == 1) || (c3 == 1 && b2 == 1) || (c1 == 1 && b1 == 1))) {
        return (0);
    } else {
        if (a2 == 0 && ((a1 == 1 && a3 == 1) || (c2 == 1 && b2 == 1))) {
            return (1);
        }
        else{
            if (a3 == 0 && ((a1 == 1 && a2 == 1) || (c1 == 1 && b2 == 1) || (c3 == 1 && b3 == 1))) {
                return (3);
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
};




module.exports = getMove;
