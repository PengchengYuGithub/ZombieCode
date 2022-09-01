const checkMod = require('./checkMod');

var stepTable = {
    'U': [0, -1],
    'D': [0, 1],
    'L': [-1, 0],
    'R': [1, 0]
}

module.exports = {
     move: function(position, dirction, gridSizeValue) {
       let s = stepTable[dirction];
       position[0] += s[0];
       position[1] += s[1];
       position[0] += checkMod.checkPos(position[0], gridSizeValue);
       position[1] += checkMod.checkPos(position[1], gridSizeValue);
    }
}