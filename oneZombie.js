const moveMod = require('./moveMod');
const meetMod = require('./meetMod');

module.exports = {
    oneZombieLoop: function(gridSizeValue, commandsValueInput, zombieCurrentPos, creaturesList, zombieList, zombieIndex) {
        meetMod.meet(zombieCurrentPos, creaturesList, zombieList);
        for (var j = 0; j < commandsValueInput.length; j++) {
            moveMod.move(zombieCurrentPos, commandsValueInput[j], gridSizeValue);
            meetMod.meet(zombieCurrentPos, creaturesList, zombieList);
        }
        zombieList[zombieIndex] = zombieCurrentPos;
        z = zombieIndex + 1;
        return z;
   }
}