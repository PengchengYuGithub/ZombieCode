// checkMod.js

module.exports = {
   checkPos: function(testNum, gridSizeValue) {
      switch (testNum) {
          case gridSizeValue:
              return (-gridSizeValue);
          case -1:
              return gridSizeValue;
          default:
              return 0;
      }
    }
 }