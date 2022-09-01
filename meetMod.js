module.exports = {
     meet: function(zombieCurrentPos, creaturesList, zombieList) {
        var creaPos = creaturesList.slice();
        for (var j = 0; j < creaPos.length; j++) {
            if (creaPos[j][0] === zombieCurrentPos[0] && creaPos[j][1] === zombieCurrentPos[1]) {
                zombieList.push([zombieCurrentPos[0], zombieCurrentPos[1]]);
                creaturesList.splice(j, 1);
            }
        }
    }
}