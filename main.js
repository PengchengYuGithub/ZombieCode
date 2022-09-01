// Code about default settings

const imdata = require('./input.json');
console.log("\nINPUT");
console.log(imdata);

var inputInfo = {
    gridSizeValue: 4,
    zombiePosition: [],
    creaturesPosition: [],
    commandsValue: ''
}
var outputInfo = {
    zombiePosition: [],
    creaturesPosition: [],
}

var gridSizeValueInput = imdata.gridSize;
var zombiePositionInput = [];
var creaturesPositionInput = [];
var commandsValueInput = imdata.commands;

for(let i = 0; i < imdata.zombie.length; i++){
    zombiePositionInput[i] = [imdata.zombie[i].x, imdata.zombie[i].y];
}
for(let i = 0; i < imdata.creatures.length; i++){
    creaturesPositionInput[i] = [imdata.creatures[i].x, imdata.creatures[i].y];
}

var zombieList = zombiePositionInput.slice();
var zombieIndex = 0;
var zombieCurrentPos  = [];
var creaturesList = creaturesPositionInput;

const allZombieMod = require('./allZombie');
allZombieMod.allZombieLoop(gridSizeValueInput, zombiePositionInput, creaturesPositionInput, commandsValueInput, zombieCurrentPos, creaturesList, zombieList, zombieIndex, outputInfo);
console.log("\nOUTPUT");
console.log(outputInfo);