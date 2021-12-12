function replaceNullyCellArrayValuesWithZero(array) {
  for (let i = 0; i < 81; i++) {
    if (!array[i]) {
      array[i] = 0;
    }
  }
}

function createInitialValueHistory() {
  let result = [];
  let cellArray = [];
  for (let i = 0; i < 81; i++) {
    cellArray[i] = 0;
  }
  result.push(cellArray);
  return result;
}

function createInitialCurrentPotentials() {
  let result = [];
  for (let row = 1; row < 10; row++) {
    for (let col = 1; col < 10; col++) {
      let block = 0;
      if (row <= 3 && col <= 3) {
        block = 1;
      } else if (row <= 3 && col > 3 && col <= 6) {
        block = 2;
      } else if (row <= 3 && col > 6) {
        block = 3;
      } else if (row > 3 && row <= 6 && col <= 3) {
        block = 4;
      } else if (row > 3 && row <= 6 && col > 3 && col <= 6) {
        block = 5;
      } else if (row > 3 && row <= 6 && col > 6) {
        block = 6;
      } else if (row > 6 && col <= 3) {
        block = 7;
      } else if (row > 6 && col > 3 && col <= 6) {
        block = 8;
      } else if (row > 6 && col > 6) {
        block = 9;
      }
      result.push({
        row,
        col,
        block,
        solved: false,
        containsNewInformation: false,
        potentials: ["", null, null, null, null, null, null, null, null, null],
      });
    }
  }
  return result;
}

function initiateEasyPuzzle() {
  let result = [];
  let cellArray = [];
  cellArray[0] = 5;
  cellArray[3] = 1;
  cellArray[6] = 7;
  cellArray[10] = 2;
  cellArray[14] = 7;
  cellArray[15] = 1;
  cellArray[18] = 3;
  cellArray[20] = 1;
  cellArray[21] = 4;
  cellArray[24] = 8;
  cellArray[25] = 5;
  cellArray[26] = 2;
  cellArray[27] = 6;
  cellArray[28] = 1;
  cellArray[30] = 5;
  cellArray[31] = 7;
  cellArray[32] = 2;
  cellArray[33] = 4;
  cellArray[35] = 8;
  cellArray[38] = 2;
  cellArray[39] = 9;
  cellArray[40] = 6;
  cellArray[46] = 4;
  cellArray[49] = 3;
  cellArray[51] = 6;
  cellArray[52] = 2;
  cellArray[53] = 7;
  cellArray[54] = 4;
  cellArray[55] = 5;
  cellArray[56] = 9;
  cellArray[58] = 8;
  cellArray[61] = 7;
  cellArray[63] = 1;
  cellArray[64] = 3;
  cellArray[69] = 9;
  cellArray[70] = 8;
  cellArray[71] = 6;
  cellArray[72] = 2;
  cellArray[76] = 1;
  cellArray[79] = 4;
  cellArray[80] = 3;
  replaceNullyCellArrayValuesWithZero(cellArray);
  result.push(cellArray);
  return result;
}

function initiateMediumPuzzle() {
  let result = [];
  let cellArray = [];
  cellArray[1] = 4;
  cellArray[2] = 1;
  cellArray[5] = 8;
  cellArray[9] = 3;
  cellArray[11] = 6;
  cellArray[12] = 2;
  cellArray[13] = 4;
  cellArray[14] = 9;
  cellArray[16] = 8;
  cellArray[25] = 7;
  cellArray[30] = 4;
  cellArray[31] = 7;
  cellArray[33] = 2;
  cellArray[34] = 1;
  cellArray[36] = 7;
  cellArray[39] = 3;
  cellArray[42] = 4;
  cellArray[44] = 6;
  cellArray[46] = 2;
  cellArray[52] = 5;
  cellArray[53] = 3;
  cellArray[56] = 7;
  cellArray[58] = 9;
  cellArray[60] = 5;
  cellArray[65] = 3;
  cellArray[67] = 2;
  cellArray[73] = 5;
  cellArray[74] = 4;
  cellArray[76] = 6;
  cellArray[77] = 3;
  replaceNullyCellArrayValuesWithZero(cellArray);
  result.push(cellArray);
  return result;
}

function initiateHardPuzzle() {
  let result = [];
  let cellArray = [];
  cellArray[1] = 6;
  cellArray[4] = 1;
  cellArray[6] = 4;
  cellArray[11] = 3;
  cellArray[14] = 2;
  cellArray[18] = 5;
  cellArray[19] = 8;
  cellArray[20] = 1;
  cellArray[21] = 6;
  cellArray[27] = 9;
  cellArray[29] = 2;
  cellArray[38] = 6;
  cellArray[39] = 9;
  cellArray[41] = 7;
  cellArray[42] = 8;
  cellArray[51] = 6;
  cellArray[53] = 1;
  cellArray[59] = 6;
  cellArray[60] = 7;
  cellArray[61] = 5;
  cellArray[62] = 4;
  cellArray[66] = 2;
  cellArray[69] = 1;
  cellArray[74] = 4;
  cellArray[76] = 9;
  cellArray[79] = 3;
  replaceNullyCellArrayValuesWithZero(cellArray);
  result.push(cellArray);
  return result;
}

function initiateVeryHardPuzzle() {
  let result = [];
  let cellArray = [];
  cellArray[0] = 7;
  cellArray[2] = 2;
  cellArray[4] = 4;
  cellArray[5] = 3;
  cellArray[10] = 6;
  cellArray[15] = 3;
  cellArray[18] = 3;
  cellArray[21] = 1;
  cellArray[29] = 1;
  cellArray[30] = 8;
  cellArray[31] = 3;
  cellArray[33] = 9;
  cellArray[35] = 7;
  cellArray[36] = 4;
  cellArray[39] = 7;
  cellArray[41] = 6;
  cellArray[44] = 2;
  cellArray[45] = 5;
  cellArray[47] = 7;
  cellArray[49] = 1;
  cellArray[50] = 9;
  cellArray[51] = 6;
  cellArray[59] = 2;
  cellArray[62] = 9;
  cellArray[65] = 4;
  cellArray[70] = 1;
  cellArray[75] = 3;
  cellArray[76] = 9;
  cellArray[78] = 4;
  cellArray[80] = 5;
  replaceNullyCellArrayValuesWithZero(cellArray);
  result.push(cellArray);
  return result;
}

function initiateChallengePuzzle() {
  let result = [];
  let cellArray = [];
  cellArray[2] = 2;
  cellArray[8] = 6;
  cellArray[10] = 4;
  cellArray[11] = 5;
  cellArray[14] = 9;
  cellArray[19] = 1;
  cellArray[21] = 2;
  cellArray[22] = 8;
  cellArray[26] = 3;
  cellArray[27] = 6;
  cellArray[34] = 7;
  cellArray[39] = 5;
  cellArray[40] = 6;
  cellArray[41] = 7;
  cellArray[46] = 5;
  cellArray[53] = 8;
  cellArray[54] = 7;
  cellArray[58] = 5;
  cellArray[59] = 2;
  cellArray[61] = 4;
  cellArray[66] = 3;
  cellArray[69] = 8;
  cellArray[70] = 2;
  cellArray[72] = 4;
  cellArray[78] = 5;
  replaceNullyCellArrayValuesWithZero(cellArray);
  result.push(cellArray);
  return result;
}

function initiateExtremePuzzle() {
  let result = [];
  let cellArray = [];
  cellArray[1] = 5;
  cellArray[8] = 9;
  cellArray[9] = 3;
  cellArray[10] = 4;
  cellArray[16] = 6;
  cellArray[18] = 8;
  cellArray[22] = 2;
  cellArray[30] = 6;
  cellArray[37] = 9;
  cellArray[40] = 3;
  cellArray[42] = 1;
  cellArray[50] = 9;
  cellArray[51] = 5;
  cellArray[53] = 3;
  cellArray[54] = 4;
  cellArray[59] = 8;
  cellArray[62] = 1;
  cellArray[66] = 3;
  cellArray[68] = 2;
  cellArray[70] = 7;
  cellArray[71] = 8;
  cellArray[72] = 6;
  cellArray[79] = 4;
  replaceNullyCellArrayValuesWithZero(cellArray);
  result.push(cellArray);
  return result;
}

function initiateEpicPuzzle() {
  let result = [];
  let cellArray = [];
  cellArray[0] = 8;
  cellArray[11] = 3;
  cellArray[12] = 6;
  cellArray[19] = 7;
  cellArray[22] = 9;
  cellArray[24] = 2;
  cellArray[28] = 5;
  cellArray[32] = 7;
  cellArray[40] = 4;
  cellArray[41] = 5;
  cellArray[42] = 7;
  cellArray[48] = 1;
  cellArray[52] = 3;
  cellArray[56] = 1;
  cellArray[61] = 6;
  cellArray[62] = 8;
  cellArray[65] = 8;
  cellArray[66] = 5;
  cellArray[70] = 1;
  cellArray[73] = 9;
  cellArray[78] = 4;
  replaceNullyCellArrayValuesWithZero(cellArray);
  result.push(cellArray);
  return result;
}

function initiateSolvedPuzzle() {
  let result = [];
  let cellArray = [];
  cellArray[0] = 1;
  cellArray[1] = 2;
  cellArray[2] = 3;
  cellArray[3] = 4;
  cellArray[4] = 5;
  cellArray[5] = 6;
  cellArray[6] = 7;
  cellArray[7] = 8;
  cellArray[8] = 9;
  cellArray[9] = 4;
  cellArray[10] = 5;
  cellArray[11] = 6;
  cellArray[12] = 7;
  cellArray[13] = 8;
  cellArray[14] = 9;
  cellArray[15] = 1;
  cellArray[16] = 2;
  cellArray[17] = 3;
  cellArray[18] = 7;
  cellArray[19] = 8;
  cellArray[20] = 9;
  cellArray[21] = 1;
  cellArray[22] = 2;
  cellArray[23] = 3;
  cellArray[24] = 4;
  cellArray[25] = 5;
  cellArray[26] = 6;
  cellArray[27] = 9;
  cellArray[28] = 1;
  cellArray[29] = 2;
  cellArray[30] = 3;
  cellArray[31] = 4;
  cellArray[32] = 5;
  cellArray[33] = 6;
  cellArray[34] = 7;
  cellArray[35] = 8;
  cellArray[36] = 3;
  cellArray[37] = 4;
  cellArray[38] = 5;
  cellArray[39] = 6;
  cellArray[40] = 7;
  cellArray[41] = 8;
  cellArray[42] = 9;
  cellArray[43] = 1;
  cellArray[44] = 2;
  cellArray[45] = 6;
  cellArray[46] = 7;
  cellArray[47] = 8;
  cellArray[48] = 9;
  cellArray[49] = 1;
  cellArray[50] = 2;
  cellArray[51] = 3;
  cellArray[52] = 4;
  cellArray[53] = 5;
  cellArray[54] = 8;
  cellArray[55] = 9;
  cellArray[56] = 1;
  cellArray[57] = 2;
  cellArray[58] = 3;
  cellArray[59] = 4;
  cellArray[60] = 5;
  cellArray[61] = 6;
  cellArray[62] = 7;
  cellArray[63] = 2;
  cellArray[64] = 3;
  cellArray[65] = 4;
  cellArray[66] = 5;
  cellArray[67] = 6;
  cellArray[68] = 7;
  cellArray[69] = 8;
  cellArray[70] = 9;
  cellArray[71] = 1;
  cellArray[72] = 5;
  cellArray[73] = 6;
  cellArray[74] = 7;
  cellArray[75] = 8;
  cellArray[76] = 9;
  cellArray[77] = 1;
  cellArray[78] = 2;
  cellArray[79] = 3;
  cellArray[80] = 4;
  replaceNullyCellArrayValuesWithZero(cellArray);
  result.push(cellArray);
  return result;
}
function initiatePuzzleWithColumnBasedXWing () {
	let result = [];
  let cellArray = [];
  cellArray[2] = 5;
  cellArray[5] = 4;
  cellArray[13] = 6;
  cellArray[16] = 9;
  cellArray[18] = 3;
  cellArray[26] = 7;
  cellArray[31] = 4;
  cellArray[38] = 8;
  cellArray[42] = 4;
  cellArray[45] = 5;
  cellArray[46] = 4;
  cellArray[47] = 1;
  cellArray[53] = 9;
  cellArray[54] = 2;
  cellArray[62] = 3;
  cellArray[65] = 7;
  cellArray[66] = 4;
  cellArray[77] = 3;
  replaceNullyCellArrayValuesWithZero(cellArray);
  result.push(cellArray);
  return result;
}
function makeNextStepInInitialCustomGame(
  valueHistory,
  number,
  selectedCellNumber,
  placeInHistory
) {
  let result = [];
  for (let i = 0; i <= placeInHistory; i++) {
    result.push([...valueHistory[i]]);
  }
  let nextStepEntry = [...valueHistory[placeInHistory]];
  nextStepEntry[selectedCellNumber] = number;
  result.push(nextStepEntry);
  return result;
}

export {
  createInitialValueHistory,
  createInitialCurrentPotentials,
  initiateEasyPuzzle,
  initiateMediumPuzzle,
  initiateHardPuzzle,
  initiateVeryHardPuzzle,
  initiateChallengePuzzle,
  initiateExtremePuzzle,
  initiateEpicPuzzle,
  initiateSolvedPuzzle,
	initiatePuzzleWithColumnBasedXWing,
  makeNextStepInInitialCustomGame,
};
