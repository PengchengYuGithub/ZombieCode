// Code about default settings
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
var gridSizeValueInput = null;
var zombiePositionInput = [];
var creaturesPositionInput = [];
var commandsValueInput = '';
// gridSizeValueInput = 4;
// zombiePositionInput = [[1, 3]];
// creaturesPositionInput = [[0, 1], [1, 2], [1, 1]];
// commandsValueInput = 'RDRU';

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question('Type in gridSize: ', function (gridSizeValueDef) {
    rl.question('Type in zombiePosition (in the form of x1,y1,x2,y2...): ', function (zombiePositionDef) {
        rl.question('Type in creaturesPosition (in the form of x1,y1,x2,y2...): ', function (creaturesPositionDef) {
            rl.question('Type in commands: ', function (commandsValueDef) {
                gridSizeValueInput = gridSizeValueDef * 1;
                var zombiePosNum = zombiePositionDef.split(',').map(Number);
                for(let i = 0; i < zombiePosNum.length/2; i++){
                    zombiePositionInput[i] = [zombiePosNum[i*2], zombiePosNum[i*2+1]];
                }
                var creaturesPosNum = creaturesPositionDef.split(',').map(Number);
                for(let i = 0; i < creaturesPosNum.length/2; i++){
                    creaturesPositionInput[i] = [creaturesPosNum[i*2], creaturesPosNum[i*2+1]];
                }
                commandsValueInput = commandsValueDef;
                inputInfo.gridSizeValue = gridSizeValueInput;
                inputInfo.zombiePosition = zombiePositionInput.slice();
                inputInfo.creaturesPosition = creaturesPositionInput.slice();
                inputInfo.commandsValue = commandsValueInput.slice();
                console.log("\nINPUT");
                console.log("gridSize:");
                console.log(inputInfo.gridSizeValue);
                console.log("zombies (in form of [x, y] pairs):");
                console.log(inputInfo.zombiePosition);
                console.log("creatures(in form of [x, y] pairs):");
                console.log(inputInfo.creaturesPosition);
                console.log("commands:");
                console.log(inputInfo.commandsValue);
                rl.close();
            });
        });
    });
});
rl.on('close', function () {
    allZombieLoopFunction();
    console.log("\nOUTPUT");
    console.log("zombies (in form of [x, y] pairs):");
    console.log(outputInfo.zombiePosition);
    console.log("creatures(in form of [x, y] pairs):");
    console.log(outputInfo.creaturesPosition);
    process.exit(0);
});

// Code about JS calculation
var zombieList = inputInfo.zombiePosition.slice();
var zombieIndex = 0;
var zombieCurrentPos  = [];
var creaturesList = inputInfo.creaturesPosition;
function moveFunction(position, dirction) {
    if (dirction == 'U') {
        position[1]--;
    }
    if (dirction == 'D') {
        position[1]++;
    }
    if (dirction == 'L') {
        position[0]--;
    }
    if (dirction == 'R') {
        position[0]++;
    }
    if (position[0] === -1) {
        position[0] = inputInfo.gridSizeValue - 1;
    }
    if (position[1] === -1) {
        position[1] = inputInfo.gridSizeValue - 1;
    }
    if (position[0] === inputInfo.gridSizeValue) {
        position[0] = 0;
    }
    if (position[1] === inputInfo.gridSizeValue) {
        position[1] = 0;
    }
}
function ifMeetFunction(zombiePos, creaturesPos) {
    var creaPos = creaturesPos.slice();
    for (var j = 0; j < creaPos.length; j++) {
        if (creaPos[j][0] === zombiePos[0] && creaPos[j][1] === zombiePos[1]) {
            zombieList.push([zombiePos[0], zombiePos[1]]);
            creaturesList.splice(j, 1);
        }
    }
}
function oneZombieLoopFunction() {
    ifMeetFunction(zombieCurrentPos,creaturesList);
    for (var j = 0; j < inputInfo.commandsValue.length; j++) {
        moveFunction(zombieCurrentPos, inputInfo.commandsValue[j]);
        ifMeetFunction(zombieCurrentPos,creaturesList);
    }
    zombieList[zombieIndex] = zombieCurrentPos;
    zombieIndex++;
}
function allZombieLoopFunction() {
    inputInfo.gridSizeValue = gridSizeValueInput;
    inputInfo.zombiePosition = zombiePositionInput.slice();
    inputInfo.creaturesPosition = creaturesPositionInput.slice();
    inputInfo.commandsValue = commandsValueInput.slice();
    zombieList = inputInfo.zombiePosition.slice();
    creaturesList = inputInfo.creaturesPosition;
    zombieCurrentPos[0] = zombieList[0][0];
    zombieCurrentPos[1] = zombieList[0][1];
    while (zombieIndex < zombieList.length) {
        zombieCurrentPos = zombieList[zombieIndex];
        oneZombieLoopFunction();
    }
    outputInfo.zombiePosition = zombieList;
    outputInfo.creaturesPosition = creaturesList;
}

// Code about HTML UI, not completed!!!
function posIntFunction(testNum) {
    if (testNum % 1 === 0 && testNum > 0) {
        return true;
    }else{
        return false;
    }
}
function effPosFunction(testNum) {
    if (testNum % 1 === 0 && testNum >= 0 && testNum < inputInfo.gridSizeValue) {
        return true;
    }else{
        return false;
    }
}
function effComFunction(testNum) {
    if (testNum  == 'U' || testNum == 'D' || testNum == 'L' || testNum == 'R' ) {
        return true;
    }else{
        return false;
    }
}
function gridSizeFunction() {
    var gridSizeVal = document.getElementById("gridSizeInput").value;
    if (posIntFunction(gridSizeVal)) {
        inputInfo.gridSizeValue = gridSizeVal;
        document.getElementById("gridSizeDisplay").innerHTML = "gridSize:" + inputInfo.gridSizeValue;
    }else{
        document.getElementById("gridSizeDisplay").innerHTML = "gridSize must be positive integer!";
    }
}
function zombiePositionFunction() {
    var zombiePosX = document.getElementById("zombiePosXInput").value;
    var zombiePosY = document.getElementById("zombiePosYInput").value;
    if (effPosFunction(zombiePosX) && effPosFunction(zombiePosY)) {
        inputInfo.zombiePosition.push([zombiePosX, zombiePosY]);
        document.getElementById("zombiePositionDisplay").innerHTML = "zombie:" + inputInfo.zombiePosition;
    }else{
        document.getElementById("zombiePositionDisplay").innerHTML = "zombie position must be effective!";
    }
}
function creaturesPositionFunction() {
    var creaturesPosX = document.getElementById("creaturesPosXInput").value;
    var creaturesPosY = document.getElementById("creaturesPosYInput").value;
    if (effPosFunction(creaturesPosX) && effPosFunction(creaturesPosY)) {
        inputInfo.creaturesPosition.push([creaturesPosX, creaturesPosY]);
        document.getElementById("creaturesPositionDisplay").innerHTML = "creatures:" + inputInfo.creaturesPosition;
    }else{
        document.getElementById("creaturesPositionDisplay").innerHTML = "creatures position must be effective!";
    }
}
function commandsFunction() {
    var commandsVal = document.getElementById("commandsInput").value;
    for (var i = 0; i < commandsVal.length; i++) {
        if (effComFunction(commandsVal.charAt(i)) === false) {
            document.getElementById("commandsDisplay").innerHTML = "commands must be effective!";
            return;
        }
    }
    inputInfo.commandsValue = commandsVal;
    document.getElementById("commandsDisplay").innerHTML = "commands:" + inputInfo.commandsValue;
}
function inDisplayFun() {
    let inText = "";
    inText += "INOUT" + "<br>";
    inText += "gridSize: " + inputInfo.gridSizeValue + "<br>";
    inText += "zombie: " + "<br>";
    for(let i = 0; i < inputInfo.zombiePosition.length; i++){
        inText += inputInfo.zombiePosition[i] + "<br>";
    }
    inText += "creatures: " + "<br>";
    for(let i = 0; i < inputInfo.creaturesPosition.length; i++){
        inText += inputInfo.creaturesPosition[i] + "<br>";
    }
    inText += "gridSize: " + inputInfo.commandsValue + "<br>";
    document.getElementById("inputDisplay").innerHTML = inText;
}
function outDisplayFun() {
    allZombieLoopFunction();
    let outText = "";
    outText += "OUTOUT" + "<br>";
    outText += "zombie: " + "<br>";
    for(let i = 0; i < outputInfo.zombiePosition.length; i++){
        outText += outputInfo.zombiePosition[i] + "<br>";
    }
    outText += "creatures: " + "<br>";
    for(let i = 0; i < outputInfo.creaturesPosition.length; i++){
        outText += outputInfo.creaturesPosition[i] + "<br>";
    }
    document.getElementById("outputDisplay").innerHTML = outText;
}
