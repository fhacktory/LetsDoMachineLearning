exports.generateGames = function(gamenb) {
    var games = [];
    for (var i = 0; i < gamenb; i++) {
        games.push(generateGame());
    };
    return games;
}

function generateGame() {
    var game = [0,0,0,0,0,0,0,0,0];

    var turns = Math.floor(Math.random() * 7) + 1;
    for (var i = 0; i < turns; i++) {
        game[getEmptyCase(game)] = i % 2 ? 1 : 2;
    };
    return checkWin(game) == false ? game : generateGame();
}

function checkWin(table) {

    var a1 = table[0],
        a2 = table[1],
        a3 = table[2],
        b1 = table[3],
        b2 = table[4],
        b3 = table[5],
        c1 = table[6],
        c2 = table[7],
        c3 = table[8];

    if ((a1 == a2 && a1 == a3 && (a1 == 1)) ||
        (b1 == b2 && b1 == b3 && (b1 == 1)) ||
        (c1 == c2 && c1 == c3 && (c1 == 1)) ||
        (a1 == b1 && a1 == c1 && (a1 == 1)) ||
        (a2 == b2 && a2 == c2 && (a2 == 1)) ||
        (a3 == b3 && a3 == c3 && (a3 == 1)) ||
        (a1 == b2 && a1 == c3 && (a1 == 1)) ||
        (a3 == b2 && a3 == c1 && (a3 == 1))
        ) {
        return (1);
    } else {
        if ((a1 == a2 && a1 == a3 && (a1 == 2)) ||
            (b1 == b2 && b1 == b3 && (b1 == 2)) ||
            (c1 == c2 && c1 == c3 && (c1 == 2)) ||
            (a1 == b1 && a1 == c1 && (a1 == 2)) ||
            (a2 == b2 && a2 == c2 && (a2 == 2)) ||
            (a3 == b3 && a3 == c3 && (a3 == 2)) ||
            (a1 == b2 && a1 == c3 && (a1 == 2)) ||
            (a3 == b2 && a3 == c1 && (a3 == 2))
            ) {
                return (2);
        } else {
            if (((a1 == 1) || (a1 == 2)) && ((b1 == 1) || (b1 == 2)) && ((c1 == 1) || (c1 == 2)) && ((a2 == 1) || (a2 == 2)) && ((b2 == 1) || (b2 == 2)) && ((c2 == 1) || (c2 == 2)) && ((a3 == 1) || (a3 == 2)) && ((b3 == 1) || (b3 == 2)) && ((c3 == 1) || (c3 == 2))) {
                return (0);
            }
        }
    }
    return (false);
};

function getEmptyCase(game) {
    var casePosition = Math.floor(Math.random() * 8) + 1;
    return game[casePosition] == 0 ? casePosition : getEmptyCase(game);
}
