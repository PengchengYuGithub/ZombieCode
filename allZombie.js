const oneZombieMod = require('./oneZombie');

module.exports = {
    allZombieLoop: function(gridSizeValueInput, zombiePositionInput, creaturesPositionInput, commandsValueInput, zombieCurrentPos, creaturesList, zombieList, zombieIndex, outputInfo) {
        zombieList = zombiePositionInput.slice();
        creaturesList = creaturesPositionInput.slice();
        zombieCurrentPos[0] = zombieList[0][0];
        zombieCurrentPos[1] = zombieList[0][1];
        while (zombieIndex < zombieList.length) {
            zombieCurrentPos = zombieList[zombieIndex];
            zombieIndex = oneZombieMod.oneZombieLoop(gridSizeValueInput, commandsValueInput, zombieCurrentPos, creaturesList, zombieList, zombieIndex);
        }
        outputInfo.zombiePosition = zombieList;
        outputInfo.creaturesPosition = creaturesList;
   }
}