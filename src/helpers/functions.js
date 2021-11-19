const isUnknown = (element) => element === null;
const isTrue = (element) => element === true;
const isFalse = (element) => element === false;

function duplicate(object) {
  return JSON.parse(JSON.stringify(object));
}

function getFirstCellNumberOfBlock (blockNumber) {
	switch (blockNumber) {
		case 1: return 0;
		case 2: return 3;
		case 3: return 6;
		case 4: return 27;
		case 5: return 30;
		case 6: return 33;
		case 7: return 54;
		case 8: return 57;
		case 9: return 60;
		default: {
			console.log(`invalid block number: ${blockNumber}`)
			return 0;
		}
	}
}

function testArrayEquivalence(arr1, arr2) {
  for (let i1 = 0; i1 < arr1.length; i1++) {
    for (let i2 = 0; i2 < arr2.length; i2++) {
      if (arr1[i1] !== arr2[i2]) return false;
    }
  }
  return true;
}

//  Initiation of Puzzle

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
        potentials: ["", null, null, null, null, null, null, null, null, null],
      });
    }
  }
  return result;
}

function returnCellNumberGivenInitial(initial, cellNumber) {
  switch (cellNumber) {
    case 1:
      return initial;
    case 2:
      return initial + 1;
    case 3:
      return initial + 2;
    case 4:
      return initial + 9;
    case 5:
      return initial + 10;
    case 6:
      return initial + 11;
    case 7:
      return initial + 18;
    case 8:
      return initial + 19;
    case 9:
      return initial + 20;
  }
}

function resolveSelectedCellNumberFromBlockNumberAndCellNumber(
  blockNumber,
  cellNumber
) {
	return returnCellNumberGivenInitial(getFirstCellNumberOfBlock(blockNumber), cellNumber)
}
function returnIfAllCellsInBlockHaveValues (startingCellNumber, cellArray) {
	let row = 1;
	let col = 1;
	let testCellNumber = startingCellNumber;

	for (col = 1; col < 4; col++) {
		for (row = 1; row <4; row ++) {
			// console.log(`testing cellNumber ${testCellNumber}`)
			if (!cellArray[testCellNumber]) {return false}
			testCellNumber ++
			
		}
		testCellNumber+=6
	}
	return true
}
function resolveIsRealtedToSelectedCellNumber (selectedCellNumber, blockNumber, cellNumber) {
	const cellNumberBeingTested = resolveSelectedCellNumberFromBlockNumberAndCellNumber(blockNumber, cellNumber);
	if (cellNumberBeingTested === selectedCellNumber) return false;
	// Test if in same row:
	if (Math.floor((cellNumberBeingTested)/9) === Math.floor((selectedCellNumber)/9)) return true;
	// Test if in same column
	if (cellNumberBeingTested%9 === selectedCellNumber %9) return true;
	// Test if in same block
	if (blockNumber === extractBlockNumberFromCellNumber(selectedCellNumber)) return true;
	return false
}

function calculateIfBlockIsSolved (blockNumber, cellArray){
	return returnIfAllCellsInBlockHaveValues(getFirstCellNumberOfBlock(blockNumber), cellArray)
}

function setArrayForGivens(
  setfunctionOngoing,
  valueHistory,
  currentPotentials,
  setCurrentPotentials
) {
  setfunctionOngoing(true);
  let replacementCurrentPotentials = duplicate(currentPotentials);
  valueHistory[0].forEach((value, index) => {
    if (value) {
      replacementCurrentPotentials.solved = true;
      for (let i = 1; i < 10; i++) {
        i === value
          ? (replacementCurrentPotentials.potentials[i] = true)
          : (replacementCurrentPotentials.potentials[i] = false);
      }
    }
  });
  setCurrentPotentials(replacementCurrentPotentials);
  setfunctionOngoing(false);
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
function condenseInitialValueHistoryForCustomGame(valueHistory) {
  return [[...valueHistory[valueHistory.length - 1]]];
}
function testIfCellsContainAContradiction(cellArray) {
  let contradictionFound = false;
  for (let i = 0; i < 81; i++) {
    if (cellArray[i]) {
      contradictionFound = testRowForContradiction(cellArray, i);
      if (contradictionFound) {
        return contradictionFound;
      }
      contradictionFound = testColumnForContradiction(cellArray, i);
      if (contradictionFound) {
        return contradictionFound;
      }
      contradictionFound = testBlockForContradiction(cellArray, i);
      if (contradictionFound) {
        return contradictionFound;
      }
    }
  }
  return contradictionFound;
}
function testRowForContradiction(cellArray, cellNumber) {
  let rowNumber = Math.ceil((cellNumber + 1) / 9);
  let startingCellNumber = (rowNumber - 1) * 9;
  for (let i = startingCellNumber; i < startingCellNumber + 9; i++) {
    if (cellNumber !== i) {
      if (cellArray[cellNumber] === cellArray[i]) {
        return true;
      }
    }
  }
  return false;
}
function testColumnForContradiction(cellArray, cellNumber) {
  let colNumber = (cellNumber % 9) + 1;
  let startingCellNumber = colNumber - 1;
  for (let i = startingCellNumber; i < startingCellNumber + 72; i += 9) {
    if (cellNumber !== i) {
      if (cellArray[cellNumber] === cellArray[i]) {
        return true;
      }
    }
  }
  return false;
}

function testBlockForContradiction(cellArray, cellNumber) {
  let blockNumber = extractBlockNumberFromCellNumber(cellNumber);
  let blockCellNumbers = [];
  function createCellNumbersForBlockArray(startingCell) {
    let result = [];
    let row = 1;
    let col = 1;
    for (let i = 1; i < 10; i++) {
      result.push(startingCell + (col - 1) + 9 * (row - 1));
      if (col < 3) {
        col++;
      } else {
        row++;
        col = 1;
      }
    }
    return result;
  }
	blockCellNumbers.push(...createCellNumbersForBlockArray(getFirstCellNumberOfBlock(blockNumber)))
  for (let i = 0; i < blockCellNumbers.length; i++) {
    if (cellNumber !== blockCellNumbers[i]) {
      if (cellArray[cellNumber] === cellArray[blockCellNumbers[i]]) {
        // console.log(
        //   "match between cells numbers: ",
        //   cellNumber,
        //   " and ",
        //   blockCellNumbers[i],
        //   " with value of ",
        //   cellArray[i]
        // );
        return true;
      }
    }
  }
  return false;
}
function extractBlockNumberFromCellNumber(cellNumber) {
  let incrementedTripletBatchNumber = 1;
  let rowNumber = 1;
  for (let maxCellNumber = 3; maxCellNumber <= 81; maxCellNumber += 3) {
    if (cellNumber < maxCellNumber) {
      return (
        incrementedTripletBatchNumber + 3 * Math.floor((rowNumber - 1) / 3)
      );
    } else {
      if (incrementedTripletBatchNumber < 3) {
        incrementedTripletBatchNumber++;
      } else {
        incrementedTripletBatchNumber = 1;
        rowNumber++;
      }
    }
  }
  return 9;
}

function testIfSolutionIsFound(cellArray) {
  for (let i = 0; i < 81; i++) {
    if (!cellArray[i]) {
      return false;
    }
  }
  return true;
}

function calculateValuePotentials (cellArray) {
	let basePotentials = createInitialCurrentPotentials();
	// let potentialsWithRows = addPotentialInfoFromRows(basePotentials, cellArray);
	// let potentialsWithColumns = addPotentialInfoFromRows(basePotentials, cellArray);
	// let potentialsWithBlocks = addPotentialInfoFromRows(basePotentials, cellArray);
}

// function resetInputValues () {
//   for (let r = 1; r < 10; r++) {
//     for (let c = 1; c < 10; c++) {
//       if (document.getElementById(`r${r}c${c}`) !== null) {
//         document.getElementById(`r${r}c${c}`).value = '';
//         document.getElementById(`r${r}c${c}`).placeholder = '';
//       }
//     }
//   }
//   return
// }

// function resetEverything (setHasChanged, setfunctionOngoing, setCells, setInputted, setLastTested, setNoContradiction, setSolved, cells, setPlaying) {
//   setHasChanged(true);
//   setfunctionOngoing(true);
//   setCells(generateIntialCellsArray());
//   setInputted(false);
//   setLastTested(false);
//   setNoContradiction(true);
//   setSolved(true);
//   setPlaying(true);
//   // setCells([
//   //   ...cells,
//   // ]
//   // )
//   resetInputValues();
//   setSolved(false);
//   setfunctionOngoing(false);
// };

// //  Base Solving Functions

// function refreshNulls (setfunctionOngoing, cells, setCells) {
//   setfunctionOngoing(true);
//   cells.forEach((cellOut) => {
//     // console.log('does it have a number?: ',cellOut[10]);
//     // console.log(cellOut[10] !== '');
//     if (cellOut[10] !== '') {
//       let row = cellOut[0][1];
//       let col = cellOut[0][3];
//       let block = cellOut[11];
//       let val = cellOut[10];
//       cells.forEach((cellIn) => {
//         if (cellIn[10] === '' && (cellIn[0][1] === row || cellIn[0][3] === col || cellIn[11] === block)) {
//           cellIn[val] = false;
//         }
//       })
//     }
//   })
//   setCells([
//     ...cells,
//   ]
//   )
//   // console.log(cells);
//   setfunctionOngoing(false);
// };

// function addKnowns (setfunctionOngoing, cells, setCells, setLastTested, setNoContradiction, setSolved) {
//   setfunctionOngoing(true);
//   cells.forEach((cell)=> {
//     if (cell[10] === '' || cell[10] === '') {
//       if (cell.findIndex(isTrue) > 0) {
//         cell[10] = cell.findIndex(isTrue);
//         for (let i=1; i<10; i++) {
//           i === cell[10] ? cell[i] = true : cell[i] = false;
//         }
//       }
//     }
//   })
//   setCells([
//     ...cells,
//   ]
//   )
//   setfunctionOngoing(false);
//   setLastTested(false);
//   refreshNulls(setfunctionOngoing, cells, setCells);
//   testContradiction(setfunctionOngoing, cells, setNoContradiction);
//   setSolved(testIsSolved(setfunctionOngoing, cells, setNoContradiction, setSolved));
// }

// function makeUnknown (cells) {
//   for (let cellIndex = 0; cellIndex < cells.length; cellIndex ++) {
//     for (let unknownIndex = 1; unknownIndex < 10; unknownIndex ++) {
//       cells[cellIndex][unknownIndex] = 'unknown';
//     }
//   }
//   // console.log(cells);
//   return
// }

// function testContradiction (setfunctionOngoing, cells, setNoContradiction) {
//   setfunctionOngoing(true);
//   let countradictionFound = false
//   cells.forEach((cellOut)=> {
//     if (cellOut[10] !== '') {
//       cells.forEach((cellIn)=>{
//         if (cellIn[0] !== cellOut[0] && cellIn[10] === cellOut[10] && (cellIn[0][1] === cellOut[0][1] || cellIn[0][3] === cellOut[0][3] || cellIn[11] === cellOut[11])){
//           setNoContradiction(false);
//           countradictionFound = true;
//           // console.log(`Contradiction between: ${cellOut[0]} and ${cellIn[0]}`)
//         }
//       })
//     }
//     if (cellOut.length !== 12){
//       setNoContradiction(false);
//       countradictionFound = true;
//     }
//     else if (cellOut[1] === false && cellOut[2] === false && cellOut[3] === false && cellOut[4] === false && cellOut[5] === false && cellOut[6] === false && cellOut[7] === false && cellOut[8] === false && cellOut[9] === false){
//       setNoContradiction(false);
//       countradictionFound = true;
//     }
//   })
//   if (!countradictionFound) {
//     setNoContradiction(true);
//     setfunctionOngoing(false);
//     return false;
//   }
//   else {
//     setfunctionOngoing(false);
//     return true;
//   }
// }

// function testIsSolved (setfunctionOngoing, cells, setNoContradiction, setSolved) {
//   let count = 0;
//   let solved = false;
//   cells.forEach((cell)=> {
//     if (cell[10] !== '') count ++
//   })
//   count === 81 ? solved = true : solved = false;
//   if (testContradiction(setfunctionOngoing, cells, setNoContradiction)) {
//     solved = false;
//     setSolved(false);
//     // console.log('There is a contradiction.');
//   }
//   if (solved) {
//     console.log('A solution has been found!');
//     setSolved(true);
//   }
//   return solved;
// }

// //  Level 1 Tests

// function testForKnowns (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells) {
//   setLastTested(true);
//   setfunctionOngoing(true);
//   setHasChanged(false);
//   let originalArray = duplicate(cells);
//   // console.log(cells);
//   cells.forEach((cell) => {
//     // console.log(cell[10], 'is not a ''?: ', cell[10] !== '')
//     // console.log(cell);
//     if (cell[10] === '') {
//       let unknownCounter = 0;
//       for (let i=1; i<10; i++) {
//         // console.log('cell[i] is: ', cell[i], ' is this unknown?', cell[i] === "unknown")
//         if (cell[i] === "unknown") {
//           unknownCounter++;
//         }
//       }
//       // console.log(unknownCounter);
//       if (unknownCounter < 2) {
//         cell[cell.findIndex(isUnknown)] = true;
//       }
//     }
//   })
//   setCells([
//     ...cells,
//   ]
//   )
//   testArrayEquivalences(cells, originalArray) ? setHasChanged(false) : setHasChanged(true);
//   setfunctionOngoing(false);
//   refreshNulls(setfunctionOngoing, cells, setCells);
// };

// function testRows (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells) {
//   setLastTested(true);
//   setfunctionOngoing(true);
//   setHasChanged(false);
//   let originalArray = duplicate(cells);
//   for (let r=1; r<10; r++){
//     for (let num=1; num<10; num++){
//       let count = 0;
//       let holder = '';
//       // for (let i=1; i<10; i++){
//         cells.forEach((cell, index) => {
//           // console.log(cell[0][1]);
//           if (parseInt(cell[0][1]) === r && parseInt(cell[10]) === num) {
//             count -= -20;
//             return;
//           }
//           else if (parseInt(cell[0][1]) === r && (cell[num] === false || cell[10] !== '')) {
//             count ++;
//           }
//           else if (parseInt(cell[0][1]) === r && cell[num] === 'unknown') {
//             holder = index;
//           }
//         })
//       // }
//       // console.log(`count for row ${r}, #${num} is: ${count}`);
//       if (count === 8) {
//         cells[holder][num] = true;
//       }
//     }
//   }
//   setCells([
//     ...cells,
//   ]
//   )
//   // console.log('cells: ', cells, 'original: ', originalArray, cells === originalArray);
//   testArrayEquivalences(cells, originalArray) ? setHasChanged(false) : setHasChanged(true);
//   setfunctionOngoing(false);
//   refreshNulls(setfunctionOngoing, cells, setCells);
// };

// function testCols (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells) {
//   setLastTested(true);
//   setfunctionOngoing(true);
//   setHasChanged(false);
//   let originalArray = duplicate(cells);
//   for (let c=1; c<10; c++){
//     for (let num=1; num<10; num++){
//       let count = 0;
//       let holder = '';
//         cells.forEach((cell, index) => {
//           if (parseInt(cell[0][3]) === c && parseInt(cell[10]) === num) {
//             count -= -20;
//             return;
//           }
//           else if (parseInt(cell[0][3]) === c && (cell[num] === false || cell[10] !== '')) {
//             count ++;
//           }
//           else if (parseInt(cell[0][3]) === c && cell[num] === 'unknown') {
//             holder = index;
//           }
//         })
//       // }
//       if (count === 8) {
//         cells[holder][num] = true;
//       }
//     }
//   }
//   setCells([
//     ...cells,
//   ]
//   )
//   testArrayEquivalences(cells, originalArray) ? setHasChanged(false) : setHasChanged(true);
//   setfunctionOngoing(false);
//   refreshNulls(setfunctionOngoing, cells, setCells);
// };

// function testBlocks (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells) {
//   setLastTested(true);
//   setfunctionOngoing(true);
//   setHasChanged(false);
//   let originalArray = duplicate(cells);
//   for (let b=1; b<10; b++){
//     for (let num=1; num<10; num++){
//       let count = 0;
//       let holder = '';
//         cells.forEach((cell, index) => {
//           if (parseInt(cell[11]) === b && parseInt(cell[10]) === num) {
//             count -= -20;
//             return;
//           }
//           else if (parseInt(cell[11]) === b && (cell[num] === false || cell[10] !== '')) {
//             count ++;
//           }
//           else if (parseInt(cell[11]) === b && cell[num] === 'unknown') {
//             holder = index;
//           }
//         })
//       // }
//       if (count === 8) {
//         cells[holder][num] = true;
//       }
//     }
//   }
//   setCells([
//     ...cells,
//   ]
//   )
//   testArrayEquivalences(cells, originalArray) ? setHasChanged(false) : setHasChanged(true);
//   setfunctionOngoing(false);
//   refreshNulls(setfunctionOngoing, cells, setCells);
// };

// // Level 2 Tests

// function testLinkedPairs (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells) {
//   setLastTested(true);
//   setfunctionOngoing(true);
//   setHasChanged(false);
//   let originalArray = duplicate(cells);
//   let matchArray = [];
//     cells.forEach((cell1) => {
//       if (cell1[10] !== '') {return;}
//       else {
//         let count1 = 0;
//         let row1 = 0;
//         let col1 = 0;
//         let block1 = 0;
//         let num1 = 0;
//         let num2 = 0;
//         let exact1 = '';
//         for (let i = 1; i<10; i++) {
//           if (cell1[i] === 'unknown' && count1 === 0) {
//             count1 ++;
//             num1 = i;
//           }
//           else if (cell1[i] === 'unknown' && count1 === 1) {
//             count1 ++;
//             num2 = i;
//           }
//           else if (cell1[i] === 'unknown' && count1 >= 2) {
//             i += 10;
//           }
//           if (i === 9 && count1 === 2){
//             row1 = cell1[0][1];
//             col1 = cell1[0][3];
//             block1 = cell1[11];
//             exact1 = cell1[0];
//             let count2 = 0;
//             let row2 = 0;
//             let col2 = 0;
//             let block2 = 0;
//             let matches = 0;
//             let exact2 = '';
//             cells.forEach((cell2) => {
//               if (cell2[10] !== '' || cell2[0] === exact1) {return;}
//               if (!(cell2[0][1] === row1 || cell2[0][3] === col1 || cell2[11] === block1)) {return;}
//               else {
//                 for (let j = 1; j<10; j++) {
//                   if (j === num1 || j === parseInt(num2)) {
//                     if (cell2[j] === 'unknown') {count2++}
//                     else {j += 10; count2 += 10; return;}
//                   }
//                   else if (cell2[j] === 'unknown') {j += 10; count2 += 10; return;}
//                   if (count2 === 2 && j === 9) {
//                     row2 = cell2[0][1];
//                     col2 = cell2[0][3];
//                     block2 = cell2[11];
//                     exact2 = cell2[0];
//                     matches +=1;
//                   }
//                 }
//               }
//             })
//             let alreadyDone = false;
//             matchArray.forEach((pastMatch)=>{
//               // console.log(pastMatch[0], pastMatch[1], exact1, exact2);
//               if ((pastMatch[0] === exact1 || pastMatch[0] === exact2) && (pastMatch[1] === exact1 || pastMatch[1] === exact2)) {
//                 alreadyDone = true;
//               }
//             })
//             if (matches === 1 && alreadyDone === false) {
//               // console.log(`Match between: ${exact1} and ${exact2}`);
//               let matchElement = [exact1, exact2];
//               matchArray.push(matchElement);
//               if (row1 === row2) {
//                 // make evert cell in this row's num1 and num2 = false
//                 cells.forEach((cell)=> {
//                   if (cell[10] !== '' || cell[0] === exact1 || cell[0] === exact2) {return;}
//                   else if (cell[0][1] === row1) {
//                     for (let n = 1; n<10; n++){
//                       if (n === num1 || n === num2) {cell[n] = false;}
//                     }
//                   }
//                 })
//               }
//               if (col1 === col2) {
//                 // make evert cell in this col's num1 and num2 = false
//                 cells.forEach((cell)=> {
//                   if (cell[10] !== '' || cell[0] === exact1 || cell[0] === exact2) {return;}
//                   else if (cell[0][3] === col1) {
//                     for (let n = 1; n<10; n++){
//                       if (n === num1 || n === num2) {cell[n] = false;}
//                     }
//                   }
//                 })
//               }
//               if (block1 === block2) {
//                 // make evert cell in this col's num1 and num2 = false
//                 cells.forEach((cell)=> {
//                   if (cell[10] !== '' || cell[0] === exact1 || cell[0] === exact2) {return;}
//                   else if (cell[11] === block1) {
//                     for (let n = 1; n<10; n++){
//                       if (n === num1 || n === num2) {cell[n] = false;}
//                     }
//                   }
//                 })
//               }
//             }
//           }
//         }
//       }
//     })
//   setCells([
//     ...cells,
//   ]
//   )
//   testArrayEquivalences(cells, originalArray) ? setHasChanged(false) : setHasChanged(true);
//   setfunctionOngoing(false);
//   refreshNulls(setfunctionOngoing, cells, setCells);
// };

// // Realized I don't need Xwing solving
// // function testXwings (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells) {
// //   setLastTested(true);
// //   setfunctionOngoing(true);
// //   setHasChanged(false);
// //   // let originalArray = duplicate(cells);
// //   for (let r=1; r<10; r++){
// //     for (let num=1; num<10; num++){
// //       let count = 0;
// //       // let count = [0,0,0,0,0,0,0,0,0,0];
// //       // let holder = '';
// //         cells.forEach((cell, index) => {
// //           if (parseInt(cell[0][1]) === r && parseInt(cell[num]) === 'unknown') {
// //             count++;
// //           }

// //  Unfinished as of below

// //           else if (parseInt(cell[11]) === b && (cell[num] === false || cell[10] !== '')) {
// //             count ++;
// //           }
// //           else if (parseInt(cell[11]) === b && cell[num] === 'unknown') {
// //             holder = index;
// //           }
// //         })
// //       // }
// //       if (count === 8) {
// //         cells[holder][num] = true;
// //       }
// //     }
// //   }
// //   setCells([
// //     ...cells,
// //   ]
// //   )
// //   testArrayEquivalences(cells, originalArray) ? setHasChanged(false) : setHasChanged(true);
// //   setfunctionOngoing(false);
// //   refreshNulls(setfunctionOngoing, cells, setCells);
// // };

// // Level 3 Test

// function bruteForce (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved) {

//   setfunctionOngoing(true);
//   let foundNewInfo = false;
//   let solveValue = solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//   if (solveValue) foundNewInfo = true;

//   let success = false;
//   let originalCellsArray = [];
//   originalCellsArray.push(duplicate(cells));
//   let holderI = '';
//   let holderJ = '';
//   while (!foundNewInfo) {
//     // console.log('bruting');
//     // console.log(foundNewInfo);
//     for (let i = 0; i < cells.length; i++) {
//       if (cells[i][10] === ''){
//         for (let j = 1; j<10; j++) {
//           if (cells[i][j] === 'unknown') {
//             // if (cells[i] !== undefined) console.log('pre tests for number', j, 'of', cells[i][0], cells);
//             // console.log(`${i} ${j}`);
//             cells[i][10] = j;
//             solveValue = solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//             // console.log('is solved? ', solveValue);
//             let contradictionValue = testContradiction(setfunctionOngoing, cells, setNoContradiction);
//               // console.log("contradictory? ", contradictionValue);
//             if (solveValue === true) {
//               console.log('solution found and inside loop');
//               holderI = i;
//               holderJ = j;
//               j = 10;
//               i = 81;
//               foundNewInfo = true;
//               setNoContradiction(true);
//               setHasChanged(true);
//               success = true;
//               makeUnknown(cells);
//               solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//             }
//             else {
//               if (contradictionValue === true) {
//                 console.log('contradiction found and inside loop');
//                 // console.log('cell#',i, j);
//                 // console.log('cells after tests',cells);
//                 // console.log('original cells', originalCellsArray[0]);
//                 cells = originalCellsArray[0];
//                 // console.log('cells after direct change',cells);
//                 // setCells([originalCellsArray[0]]);
//                 // console.log('cells after functional change',cells);
//                 // cells = originalCellsArray[0];
//                 originalCellsArray.pop();
//                 originalCellsArray.push(duplicate(cells));
//                 cells[i][j] = false;
//                 cells[i][10] = '';
//                 // console.log('cells after contradiction fix:', cells);
//                 j = 10;
//                 i = 81;
//                 foundNewInfo = true;
//                 setNoContradiction(true);
//                 setHasChanged(true);
//                 success = true;
//               }
//               else {
//                 cells = originalCellsArray[0];
//                 originalCellsArray.pop();
//                 originalCellsArray.push(duplicate(cells));
//                 // setCells([originalCellsArray[0]]);
//                 // console.log('cells after reset due to no progress:', cells);
//               }
//             }
//           }
//           // console.log(`i = ${i}, j = ${j}, foundNewInfo must be false to esc, it is: ${foundNewInfo}`);
//           if (i === 80 && j === 9 && foundNewInfo === false) {
//             console.log('made no progress with single level guesses');
//             foundNewInfo = true;
//             setNoContradiction(true);
//             setHasChanged(false);
//             cells = originalCellsArray[0];
//             originalCellsArray.pop();
//             originalCellsArray.push(duplicate(cells));
//           }
//           // if (cells[i] !== undefined) {
//           //   console.log('post tests', cells[i][0], cells);
//           // }
//         }
//       }
//     }
//   }
//   if (holderI > 0) {
//     console.log('Solved after guess');
//     cells[holderI][holderJ] = true;
//     cells[holderI][10] = holderJ;
//     console.log(holderI, holderJ);
//   }

//   setCells([
//     ...cells,
//   ]
//   )
//   // console.log('cells after final refresh:', cells);
//   // console.log('cells after final refresh:', JSON.stringify(cells, '', 2));
//   testContradiction(setfunctionOngoing, cells, setNoContradiction)
//   // setLastTested(false);
//   // refreshNulls(setfunctionOngoing, cells, setCells);
//   // addKnowns(setfunctionOngoing, cells, setCells, setLastTested, setNoContradiction, setSolved);
//   // setSolved(testIsSolved(setfunctionOngoing, cells, setNoContradiction, setSolved));
//   setfunctionOngoing(false);

//   return success;
// }

// // Level 4 Solve

// function solve (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved) {
//   // console.log('cells before solving:', JSON.stringify(cells, '', 2));
//   let success = false;
//   let done = false;
//   addKnowns(setfunctionOngoing, cells, setCells, setLastTested, setNoContradiction, setSolved);
//   let doneTest = function () {
//     if (testIsSolved(setfunctionOngoing, cells, setNoContradiction, setSolved)) {
//       // console.log('solution found');
//       success = true;
//       return true;
//     }
//     else return false
//   }
//   let changes = 0;
//   let originalArray = [];
//   // let testCount = 0;
//   while (!done) {
//     originalArray = duplicate(cells);
//     // testCount ++;
//     testForKnowns(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells);
//     // console.log(`Test ${testCount}`);
//     addKnowns(setfunctionOngoing, cells, setCells, setLastTested, setNoContradiction, setSolved);
//     if (doneTest()) {
//       success = true;
//       return true;
//     }
//     else {
//       if (testArrayEquivalences(cells, originalArray) === false) changes++;
//     }

//     originalArray = duplicate(cells);
//     // testCount ++;
//     testRows(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells);
//     // console.log(`Test ${testCount}`);
//     addKnowns(setfunctionOngoing, cells, setCells, setLastTested, setNoContradiction, setSolved);
//     if (doneTest()) {
//       success = true;
//       return true;
//     }
//     else {
//       if (testArrayEquivalences(cells, originalArray) === false) changes++;
//     }

//     originalArray = duplicate(cells);
//     // testCount ++;
//     testCols(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells);
//     // console.log(`Test ${testCount}`);
//     addKnowns(setfunctionOngoing, cells, setCells, setLastTested, setNoContradiction, setSolved);
//     if (doneTest()) {
//       success = true;
//       return true;
//     }
//     else {
//       if (testArrayEquivalences(cells, originalArray) === false) changes++;
//     }

//     originalArray = duplicate(cells);
//     // testCount ++;
//     testBlocks(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells);
//     // console.log(`Test ${testCount}`);
//     addKnowns(setfunctionOngoing, cells, setCells, setLastTested, setNoContradiction, setSolved);
//     if (doneTest()) {
//       success = true;
//       return true;
//     }
//     else {
//       if (testArrayEquivalences(cells, originalArray) === false) changes++;
//     }

//     if (changes === 0) {
//       originalArray = duplicate(cells);
//       // testCount ++;
//       testLinkedPairs(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells);
//       // console.log(`Test ${testCount}`);
//       addKnowns(setfunctionOngoing, cells, setCells, setLastTested, setNoContradiction, setSolved);
//       if (doneTest()) {
//         success = true;
//         return true;
//       }
//       else {
//         if (testArrayEquivalences(cells, originalArray) === false) changes++;
//       }
//     }
//     if (changes === 0) {
//       // console.log('could not find solution, yet...');
//       done = true;
//     }
//     else changes = 0;
//   }
//   // console.log('cells after solving:', JSON.stringify(cells, '', 2));
//   return success;
// }

// // Level 5 SolveWithBrute

// // This function will loop endlessly, so it should not be used...
// function bruteSolve (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged) {
//   // setSolved(false);
//   let solveValue = solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//   let functionProgress = true;
// while (solveValue === false && functionProgress === true) {
//   setfunctionOngoing(true);
//   let foundNewInfo = false;
//   solveValue = solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//   if (solveValue) {
//     foundNewInfo = true;
//     setSolved(true);
//   }
//   // let success = false;
//   let originalCellsArray = [];
//   originalCellsArray.push(duplicate(cells));
//   let holderI = '';
//   let holderJ = '';
//   while (!foundNewInfo) {
//     // console.log(foundNewInfo);
//     for (let i = 0; i < cells.length; i++) {
//       if (cells[i][10] === ''){
//         for (let j = 1; j<10; j++) {
//           if (cells[i][j] === 'unknown') {
//             // if (cells[i] !== undefined) console.log('pre tests for number', j, 'of', cells[i][0], cells);
//             // console.log(`${i} ${j}`);
//             cells[i][10] = j;
//             solveValue = solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//             // console.log('is solved? ', solveValue);
//             let contradictionValue = testContradiction(setfunctionOngoing, cells, setNoContradiction);
//               // console.log("contradictory? ", contradictionValue);
//             if (solveValue === true) {
//               console.log('solution found and inside loop');
//               holderI = i;
//               holderJ = j;
//               j = 10;
//               i = 81;
//               foundNewInfo = true;
//               setNoContradiction(true);
//               setHasChanged(true);
//               setSolved(true);
//               // success = true;
//               makeUnknown(cells);
//               solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//             }
//             else {
//               if (contradictionValue === true) {
//                 console.log('contradiction found and inside loop');
//                 // console.log('cell#',i, j);
//                 // console.log('cells after tests',cells);
//                 // console.log('original cells', originalCellsArray[0]);
//                 cells = originalCellsArray[0];
//                 // console.log('cells after direct change',cells);
//                 // setCells([originalCellsArray[0]]);
//                 // console.log('cells after functional change',cells);
//                 // cells = originalCellsArray[0];
//                 originalCellsArray.pop();
//                 originalCellsArray.push(duplicate(cells));
//                 cells[i][j] = false;
//                 cells[i][10] = '';
//                 // console.log('cells after contradiction fix:', cells);
//                 j = 10;
//                 i = 81;
//                 foundNewInfo = true;
//                 setNoContradiction(true);
//                 setHasChanged(true);
//                 // success = true;
//               }
//               else {
//                 cells = originalCellsArray[0];
//                 originalCellsArray.pop();
//                 originalCellsArray.push(duplicate(cells));
//                 // setCells([originalCellsArray[0]]);
//                 // console.log('cells after reset due to no progress:', cells);
//               }
//             }
//           }
//           // console.log(`i = ${i}, j = ${j}, foundNewInfo must be false to esc, it is: ${foundNewInfo}`);
//           if (i === 80 && j === 9 && foundNewInfo === false) {
//             console.log('made no progress with single level guesses');
//             foundNewInfo = true;
//             setNoContradiction(true);
//             setHasChanged(false);
//             cells = originalCellsArray[0];
//             originalCellsArray.pop();
//             originalCellsArray.push(duplicate(cells));
//             functionProgress = false;
//           }
//           // if (cells[i] !== undefined) {
//           //   console.log('post tests', cells[i][0], cells);
//           // }
//         }
//       }
//     }
//     // console.log(foundNewInfo);
//   }
//   solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//   if (holderI > 0) {
//     console.log('A different way of solving...');
//     cells[holderI][holderJ] = true;
//     cells[holderI][10] = holderJ;
//     console.log(holderI, holderJ);
//     setSolved(true);
//   }
//   setCells([
//     ...cells,
//   ]
//   )
// }
//   testContradiction(setfunctionOngoing, cells, setNoContradiction)
//   setfunctionOngoing(false);
//   // while (hasChanged){
//   //   console.log('bruting');
//   //   bruteForce(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//   //   if (solved) return solved;
//   //   console.log('bruted');
//   //   // solve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved);
//   // }
//   // console.log(solveValue);
//   // console.log('cells at end of force', cells);
//   // console.log(JSON.stringify(cells));
//   let returnValue = [solveValue, cells]
//   // return solveValue;
//   return returnValue;
// }

// // Below was an attempt to correct the render delay to the cursor styling.
// // function guessAndBruteSolve (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged) {
// // document.body.style.cursor = "wait";
// // // guessAndBruteSolve2(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged)
// //   setTimeout(()=> {guessAndBruteSolve2(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged)}, 50);
// // }

// function guessAndBruteSolve (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged) {
//   // cursor change does not occur until render at end of function, at which time it was reset to default.
//   document.body.style.cursor = "wait";
//   const newFunction = async function (setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged) {
//     setfunctionOngoing(true);
//     let done = bruteSolve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged)[0];
//     let holderLocation = '';
//     // let holderId = '';
//     let holderValue = '';
//     let solution = [];
//     let solutionCopied = false;
//     let guesses = 0;
//     if (done) {
//       setfunctionOngoing(false);
//       document.body.style.cursor = "default";
//       return;
//     }
//     else {

//       let originalArray = duplicate(cells);
//       // console.log('original array', originalArray);
//       cells.forEach((cell, index)=>{
//         if (solution.length === 0) {
//           for (let i = 1; i < 10; i++) {
//             if (solution.length === 0) {
//               if (cell[i] === 'unknown') {
//                 if (!done) {
//                   cell[10] = toString(i);
//                   // done = bruteSolve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged)[0];
//                   let solvedHolder = bruteSolve(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged);
//                   guesses ++;
//                   done = solvedHolder[0];
//                   if (done === true) {
//                     holderLocation = index;
//                     // holderId = cell[0];
//                     holderValue = i;
//                     // cells[holderLocation][10] = toString(holderValue);
//                     if (!solutionCopied) {
//                       solution = solvedHolder[1];
//                       // solution[holderLocation][10] = toString(holderValue);
//                       solution[holderLocation][10] = holderValue;
//                       solutionCopied = true;
//                     }
//                   }
//                   else if (guesses > 99) {
//                     console.log('Too many guesses.  Escaping loops to prevent crash.');
//                     done = true;
//                     solution.push('failed');
//                     i = 10;
//                   }
//                   else {
//                     cells = originalArray;
//                     originalArray = duplicate(cells);
//                   }
//                 }
//               }
//             }
//           }
//         }
//       })
//     }
//     // document.getElementById(holderId).value = toString(holderValue);
//     // document.getElementById(holderId).placeholder = toString(holderValue);
//     if (solution.length != 1) {
//       setCells(
//       solution

//       )
//     }
//     setfunctionOngoing(false);
//     document.body.style.cursor = "default";
//     return;
//   }
//   newFunction(setLastTested, setfunctionOngoing, setHasChanged, cells, setCells, setNoContradiction, setSolved, solved, hasChanged);

//   return;
// }

export {
  createInitialValueHistory,
  createInitialCurrentPotentials,
  resolveSelectedCellNumberFromBlockNumberAndCellNumber,
	resolveIsRealtedToSelectedCellNumber,
	calculateIfBlockIsSolved,
  initiateEasyPuzzle,
  initiateMediumPuzzle,
  initiateHardPuzzle,
  initiateVeryHardPuzzle,
  initiateChallengePuzzle,
  initiateExtremePuzzle,
  initiateEpicPuzzle,
  initiateSolvedPuzzle,
  makeNextStepInInitialCustomGame,
  condenseInitialValueHistoryForCustomGame,
  testIfCellsContainAContradiction,
  testIfSolutionIsFound,
	calculateValuePotentials,
  // addKnowns,
  // testForKnowns,
  // testCols,
  // testRows,
  // testBlocks,
  // testLinkedPairs,
  // bruteForce,
  // solve,
  // bruteSolve,
  // guessAndBruteSolve,
  // resetEverything
};
